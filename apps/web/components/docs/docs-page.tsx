import { ArrowLeft, ArrowRight } from "lucide-react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { WorkInProgress } from "@/components/docs/work-in-progress";
import { docsNav, adjacentPages, findPage } from "@/lib/docs-nav";
import { DOCS_CONTENT, DocContent } from "@/lib/docs-content";
import { cn } from "@/lib/utils";

export function DocsPage({ slug }: { slug: string }) {
  const page = findPage(slug);
  const hasContent = Boolean(DOCS_CONTENT[slug]);
  const content = DOCS_CONTENT[slug] ?? DOCS_CONTENT["the-problem"];
  const { prev, next } = adjacentPages(slug);

  return (
    <div className="flex h-screen overflow-hidden bg-[hsl(214,55%,4%)] text-white">
      <div className="hidden w-[288px] shrink-0 lg:flex lg:flex-col">
        <DocsSidebar activeSlug={slug} />
      </div>

      <main className="flex flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-1 flex-col">
          <div className="sticky top-0 z-10 border-b border-white/8 bg-[hsl(214,55%,4%)]/90 px-8 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[0.75rem] text-white/35">
              <a href="/docs/quick-start" className="hover:text-white/60 transition">
                Docs
              </a>
              <span>/</span>
              <span className="text-white/65">{page?.title ?? "Page"}</span>
            </div>
          </div>

          <div className="flex flex-1 gap-12 px-8 py-10 xl:px-12">
            <article className="min-w-0 max-w-3xl flex-1">
              {hasContent ? (
                <DocRenderer content={content} />
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[hsl(184,73%,61%)]">
                      {findPage(slug)
                        ? docsNav.find((section) =>
                            section.pages.some((entry) => entry.slug === slug)
                          )?.title
                        : "Docs"}
                    </p>
                    <h1
                      className="mt-3 text-4xl font-semibold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-brand)" }}
                    >
                      {page?.title ?? "Coming soon"}
                    </h1>
                    <p className="mt-3 text-sm text-white/40">{page?.description}</p>
                  </div>
                  <WorkInProgress eta="Next release" />
                </>
              )}

              <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/8 pt-8">
                {prev ? (
                  <a
                    href={`/docs/${prev.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-4 text-sm transition hover:border-white/15 hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4 text-white/30 transition group-hover:text-[hsl(184,73%,61%)]" />
                    <div>
                      <div className="text-[0.68rem] uppercase tracking-[0.22em] text-white/30">
                        Previous
                      </div>
                      <div className="mt-0.5 font-medium text-white/70 group-hover:text-white">
                        {prev.title}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div />
                )}
                {next ? (
                  <a
                    href={`/docs/${next.slug}`}
                    className="group ml-auto flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-4 text-right text-sm transition hover:border-white/15 hover:bg-white/5"
                  >
                    <div>
                      <div className="text-[0.68rem] uppercase tracking-[0.22em] text-white/30">
                        Next
                      </div>
                      <div className="mt-0.5 font-medium text-white/70 group-hover:text-white">
                        {next.title}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:text-[hsl(184,73%,61%)]" />
                  </a>
                ) : (
                  <div />
                )}
              </div>
            </article>

            <aside className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-24">
                <div className="mb-3 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/30">
                  <span className="i-lucide-list h-3 w-3" />
                  On this page
                </div>
                <nav className="space-y-1">
                  {content.toc.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.anchor}`}
                      className={cn(
                        "block rounded-lg py-1.5 text-[0.78rem] transition-colors",
                        item.level === 2
                          ? "pl-3 text-white/50 hover:text-white/80"
                          : "pl-6 text-[0.72rem] text-white/30 hover:text-white/60"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function DocRenderer({ content }: { content: DocContent }) {
  return (
    <div>
      <div className="mb-10">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[hsl(184,73%,61%)]">
          {content.section}
        </p>
        <h1
          className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          {content.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-white/50">{content.description}</p>
      </div>

      <div className="space-y-8">
        {content.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </div>
  );
}

type BlockDef =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; items: string[] };

function Block({ block }: { block: BlockDef }) {
  if (block.type === "h2") {
    return (
      <h2
        id={block.id}
        className="scroll-mt-24 pt-4 text-2xl font-semibold tracking-tight text-white"
        style={{ fontFamily: "var(--font-brand)" }}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "h3") {
    return (
      <h3 id={block.id} className="scroll-mt-24 pt-2 text-lg font-semibold text-white/90">
        {block.text}
      </h3>
    );
  }

  if (block.type === "p") {
    return <p className="text-[0.92rem] leading-7 text-white/55">{block.text}</p>;
  }

  if (block.type === "callout") {
    const styles = {
      info: "border-sky-500/25 bg-sky-500/8 text-sky-200",
      warning: "border-amber-500/25 bg-amber-500/8 text-amber-200",
      tip: "border-[hsl(184,73%,61%)]/25 bg-[hsl(184,73%,61%)]/8 text-[hsl(184,73%,61%)]",
    };
    const icons = { info: "ℹ", warning: "⚠", tip: "✦" };
    return (
      <div className={cn("flex gap-3 rounded-2xl border px-5 py-4 text-sm leading-7", styles[block.variant])}>
        <span className="shrink-0 text-base">{icons[block.variant]}</span>
        <span>{block.text}</span>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <div className="flex items-center justify-between border-b border-white/8 bg-white/3 px-4 py-2">
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/30">
            {block.lang}
          </span>
          <button type="button" className="text-[0.7rem] text-white/30 transition hover:text-white/60">
            Copy
          </button>
        </div>
        <pre className="overflow-x-auto bg-[hsl(214,55%,3%)] px-5 py-4 text-[0.82rem] leading-6 text-[hsl(184,73%,61%)]">
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }

  if (block.type === "steps") {
    return (
      <div className="space-y-4">
        {block.items.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[hsl(184,73%,61%)]/30 bg-[hsl(184,73%,61%)]/10 text-xs font-bold text-[hsl(184,73%,61%)]">
              {index + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="text-sm font-semibold text-white">{step.title}</div>
              <p className="mt-1 text-[0.84rem] leading-6 text-white/45">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              {block.headers.map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-white/3">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn("px-5 py-3.5", cellIndex === 0 ? "font-medium text-white/80" : "text-white/45")}
                  >
                    {cell.startsWith("`") ? (
                      <code className="rounded-lg bg-white/6 px-2 py-0.5 font-mono text-[0.78rem] text-[hsl(184,73%,61%)]">
                        {cell.slice(1, -1)}
                      </code>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[0.9rem] leading-6 text-white/50">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(184,73%,61%)]/60" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
