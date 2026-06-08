"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { PublicSiteHeader } from "@/components/public-site-header";

type ConnectorCategory = "All" | "ERP" | "Warehouse" | "Planning" | "Infrastructure";

type ConnectorCard = {
  name: string;
  category: ConnectorCategory;
  status: "Available" | "Template" | "Bring your own";
  description: string;
  logo: JSX.Element;
};

const connectors: ConnectorCard[] = [
  {
    name: "SAP S/4HANA",
    category: "ERP",
    status: "Available",
    description: "Purchase orders, inventory positions, supplier records, and production-planning signals.",
    logo: <SapLogo />,
  },
  {
    name: "Oracle Fusion",
    category: "ERP",
    status: "Available",
    description: "Procurement, inventory management, order visibility, and manufacturing workflows.",
    logo: <OracleLogo />,
  },
  {
    name: "Microsoft Dynamics 365",
    category: "ERP",
    status: "Available",
    description: "Supply chain management, warehouse operations, transport signals, and procurement data.",
    logo: <DynamicsLogo />,
  },
  {
    name: "NetSuite",
    category: "ERP",
    status: "Available",
    description: "Vendor data, purchasing activity, inventory state, and fulfilment records.",
    logo: <NetSuiteLogo />,
  },
  {
    name: "n8n",
    category: "Infrastructure",
    status: "Available",
    description: "Workflow-based orchestration layer for connecting existing ERP and operational systems into EasyFlow.",
    logo: <N8nLogo />,
  },
  {
    name: "Relex",
    category: "Planning",
    status: "Template",
    description: "Forecasting and replenishment signals for stock coverage, planning pressure, and replenishment timing.",
    logo: <RelexLogo />,
  },
  {
    name: "Webhooks",
    category: "Infrastructure",
    status: "Available",
    description: "Vendor-neutral event ingestion for order updates, warehouse events, supplier alerts, and approvals.",
    logo: <WebhookLogo />,
  },
  {
    name: "Custom REST API",
    category: "Infrastructure",
    status: "Bring your own",
    description: "Map any REST-based operational system into EasyFlow’s connector and event model.",
    logo: <ApiLogo />,
  },
  {
    name: "Warehouse Systems",
    category: "Warehouse",
    status: "Bring your own",
    description: "Use the connector framework for stock movement, wave execution, slotting, and dispatch events from WMS tools.",
    logo: <WarehouseLogo />,
  },
];

const categories: ConnectorCategory[] = ["All", "ERP", "Warehouse", "Planning", "Infrastructure"];

export default function ConnectorsPage() {
  const [activeCategory, setActiveCategory] = useState<ConnectorCategory>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return connectors.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const queryMatch =
        query.trim().length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-950">
      <div
        aria-hidden
        className="fixed inset-0 opacity-75"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.76) 58%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        <PublicSiteHeader variant="light" current="connectors" />

        <main className="px-6 pb-20 pt-14 md:px-12">
          <section className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-[3.2rem] font-medium leading-[0.96] tracking-[-0.05em] md:text-[5.4rem]">
                Connectors
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-[1.3rem] leading-[1.8] text-slate-600">
                Connect ERP, warehouse, planning, and event systems into one operational layer.
                EasyFlow stays vendor-neutral while the connector path stays explicit.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <div className="flex items-center gap-3 rounded-[24px] border border-slate-900/10 bg-white/85 px-5 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search connectors..."
                  className="w-full bg-transparent text-[1rem] text-slate-950 outline-none placeholder:text-slate-400"
                />
                <div className="rounded-lg border border-slate-900/10 px-2 py-1 text-[0.74rem] text-slate-400">
                  ⌘K
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-b border-slate-900/10 pb-4">
              {categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`border-b-2 px-1 pb-3 text-[1rem] transition ${
                      active
                        ? "border-slate-950 text-slate-950"
                        : "border-transparent text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {filtered.map((connector) => (
                <article
                  key={connector.name}
                  className="overflow-hidden rounded-[26px] border border-slate-900/10 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.05)]"
                >
                  <div className="px-8 py-8">
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-[20px] border border-slate-900/8 bg-slate-50">
                      {connector.logo}
                    </div>
                    <h2 className="text-[1.65rem] font-semibold tracking-tight text-slate-950">{connector.name}</h2>
                    <p className="mt-4 text-[1rem] leading-8 text-slate-600">{connector.description}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-900/10 px-8 py-5">
                    <span className="text-[0.95rem] text-slate-500">{connector.category}</span>
                    <span className="inline-flex items-center gap-2 text-[0.95rem] text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      {connector.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/connect-erp"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Read connector architecture
              </Link>
              <Link
                href="/pitch"
                className="rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900/15 hover:text-slate-950"
              >
                See the pitch
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SapLogo() {
  return <div className="rounded-lg bg-[#0b74ff] px-2 py-1 text-sm font-bold tracking-wide text-white">SAP</div>;
}

function OracleLogo() {
  return <div className="text-[1.05rem] font-semibold tracking-tight text-[#f80000]">ORACLE</div>;
}

function DynamicsLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <path d="M8 6 23 2v13L8 28z" fill="#0b8cff" />
      <path d="M23 15 31 11v15l-8 6z" fill="#4dc2ff" />
    </svg>
  );
}

function NetSuiteLogo() {
  return <div className="rounded-md border border-[#0c9edc]/20 px-2 py-1 text-[0.92rem] font-semibold text-[#0c9edc]">NetSuite</div>;
}

function N8nLogo() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-3 w-3 rounded-full bg-[#ff6d5a]" />
      <span className="h-3 w-3 rounded-full bg-[#ff9a5a]" />
      <span className="h-3 w-3 rounded-full bg-[#f04f88]" />
    </div>
  );
}

function RelexLogo() {
  return <div className="rounded-lg bg-[#93df2c] px-2 py-1 text-[0.92rem] font-bold text-slate-950">RELEX</div>;
}

function WebhookLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <circle cx="9" cy="16" r="4" fill="#111827" />
      <circle cx="23" cy="9" r="4" fill="#111827" />
      <circle cx="23" cy="23" r="4" fill="#111827" />
      <path d="M12 16h4a5 5 0 0 0 5-5" fill="none" stroke="#111827" strokeWidth="2.2" />
      <path d="M12 16h4a5 5 0 0 1 5 5" fill="none" stroke="#111827" strokeWidth="2.2" />
    </svg>
  );
}

function ApiLogo() {
  return <div className="rounded-lg bg-[#4f46e5] px-2 py-1 text-[0.92rem] font-bold text-white">API</div>;
}

function WarehouseLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <path d="M5 14 17 5l12 9v14H5z" fill="#0f766e" opacity="0.18" />
      <path d="M9 17h6v8H9zM19 17h6v8h-6z" fill="#0f766e" opacity="0.85" />
      <path d="M5 14 17 5l12 9" fill="none" stroke="#0f766e" strokeWidth="2" />
    </svg>
  );
}
