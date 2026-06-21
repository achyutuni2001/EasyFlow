"use client";

import { useState } from "react";
import { Search, ChevronDown, Github, ExternalLink } from "lucide-react";
import { docsNav } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";
import { LogoWordmark } from "@/components/logo-wordmark";

export function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = search.trim()
    ? docsNav.map((section) => ({
        ...section,
        pages: section.pages.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((s) => s.pages.length > 0)
    : docsNav;

  function toggleSection(title: string) {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <aside className="flex h-full flex-col overflow-hidden border-r border-white/8 bg-[hsl(214,55%,3%)]">
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <a href="/" className="flex items-center">
          <LogoWordmark className="h-9 w-[180px]" />
        </a>
        <button type="button" className="text-white/25 hover:text-white/50 transition">
          <ChevronDown className="h-4 w-4 rotate-90" />
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/40 focus-within:border-[hsl(184,73%,61%)]/40 focus-within:bg-white/7 transition">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search docs…"
            className="flex-1 bg-transparent text-white/70 outline-none placeholder:text-white/30 text-[0.82rem]"
          />
          <div className="hidden items-center gap-1 sm:flex">
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.62rem] text-white/30">⌘</kbd>
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.62rem] text-white/30">K</kbd>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">

        {/* Quick link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2 text-[0.8rem] text-white/35 transition hover:bg-white/5 hover:text-white/65"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
          <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
        </a>

        {/* Sections */}
        {filtered.map((section) => {
          const isOpen = !collapsed[section.title];
          return (
            <div key={section.title} className="mb-3">
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/35 hover:text-white/55 transition"
              >
                {section.title}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen ? "rotate-0" : "-rotate-90")} />
              </button>

              {isOpen && (
                <div className="mt-0.5 space-y-0.5">
                  {section.pages.map((page) => {
                    const isActive = page.slug === activeSlug;
                    return (
                      <a
                        key={page.slug}
                        href={`/docs/${page.slug}`}
                        className={cn(
                          "flex items-center rounded-xl px-3 py-2 text-[0.82rem] transition-colors",
                          isActive
                            ? "border-l-2 border-[hsl(184,73%,61%)] bg-[hsl(184,73%,61%)]/8 pl-[10px] text-[hsl(184,73%,61%)] font-medium"
                            : "text-white/45 hover:bg-white/5 hover:text-white/75"
                        )}
                      >
                        {page.title}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/8 px-5 py-3 flex items-center justify-between">
        <a href="/" className="text-[0.7rem] text-white/25 hover:text-white/50 transition">
          ← Back to app
        </a>
        <a href="https://github.com" className="text-white/20 hover:text-white/45 transition">
          <Github className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
