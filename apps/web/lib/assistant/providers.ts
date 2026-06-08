import { ChatOllama } from "@langchain/ollama";
import { createAgent } from "langchain";
import { z } from "zod";

import {
  assistantAlertSchema,
  assistantCitationSchema,
  type AssistantAlertRecord,
  type AssistantCitationRecord,
} from "@/lib/db/zod/assistant";
import { createTenantMcpSession } from "@/lib/assistant/mcp";
import type { KnowledgeDocument, TenantDataset } from "@/lib/assistant/knowledge-base";
import { detectAssistantIntent, retrieveRelevantDocuments } from "@/lib/assistant/retrieval";

const structuredCopilotSchema = z.object({
  answer: z.string().min(1),
  summary: z.array(z.string()).max(6).default([]),
  followUps: z.array(z.string()).max(4).default([]),
  alerts: z.array(assistantAlertSchema).max(5).default([]),
  citations: z.array(assistantCitationSchema.omit({ score: true })).max(6).default([]),
});

type ProviderInput = {
  tenantSlug: string;
  tenantName: string;
  question: string;
  dataset: TenantDataset;
  documents: KnowledgeDocument[];
};

type ProviderOutput = {
  provider: string;
  answer: string;
  summary: string[];
  followUps: string[];
  alerts: AssistantAlertRecord[];
  citations: AssistantCitationRecord[];
};

type AlertSeverity = AssistantAlertRecord["severity"];

type AssistantProvider = {
  generate(input: ProviderInput): Promise<ProviderOutput>;
};

function toNumber(value: string) {
  return Number.parseFloat(value.replace(/[^0-9.]/g, ""));
}

function createAlert(severity: AlertSeverity, label: string, detail: string): AssistantAlertRecord {
  return { severity, label, detail };
}

function fallbackCitations(question: string, documents: KnowledgeDocument[]) {
  return retrieveRelevantDocuments(question, documents, 6).map((document) => ({
    sourceType: document.sourceType,
    sourceId: document.sourceId,
    title: document.title,
    excerpt: document.excerpt,
    score: document.score,
  }));
}

function normalizeCitations(
  question: string,
  documents: KnowledgeDocument[],
  rawCitations: Array<Omit<AssistantCitationRecord, "score">>
): AssistantCitationRecord[] {
  const ranked = fallbackCitations(question, documents);
  const rankedByKey = new Map(ranked.map((citation) => [`${citation.sourceType}:${citation.sourceId}`, citation]));
  const allByKey = new Map(
    documents.map((document) => [
      `${document.sourceType}:${document.sourceId}`,
      {
        sourceType: document.sourceType,
        sourceId: document.sourceId,
        title: document.title,
        excerpt: document.content.length > 220 ? `${document.content.slice(0, 217)}...` : document.content,
        score: 1,
      } satisfies AssistantCitationRecord,
    ])
  );

  const normalized = rawCitations
    .map((citation) => rankedByKey.get(`${citation.sourceType}:${citation.sourceId}`) ?? allByKey.get(`${citation.sourceType}:${citation.sourceId}`))
    .filter(Boolean) as AssistantCitationRecord[];

  return normalized.length ? normalized.slice(0, 6) : ranked;
}

