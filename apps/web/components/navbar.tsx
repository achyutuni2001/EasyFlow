"use client";

import { Bell, ChevronsLeftRight, Menu, Moon, Search, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type NavbarProps = {
  title: string;
  subtitle: string;
  onMenuToggle: () => void;
  onSidebarCollapse: () => void;
};

export function Navbar({ title, subtitle, onMenuToggle, onSidebarCollapse }: NavbarProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-2 px-4 py-1.5 md:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onSidebarCollapse}
            className="hidden h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground md:inline-flex"
          >
            <ChevronsLeftRight className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <div className="truncate text-[0.9rem] font-medium tracking-tight">{title}</div>
            <div className="hidden truncate text-[0.76rem] text-muted-foreground xl:block">{subtitle}</div>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-6 xl:flex">
          <div className="flex w-full max-w-lg items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[0.82rem] text-muted-foreground">
            <Search className="h-3 w-3" />
            Search workflows, suppliers, warehouses, or orders
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground"
          >
            <Bell className="h-3 w-3" />
          </button>
          <Button variant="outline" size="sm" className="h-8 rounded-xl px-3 text-[0.74rem]">
            AI Copilot
          </Button>
        </div>
      </div>
    </header>
  );
}
