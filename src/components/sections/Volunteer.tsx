"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";

export default function Volunteer() {
  if (!content.volunteer.length) return null;

  return (
    <section
      id="volunteer"
      className="border-t border-border-subtle bg-bg-surface/40 px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="07 // Community // Leadership impact"
          title="Volunteer leadership"
          accent="at scale"
          description="Community and mentoring work that reinforces the same skills used in delivery teams."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.volunteer.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <BentoCard className="h-full">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-accent-cyan">
                  {entry.organization}
                </p>
                <h3 className="text-lg font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  {entry.period}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-text-secondary">
                  {entry.impact.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
