import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  Globe,
  Link2,
  MapPin,
  Package,
  Route,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { tenantSeeds } from "@/lib/tenant-seeds";
import { generateTenantKPIs } from "@/lib/tenant-utils";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

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
    label: "Automation",
    icon: Zap,
    description: "Automation rules, triggers, and runtime workflow tasks.",
    accent: "text-[hsl(45,95%,65%)]",
    bg: "bg-yellow-950/40",
    border: "border-yellow-800/30",
  },
  {
    href: "integration",
    label: "Integration",
    icon: Link2,
    description: "Connected systems, data sync status, and API links.",
    accent: "text-[hsl(184,73%,61%)]",
    bg: "bg-cyan-950/40",
    border: "border-cyan-800/30",
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
  const tenant = tenantSeeds.find((t) => slugify(t.name) === params.tenant);
  if (!tenant) return notFound();
  const kpis = generateTenantKPIs(tenant.name);
  const base = `/globe/tenant/${params.tenant}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.38em] text-[hsl(184,73%,61%)]">
          <Globe className="h-3.5 w-3.5" />
          Tenant Overview
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{tenant.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{tenant.industry}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{tenant.headquarters}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.2em]">{tenant.mode}</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Health Score", value: `${kpis.healthScore}%`, health: kpis.healthScore >= 80 ? "good" : kpis.healthScore >= 60 ? "warning" : "critical" },
          { label: "Open POs", value: String(kpis.openPOs), health: "neutral" },
          { label: "On-Time Delivery", value: kpis.onTimeDelivery, health: parseInt(kpis.onTimeDelivery) >= 90 ? "good" : "warning" },
          { label: "Low Stock Alerts", value: String(kpis.lowStockAlerts), health: kpis.lowStockAlerts > 8 ? "critical" : kpis.lowStockAlerts > 4 ? "warning" : "good" },
        ].map(({ label, value, health }) => (
          <div key={label} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-white/40">{label}</div>
            <div className={`mt-2 text-2xl font-semibold ${health === "good" ? "text-[hsl(82,78%,71%)]" : health === "warning" ? "text-[hsl(45,95%,65%)]" : health === "critical" ? "text-red-400" : "text-white"}`}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Module grid */}
      <div>
        <div className="mb-4 text-[0.65rem] uppercase tracking-[0.38em] text-white/30">Modules</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={`${base}/${mod.href}`}
                className="group relative rounded-[24px] border bg-[hsl(217,45%,8%)] p-5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${mod.bg} ${mod.border}`}>
                  <Icon className={`h-5 w-5 ${mod.accent}`} />
                </div>
                <div className="mt-4 text-base font-semibold text-white group-hover:text-white">{mod.label}</div>
                <div className="mt-1.5 text-xs leading-5 text-white/40">{mod.description}</div>
                <div className={`mt-4 text-[0.65rem] uppercase tracking-[0.22em] ${mod.accent} opacity-0 transition group-hover:opacity-100`}>
                  Open →
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick workflow links */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
        <div className="text-[0.65rem] uppercase tracking-[0.38em] text-white/30 mb-4">Workflow Tools</div>
        <div className="flex flex-wrap gap-3">
          <Link href={`/workflows?tenant=${encodeURIComponent(tenant.name)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white">
            Open Process Canvas
          </Link>
          <Link href={`/dashboard?tenant=${encodeURIComponent(tenant.name)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white">
            Operations Dashboard
          </Link>
          <Link href={`/forecasting?tenant=${encodeURIComponent(tenant.name)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white">
            Forecasting
          </Link>
          <Link href={`/globe?tenant=${encodeURIComponent(tenant.name)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white">
            View on Globe
          </Link>
        </div>
      </div>
    </div>
  );
}
