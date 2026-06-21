import { ArrowDown, BellRing, Boxes, CheckCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Need Detected",
    copy: "Low stock or a blocked shipment kicks off the next action automatically.",
    icon: Boxes,
    tone: "text-secondary",
  },
  {
    title: "Approval Routed",
    copy: "The right manager gets the request with deadlines, ownership, and context attached.",
    icon: CheckCheck,
    tone: "text-primary",
  },
  {
    title: "Supplier Confirmed",
    copy: "Teams align on vendor, quantity, and expected handoff without back-and-forth calls.",
    icon: Truck,
    tone: "text-accent",
  },
  {
    title: "Teams Notified",
    copy: "Warehouse and logistics stay synced as the workflow moves toward receipt or dispatch.",
    icon: BellRing,
    tone: "text-secondary",
  },
];

export function HomeFlow() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-6 top-8 hidden w-px md:block md:h-[78%] flow-beam" />
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            <Card className="rounded-[26px] border-white/10 bg-slate-950/50">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <step.icon className={`h-5 w-5 ${step.tone}`} />
                  </div>
                  <div className="flex-1">
                    <Badge variant="default" className="w-fit border-white/10 bg-white/5 text-foreground">
                      Step {index + 1}
                    </Badge>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {index < steps.length - 1 ? (
              <div className="flex flex-col items-center py-1">
                <div className="h-5 w-px bg-gradient-to-b from-[hsl(184,73%,61%)]/60 to-[hsl(184,73%,61%)]/20" />
                <div className="flex items-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(184,73%,61%)]/30" />
                  <ArrowDown className="h-4 w-4 text-[hsl(184,73%,61%)]" strokeWidth={2.5} />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(184,73%,61%)]/30" />
                </div>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/25">Flow continues</span>
                <div className="h-5 w-px bg-gradient-to-b from-[hsl(184,73%,61%)]/20 to-transparent" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
