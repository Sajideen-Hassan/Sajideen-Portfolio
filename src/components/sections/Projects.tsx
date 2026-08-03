"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Briefcase, TimerReset } from "lucide-react";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const current = content.projects[activeProject];

  return (
    <ScrollReveal
      id="projects"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="02 // Work // Delivery highlights"
          title="Selected case studies"
          accent="with measurable outcomes"
          description="Projects shaped around coordination clarity, operational rigor, and rapid adaptation."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            {content.projects.map((project, index) => (
              <motion.button
                key={project.id}
                data-reveal
                whileHover={{ scale: 1.01, x: 4 }}
                onClick={() => setActiveProject(index)}
                className={`w-full rounded-2xl border p-5 text-left transition ${activeProject === index ? "border-accent-cyan/40 bg-bg-surface/80" : "border-border-subtle bg-bg-elevated/60 hover:border-accent-cyan/20"}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent-cyan">
                    {project.id}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-secondary">
                    {project.timeline}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {project.subtitle}
                </p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              data-reveal
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <BentoCard className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  {current.tags.map((tag) => (
                    <Badge key={tag} tone="emerald">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
                      Problem
                    </p>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">
                      {current.challenge}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border-subtle bg-bg-surface/70 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Briefcase className="h-4 w-4 text-accent-cyan" /> My role
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">
                      {current.role}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-elevated/70 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
                    Outcome
                  </p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {current.results}
                  </p>
                </div>
              </BentoCard>
              <div className="flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-surface/70 p-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <TimerReset className="h-4 w-4 text-accent-cyan" /> Delivered
                  against tight deadlines with clear coordination.
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("terminal")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan"
                >
                  Request case study <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScrollReveal>
  );
}
