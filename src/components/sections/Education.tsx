"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { content } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const STOPS = [
  { x: 30, y: 15, side: "right", accent: "#38bdf8" },
  { x: 72, y: 50, side: "left", accent: "#c084fc" },
  { x: 30, y: 85, side: "right", accent: "#ccff00" },
] as const;

function shortLabel(degree: string): string {
  if (degree.includes("Bachelor")) return "Software Engineering";
  if (degree.includes("ICS")) return "Intermediate · ICS";
  return "Matriculation · CS";
}

function shortType(degree: string): string {
  if (degree.includes("Bachelor")) return "University";
  if (degree.includes("ICS")) return "Intermediate";
  return "Matriculation";
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.9"],
  });

  if (!content.education.length) return null;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border-subtle bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
        {/* header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]">
              <GraduationCap className="h-4 w-4" />
              05 // Foundation
            </span>
            <h2 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
              Education
              <span className="text-[#ccff00]">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-text-secondary">
            Three chapters on the way to a systems mindset.
          </p>
        </div>

        {/* map stage */}
        <div className="relative mt-6 min-h-[1000px] md:min-h-[1100px]">
          {/* route svg */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="eduRoute" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#ccff00" />
              </linearGradient>
            </defs>

            {/* faint full route */}
            <path
              d="M30 15 C 62 15, 62 30, 72 50 C 82 70, 40 70, 30 85"
              vectorEffect="non-scaling-stroke"
              className="stroke-white/10"
              strokeWidth="1.5"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />

            {/* scroll-drawn route */}
            <motion.path
              d="M30 15 C 62 15, 62 30, 72 50 C 82 70, 40 70, 30 85"
              vectorEffect="non-scaling-stroke"
              stroke="url(#eduRoute)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* stops */}
          {content.education.map((edu, i) => {
            const stop = STOPS[i % STOPS.length];

            return (
              <div
                key={i}
                className="absolute"
                style={{ left: `${stop.x}%`, top: `${stop.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* node marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="relative z-10 flex h-8 w-8 items-center justify-center"
                >
                  {/* pulse ring */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-full opacity-30"
                    style={{ background: `${stop.accent}55`, animationDuration: "2.5s" }}
                  />
                  <span
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: stop.accent,
                      background: "#0a0b0e",
                      color: stop.accent,
                      boxShadow: `0 0 20px ${stop.accent}66`,
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* stop cards */}
          {content.education.map((edu, i) => {
            const stop = STOPS[i % STOPS.length];
            const cardLeft = stop.side === "right";

            return (
              <motion.div
                key={`card-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                className="absolute z-0 w-[46%] max-w-md md:w-[34%]"
                style={{
                  left: cardLeft ? `${stop.x + 7}%` : undefined,
                  right: cardLeft ? undefined : `${100 - stop.x + 7}%`,
                  top: `${stop.y}%`,
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  className="group rounded-2xl border bg-bg-surface/70 p-6 backdrop-blur transition-colors duration-300"
                  style={{ borderColor: `${stop.accent}30` }}
                >
                  {/* accent rule */}
                  <div
                    className="h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-100"
                    style={{
                      background: `linear-gradient(90deg, ${stop.accent}90, transparent)`,
                    }}
                  />

                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-[#ccff00] md:text-3xl">
                    {shortLabel(edu.degree)}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {edu.institution}
                  </p>

                  {/* years below */}
                  <div className="mt-5 flex items-center justify-between border-t border-border-subtle/60 pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                      {shortType(edu.degree)}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {edu.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}