"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  MapPin,
  Package,
  Route,
  Truck,
  Users,
  Zap,
  ExternalLink,
} from "lucide-react";
import { TenantMiniCanvas } from "@/components/tenant-mini-canvas";
import { initialProcesses } from "@/components/process-builder";

type TenantInfo = { name: string; industry: string; headquarters: string; mode: string };
type KPI = {
  healthScore: number; openPOs: number; onTimeDelivery: string;
  lowStockAlerts: number; delayedShipments: number; pendingApprovals: number;
};

const modules = [
  {
    href: "inventory",
    label: "Inventory",
    icon: Package,
    description: "SKU tracking, stock levels, coverage days, and reorder alerts.",
    accent: "text-[hsl(184,73%,61%)]",
    bg: "bg-cyan-950/40",
    border: "border-cyan-800/30",
  },
  {
    href: "logistics",
    label: "Logistics",
    icon: Truck,
    description: "Active shipments, carrier performance, and transit status.",
    accent: "text-[hsl(25,95%,63%)]",
    bg: "bg-orange-950/40",
    border: "border-orange-800/30",
  },
  {
    href: "suppliers",
    label: "Suppliers",
    icon: BarChart3,
    description: "Supplier fill rates, lead times, quality scores, and risk.",
    accent: "text-[hsl(82,78%,71%)]",
    bg: "bg-lime-950/40",
    border: "border-lime-800/30",
  },
  {
    href: "users",
    label: "Users",
    icon: Users,
    description: "User accounts, roles, departments, and access status.",
    accent: "text-[hsl(270,80%,70%)]",
    bg: "bg-purple-950/40",
    border: "border-purple-800/30",
  },
  {
    href: "automation",
    label: "Automation & Integration",
    icon: Zap,
    description: "Automation rules, integration health, triggers, and connected systems.",
    accent: "text-[hsl(45,95%,65%)]",
    bg: "bg-yellow-950/40",
    border: "border-yellow-800/30",
  },
  {
    href: "logistic-management",
    label: "Logistic Management",
    icon: Route,
    description: "Route planning, fleet tracking, and carrier assignments.",
    accent: "text-[hsl(200,80%,65%)]",
    bg: "bg-blue-950/40",
    border: "border-blue-800/30",
  },
];

