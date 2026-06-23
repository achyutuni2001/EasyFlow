"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Menu,
  Moon,
  Package,
  Route,
  Search,
  Sun,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { TenantCopilot } from "@/components/tenant-copilot";
import { LogoWordmark } from "@/components/logo-wordmark";

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
  const { theme, toggle } = useTheme();
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
            "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border bg-card backdrop-blur-2xl transition-transform duration-300",
            "md:static md:z-0 md:translate-x-0 md:min-h-screen",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-border">
            <Link href="/globe" className="flex items-center text-sm font-semibold text-foreground hover:text-secondary transition">
              <LogoWordmark className="h-14 w-[240px]" lightSurface={theme === "light"} />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tenant label */}
          <div className="px-5 py-4 border-b border-border">
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-secondary/80 mb-1">Tenant</div>
            <div className="text-sm font-semibold text-foreground truncate">
              {decodeURIComponent(params.tenant).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </div>
          </div>

          {/* Module nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {tenantModules.map((item) => {
              const href = item.absolute ? `${item.href}?tenant=${params.tenant}` : `${base}${item.href}`;
              const isActive = item.href === "" ? pathname === base || pathname === `${base}/` : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary/15 border border-secondary/25 text-secondary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to tenants */}
          <div className="px-3 py-3 border-t border-border">
            <Link
              href="/globe"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-xs text-muted-foreground/60 hover:text-muted-foreground transition"
            >
              ← All Tenants
            </Link>
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

            {/* Right: theme toggle + bell */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggle}
                title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
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
