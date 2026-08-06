"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ABOUT_STATEMENT =
  "Sajideen Hassan is a technical project manager and AI product builder who turns complex, ambiguous ideas into shipped digital products. He blends engineering fluency with calm, cross-functional coordination across sprint planning, risk, and delivery. His domain spans developers, design, product, and stakeholders, unified around a single source of truth. He leads AI-powered roadmaps and agile delivery that stay on time and on budget. With $45M+ in budgets managed and 10+ years of delivery, he keeps even the hardest builds predictable.";

export default function About() {
  return (
    <ScrollReveal
      id="about"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="01 // About Me"
          title="Engineer the plan."
          accent="Ship the outcome."
          description="Beyond the title, this is who I am — a coordinator who speaks both engineering and execution."
        />

        <div
          data-reveal
          className="max-w-4xl border-l border-[#ccff00]/25 pl-6"
        >
          <p className="text-sm font-normal leading-relaxed text-[#94a3b8]">
            {ABOUT_STATEMENT}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
