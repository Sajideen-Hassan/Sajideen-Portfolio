"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Skills() {
  const [query, setQuery] = useState("");

  const filteredSkills = useMemo(() => {
    const normalized = query.toLowerCase();
    return content.skills.filter(
      (group) =>
        group.category.toLowerCase().includes(normalized) ||
        group.items.some((item) => item.toLowerCase().includes(normalized)),
    );
  }, [query]);

  return (
    <ScrollReveal
      id="skills"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="04 // Capabilities // Searchable matrix"
          title="Core capabilities"
          accent="across delivery, tooling, and leadership"
          description="Search by skill or methodology to explore the coordination toolkit."
        />

        <motion.div
          data-reveal
          className="mb-8 rounded-2xl border border-border-subtle bg-bg-surface/70 p-4"
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills, e.g. Jira, budgeting, Scrum"
            className="w-full bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((group, index) => (
            <motion.div
              key={group.category}
              data-reveal
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <BentoCard className="h-full">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-text-primary">
                    {group.category}
                  </h3>
                  <Badge tone="indigo">{group.items.length}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border-subtle bg-bg-elevated/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
