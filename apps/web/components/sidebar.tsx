"use client";

import { Boxes, LayoutDashboard, TrendingUp, Waypoints, X, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/globe", label: "Globe", icon: Boxes },
  { href: "/dashboard", label: "Operations", icon: LayoutDashboard },
  { href: "/workflows", label: "Business Processes", icon: Waypoints },
  { href: "/forecasting", label: "Forecasting", icon: TrendingUp },
  { href: "/settings", label: "Integrations", icon: Zap },
];

type SidebarProps = {
  activeHref: string;
  collapsed?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({
  activeHref,
  collapsed = false,
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const tenantQuery = searchParams?.get("tenant");
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-slate-950/82 py-6 backdrop-blur-2xl transition-all duration-300 md:static md:z-0 md:min-h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "md:w-[64px] md:px-2 w-[296px] px-5" : "w-[296px] px-5"
        )}
      >
        <div className={cn("mb-8", collapsed && "md:mb-6")}>
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="text-[0.72rem] uppercase tracking-[0.28em] text-secondary">
              Navigation
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop collapsed → "EF" monogram */}
          <div className={cn("hidden", collapsed && "md:flex md:items-center md:justify-center md:py-1")}>
            <div className="brand-wordmark flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-[1.05rem] leading-none">
              <span className="text-white">E</span><span className="text-secondary italic">F</span>
            </div>
          </div>

          {/* Desktop expanded + mobile → full wordmark */}
          <div className={cn(collapsed && "md:hidden")}>
            <div className="text-[0.68rem] uppercase tracking-[0.32em] text-secondary/90">
              Supply Chain Operations
            </div>
            <h2 className="brand-wordmark mt-3 text-[2.75rem]">
              <span>Easy</span><span>Flow</span>
            </h2>
            <p className="mt-3 max-w-xs text-[0.95rem] leading-7 text-muted-foreground hidden md:block">
              Run approvals, replenishment, warehouse work, and shipment follow-up from one place.
            </p>
          </div>
        </div>

        <nav className="grid gap-1.5">
          {navItems.map((item) => {
            const hrefWithTenant = tenantQuery && item.href !== "/globe"
              ? `${item.href}?tenant=${encodeURIComponent(tenantQuery)}`
              : item.href;
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={hrefWithTenant}
                title={item.label}
                className={cn(
                  "flex items-center rounded-2xl border text-sm font-medium transition-colors",
                  collapsed
                    ? "md:justify-center md:px-0 md:py-3 gap-3 px-4 py-3"
                    : "gap-3 px-4 py-3",
                  isActive
                    ? "border-white/10 bg-white/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className={cn(collapsed && "md:hidden")}>{item.label}</span>
              </a>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
