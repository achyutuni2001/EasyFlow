"use client";

import { notFound } from "next/navigation";
import { Zap, Play, Pause, Link2, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { tenantSeeds } from "@/lib/tenant-seeds";
import { generateAutomationData } from "@/lib/tenant-utils";

function slugify(n: string) { return n.toLowerCase().replace(/\s+/g, "-"); }

const TT = {
  contentStyle: { background: "hsl(217,45%,8%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 },
  labelStyle:   { color: "rgba(255,255,255,0.5)" },
  itemStyle:    { color: "rgba(255,255,255,0.85)" },
};

export default function AutomationPage({ params }: { params: { tenant: string } }) {
  const tenant = tenantSeeds.find((t) => slugify(t.name) === params.tenant);
  if (!tenant) return notFound();
  const { rules, integrations } = generateAutomationData(tenant.name);

  const activeRules  = rules.filter(r => r.status === "Active").length;
  const connectedInt = integrations.filter(i => i.status === "Connected").length;
  const errorInt     = integrations.filter(i => i.status === "Error").length;

  const runsData = [...rules]
    .sort((a, b) => b.runs - a.runs)
    .map(r => ({ name: r.name.length > 18 ? r.name.slice(0, 18) + "…" : r.name, runs: r.runs, status: r.status }));

  const intStatusData = [
    { status: "Connected", count: connectedInt },
    { status: "Error",     count: errorInt },
  ];

  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.38em] text-[hsl(45,95%,65%)]">
          <Zap className="h-3.5 w-3.5" /> Automation & Integration
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{tenant.name} — Automation & Integration</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active Rules", value: activeRules,              icon: Play,         colour: "text-[hsl(82,78%,71%)]" },
          { label: "Paused",       value: rules.length-activeRules, icon: Pause,        colour: "text-white/40" },
          { label: "Connected",    value: connectedInt,             icon: CheckCircle2, colour: "text-[hsl(184,73%,61%)]" },
          { label: "Errors",       value: errorInt,                 icon: AlertCircle,  colour: errorInt > 0 ? "text-red-400" : "text-[hsl(82,78%,71%)]" },
        ].map(({ label, value, icon: Icon, colour }) => (
          <div key={label} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/40">
              <Icon className={`h-3.5 w-3.5 ${colour}`} />{label}
            </div>
            <div className={`mt-2 text-2xl font-semibold ${colour}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-1 text-sm font-semibold text-white">Rule Execution Volume</div>
          <div className="mb-4 text-xs text-white/40">Total runs per automation rule (all-time)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={runsData} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip {...TT} />
              <Bar dataKey="runs" name="Executions" fill="hsl(45,95%,65%)" opacity={0.75} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-1 text-sm font-semibold text-white">Integration Health</div>
          <div className="mb-4 text-xs text-white/40">Connected vs error state across all integrations</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={intStatusData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="status" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip {...TT} />
              <Bar dataKey="count" name="Integrations" fill="hsl(184,73%,61%)" opacity={0.7} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rules table */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5"><Zap className="h-4 w-4 text-[hsl(45,95%,65%)]" /><span className="text-sm font-semibold text-white">Automation Rules</span></div>
          <div className="text-[0.65rem] uppercase tracking-[0.24em] text-white/30">{rules.length} rules</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["ID","Rule Name","Trigger","Action","Runs","Last Run","Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[0.65rem] uppercase tracking-[0.22em] text-white/30 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rules.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.03] transition">
                  <td className="px-5 py-3.5 font-mono text-xs text-white/40 whitespace-nowrap">{row.id}</td>
                  <td className="px-5 py-3.5 font-medium text-white whitespace-nowrap">{row.name}</td>
                  <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">{row.trigger}</td>
                  <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">{row.action}</td>
                  <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">{row.runs.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-white/50 whitespace-nowrap">{row.lastRun}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`flex items-center gap-1.5 text-[0.68rem] font-medium ${row.status === "Active" ? "text-[hsl(82,78%,71%)]" : "text-white/30"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${row.status === "Active" ? "bg-[hsl(82,78%,71%)]" : "bg-white/20"}`} />{row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrations */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5"><Link2 className="h-4 w-4 text-[hsl(184,73%,61%)]" /><span className="text-sm font-semibold text-white">System Integrations</span></div>
          <div className="text-[0.65rem] uppercase tracking-[0.24em] text-white/30">{integrations.length} connections</div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {integrations.map((row) => (
            <div key={row.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-[0.65rem] font-bold text-white/60 shrink-0">{row.type.slice(0,3).toUpperCase()}</div>
                <div><div className="text-sm font-medium text-white">{row.name}</div><div className="text-[0.7rem] text-white/40">{row.type} · {row.records}</div></div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`flex items-center gap-1.5 text-[0.68rem] font-medium ${row.status === "Connected" ? "text-[hsl(82,78%,71%)]" : "text-red-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${row.status === "Connected" ? "bg-[hsl(82,78%,71%)]" : "bg-red-400"}`} />{row.status}
                </span>
                <div className="text-[0.65rem] text-white/30">Synced {row.lastSync}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
