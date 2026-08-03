"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Experience() {
  return (
    <ScrollReveal
      id="experience"
      className="border-t border-border-subtle bg-bg-surface/40 px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="03 // Journey // Career milestones"
          title="Experience"
          accent="across delivery and coordination"
          description="A progression shaped by technical depth, sprint discipline, and stakeholder trust."
        />

        <div className="space-y-4">
          {content.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              data-reveal
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <BentoCard className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <Badge tone="cyan">{exp.period}</Badge>
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-secondary">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {exp.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-text-secondary">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-[220px]">
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} tone="indigo">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
