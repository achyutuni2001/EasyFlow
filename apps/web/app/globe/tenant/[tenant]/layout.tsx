"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Package,
  Route,
  Search,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TenantCopilot } from "@/components/tenant-copilot";
import { LogoWordmark } from "@/components/logo-wordmark";
import { LogoMark } from "@/components/logo-mark";

const tenantModules = [
  { href: "",                     label: "Dashboard",                 icon: LayoutDashboard, absolute: false },
  { href: "/canvas",              label: "Canvas",                    icon: Workflow,        absolute: false },
  { href: "/inventory",           label: "Inventory",                 icon: Package,         absolute: false },
  { href: "/logistics",           label: "Logistics",                 icon: Truck,           absolute: false },
  { href: "/suppliers",           label: "Suppliers",                 icon: BarChart3,       absolute: false },
  { href: "/users",               label: "Users",                     icon: Users,           absolute: false },
  { href: "/automation",          label: "Automation & Integration",  icon: Zap,             absolute: false },
  { href: "/logistic-management", label: "Logistic Management",       icon: Route,           absolute: false },
  { href: `/forecasting`,         label: "Forecasting",               icon: TrendingUp,      absolute: true  },
];

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const base = `/globe/tenant/${params.tenant}`;
  const tenantName = decodeURIComponent(params.tenant).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  // Persist active tenant so global pages (forecasting, etc.) can scope to it
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("easyflow-active-tenant", params.tenant);
    }
  }, [params.tenant]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm transition md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card backdrop-blur-2xl transition-all duration-300",
            "md:static md:z-0 md:translate-x-0 md:min-h-screen",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
            collapsed ? "md:w-[64px]" : "w-[260px]"
          )}
        >
          {/* Logo */}
          <div className={cn("flex items-center justify-between border-b border-border", collapsed ? "px-2 py-4 justify-center" : "px-5 py-5")}>
            {!collapsed && (
              <Link href="/globe" className="flex items-center text-sm font-semibold text-foreground hover:text-secondary transition">
                <LogoWordmark className="h-14 w-[200px]" />
              </Link>
            )}
            {collapsed && (
              <Link href="/globe" className="flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-secondary/10">
                  <LogoMark className="h-5 w-5" />
                </div>
              </Link>
            )}
            <button onClick={() => setMobileOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tenant label */}
          {!collapsed && (
            <div className="px-5 py-4 border-b border-border">
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-secondary/80 mb-1">Tenant</div>
              <div className="text-sm font-semibold text-foreground truncate">
                {decodeURIComponent(params.tenant).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </div>
            </div>
          )}

          {/* Module nav */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-hide">
            {tenantModules.map((item) => {
              const href = item.absolute ? `${item.href}?tenant=${params.tenant}` : `${base}${item.href}`;
              const isActive = item.href === "" ? pathname === base || pathname === `${base}/` : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={item.href}
                  href={href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-2xl px-3 py-3 text-sm font-medium transition-colors border",
                    collapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-secondary/15 border-secondary/25 text-secondary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to tenants + collapse */}
          <div className="px-2 py-3 border-t border-border space-y-1">
            {!collapsed && (
              <Link
                href="/globe"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-xs text-muted-foreground/60 hover:text-muted-foreground transition"
              >
                ← All Tenants
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCollapsed(c => !c)}
              className={cn(
                "hidden md:flex items-center rounded-2xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition w-full border border-transparent",
                collapsed ? "justify-center" : "gap-3"
              )}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4 shrink-0" /> : <><ChevronLeft className="h-4 w-4 shrink-0" /><span>Collapse</span></>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top navbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-card/80 backdrop-blur-2xl px-4 py-2 md:px-6">
            {/* Left: menu toggle + title */}
            <div className="flex min-w-0 items-center gap-2.5">
              <button onClick={() => setMobileOpen(true)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground md:hidden">
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0 hidden md:block">
                <div className="text-[0.9rem] font-medium tracking-tight text-foreground truncate">
                  {decodeURIComponent(params.tenant).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </div>
              </div>
            </div>

            {/* Centre: search */}
            <div className="flex flex-1 justify-center px-4 xl:px-8">
              <div className="flex w-full max-w-lg items-center gap-2.5 rounded-xl border border-border bg-muted px-3 py-2 text-[0.82rem] text-muted-foreground">
                <Search className="h-3 w-3 shrink-0" />
                <span className="truncate">Search inventory, shipments, suppliers…</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
                <Bell className="h-3 w-3" />
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
        </div>
      </div>
      <TenantCopilot tenantSlug={params.tenant} tenantName={tenantName} />
    </div>
  );
}
