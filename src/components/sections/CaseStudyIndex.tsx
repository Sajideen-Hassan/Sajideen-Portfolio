"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { content } from "@/data/content";

const DOMAIN_COLORS: Record<string, string> = {
  ai: "#ccff00",
  web: "#7da2ff",
  creative: "#c084fc",
  commerce: "#ffb84d",
  infra: "#4ade80",
};

const DOMAIN_LABELS: Record<string, string> = {
  ai: "AI / ML",
  web: "Web Platform",
  creative: "Creative",
  commerce: "Commerce",
  infra: "Infrastructure",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyIndex() {
  const [open, setOpen] = useState<string | null>(null);
  const projects = content.projects;

  return (
    <div className="relative">
      {/* Full-bleed masthead */}
      <header className="relative overflow-hidden border-b border-border-subtle/60">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-20 md:px-16 md:py-28 lg:flex-row lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]"
            >
              03 // Journey // Career milestones
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl"
            >
              Case studies<span className="text-[#ccff00]">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-7 text-text-secondary"
            >
              The path to on-time delivery — every build unpacked across purpose,
              architecture, and outcomes. Click a chapter to open the file.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="flex items-center gap-10 lg:flex-col lg:items-end lg:gap-3"
          >
            <span className="font-display text-6xl font-bold leading-none text-white">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
              cases · 2023—2024
            </span>
          </motion.div>
        </div>
      </header>

      {/* Editorial index */}
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="border-t border-border-subtle/40">
          {projects.map((project, i) => {
            const color = DOMAIN_COLORS[project.domain] ?? "#ccff00";
            const isOpen = open === project.id;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group relative border-b border-border-subtle/40"
              >
                {/* Hover wash */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${color}12, transparent 60%)`,
                  }}
                />

                <button
                  onClick={() => setOpen(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  className="relative flex w-full cursor-pointer flex-col gap-5 px-2 py-8 text-left md:flex-row md:items-center md:gap-8 md:px-4 md:py-10"
                >
                  <span className="font-mono text-[11px] tracking-[0.24em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#ccff00] sm:text-3xl md:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full border px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
                        style={{
                          color,
                          borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                          backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                        }}
                      >
                        {DOMAIN_LABELS[project.domain] ?? project.domain}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                        {project.role}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden text-right lg:block">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Timeline</span>
                      <span className="mt-1 block text-sm font-medium text-white">{project.timeline}</span>
                    </div>
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <ArrowUpRight className="h-5 w-5 text-text-secondary transition-colors duration-300" style={{ color: isOpen ? color : undefined }} />
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 px-2 pb-10 pt-2 md:grid-cols-12 md:gap-6 md:px-4">
                        {/* About */}
                        <div className="md:col-span-7">
                          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">
                            <span className="h-1 w-1 rounded-full bg-[#ccff00]" />
                            About
                          </span>
                          <p className="mt-4 text-[15px] leading-7 text-text-secondary">
                            {project.overview}
                          </p>
                        </div>

                        {/* Challenge / Solution */}
                        <div className="md:col-span-5">
                          <div>
                            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#ff9900]">
                              <span className="h-1 w-1 rounded-full bg-[#ff9900]" />
                              Challenge
                            </span>
                            <ul className="mt-3 space-y-2">
                              {project.challenge.split(".").filter(Boolean).slice(0, 2).map((point, pi) => (
                                <li key={pi} className="flex gap-2.5 text-sm leading-6 text-text-secondary">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ff9900]" />
                                  {point.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-6">
                            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#ccff00]">
                              <span className="h-1 w-1 rounded-full bg-[#ccff00]" />
                              Solution
                            </span>
                            <ul className="mt-3 space-y-2">
                              {project.solution.split(".").filter(Boolean).slice(0, 2).map((point, pi) => (
                                <li key={pi} className="flex gap-2.5 text-sm leading-6 text-text-secondary">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ccff00]" />
                                  {point.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Outcome + stack */}
                        <div className="md:col-span-12">
                          <div className="grid gap-6 border-t border-border-subtle/40 pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-border-subtle bg-bg-elevated/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-secondary"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-6">
                              <div>
                                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-text-muted">Timeline</span>
                                <span className="mt-1 block text-sm font-semibold text-white">{project.timeline}</span>
                              </div>
                              <div className="h-8 w-px bg-border-subtle" />
                              <div>
                                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-text-muted">Outcome</span>
                                <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold" style={{ color }}>
                                  <Sparkles className="h-3.5 w-3.5" />
                                  Shipped
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Closing note */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted"
        >
          <ArrowDownRight className="h-4 w-4 text-[#ccff00]" />
          Every case shipped end-to-end — select a chapter to read the file.
        </motion.p>
      </div>
    </div>
  );
}