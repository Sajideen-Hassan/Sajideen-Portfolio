"use client";

import { motion } from "framer-motion";
import { Calendar, Award, ExternalLink, CheckCircle2, Sparkles, Star } from "lucide-react";
import { content } from "@/data/content";
import { Table, GitBranch, Bot, Code, Layers, Cloud } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Table,
  GitBranch,
  Bot,
  Code,
  Layers,
  Cloud,
};

type Cert = typeof content.certifications[0];

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const Icon = ICON_MAP[cert.icon] || Award;
  const accent = cert.platformColor;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border bg-bg-surface/50 p-6 transition-all duration-500 hover:border-transparent hover:shadow-[0_30px_60px_-20px_rgba(255,255,255,0.05)]"
      style={{ borderColor: `${accent}30` }}
    >
      {/* ambient glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at top center, ${accent}22, transparent 60%)` }}
      />

      {/* top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40)` }}
      />

      {/* platform badge */}
      <div className="relative z-10 mb-5 flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: `${accent}15`, color: accent }}
        >
          <Icon className="h-5.5 w-5.5" />
        </span>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}>
            {cert.platform}
          </span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
            {cert.period}
          </span>
        </div>
        <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }} />
      </div>

      {/* title */}
      <h3 className="relative z-10 font-display text-lg font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#ccff00]">
        {cert.title}
      </h3>

      {/* issuer */}
      <p className="relative z-10 mt-2.5 text-sm text-text-secondary">
        {cert.issuer}
      </p>

      {/* bottom actions */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-border-subtle/50 pt-4">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          <CheckCircle2 className="h-3.5 w-3.5" style={{ color: accent }} />
          Verified
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-medium transition-all duration-300"
          style={{ borderColor: `${accent}40`, color: accent }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = `${accent}15`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.background = "transparent"; }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View
        </motion.button>
      </div>

      {/* corner accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-60"
        style={{ color: accent }}
      >
        <Sparkles className="h-4 w-4" />
      </div>
    </motion.article>
  );
}

export default function Certifications() {
  const certs = content.certifications;

  if (!certs.length) return null;

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border-subtle bg-bg"
    >
      {/* ambient platform glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0056D2, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF9900, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #10B981, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-1/3 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
        {/* header */}
        <div className="mb-16 relative z-10 max-w-3xl">
          <span className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]">
            <Award className="h-4 w-4" />
            06 // Credentials // Continuous learning
          </span>
          <h2 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
            Certifications
            <span className="text-[#ccff00]">.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            A curated stack of verified credentials across cloud, AI, full-stack
            development, and data — each from a recognized platform.
          </p>
        </div>

        {/* stats bar */}
        <div className="mb-12 relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/60 pb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" style={{ color: "#ffb84d" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {certs.length} certificates
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "#c084fc" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {new Set(certs.map(c => c.platform)).size} platforms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" style={{ color: "#38bdf8" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                100% verified
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Updated 2025
          </span>
        </div>

        {/* responsive masonry grid */}
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,1fr)]">
          {certs.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* footer tagline */}
        <div className="mt-16 relative z-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted">
            Always learning. Always building.
          </p>
        </div>
      </div>
    </section>
  );
}