"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

const pillars = [
  "Cross-functional alignment",
  "Budget and resource discipline",
  "Risk mitigation",
  "Workflow automation",
];

export default function About() {
  return (
    <ScrollReveal
      id="about"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="01 // Philosophy // Delivery mindset"
          title="How I work"
          accent="with calm control"
          description="I blend technical fluency with operational precision to keep teams aligned and delivery predictable."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <BentoCard className="space-y-6" data-reveal>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ccff00]/20 font-semibold text-[#ccff00]">
                SH
              </div>
              <div>
                <p className="font-semibold text-text-primary">
                  {content.personal.name}
                </p>
                <p className="text-sm text-text-secondary">
                  {content.personal.role}
                </p>
              </div>
            </div>
            <p className="text-sm leading-7 text-text-secondary">
              {content.about.manifest}
            </p>
            <div className="flex flex-wrap gap-2">
              {content.about.corePillars.map((pillar) => (
                <Badge key={pillar} tone="cyan">
                  {pillar}
                </Badge>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {content.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border-subtle bg-bg-elevated/70 p-4"
                >
                  <div className="font-display text-2xl font-semibold text-text-primary">
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Cross-functional alignment",
                body: "Coordinate engineering, product, design, and external stakeholders with a single source of truth.",
              },
              {
                title: "Resource & budget discipline",
                body: "Track spend, scope, and staffing trade-offs before they become delivery risks.",
              },
              {
                title: "Risk mitigation",
                body: "Surface dependencies early, reduce blockers, and keep communicate flow crisp during ambiguity.",
              },
              {
                title: "Tooling optimization",
                body: "Set up Jira, Confluence, and automation flows that make teams more effective without extra overhead.",
              },
            ].map((item) => (
              <BentoCard key={item.title} className="space-y-3" data-reveal>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <Badge tone="emerald">Active</Badge>
                </div>
                <p className="text-sm leading-7 text-text-secondary">
                  {item.body}
                </p>
              </BentoCard>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
