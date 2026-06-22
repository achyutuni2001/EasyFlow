"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Plus, RefreshCcw, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createTenantConnector,
  getConnectorCatalog,
  getTenantConnectors,
  testTenantConnector,
  updateTenantConnector,
} from "@/lib/connectors";
import type { ConnectorCatalogItem, TenantConnectorItem } from "@/lib/connectors";

export function IntegrationsAdminPanel() {
  const [tenantId, setTenantId] = useState("tenant-acme");
  const [catalog, setCatalog] = useState<ConnectorCatalogItem[]>([]);
  const [connectors, setConnectors] = useState<TenantConnectorItem[]>([]);
  const [selectedType, setSelectedType] = useState("relex");
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [headersJson, setHeadersJson] = useState("{}");

  useEffect(() => {
    void loadCatalog();
    void loadTenantConnectors(tenantId);
  }, []);

  async function loadCatalog() {
    try {
      setLoading(true);
      const data = await getConnectorCatalog();
      setCatalog(data.connectors ?? []);
    } catch (err) {
      setMessage(`Failed to load connector catalog: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadTenantConnectors(id: string) {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getTenantConnectors(id);
      setConnectors(data.items ?? []);
      setMessage(null);
    } catch (err) {
      setMessage(`Unable to load settings for tenant '${id}': ${(err as Error).message}`);
      setConnectors([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    try {
      setLoading(true);
      const headers = JSON.parse(headersJson || "{}") as Record<string, unknown>;
      await createTenantConnector(tenantId, {
        connector_type: selectedType,
        config: { base_url: baseUrl, api_key: apiKey, headers },
      });
      setMessage("Connector added successfully.");
      setBaseUrl("");
      setApiKey("");
      setHeadersJson("{}");
      void loadTenantConnectors(tenantId);
    } catch (err) {
      setMessage(`Create failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleTest(connectorId: number) {
    try {
      setLoading(true);
      const result = await testTenantConnector(tenantId, connectorId);
      setMessage(result.success ? "Connection test passed." : `Test failed: ${JSON.stringify(result.result)}`);
    } catch (err) {
      setMessage(`Connector test failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-secondary">
              <Zap className="h-4 w-4" />
              System Integrations
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Tenant Connector Settings</h1>
            <p className="max-w-2xl text-sm leading-6 text-white/60">
              Configure ERP and system connections for a tenant. Add, test, and review connector settings in one place.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[auto_auto]">
            <div className="grid gap-1.5">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">Tenant ID</label>
              <input
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-secondary/50"
              />
            </div>
            <Button variant="outline" onClick={() => void loadTenantConnectors(tenantId)}>
              Load Settings
            </Button>
          </div>
        </div>
      </div>

      {message ? (
        <div className="rounded-3xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Add Connector</h2>
              <p className="mt-1 text-sm text-white/50">Choose a connector type and register a new tenant integration.</p>
            </div>
            <div className="rounded-3xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/50">{loading ? "Working…" : "Ready"}</div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">Connector Type</label>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-secondary/50"
              >
                {catalog.map((item) => (
                  <option key={item.type} value={item.type}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">Base URL</label>
              <input
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
                placeholder="https://api.example.com"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-secondary/50"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">API Key / Token</label>
              <input
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="Optional for this connector"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-secondary/50"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">Additional Headers (JSON)</label>
              <textarea
                value={headersJson}
                onChange={(event) => setHeadersJson(event.target.value)}
                rows={4}
                className="min-h-[110px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-secondary/50"
              />
            </div>
            <Button onClick={handleCreate} disabled={!tenantId || !selectedType || !baseUrl || loading}>
              <Plus className="mr-2 h-4 w-4" /> Add Connector
            </Button>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Configured Connections</h2>
              <p className="mt-1 text-sm text-white/50">Review all connector settings for the selected tenant.</p>
            </div>
            <Button variant="outline" onClick={() => void loadTenantConnectors(tenantId)}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            {connectors.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/60">
                No connector settings found for this tenant.
              </div>
            ) : (
              connectors.map((connector) => (
                <div key={connector.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{connector.connector_type}</div>
                      <div className="text-xs text-white/50">Created by {connector.created_by}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-white/60">
                      <span className="inline-flex rounded-full bg-emerald-500/20 px-2.5 py-1 text-emerald-200">Active</span>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950/60 p-3">
                      <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">Base URL</div>
                      <div className="mt-1 text-sm text-white/80">{String(connector.config.base_url ?? "–")}</div>
                    </div>
                    <div className="rounded-3xl bg-slate-950/60 p-3">
                      <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">Secret Key</div>
                      <div className="mt-1 text-sm text-white/80">{connector.config.api_key ? "••••••••" : "None"}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => void handleTest(connector.id)}>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Test Connection
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:bg-white/10">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-secondary">
          <ArrowRight className="h-4 w-4" />
          Integration settings
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {catalog.map((item) => (
            <div key={item.type} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.description}</p>
              <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/40">Fields</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.fields.map((field) => (
                  <span key={field} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">{field}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
