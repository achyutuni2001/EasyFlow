"use client";

import Link from "next/link";

type PublicSiteHeaderProps = {
  variant?: "dark" | "light";
  current?: "landing" | "pitch" | "docs";
};

const repoUrl = "https://github.com/achyutuni2001/EasyFlow";

export function PublicSiteHeader({
  variant = "dark",
  current = "landing",
}: PublicSiteHeaderProps) {
  const isDark = variant === "dark";
  const shellClass = isDark
    ? "border-white/8 bg-slate-950/55 text-white backdrop-blur-md"
    : "border-slate-900/8 bg-white/90 text-slate-950 backdrop-blur-md";
  const mutedClass = isDark ? "text-white/50 hover:text-white/85" : "text-slate-600 hover:text-slate-950";
  const buttonGhostClass = isDark
    ? "border-white/10 bg-white/5 text-white/72 hover:border-white/20 hover:bg-white/10 hover:text-white"
    : "border-slate-900/10 bg-slate-950/[0.03] text-slate-700 hover:border-slate-900/15 hover:bg-slate-950/[0.06] hover:text-slate-950";
  const buttonPrimaryClass = isDark
    ? "bg-[hsl(184,73%,61%)] text-slate-950 hover:brightness-105"
    : "bg-slate-950 text-white hover:bg-slate-800";
  const activeClass = isDark ? "text-white" : "text-slate-950";

  const navItems = [
    { href: "/landing#screens", label: "Features", key: "landing" },
    { href: "/docs/connect-erp", label: "Connectors", key: "docs" },
    { href: "/pitch", label: "Pitch", key: "pitch" },
    { href: "/docs", label: "Docs", key: "docs" },
  ] as const;

  return (
    <header className={`sticky top-0 z-30 border-b px-6 py-4 md:px-10 ${shellClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/landing" className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${isDark ? "border-white/10 bg-white/5" : "border-slate-900/10 bg-slate-950/[0.03]"}`}>
            <span className="brand-wordmark text-[0.95rem]">
              <span>E</span>
              <span>F</span>
            </span>
          </div>
          <span className="brand-wordmark text-[1.5rem]">
            <span>Easy</span>
            <span>Flow</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[0.92rem] font-medium md:flex">
          {navItems.map((item) => {
            const isActive = item.key === current;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${isActive ? activeClass : mutedClass}`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className={`transition ${mutedClass}`}
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/globe"
            className={`rounded-full border px-4 py-2 text-[0.82rem] font-medium transition ${buttonGhostClass}`}
          >
            Open app
          </Link>
          <Link
            href="/login"
            className={`rounded-full px-4 py-2 text-[0.82rem] font-semibold transition ${buttonPrimaryClass}`}
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
