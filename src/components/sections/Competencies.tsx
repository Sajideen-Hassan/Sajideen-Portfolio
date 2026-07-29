"use client";

import React, { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ShieldCheck, Laptop, Database, Cpu } from "lucide-react";

// Spotlight Card component to handle cursor-reactive glow
function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(42, 217, 194, 0.08)" // default to `--data` teal color tint
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-lg border border-border-hairline bg-bg-surface p-6 transition-all duration-300 hover:border-signal/30 ${className}`}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Competencies() {
  const competencies = portfolioData.competencies;

  // Icon mapping helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Project Management":
        return <ShieldCheck className="w-5 h-5 text-signal" />;
      case "Technical Skills":
        return <Laptop className="w-5 h-5 text-data" />;
      case "Databases & Cloud":
        return <Database className="w-5 h-5 text-signal" />;
      case "Tools & Platforms":
        return <Cpu className="w-5 h-5 text-data" />;
      default:
        return <Cpu className="w-5 h-5 text-data" />;
    }
  };

  // Glow color mapping helper
  const getCategoryGlow = (category: string) => {
    return category.includes("Project") || category.includes("Database")
      ? "rgba(255, 122, 51, 0.07)" // Warm orange signal glow
      : "rgba(42, 217, 194, 0.08)"; // Cool data teal glow
  };

  return (
    <section
      id="skills"
      className="py-32 relative bg-bg-void border-t border-border-hairline overflow-hidden"
    >
      <div className="absolute inset-0 console-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-signal tracking-widest">// 04 // CORE_COMPETENCY.MAP</span>
          <h2 className="font-display text-3xl font-extrabold text-text-primary">
            CORE COMPETENCIES
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Box 1: Project Management (Width 7 on desktop, 12 on mobile) */}
          <div className="md:col-span-7">
            <SpotlightCard
              glowColor={getCategoryGlow(competencies[0].category)}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded border border-border-hairline bg-bg-surface-raised">
                    {getCategoryIcon(competencies[0].category)}
                  </div>
                  <h3 className="font-mono text-xs font-bold tracking-widest text-text-primary uppercase">
                    {competencies[0].category}
                  </h3>
                </div>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                  {competencies[0].details}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {competencies[0].skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-border-hairline bg-bg-surface-raised/40 text-data hover:border-signal/30 transition-colors"
                  >
                    {skill.toLowerCase()}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Box 2: Databases & Cloud (Width 5 on desktop, 12 on mobile) */}
          <div className="md:col-span-5">
            <SpotlightCard
              glowColor={getCategoryGlow(competencies[2].category)}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded border border-border-hairline bg-bg-surface-raised">
                    {getCategoryIcon(competencies[2].category)}
                  </div>
                  <h3 className="font-mono text-xs font-bold tracking-widest text-text-primary uppercase">
                    {competencies[2].category}
                  </h3>
                </div>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                  {competencies[2].details}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {competencies[2].skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-border-hairline bg-bg-surface-raised/40 text-data hover:border-signal/30 transition-colors"
                  >
                    {skill.toLowerCase()}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Box 3: Technical Skills (Width 5 on desktop, 12 on mobile) */}
          <div className="md:col-span-5">
            <SpotlightCard
              glowColor={getCategoryGlow(competencies[1].category)}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded border border-border-hairline bg-bg-surface-raised">
                    {getCategoryIcon(competencies[1].category)}
                  </div>
                  <h3 className="font-mono text-xs font-bold tracking-widest text-text-primary uppercase">
                    {competencies[1].category}
                  </h3>
                </div>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                  {competencies[1].details}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {competencies[1].skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-border-hairline bg-bg-surface-raised/40 text-data hover:border-signal/30 transition-colors"
                  >
                    {skill.toLowerCase()}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Box 4: Tools & Platforms (Width 7 on desktop, 12 on mobile) */}
          <div className="md:col-span-7">
            <SpotlightCard
              glowColor={getCategoryGlow(competencies[3].category)}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded border border-border-hairline bg-bg-surface-raised">
                    {getCategoryIcon(competencies[3].category)}
                  </div>
                  <h3 className="font-mono text-xs font-bold tracking-widest text-text-primary uppercase">
                    {competencies[3].category}
                  </h3>
                </div>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                  {competencies[3].details}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {competencies[3].skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-border-hairline bg-bg-surface-raised/40 text-data hover:border-signal/30 transition-colors"
                  >
                    {skill.toLowerCase()}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
