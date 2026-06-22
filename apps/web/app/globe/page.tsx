"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import { GlobeHero } from "../../components/globe-hero";
import { tenantSeeds } from "@/lib/tenant-seeds";

// 3 phases:
// "idle"         → full-screen globe hero
// "entering"     → globe zooms toward camera, blurs out
// "entered"      → dark platform background + cards
type Phase = "idle" | "entering" | "entered";

export default function GlobePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const searchParams = useSearchParams();
  const tenantQuery  = searchParams?.get("tenant") || undefined;

  const companies = useMemo(
    () => tenantSeeds.map((t) => ({ ...t, slug: t.name.toLowerCase().replace(/\s+/g, "-") })),
    []
  );

  function handleEnter() {
    setPhase("entering");
    setTimeout(() => setPhase("entered"), 550); // after globe zoom finishes
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* ══ GLOBE LAYER ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        animate={
          phase === "entering" ? { scale: 1.55, opacity: 0, filter: "blur(24px)" } :
          phase === "entered"  ? { scale: 1.55, opacity: 0, filter: "blur(24px)" } :
                                 { scale: 1,    opacity: 1, filter: "blur(0px)"  }
        }
        transition={{ duration: 0.52, ease: [0.4, 0, 0.9, 1] }}
      >
        <GlobeHero tenant={tenantQuery} onEnter={handleEnter} />
      </motion.div>

      {/* ══ PLATFORM BACKGROUND — expands from centre when entering ══════════ */}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.72, borderRadius: "50%" }}
            animate={{ opacity: 1, scale: 1,    borderRadius: "0%"  }}
            exit={{    opacity: 0, scale: 0.72, borderRadius: "50%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            style={{
              background:
                "radial-gradient(circle at top left,  rgba(89,225,217,0.14), transparent 28%)," +
                "radial-gradient(circle at bottom right, rgba(255,154,90,0.12), transparent 26%)," +
                "linear-gradient(180deg, hsl(214,55%,5%) 0%, hsl(216,45%,6%) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ══ CARDS LAYER ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "entered" && (
          <motion.div
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.3 }}
          >
            <div className="mx-auto flex min-h-full max-w-5xl flex-col items-center px-6 pt-14 pb-20">

              {/* Header */}
              <motion.div
                className="mb-10 text-center"
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0,   filter: "blur(0px)" }}
                transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.36em] text-[hsl(184,73%,61%)]">
                  <Globe2 className="h-3 w-3" />
                  Tenant Workspaces
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Select a company
                </h2>
                <p className="mt-2 text-sm text-white/45">
                  Each tenant has its own isolated supply chain environment.
                </p>
              </motion.div>

              {/* Cards — materialise from centre outward */}
              <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {companies.map((tenant, i) => {
                  // Distance from centre card (index 2) for radial stagger
                  const distFromCentre = Math.abs(i - (companies.length - 1) / 2);
                  return (
                    <motion.div
                      key={tenant.name}
                      initial={{ opacity: 0, y: 36, scale: 0.88, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)"  }}
                      transition={{
                        delay:     0.42 + distFromCentre * 0.07,
                        duration:  0.55,
                        ease:      [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -5, scale: 1.025 }}
                      whileTap={{   scale: 0.97 }}
                    >
                      <Link
                        href={`/globe/tenant/${tenant.slug}`}
                        className="group block rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-white/22 hover:bg-white/[0.09]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[hsl(184,73%,61%)]">
                              {tenant.mode}
                            </div>
                            <h3 className="mt-2 text-base font-semibold tracking-tight text-white truncate">
                              {tenant.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-white/45">{tenant.headquarters}</p>
                          </div>
                          <motion.div
                            className="mt-1 shrink-0"
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <ArrowRight className="h-4 w-4 text-[hsl(184,73%,61%)]" />
                          </motion.div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-[0.65rem] uppercase tracking-[0.22em] text-[hsl(184,73%,61%)]">
                          {tenant.industry}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Back to globe */}
              <motion.button
                className="mt-10 text-xs text-white/30 transition hover:text-white/60"
                onClick={() => setPhase("idle")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                ← Back to globe
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
