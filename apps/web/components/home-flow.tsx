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
              <div className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <ArrowDown className="h-4 w-4 text-secondary" />
                Flow continues
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
