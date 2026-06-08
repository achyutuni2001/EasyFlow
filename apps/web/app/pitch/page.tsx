import Link from "next/link";

import { ArrowRight, BrainCircuit, DatabaseZap, Factory, GitFork, Radar, Workflow } from "lucide-react";

import { PublicSiteHeader } from "@/components/public-site-header";

const problemStats = [
  {
    value: "3.7 years",
    label: "Average gap between major supply-chain disruptions",
    source: "McKinsey",
    href: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-supply-chain",
  },
  {
    value: "45%",
    label: "Of one year's profit can be lost across a decade of disruption",
    source: "McKinsey",
    href: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-supply-chain",
  },
  {
    value: "89%",
    label: "Of operations leaders say tech investments have not fully delivered",
    source: "PwC 2026 Digital Trends in Operations",
    href: "https://www.pwc.com/us/en/services/consulting/business-transformation/digital-supply-chain-survey.html",
  },
];

const nowStats = [
  {
    value: "98%",
    label: "Say digital tools have improved end-to-end operational visibility",
    source: "PwC 2025 Digital Trends in Operations",
    href: "https://www.pwc.com/us/en/services/consulting/supply-chain-operations/digital-supply-chain-survey.html",
  },
  {
    value: "51%",
    label: "Already use predictive analytics with ecosystem partners",
    source: "PwC 2025 Digital Trends in Operations",
    href: "https://www.pwc.com/us/en/services/consulting/supply-chain-operations/digital-supply-chain-survey.html",
  },
  {
    value: "91%",
    label: "Expect to significantly change supply-chain strategy because of policy shifts",
    source: "PwC 2025 Digital Trends in Operations",
    href: "https://www.pwc.com/us/en/services/consulting/supply-chain-operations/digital-supply-chain-survey.html",
  },
];

const flows = [
  {
    title: "Raw systems stay where they are",
    body: "ERP, WMS, logistics tools, procurement software, spreadsheets, and supplier updates remain the source of record. EasyFlow does not try to replace them.",
    icon: DatabaseZap,
  },
  {
    title: "EasyFlow becomes the visual operating layer",
    body: "Warehouses, suppliers, inventory positions, orders, and approvals become connected entities on one canvas so teams can see relationships instead of disconnected tables.",
    icon: GitFork,
  },
  {
    title: "FlowGuide turns data into guidance",
    body: "The assistant explains what changed, where risk is building, and what needs action next using the operational context already attached to each node.",
    icon: BrainCircuit,
  },
];

