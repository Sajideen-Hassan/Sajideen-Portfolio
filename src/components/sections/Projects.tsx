"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import CaseStudyIndex from "@/components/sections/CaseStudyIndex";

const EASE = [0.16, 1, 0.3, 1] as const;

const COVERS = [
  { from: "#143d2b", to: "#06231a", accent: "#ccff00" },
  { from: "#1d2a5a", to: "#0a0f2e", accent: "#7da2ff" },
  { from: "#3a2a14", to: "#1c1207", accent: "#ffb84d" },
  { from: "#2e1a3f", to: "#140a1c", accent: "#c084fc" },
  { from: "#0f3a3a", to: "#06201c", accent: "#4ade80" },
  { from: "#3f1d1d", to: "#1a0a0a", accent: "#f87171" },
  { from: "#1a2f4a", to: "#0b1726", accent: "#38bdf8" },
];

function generateCoverSeeds(index: number) {
  const r = (n: number) => (Math.sin((index + 1) * 97.3 + n) * 0.5 + 0.5);
  return {
    circles: {
      x: 10 + r(1) * 25,
      y: 60 + r(2) * 30,
      s: 280 + r(3) * 130,
    },
  };
}

function Cover({ index }: { index: number }) {
  const c = COVERS[index % COVERS.length];
  const g = generateCoverSeeds(index);
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
      />
      {/* soft orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{ left: `${g.circles.x}%`, top: `${g.circles.y}%`, width: g.circles.s, height: g.circles.s, background: `radial-gradient(circle, ${c.accent}33, transparent 70%)` }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{ left: `${g.circles.x + 30}%`, top: `${g.circles.y - 30}%`, width: g.circles.s * 0.7, height: g.circles.s * 0.7, background: `radial-gradient(circle, ${c.accent}22, transparent 70%)` }}
      />
      {/* wireframe blob */}
      <svg className="absolute right-[-4%] top-[10%] h-[70%] w-auto opacity-25" viewBox="0 0 200 160" fill="none" stroke={c.accent} strokeWidth="1.2">
        <path d="M20 140 C 60 60, 140 20, 180 40 C 150 120, 60 160, 20 140 Z" />
        <path d="M70 120 C 90 90, 120 70, 140 80" opacity="0.6" />
        <circle cx="180" cy="40" r="6" fill={c.accent} stroke="none" opacity="0.8" />
      </svg>
      {/* grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black, transparent 92%)",
        }}
      />
      {/* diagonal accent line */}
      <div className="absolute -left-20 top-8 h-[2px] w-[70%] -rotate-6 opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${c.accent})` }} />
    </div>
  );
}

export default function ProjectsSection() {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="projects" className="relative border-t border-border-subtle bg-bg">
      {prefersReduced ? (
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-24 md:px-16 md:pt-32">
          <SectionHeader
            eyebrow="03 // Projects // Selected work"
            title="Selected"
            accent="work."
          />
          <CaseStudyCarousel />
        </div>
      ) : (
        <CaseStudyIndex />
      )}
    </section>
  );
}

function CaseStudyCarousel() {
  const [active, setActive] = useState(0);
  const current = content.projects[active];

  const prev = () => setActive((a) => (a - 1 + content.projects.length) % content.projects.length);
  const next = () => setActive((a) => (a + 1) % content.projects.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
        <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-border-subtle/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/7]"
            >
              <Cover index={active} />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#ccff00]/40 bg-black/40 px-4 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ccff00] backdrop-blur-sm">
                    {current.subtitle}
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/30 px-4 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-text-secondary backdrop-blur-sm">
                    {current.role}
                  </span>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <h2 className="max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                    {current.title}
                  </h2>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-text-secondary">
                    {current.timeline}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Detail spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-detail"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            <div className="col-span-full rounded-3xl border border-border-subtle/70 bg-bg-surface/50 p-7 md:p-9">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ccff00]">Overview</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">{current.overview}</p>
            </div>

            <div className="rounded-3xl border border-border-subtle/70 bg-bg-surface/50 p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-secondary">The challenge</span>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{current.challenge}</p>
            </div>

            <div className="rounded-3xl border border-border-subtle/70 bg-bg-surface/50 p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-secondary">The approach</span>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{current.solution}</p>
            </div>

            <div className="rounded-3xl border border-[#ccff00]/20 bg-[#ccff00]/[0.04] p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ccff00]">Outcome</span>
                <TrendingUp className="h-4 w-4 text-[#ccff00]" />
              </div>
              <p className="mt-4 text-sm leading-7 text-text-primary">{current.results}</p>
            </div>

            <div className="rounded-3xl border border-border-subtle/70 bg-bg-elevated/60 p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-secondary">Stack</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border-subtle bg-bg-surface/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-[#ccff00]/40 hover:text-[#ccff00]">
                    {tag}
                  </span>
                ))}
              </div>
              <dl className="mt-6 space-y-3 border-t border-border-subtle/60 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Role</dt>
                  <dd className="text-right text-sm font-medium text-text-primary">{current.role}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Timeline</dt>
                  <dd className="text-sm font-medium text-text-primary">{current.timeline}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Type</dt>
                  <dd className="text-right text-sm font-medium text-text-primary">{current.subtitle}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-cta"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-3xl border border-border-subtle/60 bg-bg-elevated/30 px-7 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                {String(active + 1).padStart(2, "0")} / {String(content.projects.length).padStart(2, "0")} · {current.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous project"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-[#ccff00]/40 hover:text-[#ccff00]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next project"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-[#ccff00]/40 hover:text-[#ccff00]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project indicator */}
        <div className="mt-12 flex items-center justify-center gap-2.5">
          {content.projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === active ? "w-10 bg-[#ccff00]" : "w-3 bg-border-subtle hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
    </>
  );
}