function heuristicAnswer(input: ProviderInput): ProviderOutput {
  const intent = detectAssistantIntent(input.question);
  const { dataset, tenantName, documents } = input;
  const alerts: AssistantAlertRecord[] = [];
  let answer = "";
  let summary: string[] = [];
  let followUps: string[] = [];

  if (intent === "purchase_order") {
    const match = input.question.toUpperCase().match(/PO-\d{2,6}/)?.[0];
    const po = match
      ? dataset.procurement.pos.find((entry) => entry.id.toUpperCase() === match)
      : dataset.procurement.pos[0];

    answer = po
      ? `${po.id} is currently ${po.status}. It was raised ${po.raised}, is due ${po.due}, and belongs to ${po.supplier} for ${po.category}.`
      : `I could not find that purchase order in ${tenantName}'s current operational data.`;

    if (po) {
      summary = [
        `Supplier: ${po.supplier}`,
        `Value: ${po.value} across ${po.items} items`,
        `Next concern: ${po.status === "Pending" ? "approval lag" : po.status === "Escalated" ? "manual intervention needed" : "monitor supplier timing"}`,
      ];
      if (po.status === "Pending" || po.status === "Escalated") {
        alerts.push(createAlert(po.status === "Escalated" ? "high" : "medium", `PO ${po.id}`, `Current status is ${po.status}.`));
      }
      followUps = [`Show approvals related to ${po.id}`, `List supplier risks for ${po.supplier}`];
    }
  } else if (intent === "restock") {
    const atRisk = dataset.inventory.skus
      .filter((sku) => sku.stock <= sku.reorderPoint || sku.status === "Critical" || sku.status === "Low Stock")
      .sort((a, b) => (toNumber(a.coverage) - toNumber(b.coverage)) || (a.stock - b.stock))
      .slice(0, 5);

    answer = atRisk.length
      ? `${tenantName} has ${atRisk.length} priority SKU${atRisk.length > 1 ? "s" : ""} that should be considered for restocking this week based on coverage, stock, and reorder point.`
      : `${tenantName} does not currently show any SKUs below reorder threshold in the indexed dataset.`;

    summary = atRisk.map((sku) => `${sku.sku} (${sku.description}) — stock ${sku.stock}, reorder point ${sku.reorderPoint}, coverage ${sku.coverage}`);
    alerts.push(
      ...atRisk.slice(0, 3).map((sku) =>
        createAlert(
          sku.status === "Critical" ? "critical" : "high",
          sku.sku,
          `Coverage ${sku.coverage}, stock ${sku.stock}, reorder point ${sku.reorderPoint}.`
        )
      )
    );
    followUps = ["Which suppliers are tied to these SKUs?", "Show low-stock shipments and approvals together"];
  } else if (intent === "approvals") {
    const pending = dataset.procurement.approvals
      .slice()
      .sort((a, b) => toNumber(b.waiting) - toNumber(a.waiting))
      .slice(0, 5);

    answer = pending.length
      ? `${tenantName} has ${pending.length} active approval requests in the current dataset. The longest waiting approvals are the best candidates for escalation.`
      : `${tenantName} has no active approval records in the current dataset.`;

    summary = pending.map((approval) => `${approval.id} — ${approval.amount}, ${approval.priority} priority, waiting ${approval.waiting}, approver ${approval.approver}`);
    alerts.push(
      ...pending.slice(0, 3).map((approval) =>
        createAlert(
          toNumber(approval.waiting) >= 8 ? "high" : "medium",
          approval.id,
          `${approval.priority} priority approval waiting ${approval.waiting}.`
        )
      )
    );
    followUps = ["Show approvals by department", "Which purchase orders are blocked by these approvals?"];
  } else if (intent === "shipments") {
    const delayed = dataset.logistics.shipments.filter((shipment) => ["Delayed", "On Hold", "Exception"].includes(shipment.status)).slice(0, 5);

    answer = delayed.length
      ? `${tenantName} currently has ${delayed.length} shipment exception${delayed.length > 1 ? "s" : ""} that need attention.`
      : `${tenantName} does not show delayed shipments in the current indexed data.`;

    summary = delayed.map((shipment) => `${shipment.id} (${shipment.tracking}) — ${shipment.origin} to ${shipment.destination}, ${shipment.status}, ETA ${shipment.eta}`);
    alerts.push(
      ...delayed.map((shipment) =>
        createAlert(
          shipment.status === "Exception" ? "critical" : "high",
          shipment.id,
          `${shipment.status} via ${shipment.carrier}, ETA ${shipment.eta}.`
        )
      )
    );
    followUps = ["Show carrier performance for delayed shipments", "Which customers or orders are affected?"];
  } else if (intent === "suppliers") {
    const riskySuppliers = dataset.suppliers.suppliers
      .filter((supplier) => ["High", "Critical", "Medium"].includes(supplier.riskLevel))
      .slice(0, 5);

    answer = riskySuppliers.length
      ? `${tenantName} has ${riskySuppliers.length} supplier relationship${riskySuppliers.length > 1 ? "s" : ""} worth monitoring due to risk, lead time, or fill-rate performance.`
      : `${tenantName}'s indexed supplier set does not currently show elevated risk.`;

    summary = riskySuppliers.map((supplier) => `${supplier.name} — risk ${supplier.riskLevel}, fill rate ${supplier.fillRate}, lead time ${supplier.leadTime}`);
    alerts.push(
      ...riskySuppliers.map((supplier) =>
        createAlert(
          supplier.riskLevel === "Critical" ? "critical" : supplier.riskLevel === "High" ? "high" : "medium",
          supplier.name,
          `Risk ${supplier.riskLevel}, fill rate ${supplier.fillRate}, lead time ${supplier.leadTime}.`
        )
      )
    );
    followUps = ["Which workflows depend on these suppliers?", "Show supplier performance trend"];
  } else if (intent === "exceptions") {
    const lowStock = dataset.inventory.skus.filter((sku) => ["Critical", "Low Stock"].includes(sku.status)).slice(0, 3);
    const delayed = dataset.logistics.shipments.filter((shipment) => ["Delayed", "On Hold", "Exception"].includes(shipment.status)).slice(0, 3);
    const waiting = dataset.procurement.approvals
      .slice()
      .sort((a, b) => toNumber(b.waiting) - toNumber(a.waiting))
      .slice(0, 3);

    answer = `${tenantName}'s biggest operational exceptions right now are concentrated in ${lowStock.length ? "inventory" : ""}${lowStock.length && delayed.length ? ", " : ""}${delayed.length ? "logistics" : ""}${(lowStock.length || delayed.length) && waiting.length ? ", and " : ""}${waiting.length ? "approval flow" : ""}.`;

    summary = [
      ...lowStock.map((sku) => `${sku.sku} low stock — ${sku.coverage} coverage`),
      ...delayed.map((shipment) => `${shipment.id} shipment ${shipment.status}`),
      ...waiting.map((approval) => `${approval.id} waiting ${approval.waiting}`),
    ].slice(0, 6);

    alerts.push(
      ...lowStock.map((sku) => createAlert(sku.status === "Critical" ? "critical" : "high", sku.sku, `Coverage ${sku.coverage}.`)),
      ...delayed.map((shipment) => createAlert(shipment.status === "Exception" ? "critical" : "high", shipment.id, shipment.status)),
      ...waiting.map((approval) => createAlert(toNumber(approval.waiting) >= 8 ? "high" : "medium", approval.id, `Waiting ${approval.waiting}`))
    );
    followUps = ["Show the highest-risk items only", "Which issues are likely to affect next-week service levels?"];
  } else {
    answer = `${tenantName} is operating with a health score of ${dataset.kpis.healthScore}% and current pressure across approvals, stock alerts, and shipments. The retrieved tenant data suggests the clearest next actions are around the highest-risk exceptions.`;
    summary = [
      `${dataset.kpis.openPOs} open purchase orders`,
      `${dataset.kpis.pendingApprovals} pending approvals`,
      `${dataset.kpis.lowStockAlerts} low-stock alerts`,
      `${dataset.kpis.delayedShipments} delayed shipments`,
    ];
    alerts.push(
      createAlert(dataset.kpis.lowStockAlerts > 8 ? "high" : "medium", "Inventory risk", `${dataset.kpis.lowStockAlerts} low-stock alerts.`),
      createAlert(dataset.kpis.delayedShipments > 4 ? "high" : "medium", "Shipment risk", `${dataset.kpis.delayedShipments} delayed shipments.`)
    );
    followUps = ["What needs attention right now?", "Which approvals are pending today?", "Which SKUs should we restock this week?"];
  }

  return {
    provider: "heuristic-local",
    answer,
    summary,
    followUps,
    alerts: alerts.slice(0, 5),
    citations: fallbackCitations(input.question, documents),
  };
}