const useCases = [
  {
    title: "Warehouse health",
    body: "Show capacity, throughput, delayed orders, and inventory risk on one node instead of across five reports.",
  },
  {
    title: "Supplier risk",
    body: "See which supplier is creating delay, what material is affected, and which downstream orders are now exposed.",
  },
  {
    title: "Approval bottlenecks",
    body: "Track approvals as operational work, not email threads, with ownership, escalation, and current blockers.",
  },
  {
    title: "Inventory attention",
    body: "Highlight declining coverage, stockout risk, and replenishment urgency where the business can actually act on it.",
  },
];

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-950">
      <div
        aria-hidden
        className="fixed inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.78) 58%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        <PublicSiteHeader variant="light" current="pitch" />

        <main>
          <PitchSection
            kicker="The problem"
            title="Supply chain teams already have data. They still do not have a usable operating surface."
            body="Most enterprise supply chain work lives inside ERP tables, warehouse screens, shipment portals, email escalations, and spreadsheet follow-up. The data exists. The relationships, ownership, and next action usually do not."
            stats={problemStats}
          />

          <PitchSection
            kicker="Why now"
            title="Supply chains are being pushed to act faster, while their systems are still fragmented."
            body="Operators need one layer that can sit above existing systems, make the flow visible, and help teams understand what matters without forcing a new ERP rollout."
            stats={nowStats}
          />

          <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                  The product
                </div>
                <h2 className="mt-8 max-w-5xl text-[3.1rem] font-medium leading-[0.96] tracking-[-0.04em] text-slate-950 md:text-[5.5rem]">
                  EasyFlow is the visual layer on top of raw enterprise supply chain data.
                </h2>
                <p className="mt-8 max-w-3xl text-[1.45rem] leading-[1.8] text-slate-600">
                  It turns suppliers, warehouses, products, orders, approvals, and risks into connected operational entities.
                  That makes the business legible to the people running it.
                </p>
              </div>

              <div className="space-y-4">
                {flows.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[1.12rem] font-semibold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                  What users see
                </div>
                <h2 className="mt-8 text-[3rem] font-medium leading-[0.96] tracking-[-0.04em] text-slate-950 md:text-[5rem]">
                  A live canvas where every node is a business entity.
                </h2>
                <p className="mt-8 max-w-2xl text-[1.3rem] leading-[1.8] text-slate-600">
                  Not a process drawing. Not a dashboard wall. A working surface where data becomes operations: warehouse health,
                  supplier risk, stock positions, customer order exposure, and approvals waiting on action.
                </p>
              </div>

              <div className="rounded-[32px] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_24px_120px_rgba(15,23,42,0.18)]">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[hsl(184,73%,61%)]">
                      Atlanta Warehouse
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight">Live operational node</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] text-white/65">
                    Medium risk
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <CanvasMetric title="Inventory" value="5,200 units" tone="text-[hsl(184,73%,61%)]" />
                  <CanvasMetric title="Capacity" value="84%" tone="text-[hsl(82,78%,71%)]" />
                  <CanvasMetric title="Open orders" value="112" tone="text-[hsl(25,95%,63%)]" />
                  <CanvasMetric title="Forecast pressure" value="+18%" tone="text-white" />
                </div>
                <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                    <Radar className="h-3.5 w-3.5" />
                    FlowGuide insight
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Inventory is trending down because outbound demand on Product X is up while Supplier B replenishment is late.
                    Current coverage is expected to fall below target in 5 days if no action is taken.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                  Core use cases
                </div>
                <h2 className="mt-8 text-[3rem] font-medium leading-[0.96] tracking-[-0.04em] text-slate-950 md:text-[4.7rem]">
                  Built for the coordination problems supply chain teams actually feel every day.
                </h2>
              </div>

              <div className="mt-12 grid gap-4 lg:grid-cols-2">
                {useCases.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <h3 className="text-[1.12rem] font-semibold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                    Positioning
                  </div>
                  <h2 className="mt-8 text-[3rem] font-medium leading-[0.96] tracking-[-0.04em] text-slate-950 md:text-[5rem]">
                    EasyFlow does not replace ERP. It gives teams a way to work through it.
                  </h2>
                  <p className="mt-8 max-w-3xl text-[1.3rem] leading-[1.8] text-slate-600">
                    The system of record can stay where it is. EasyFlow adds a usable operational layer: visibility, node-level
                    intelligence, workflow ownership, and AI guidance over the top of raw enterprise data.
                  </p>
                </div>

                <div className="rounded-[32px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.06)]">
                  <div className="grid gap-4">
                    <PositioningRow icon={Factory} title="Existing stack" body="ERP, WMS, TMS, supplier portals, spreadsheets, inboxes." />
                    <PositioningRow icon={GitFork} title="EasyFlow layer" body="One visual workspace for relationships, risk, ownership, and next actions." />
                    <PositioningRow icon={BrainCircuit} title="AI benefit" body="Ask why a node changed, what is delayed, what is at risk, and what should happen next." />
                  </div>
                  <div className="mt-6 rounded-[22px] bg-slate-950 px-5 py-4 text-sm leading-7 text-white/75">
                    EasyFlow makes complex supply-chain data easier to read, easier to discuss, and easier to act on.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
            <div className="mx-auto max-w-5xl text-center">
              <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                Next step
              </div>
              <h2 className="mt-8 text-[3rem] font-medium leading-[0.96] tracking-[-0.04em] text-slate-950 md:text-[4.8rem]">
                See the product, the connectors, and the operating model.
              </h2>
              <p className="mx-auto mt-7 max-w-3xl text-[1.25rem] leading-[1.8] text-slate-600">
                The pitch is the story. The app, docs, and connector path show the actual system behind it.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/globe"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open the product <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/docs/connect-erp"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900/15 hover:text-slate-950"
                >
                  Explore connectors
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900/15 hover:text-slate-950"
                >
                  Read the docs
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function PitchSection({
  kicker,
  title,
  body,
  stats,
}: {
  kicker: string;
  title: string;
  body: string;
  stats: { value: string; label: string; source: string; href: string }[];
}) {
  return (
    <section className="border-t border-slate-900/10 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
          {kicker}
        </div>
        <h1 className="mt-8 max-w-6xl text-[3.1rem] font-medium leading-[0.96] tracking-[-0.05em] text-slate-950 md:text-[6rem]">
          {title}
        </h1>
        <p className="mt-8 max-w-4xl text-[1.35rem] leading-[1.8] text-slate-600">
          {body}
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[28px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_90px_rgba(15,23,42,0.08)]"
            >
              <div className="text-[4rem] font-medium leading-none tracking-[-0.06em] text-slate-950 md:text-[5rem]">
                {stat.value}
              </div>
              <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                {stat.label}
              </p>
              <div className="mt-4 text-[0.82rem] uppercase tracking-[0.18em] text-slate-400">
                {stat.source}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CanvasMetric({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[0.74rem] uppercase tracking-[0.16em] text-white/38">{title}</div>
      <div className={`mt-3 text-2xl font-semibold tracking-tight ${tone ?? "text-white"}`}>{value}</div>
    </div>
  );
}

function PositioningRow({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Factory;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 rounded-[22px] border border-slate-900/8 bg-white p-4">
      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[1rem] font-semibold tracking-tight text-slate-950">{title}</div>
        <p className="mt-1 text-sm leading-7 text-slate-600">{body}</p>
      </div>
    </div>
  );
}
