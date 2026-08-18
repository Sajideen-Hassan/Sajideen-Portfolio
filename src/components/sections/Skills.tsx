"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = ["#ccff00", "#7da2ff", "#38bdf8", "#4ade80", "#c084fc", "#ffb84d"];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-border-subtle bg-bg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ccff00, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
        <SectionHeader
          eyebrow="04 // Capabilities // Dev stack & tools"
          title="Core capabilities"
          accent="across development and coordination"
          description="Six groups, one list. The tools I reach for daily, in plain text."
        />

        <ul className="mt-10 md:mt-14">
          {content.skills.map((group, i) => (
            <motion.li
              key={group.category}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
              className="group relative border-t border-border-subtle last:border-b"
            >
              <div className="grid gap-1.5 py-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-4">
                <div className="flex items-baseline gap-4 md:gap-5">
                  <span
                    className="w-7 shrink-0 font-mono text-[11px] tabular-nums"
                    style={{ color: ACCENTS[i % ACCENTS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover:text-[#ccff00] md:text-xl">
                    {group.category}
                  </h3>
                </div>
                <p className="pl-11 font-mono text-[11px] leading-5 tracking-[0.02em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary md:pl-0 md:text-right md:text-xs">
                  {group.items.join("  ·  ")}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
