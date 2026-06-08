import Link from "next/link";
import {
  ArrowRight, BellRing, Boxes, FileText, Globe2, ShieldCheck, TrendingUp, Truck, Users, Waypoints, Workflow, Zap,
} from "lucide-react";

import { HomeFlow } from "@/components/home-flow";
import { PublicSiteHeader } from "@/components/public-site-header";
import { SupplyChainBg } from "@/components/supply-chain-bg";

const highlights = [
  {
    title: "Workflow-first operations",
    body: "Turn approvals, supplier confirmations, exceptions, and logistics handoffs into visible owned steps instead of inbox threads.",
    icon: Waypoints,
  },
  {
    title: "ERP-adjacent by design",
    body: "EasyFlow is built to sit on top of existing operational systems through webhooks and n8n-based integration patterns.",
    icon: Globe2,
  },
  {
    title: "Operational visibility",
    body: "Give teams a single place to see what is blocked, overdue, at risk, or ready for action right now.",
    icon: TrendingUp,
  },
  {
    title: "Tenant-safe foundation",
    body: "Each organization gets an isolated workspace with its own workflows, users, dashboards, and integration surface.",
    icon: ShieldCheck,
  },
];

const useCases = [
  {
    title: "Purchase order approvals",
    body: "Route approval work by value, region, supplier tier, or urgency. Managers see the context immediately instead of hunting through email threads.",
    icon: Workflow,
    tone: "text-[hsl(184,73%,61%)]",
    preview: <ApprovalPreview />,
  },
  {
    title: "Low-stock replenishment",
    body: "Turn stock alerts into a visible operational flow with clear owners across procurement, warehouse, and supplier coordination.",
    icon: Boxes,
    tone: "text-[hsl(82,78%,71%)]",
    preview: <ReplenishmentPreview />,
  },
  {
    title: "Shipment handoffs",
    body: "Keep warehouse, logistics, and customer-facing teams aligned when shipments move, delay, or arrive outside the expected window.",
    icon: Truck,
    tone: "text-[hsl(25,95%,63%)]",
    preview: <ShipmentPreview />,
  },
  {
    title: "Supplier control",
    body: "Track supplier readiness, issues, and confirmations in one visible operational surface instead of across calls and shared sheets.",
    icon: Users,
    tone: "text-[hsl(184,73%,61%)]",
    preview: <SupplierPreview />,
  },
  {
    title: "Operations dashboard",
    body: "See delayed flows, active escalations, risky stock positions, and pending approvals without digging through disconnected systems.",
    icon: TrendingUp,
    tone: "text-[hsl(82,78%,71%)]",
    preview: <DashboardPreview />,
  },
  {
    title: "Integration visibility",
    body: "Keep the ERP as the system of record while operational events enter EasyFlow through webhooks and automation workflows.",
    icon: Globe2,
    tone: "text-[hsl(25,95%,63%)]",
    preview: <IntegrationPreview />,
  },
];