export default function TenantOverviewPage({ params }: { params: { tenant: string } }) {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [kpis, setKpis] = useState<KPI | null>(null);
  const base = `/globe/tenant/${params.tenant}`;

  useEffect(() => {
    const name = params.tenant.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setTenant({ name, industry: "", headquarters: "", mode: "" });

    fetch(`/api/tenant/${params.tenant}/kpis`)
      .then((r) => r.json())
      .then((d) => { if (d?.healthScore !== undefined) setKpis(d); })
      .catch(() => {});

    fetch(`/api/tenant/${params.tenant}/info`)
      .then((r) => r.json())
      .then((d) => { if (d?.name) setTenant(d); })
      .catch(() => {});
  }, [params.tenant]);

  const tenantName = tenant?.name ?? params.tenant.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.38em] text-[hsl(184,73%,61%)]">
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[hsl(184,73%,61%)]/30 bg-[hsl(184,73%,61%)]/10">
            <span className="brand-wordmark text-[0.6rem] leading-none">
              <span>E</span><span>F</span>
            </span>
          </div>
          Tenant Overview
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{tenantName}</h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-white/40">
          {tenant?.industry && <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{tenant.industry}</span>}
          {tenant?.headquarters && <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{tenant.headquarters}</span>}
          {tenant?.mode && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.2em]">{tenant.mode}</span>}
        </div>
      </div>

      {/* Two-column: canvas left, KPIs + modules right */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">

        {/* LEFT — Operations structure canvas */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-[0.65rem] uppercase tracking-[0.38em] text-white/30">Operations Flow</div>
            <Link
              href={`/workflows?tenant=${encodeURIComponent(tenantName)}`}
              className="flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.2em] text-[hsl(184,73%,61%)]/60 hover:text-[hsl(184,73%,61%)] transition"
            >
              Edit <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.02]" style={{ height: 360, position: "relative", overflow: "hidden" }}>
            <TenantMiniCanvas tenantName={tenantName} />
          </div>
          {/* Process info */}
          <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-white/30 mb-1">Active Process</div>
            <div className="text-sm font-medium text-white/80">
              {initialProcesses.find((p) => p.tenantName === tenantName)?.processName ?? "Supply Chain Flow"}
            </div>
          </div>
        </div>

        {/* RIGHT — KPIs + modules */}
        <div className="flex flex-col gap-5">
          {/* KPI strip */}
          {kpis ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Health Score",       value: `${kpis.healthScore}%`,      h: kpis.healthScore >= 80 ? "good" : kpis.healthScore >= 60 ? "warn" : "bad" },
                { label: "Open POs",           value: String(kpis.openPOs),        h: "neutral" },
                { label: "On-Time Delivery",   value: kpis.onTimeDelivery,         h: parseInt(kpis.onTimeDelivery) >= 90 ? "good" : "warn" },
                { label: "Low Stock Alerts",   value: String(kpis.lowStockAlerts), h: kpis.lowStockAlerts > 8 ? "bad" : kpis.lowStockAlerts > 4 ? "warn" : "good" },
                { label: "Delayed Shipments",  value: String(kpis.delayedShipments ?? 0), h: (kpis.delayedShipments ?? 0) > 5 ? "bad" : (kpis.delayedShipments ?? 0) > 2 ? "warn" : "good" },
                { label: "Pending Approvals",  value: String(kpis.pendingApprovals ?? 0), h: (kpis.pendingApprovals ?? 0) > 10 ? "warn" : "neutral" },
              ].map(({ label, value, h }) => (
                <div key={label} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3.5">
                  <div className="text-[0.6rem] uppercase tracking-[0.24em] text-white/35">{label}</div>
                  <div className={`mt-1.5 text-xl font-semibold ${h === "good" ? "text-[hsl(82,78%,71%)]" : h === "warn" ? "text-[hsl(45,95%,65%)]" : h === "bad" ? "text-red-400" : "text-white"}`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3.5 animate-pulse h-16" />
              ))}
            </div>
          )}

          {/* Module grid */}
          <div>
            <div className="mb-3 text-[0.65rem] uppercase tracking-[0.38em] text-white/30">Modules</div>
            <div className="grid grid-cols-2 gap-3">
              {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <Link
                    key={mod.href}
                    href={`${base}/${mod.href}`}
                    className="group relative rounded-[18px] border bg-[hsl(217,45%,8%)] p-4 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${mod.bg} ${mod.border}`}>
                      <Icon className={`h-4 w-4 ${mod.accent}`} />
                    </div>
                    <div className="mt-3 text-sm font-semibold text-white">{mod.label}</div>
                    <div className="mt-1 text-[0.72rem] leading-4 text-white/35">{mod.description}</div>
                    <div className={`mt-3 text-[0.6rem] uppercase tracking-[0.2em] ${mod.accent} opacity-0 transition group-hover:opacity-100`}>
                      Open →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] px-5 py-4">
        <div className="text-[0.65rem] uppercase tracking-[0.38em] text-white/30 mb-3">Quick Access</div>
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: "Process Canvas", href: `/workflows?tenant=${encodeURIComponent(tenantName)}` },
            { label: "Operations Dashboard", href: `/dashboard?tenant=${encodeURIComponent(tenantName)}` },
            { label: "Forecasting", href: `/forecasting?tenant=${encodeURIComponent(tenantName)}` },
            { label: "View on Globe", href: `/globe?tenant=${encodeURIComponent(tenantName)}` },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-[0.8rem] text-white/55 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