function buildSystemPrompt(input: ProviderInput) {
  return [
    "You are EasyFlow Copilot, a supply chain operations assistant.",
    "You are running in a strictly tenant-scoped context. Never mention or infer any other tenant.",
    `Current tenant: ${input.tenantName} (${input.tenantSlug}).`,
    "Use the MCP tools to inspect the tenant's operational data before answering.",
    "Ground every answer in tool results only.",
    "If the answer is not in tool results, say that it is not currently available in the tenant context.",
    "Keep the answer operational and concise.",
    "Return alerts only when there is a real exception, delay, low-stock risk, or blocked approval.",
    "For citations, include only exact source items returned by tools.",
  ].join("\n");
}

type StructuredAgentOutput = z.infer<typeof structuredCopilotSchema>;

function extractStructuredResponse(value: unknown): StructuredAgentOutput {
  return structuredCopilotSchema.parse(value);
}

class LangChainMcpAssistantProvider implements AssistantProvider {
  async generate(input: ProviderInput): Promise<ProviderOutput> {
    const session = await createTenantMcpSession({
      tenantSlug: input.tenantSlug,
      dataset: input.dataset,
      documents: input.documents,
    });

    try {
      const baseUrl = process.env.LOCAL_LLM_BASE_URL ?? "http://127.0.0.1:11434";
      const modelName = process.env.LOCAL_LLM_MODEL ?? "llama3.1:8b";
      const model = new ChatOllama({
        model: modelName,
        baseUrl,
        temperature: 0.1,
      });

      const agent = createAgent({
        model,
        tools: session.tools,
        systemPrompt: buildSystemPrompt(input),
        responseFormat: structuredCopilotSchema,
      });

      const result = await agent.invoke({
        messages: [{ role: "user", content: input.question }],
      });

      const structured = extractStructuredResponse(
        (result as { structuredResponse?: unknown }).structuredResponse
      );

      return {
        provider: `langchain-mcp:ollama:${modelName}`,
        answer: structured.answer,
        summary: structured.summary,
        followUps: structured.followUps,
        alerts: structured.alerts,
        citations: normalizeCitations(input.question, input.documents, structured.citations),
      };
    } finally {
      await session.close();
    }
  }
}

class HeuristicAssistantProvider implements AssistantProvider {
  async generate(input: ProviderInput) {
    return heuristicAnswer(input);
  }
}

export function getFallbackAssistantProvider(): AssistantProvider {
  return new HeuristicAssistantProvider();
}

export function getAssistantProvider(): AssistantProvider {
  const enabled = (process.env.LOCAL_LLM_ENABLED ?? "").toLowerCase();
  if (enabled === "true") {
    return new LangChainMcpAssistantProvider();
  }
  return new HeuristicAssistantProvider();
}