const docsLinks = [
  {
    title: "Project vision",
    href: "/docs/project-vision",
    body: "What EasyFlow is trying to become, what is already built, and what still needs real-world validation.",
  },
  {
    title: "Business use cases",
    href: "/docs/business-use-cases",
    body: "Concrete scenarios where EasyFlow removes delay, confusion, and manual coordination work.",
  },
  {
    title: "System architecture",
    href: "/docs/architecture",
    body: "How the web app, API, queue, workflow engine, connectors, and integration layer fit together.",
  },
  {
    title: "ERP integration approach",
    href: "/docs/connect-erp",
    body: "How webhook ingestion and n8n templates create a vendor-neutral integration model around real operational events.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 5% 0%, rgba(89,225,217,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse 55% 35% at 95% 5%, rgba(255,154,90,0.16) 0%, transparent 50%)," +
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(89,225,217,0.07) 0%, transparent 60%)," +
            "linear-gradient(180deg, hsl(214,55%,4%) 0%, hsl(216,45%,5%) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 grid-sheen opacity-60" />

      <PublicSiteHeader variant="dark" current="landing" />

      <main className="relative z-10">
        <section id="idea" className="relative mx-auto min-h-[calc(100svh-73px)] max-w-6xl overflow-hidden px-6 pb-10 pt-10 md:px-10 md:pb-14 md:pt-12">
          <div className="absolute inset-0 -translate-y-10 md:-translate-y-8">
            <SupplyChainBg />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-73px-2.5rem)] max-w-3xl items-center text-center md:min-h-[calc(100svh-73px-3rem)]">
            <div className="w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(184,73%,61%)]/20 bg-[hsl(184,73%,61%)]/8 px-4 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-[hsl(184,73%,61%)]">
              <Globe2 className="h-3 w-3" />
              Supply chain coordination layer
            </div>
            <h1 className="brand-wordmark mt-5 text-[1.75rem] leading-[0.98] md:text-[2.6rem] lg:text-[3.1rem]">
              <span>Easy</span><span>Flow</span>
            </h1>
            <p className="mt-4 text-[0.74rem] font-medium uppercase tracking-[0.17em] text-white/30 md:text-[0.8rem]">
              Easy insights. Clear visibility. Faster decisions.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-[0.92rem] leading-7 text-white/50">
              A visual operating layer on top of raw enterprise supply chain data. EasyFlow turns ERP signals,
              warehouse events, order backlogs, and supplier issues into something teams can actually understand and act on.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/globe"
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(184,73%,61%)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                Enter the app <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/project-vision"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
              >
                Read the project vision
              </Link>
            </div>
          </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/8 bg-slate-950/60 p-6 backdrop-blur-xl"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <item.icon className="h-4.5 w-4.5 text-[hsl(184,73%,61%)]" />
                </div>
                <h2 className="text-[1rem] font-semibold tracking-tight text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/45">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="screens" className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[hsl(184,73%,61%)]">
              <Workflow className="h-3 w-3" />
              Product screens
            </div>
            <h2 className="mt-4 text-[1.9rem] font-semibold tracking-tight text-white md:text-[2.4rem]">
              Six views across the operating surface.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
              The product is meant to feel like one connected operational layer, not isolated tools.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[24px] border border-white/8 bg-slate-950/60 backdrop-blur-xl"
              >
                <div className="border-b border-white/6 bg-[hsl(214,55%,4%)]">
                  <div className="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                  </div>
                  <div className="px-3 py-3">
                    {item.preview}
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <item.icon className={`h-4.5 w-4.5 ${item.tone}`} />
                  </div>
                  <h3 className="text-[1rem] font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="use-cases" className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[hsl(184,73%,61%)]">
              <Users className="h-3 w-3" />
              Business use cases
            </div>
            <h2 className="mt-4 text-[1.9rem] font-semibold tracking-tight text-white md:text-[2.4rem]">
              Real operational scenarios, not just a concept.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
              The product is aimed at the coordination layer between data and people. These are the kinds of daily supply chain situations
              EasyFlow is designed to make visible, trackable, and faster to resolve.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={`use-${item.title}`}
                className="rounded-[24px] border border-white/8 bg-slate-950/60 p-6 backdrop-blur-xl"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <item.icon className="h-4.5 w-4.5 text-[hsl(184,73%,61%)]" />
                </div>
                <h3 className="text-[1rem] font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-20 md:px-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[hsl(184,73%,61%)]">
              <Zap className="h-3 w-3" />
              How it works
            </div>
            <h2 className="mt-4 text-[1.9rem] font-semibold tracking-tight text-white md:text-[2.4rem]">
              From event to action without the chaos.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45">
              The product direction is simple: operational data comes in, the workflow engine routes the next step,
              and every team sees what matters without chasing status manually.
            </p>
          </div>
          <HomeFlow />
        </section>

        <section id="documentation" className="border-t border-white/6 py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[hsl(184,73%,61%)]">
                <FileText className="h-3 w-3" />
                Documentation
              </div>
              <h2 className="mt-4 text-[1.9rem] font-semibold tracking-tight text-white md:text-[2.4rem]">
                Product idea, architecture, and progress in one place.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
                The docs are part of the product story. They explain the business problem, the architecture, the integration model,
                and the honest status of what has been built so far.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {docsLinks.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group rounded-[22px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[1rem] font-semibold tracking-tight text-white">{doc.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/40">{doc.body}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[hsl(184,73%,61%)] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/6 py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-[1.9rem] font-semibold tracking-tight text-white md:text-[2.4rem]">
              From operating idea to working system.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/40">
              The current product already includes the web app, typed model layer, webhook ingestion, queue-backed local architecture,
              n8n integration patterns, and workflow-oriented documentation. The next stage is deeper validation in real environments.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/project-vision"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
              >
                See the product as it stands today
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(184,73%,61%)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ApprovalPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="14" y="18" width="292" height="32" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
      <text x="28" y="38" fill="white" fillOpacity="0.75" fontSize="11" fontWeight="600">PO-8841 · Cold Chain Replenishment</text>
      <rect x="220" y="25" width="68" height="18" rx="9" fill="#59e1d9" fillOpacity="0.15" />
      <text x="254" y="38" textAnchor="middle" fill="#59e1d9" fontSize="9" fontWeight="700">PENDING</text>
      <rect x="14" y="64" width="86" height="22" rx="8" fill="white" fillOpacity="0.04" stroke="#59e1d9" strokeOpacity="0.45" />
      <rect x="118" y="64" width="86" height="22" rx="8" fill="white" fillOpacity="0.04" stroke="#ff9a5a" strokeOpacity="0.45" />
      <rect x="222" y="64" width="84" height="22" rx="8" fill="white" fillOpacity="0.04" stroke="#82d949" strokeOpacity="0.45" />
      <text x="57" y="78" textAnchor="middle" fill="#59e1d9" fontSize="8" fontWeight="600">Buyer Review</text>
      <text x="161" y="78" textAnchor="middle" fill="#ff9a5a" fontSize="8" fontWeight="600">Finance Check</text>
      <text x="264" y="78" textAnchor="middle" fill="#82d949" fontSize="8" fontWeight="600">VP Sign-off</text>
      <line x1="100" y1="75" x2="118" y2="75" stroke="white" strokeOpacity="0.18" strokeDasharray="4 3" />
      <line x1="204" y1="75" x2="222" y2="75" stroke="white" strokeOpacity="0.18" strokeDasharray="4 3" />
      <rect x="14" y="104" width="138" height="26" rx="10" fill="white" fillOpacity="0.04" />
      <rect x="168" y="104" width="138" height="26" rx="10" fill="white" fillOpacity="0.04" />
      <text x="28" y="121" fill="white" fillOpacity="0.45" fontSize="9">Value</text>
      <text x="28" y="126" fill="#59e1d9" fontSize="10" fontWeight="700">$1.2M</text>
      <text x="182" y="121" fill="white" fillOpacity="0.45" fontSize="9">Escalates in</text>
      <text x="182" y="126" fill="#ff9a5a" fontSize="10" fontWeight="700">1h 48m</text>
    </svg>
  );
}

function ReplenishmentPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="12" y="18" width="296" height="114" rx="12" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.08" />
      <polyline points="24,108 60,92 94,98 128,74 160,82 194,56 228,63 262,42 296,48" fill="none" stroke="#59e1d9" strokeWidth="3" />
      <polygon points="24,108 60,92 94,98 128,74 160,82 194,56 228,63 262,42 296,48 296,126 24,126" fill="#59e1d9" fillOpacity="0.08" />
      <rect x="22" y="28" width="72" height="24" rx="8" fill="white" fillOpacity="0.05" />
      <text x="34" y="43" fill="white" fillOpacity="0.45" fontSize="9">Coverage</text>
      <text x="34" y="48" fill="#59e1d9" fontSize="10" fontWeight="700">4.8d</text>
      <rect x="108" y="28" width="90" height="24" rx="8" fill="white" fillOpacity="0.05" />
      <text x="120" y="43" fill="white" fillOpacity="0.45" fontSize="9">Triggered SKUs</text>
      <text x="120" y="48" fill="#82d949" fontSize="10" fontWeight="700">42 active</text>
      <rect x="212" y="28" width="90" height="24" rx="8" fill="white" fillOpacity="0.05" />
      <text x="224" y="43" fill="white" fillOpacity="0.45" fontSize="9">Priority</text>
      <text x="224" y="48" fill="#ff9a5a" fontSize="10" fontWeight="700">APAC buffer</text>
    </svg>
  );
}

function ShipmentPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="14" y="20" width="292" height="110" rx="12" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.08" />
      <rect x="30" y="38" width="260" height="20" rx="10" fill="white" fillOpacity="0.04" />
      <circle cx="56" cy="48" r="5" fill="#59e1d9" fillOpacity="0.85" />
      <circle cx="160" cy="48" r="5" fill="#ff9a5a" fillOpacity="0.85" />
      <circle cx="258" cy="48" r="5" fill="#82d949" fillOpacity="0.85" />
      <line x1="56" y1="48" x2="258" y2="48" stroke="white" strokeOpacity="0.15" strokeDasharray="5 4" />
      <text x="30" y="74" fill="white" fillOpacity="0.76" fontSize="10" fontWeight="600">SHP-3304 · Jakarta → Rotterdam</text>
      <text x="30" y="94" fill="white" fillOpacity="0.45" fontSize="9">Current handoff</text>
      <text x="120" y="94" fill="#ff9a5a" fontSize="9" fontWeight="700">Customs delay detected</text>
      <text x="30" y="112" fill="white" fillOpacity="0.45" fontSize="9">Notifications</text>
      <g transform="translate(118,101)">
        <BellRing className="h-3 w-3 text-[hsl(184,73%,61%)]" />
      </g>
      <text x="136" y="112" fill="#59e1d9" fontSize="9" fontWeight="700">Warehouse · Logistics · Customer Ops</text>
    </svg>
  );
}

function SupplierPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="14" y="18" width="292" height="114" rx="12" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.08" />
      <rect x="28" y="34" width="110" height="22" rx="8" fill="white" fillOpacity="0.05" />
      <text x="40" y="49" fill="white" fillOpacity="0.76" fontSize="10" fontWeight="600">Supplier readiness</text>
      {[
        { y: 68, name: "Pacific Components", score: "On track", tone: "#82d949" },
        { y: 90, name: "North Harbor Foods", score: "Needs review", tone: "#ff9a5a" },
        { y: 112, name: "Delta Plastics", score: "Confirmed", tone: "#59e1d9" },
      ].map((row) => (
        <g key={row.name}>
          <rect x="28" y={row.y - 12} width="250" height="18" rx="8" fill="white" fillOpacity="0.04" />
          <text x="40" y={row.y} fill="white" fillOpacity="0.68" fontSize="9">{row.name}</text>
          <text x="264" y={row.y} textAnchor="end" fill={row.tone} fontSize="9" fontWeight="700">{row.score}</text>
        </g>
      ))}
    </svg>
  );
}

function DashboardPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="12" y="18" width="296" height="114" rx="12" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.08" />
      <rect x="24" y="30" width="78" height="30" rx="10" fill="#59e1d9" fillOpacity="0.12" />
      <rect x="114" y="30" width="78" height="30" rx="10" fill="#ff9a5a" fillOpacity="0.12" />
      <rect x="204" y="30" width="90" height="30" rx="10" fill="#82d949" fillOpacity="0.12" />
      <text x="34" y="44" fill="white" fillOpacity="0.42" fontSize="8">Approvals</text>
      <text x="34" y="52" fill="#59e1d9" fontSize="11" fontWeight="700">24 open</text>
      <text x="124" y="44" fill="white" fillOpacity="0.42" fontSize="8">Delays</text>
      <text x="124" y="52" fill="#ff9a5a" fontSize="11" fontWeight="700">6 critical</text>
      <text x="214" y="44" fill="white" fillOpacity="0.42" fontSize="8">Coverage</text>
      <text x="214" y="52" fill="#82d949" fontSize="11" fontWeight="700">Healthy</text>
      <polyline points="28,110 66,96 104,101 142,72 180,78 218,54 256,62 292,44" fill="none" stroke="#59e1d9" strokeWidth="3" />
      <line x1="28" y1="110" x2="292" y2="110" stroke="white" strokeOpacity="0.1" />
    </svg>
  );
}

function IntegrationPreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" style={{ height: 150 }}>
      <rect x="12" y="18" width="296" height="114" rx="12" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.08" />
      <rect x="24" y="52" width="72" height="42" rx="10" fill="white" fillOpacity="0.05" stroke="#59e1d9" strokeOpacity="0.35" />
      <rect x="124" y="52" width="72" height="42" rx="10" fill="white" fillOpacity="0.05" stroke="#ff9a5a" strokeOpacity="0.35" />
      <rect x="224" y="52" width="72" height="42" rx="10" fill="white" fillOpacity="0.05" stroke="#82d949" strokeOpacity="0.35" />
      <text x="60" y="76" textAnchor="middle" fill="#59e1d9" fontSize="10" fontWeight="700">ERP</text>
      <text x="160" y="76" textAnchor="middle" fill="#ff9a5a" fontSize="10" fontWeight="700">n8n</text>
      <text x="260" y="76" textAnchor="middle" fill="#82d949" fontSize="10" fontWeight="700">EasyFlow</text>
      <line x1="96" y1="73" x2="124" y2="73" stroke="white" strokeOpacity="0.18" strokeDasharray="5 4" />
      <line x1="196" y1="73" x2="224" y2="73" stroke="white" strokeOpacity="0.18" strokeDasharray="5 4" />
      <text x="24" y="116" fill="white" fillOpacity="0.4" fontSize="9">Webhook event pipeline · locally testable · customer credentials required for production validation</text>
    </svg>
  );
}
