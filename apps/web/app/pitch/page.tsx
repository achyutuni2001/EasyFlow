import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  DatabaseZap,
  Factory,
  GitFork,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react";

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
    title: "Systems stay where they are",
    body: "ERP, WMS, logistics tools, planning software, spreadsheets, and supplier updates remain the source of record.",
    icon: DatabaseZap,
  },
  {
    title: "EasyFlow becomes the operating surface",
    body: "Warehouses, suppliers, products, inventory, and orders become connected business entities instead of scattered records.",
    icon: GitFork,
  },
  {
    title: "FlowGuide explains what changed",
    body: "The AI layer turns raw operational movement into guidance, risk visibility, and next-step recommendations.",
    icon: BrainCircuit,
  },
];

const useCases = [
  "Warehouse health without opening five reports",
  "Supplier delays mapped to downstream order risk",
  "Inventory pressure shown where action is actually taken",
  "Approvals treated as work with ownership and follow-up",
];

export default function PitchPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#07111e] text-white">
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,170,205,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,205,0.075) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(80,220,245,0.12),transparent_22%),radial-gradient(circle_at_88%_18%,rgba(141,245,224,0.09),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(80,220,245,0.06),transparent_28%)]"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[18%] top-[-8%] h-[54rem] w-[20rem] rotate-[32deg] bg-[linear-gradient(180deg,rgba(56,189,248,0.16),rgba(14,165,233,0.02))] blur-[22px] animate-[pitchBeam_18s_linear_infinite]" />
        <div className="absolute left-[28%] top-[-16%] h-[60rem] w-[16rem] rotate-[32deg] bg-[linear-gradient(180deg,rgba(96,165,250,0.14),rgba(30,64,175,0.01))] blur-[26px] animate-[pitchBeam_24s_linear_infinite_reverse]" />
        <div className="absolute right-[8%] top-[-10%] h-[58rem] w-[18rem] rotate-[32deg] bg-[linear-gradient(180deg,rgba(34,211,238,0.14),rgba(8,47,73,0.01))] blur-[24px] animate-[pitchBeam_20s_linear_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,16,0.24),rgba(3,8,16,0.58))]" />
      </div>

      <div className="relative z-10">
        <PublicSiteHeader variant="dark" current="pitch" />

        <main className="px-6 pb-24 pt-10 md:px-10">
          <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-2xl rounded-[34px] border border-slate-200 bg-[#f3f7fb] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.16)] md:p-8">
              <div className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-50 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Operational intelligence pitch
              </div>
              <h1 className="mt-6 max-w-3xl text-[2.4rem] font-medium leading-[1.02] tracking-[-0.045em] text-slate-950 md:text-[3.85rem]">
                Make raw supply-chain data readable, visual, and actionable.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-600 md:text-[1.08rem]">
                EasyFlow sits above ERP, warehouse, planning, and logistics systems and turns scattered operational data into one working surface.
                Teams stop chasing tables and start working through visible entities, risks, and next actions.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/globe"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open the product <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/connectors"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900/15 hover:text-slate-950"
                >
                  Explore connectors
                </Link>
              </div>
            </div>

            <ProductHero />
          </section>

          <section className="mx-auto mt-20 max-w-7xl">
            <PitchSection
              kicker="The problem"
              title="Supply-chain teams already have data. They still do not have a clear place to work through it."
              body="Most operational work still lives across ERP tables, warehouse screens, shipment portals, email escalations, and spreadsheet follow-up. The data exists. The relationships, ownership, and next action usually do not."
              stats={problemStats}
            />
          </section>

          <section className="mx-auto mt-20 max-w-7xl">
            <PitchSection
              kicker="Why now"
              title="Teams are being asked to respond faster while the systems beneath them are still fragmented."
              body="The pressure is not only to collect data. It is to interpret it quickly, understand downstream impact, and move work without another major ERP program."
              stats={nowStats}
            />
          </section>

          <section className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="max-w-xl">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                The product
              </div>
              <h2 className="mt-5 text-[2.1rem] font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-[3rem]">
                EasyFlow becomes the visual operating layer above raw enterprise systems.
              </h2>
              <p className="mt-5 text-[1rem] leading-8 text-white/68">
                It does not try to replace the system of record. It makes suppliers, warehouses, products, inventory, approvals, and orders legible to the people running operations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {flows.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-[#edf3f8] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-[1rem] font-semibold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <AnimatedCanvasScreen />
            <div className="max-w-xl">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                What the user sees
              </div>
              <h2 className="mt-5 text-[2.1rem] font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-[3rem]">
                A live canvas where every node is a business entity.
              </h2>
              <p className="mt-5 text-[1rem] leading-8 text-white/68">
                Not a process diagram. Not a static dashboard. A working view where warehouse pressure, supplier risk, order exposure, approvals, and AI explanation all sit on one surface.
              </p>
              <ul className="mt-6 space-y-3">
                {useCases.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.96rem] leading-7 text-white/66">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(184,73%,61%)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1fr] lg:items-center">
            <div className="max-w-xl">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                AI layer
              </div>
              <h2 className="mt-5 text-[2.1rem] font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-[3rem]">
                FlowGuide turns operational movement into explanation and next actions.
              </h2>
              <p className="mt-5 text-[1rem] leading-8 text-white/68">
                Teams can ask why inventory is declining, which supplier is now creating downstream delay, or what needs attention first. The AI layer works on top of the same connected operating context.
              </p>
            </div>
            <FlowGuideScreen />
          </section>

          <section className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="max-w-xl">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                Positioning
              </div>
              <h2 className="mt-5 text-[2.1rem] font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-[3rem]">
                EasyFlow does not replace ERP. It gives teams a better way to work through it.
              </h2>
              <p className="mt-5 text-[1rem] leading-8 text-white/68">
                The source systems stay intact. EasyFlow adds a usable operational surface: connected visibility, node-level intelligence, ownership, and AI interpretation over the top.
              </p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-[#edf3f8] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4">
                <PositioningRow icon={Factory} title="Existing stack" body="ERP, WMS, TMS, supplier portals, spreadsheets, and status updates." />
                <PositioningRow icon={GitFork} title="EasyFlow layer" body="A visual workspace for relationships, operational pressure, ownership, and next actions." />
                <PositioningRow icon={BrainCircuit} title="AI benefit" body="Ask what changed, why risk is building, and what should happen next." />
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-5xl rounded-[36px] border border-slate-200 bg-[#f3f7fb] px-8 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-12">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
              Next step
            </div>
            <h2 className="mx-auto mt-5 max-w-3xl text-[2rem] font-medium leading-[1.04] tracking-[-0.04em] text-slate-950 md:text-[3rem]">
              See the product, the connectors, and the operating model behind the pitch.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600">
              The story is only useful if the product supports it. The app, docs, and connector surface show the system underneath.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/globe"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open the product <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/connectors"
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
    <section className="rounded-[36px] border border-slate-200 bg-[#edf3f8] px-7 py-8 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:px-10 md:py-10">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
        {kicker}
      </div>
      <h2 className="mt-5 max-w-4xl text-[2rem] font-medium leading-[1.04] tracking-[-0.04em] text-slate-950 md:text-[3.25rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-slate-600">
        {body}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[24px] border border-slate-200 bg-[#dfe8f2] p-5 transition hover:-translate-y-0.5 hover:bg-[#e7eef6] hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
          >
            <div className="text-[2.3rem] font-medium leading-none tracking-[-0.05em] text-slate-950 md:text-[2.8rem]">
              {stat.value}
            </div>
            <p className="mt-3 text-[0.95rem] leading-7 text-slate-700">
              {stat.label}
            </p>
            <div className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">
              {stat.source}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductHero() {
  return (
    <div className="relative rounded-[34px] border border-slate-900/8 bg-white/90 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.12)] md:p-6">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[hsl(184,73%,61%)]/12 blur-3xl" />
      <div className="absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-[hsl(82,78%,71%)]/10 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-slate-900/8 pb-4">
        <div>
          <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[hsl(184,73%,61%)]">EasyFlow canvas</div>
          <div className="mt-1 text-sm text-slate-500">Live operating surface</div>
        </div>
        <div className="rounded-full border border-slate-900/10 px-3 py-1 text-[0.72rem] text-slate-500">
          Solstice Consumer Electronics
        </div>
      </div>

      <div className="relative mt-5 rounded-[28px] border border-slate-900/8 bg-[#f8fbfd] p-4">
        <div className="grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[24px] border border-slate-900/8 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">Supply chain graph</div>
              <div className="text-[0.72rem] text-slate-400">Live</div>
            </div>
            <div className="relative mt-4 h-52 rounded-[20px] border border-slate-900/8 bg-[linear-gradient(180deg,#ffffff,rgba(241,245,249,0.85))]">
              <NodeBubble className="left-5 top-8" label="Supplier A" />
              <NodeBubble className="left-32 top-20" label="Atlanta" />
              <NodeBubble className="left-20 top-36" label="Plant 4" />
              <NodeBubble className="right-8 top-10" label="DC East" />
              <NodeBubble className="right-10 bottom-8" label="Orders" />
              <ConnectorLine className="left-16 top-14 w-20 rotate-[18deg]" />
              <ConnectorLine className="left-28 top-28 w-16 rotate-[38deg]" />
              <ConnectorLine className="left-48 top-22 w-24 -rotate-[6deg]" />
              <ConnectorLine className="right-24 top-24 w-12 rotate-[65deg]" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[24px] border border-slate-900/8 bg-white p-4">
              <div className="text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">Selected node</div>
              <div className="mt-2 text-lg font-semibold tracking-tight text-slate-950">Atlanta Warehouse</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MetricPill label="Inventory" value="5,200" tone="text-[hsl(184,73%,61%)]" />
                <MetricPill label="Capacity" value="84%" tone="text-[hsl(82,78%,71%)]" />
                <MetricPill label="Open orders" value="112" tone="text-[hsl(25,95%,63%)]" />
                <MetricPill label="Risk" value="Medium" tone="text-slate-950" />
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-900/8 bg-white p-4">
              <div className="flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(184,73%,61%)]" />
                FlowGuide
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Inventory is down 18% over two weeks. Demand on Product X increased while Supplier B replenishment slipped by 3 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCanvasScreen() {
  return (
    <div className="relative rounded-[34px] border border-slate-900/8 bg-white/90 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(184,73%,61%)]/35 to-transparent" />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
        <div className="rounded-[26px] border border-slate-900/8 bg-[#f8fbfd] p-4">
          <div className="text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">Entity canvas</div>
          <div className="relative mt-4 h-[23rem] overflow-hidden rounded-[24px] border border-slate-900/8 bg-[linear-gradient(180deg,#ffffff,rgba(241,245,249,0.85))]">
            <div className="absolute left-8 top-8">
              <LiveNode label="Supplier B" value="Delay +3d" tone="text-[hsl(25,95%,63%)]" />
            </div>
            <div className="absolute left-36 top-24">
              <LiveNode label="Warehouse ATL" value="84% cap." tone="text-[hsl(184,73%,61%)]" pulse />
            </div>
            <div className="absolute left-20 top-56">
              <LiveNode label="Production" value="At risk" tone="text-[hsl(82,78%,71%)]" />
            </div>
            <div className="absolute right-12 top-16">
              <LiveNode label="Distribution" value="112 orders" tone="text-white" />
            </div>
            <div className="absolute right-16 bottom-12">
              <LiveNode label="Customers" value="18 exposed" tone="text-[hsl(25,95%,63%)]" />
            </div>
            <AnimatedLink className="left-20 top-16 w-24 rotate-[24deg]" />
            <AnimatedLink className="left-40 top-38 w-20 rotate-[40deg]" />
            <AnimatedLink className="left-60 top-24 w-24 -rotate-[4deg]" />
            <AnimatedLink className="right-28 top-32 w-16 rotate-[65deg]" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-900/8 bg-white p-4">
            <div className="text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">Live metrics</div>
            <div className="mt-4 space-y-3">
              <MetricRow label="Inventory coverage" value="12.4 days" accent="bg-[hsl(184,73%,61%)]" />
              <MetricRow label="Orders at risk" value="18" accent="bg-[hsl(25,95%,63%)]" />
              <MetricRow label="Delayed approvals" value="6" accent="bg-[hsl(82,78%,71%)]" />
            </div>
          </div>
          <div className="rounded-[26px] border border-slate-900/8 bg-white p-4">
            <div className="flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">
              <Radar className="h-3.5 w-3.5 text-[hsl(184,73%,61%)]" />
              AI explanation
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Supplier B delay is now the main downstream risk. It affects Plant 4 replenishment and may expose 18 customer shipments if no transfer is initiated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowGuideScreen() {
  return (
    <div className="rounded-[34px] border border-slate-900/8 bg-white/90 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
      <div className="flex items-center gap-3 rounded-[24px] border border-slate-900/8 bg-[#f8fbfd] px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(184,73%,61%)]/16 text-[hsl(184,73%,61%)]">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-950">FlowGuide</div>
          <div className="text-[0.78rem] text-slate-400">Tenant-scoped operations assistant</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <ChatBubble align="left">
          Which warehouse needs attention first this morning?
        </ChatBubble>
        <ChatBubble align="right" accent>
          Atlanta Warehouse is the highest-priority node. Capacity is at 84%, open orders are rising, and Supplier B replenishment has slipped.
        </ChatBubble>
        <ChatBubble align="left">
          What is causing the pressure?
        </ChatBubble>
        <ChatBubble align="right" accent>
          Demand on Product X increased 18% while inbound replenishment from Supplier B moved out by 3 days. Coverage is projected to drop below target in 5 days.
        </ChatBubble>
      </div>
    </div>
  );
}

function MetricPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-[18px] border border-slate-900/8 bg-[#f8fbfd] p-3">
      <div className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className={`mt-2 text-[1.05rem] font-semibold tracking-tight ${tone}`}>{value}</div>
    </div>
  );
}

function NodeBubble({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="rounded-full border border-slate-900/8 bg-white px-4 py-2 text-[0.78rem] font-medium text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        {label}
      </div>
    </div>
  );
}

function ConnectorLine({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-px bg-gradient-to-r from-[hsl(184,73%,61%)]/0 via-[hsl(184,73%,61%)]/55 to-[hsl(184,73%,61%)]/0">
        <div className="absolute -top-1.5 left-[35%] h-3 w-3 rounded-full bg-[hsl(184,73%,61%)] shadow-[0_0_12px_rgba(89,225,217,0.6)] animate-[pulse_2.6s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

function LiveNode({
  label,
  value,
  tone,
  pulse = false,
}: {
  label: string;
  value: string;
  tone: string;
  pulse?: boolean;
}) {
  return (
    <div className={`rounded-[20px] border border-slate-900/8 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.08)] ${pulse ? "animate-[pulse_3s_ease-in-out_infinite]" : ""}`}>
      <div className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className={`mt-2 text-sm font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function AnimatedLink({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-px bg-gradient-to-r from-white/0 via-white/14 to-white/0">
        <div className="absolute -top-1 left-[20%] h-2.5 w-2.5 rounded-full bg-[hsl(184,73%,61%)] shadow-[0_0_12px_rgba(89,225,217,0.7)] animate-[pulse_2.8s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-slate-900/8 bg-[#f8fbfd] px-4 py-3">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${accent} animate-[pulse_2.6s_ease-in-out_infinite]`} />
        <span className="text-sm font-semibold text-slate-950">{value}</span>
      </div>
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

function ChatBubble({
  children,
  align,
  accent = false,
}: {
  children: React.ReactNode;
  align: "left" | "right";
  accent?: boolean;
}) {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-7 ${
          accent
            ? "border border-[hsl(184,73%,61%,0.18)] bg-[hsl(184,73%,61%,0.1)] text-slate-700"
            : "border border-slate-900/8 bg-[#f8fbfd] text-slate-600"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
