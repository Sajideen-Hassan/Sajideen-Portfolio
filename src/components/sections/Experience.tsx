"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const springX = useSpring(mx, { stiffness: 180, damping: 25 });
  const springY = useSpring(my, { stiffness: 180, damping: 25 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-border-subtle/70 bg-gradient-to-br from-bg-elevated/90 via-bg-surface/70 to-bg-surface/50 p-7 backdrop-blur-md transition-colors duration-500 hover:border-[#ccff00]/30 sm:p-9"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[340px] w-[340px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          left: -170,
          top: -170,
          x: springX,
          y: springY,
          background: "radial-gradient(circle, rgba(204,255,0,0.14) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 0%, black, transparent 90%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#ccff00]/50" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#ccff00]/50" aria-hidden="true" />

      <div className="relative">{children}</div>
    </div>
  );
}

function Comet() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 0.85"],
  });
  const y = useSpring(useTransform(scrollYProgress, (v) => `${v * 100 - 6}%`), { stiffness: 90, damping: 22 });

  return (
    <div ref={ref} className="absolute inset-y-4 left-5 z-20 hidden w-px lg:block" aria-hidden="true">
      <motion.span
        className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-white/8 via-white/8 to-white/8"
      />
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ y }}
      >
        <motion.div
          animate={{ boxShadow: ["0 0 12px rgba(204,255,0,0.8)", "0 0 26px rgba(204,255,0,0.4)", "0 0 12px rgba(204,255,0,0.8)"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-3 w-3 rounded-full bg-[#ccff00]"
        />
      </motion.div>
    </div>
  );
}

function CurrentBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ccff00]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ccff00] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ccff00]" />
      </span>
      Current
    </span>
  );
}

function ExperienceCard({ exp, index }: { exp: (typeof content.experience)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const isCurrent = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="relative lg:grid lg:grid-cols-[130px_1fr] lg:gap-10"
    >
      <div className="mb-4 hidden flex-col lg:flex" aria-hidden="true">
        <span className="bg-gradient-to-b from-[#ccff00] via-[#ccff00]/60 to-[#ccff00]/0 bg-clip-text font-display text-6xl font-bold leading-none text-transparent xl:text-7xl">
          {num}
        </span>
        {isCurrent && <CurrentBadge />}
      </div>

      <div className="mb-4 flex items-center justify-between lg:hidden">
        <span className="font-display text-3xl font-bold text-[#ccff00]/70">{num}</span>
        {isCurrent && <CurrentBadge />}
      </div>

      <SpotlightCard>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#ccff00]">
              {exp.period}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-secondary">
              {exp.company}
            </span>
          </div>
          <motion.button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Hide details" : "Show details"}
            aria-expanded={open}
            className="group/btn flex cursor-pointer items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted transition-all duration-300 hover:border-[#ccff00]/40 hover:text-[#ccff00]"
          >
            {open ? "Hide" : "Details"}
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="block text-[#ccff00]"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.span>
          </motion.button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full cursor-pointer text-left"
        >
          <h3 className="max-w-2xl font-display text-2xl font-semibold leading-snug text-text-primary transition-colors sm:text-[1.75rem]">
            {exp.title}
          </h3>
        </button>

        <div className="mt-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-text-muted">
            Key outcomes
          </p>
          <motion.ul
            initial={false}
            animate={{ height: open ? "auto" : "0px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              {exp.achievements.map((achievement, i) => (
                <motion.li
                  key={achievement}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  className="mb-2.5 flex gap-3 text-sm leading-6 text-text-secondary last:mb-0"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ccff00]" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </div>
          </motion.ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border-subtle/60 pt-5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-subtle bg-bg-elevated/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-colors duration-300 hover:border-[#ccff00]/40 hover:text-[#ccff00]"
            >
              {tag}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <ScrollReveal id="experience" className="relative border-t border-border-subtle bg-bg px-6 py-24 md:px-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            className="mb-0"
            eyebrow="02 // Experience // Roles & outcomes"
            title="Building the product,"
            accent="coordinating the work."
          />
          <div className="flex items-center justify-between gap-6 lg:flex-col lg:items-end">
            <span className="h-px w-10 bg-[#ccff00]/50 lg:hidden" />
            <p className="max-w-xs font-mono text-[11px] leading-6 tracking-[0.14em] text-text-muted">
              Click any role to expand the details.
            </p>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <Comet />
          <div className="space-y-10 lg:space-y-14">
            {content.experience.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}