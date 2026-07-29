"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase, ChevronRight, ToggleLeft, ToggleRight, Radio } from "lucide-react";

export default function Journey() {
  const [viewMode, setViewMode] = useState<"vertical" | "radial">("vertical");
  const [selectedRadialIndex, setSelectedRadialIndex] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = portfolioData.experiences;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || viewMode !== "vertical") return;

    const ctx = gsap.context(() => {
      // Progress line fill animation
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 30%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // Card activation animations
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        const dot = card.querySelector(".timeline-dot");
        const border = card.querySelector(".timeline-border");
        const codeText = card.querySelector(".timeline-code");

        // Create ScrollTrigger to highlight active node as line reaches it
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              card.classList.add("text-active");
              dot?.classList.add("bg-signal", "border-signal");
              dot?.classList.remove("bg-bg-surface-raised", "border-border-hairline");
              border?.classList.add("border-signal/50", "bg-bg-surface-raised");
              border?.classList.remove("border-border-hairline", "bg-bg-surface");
              codeText?.classList.add("text-data");
              codeText?.classList.remove("text-text-secondary/50");
            },
            onLeaveBack: () => {
              card.classList.remove("text-active");
              dot?.classList.remove("bg-signal", "border-signal");
              dot?.classList.add("bg-bg-surface-raised", "border-border-hairline");
              border?.classList.remove("border-signal/50", "bg-bg-surface-raised");
              border?.classList.add("border-border-hairline", "bg-bg-surface");
              codeText?.classList.remove("text-data");
              codeText?.classList.add("text-text-secondary/50");
            }
          }
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [viewMode, experiences.length]);

  return (
    <section
      id="journey"
      ref={triggerRef}
      className="py-32 relative bg-bg-void border-t border-border-hairline overflow-hidden"
    >
      <div className="absolute inset-0 console-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Journey Header with View Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-signal tracking-widest">// 03 // PROFESSIONAL_PATH.SYS</span>
            <h2 className="font-display text-3xl font-extrabold text-text-primary">
              JOURNEY CHRONOLOGIES
            </h2>
          </div>

          {/* Console View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "vertical" ? "radial" : "vertical")}
            className="flex items-center gap-3 px-4 py-2 rounded border border-border-hairline bg-bg-surface hover:border-signal/40 transition-colors font-mono text-xs tracking-wider text-text-secondary hover:text-text-primary focus:outline-none"
          >
            <span>VIEW_MODE:</span>
            <span className="text-signal font-bold uppercase">{viewMode}</span>
            {viewMode === "vertical" ? (
              <ToggleLeft className="w-5 h-5 text-text-secondary" />
            ) : (
              <ToggleRight className="w-5 h-5 text-signal" />
            )}
          </button>
        </div>

        {/* View Mode 1: Chronological Stack (Vertical Timeline) */}
        {viewMode === "vertical" && (
          <div className="relative pl-8 md:pl-16 max-w-4xl mx-auto">
            {/* Timeline base track line */}
            <div className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-border-hairline origin-top" />
            
            {/* Timeline progress line (Animated by GSAP ScrollTrigger) */}
            <div
              ref={progressBarRef}
              className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-signal origin-top scale-y-0"
            />

            {/* Experiences lists */}
            <div className="flex flex-col gap-16">
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="relative group transition-opacity duration-300"
                >
                  {/* Timeline Node Dot */}
                  <span className="timeline-dot absolute -left-8 md:-left-16 top-1.5 -translate-x-[7px] w-4 h-4 rounded-full border-2 border-border-hairline bg-bg-surface-raised transition-all duration-300 z-10 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-bg-void" />
                  </span>

                  {/* Card Content container */}
                  <div className="timeline-border p-6 rounded-lg border border-border-hairline bg-bg-surface transition-all duration-300 flex flex-col gap-4">
                    
                    {/* Header: Title & Company & Date */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="timeline-code font-mono text-[10px] text-text-secondary/50 uppercase tracking-widest mb-1 transition-colors">
                          NODE_0{idx + 1} // {exp.company.toUpperCase()}
                        </span>
                        <h3 className="font-display text-lg font-bold text-text-primary group-[.text-active]:text-signal transition-colors">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-2.5 items-start">
                          <ChevronRight className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Chips */}
                    {exp.techStack && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-hairline/30">
                        <span className="font-mono text-[10px] text-text-secondary uppercase">MODULES:</span>
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-hairline bg-bg-surface-raised text-data"
                          >
                            {tech.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Mode 2: Orbital System (Radial Dashboard) */}
        {viewMode === "radial" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
            {/* Left: Orbital Visual Module */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-12">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-border-hairline/30 flex items-center justify-center">
                
                {/* Outermost rotating orbit */}
                <div className="absolute inset-0 rounded-full border border-dashed border-border-hairline/40 animate-spin duration-[24s]" />
                
                {/* Middle dashed orbit */}
                <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-border-hairline/50 animate-spin duration-[16s]" style={{ animationDirection: "reverse" }} />
                
                {/* Core Node: Sajideen */}
                <div className="w-20 h-20 rounded-full border border-signal bg-bg-surface-raised flex flex-col items-center justify-center text-center relative z-20 shadow-[0_0_15px_rgba(255,122,51,0.2)]">
                  <Radio className="w-5 h-5 text-signal animate-pulse" />
                  <span className="font-mono text-[9px] tracking-wider text-text-primary mt-1">SYS_CORE</span>
                </div>

                {/* Orbital nodes for the 4 experiences */}
                {experiences.map((exp, idx) => {
                  const angle = (idx * 360) / experiences.length;
                  const radius = 120; // Radius in pixels
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);
                  const isSelected = selectedRadialIndex === idx;

                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedRadialIndex(idx)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className={`absolute w-12 h-12 rounded-full border flex flex-col items-center justify-center focus:outline-none transition-all duration-300 z-30 cursor-pointer ${
                        isSelected
                          ? "border-signal bg-bg-surface shadow-[0_0_12px_rgba(255,122,51,0.3)] scale-110"
                          : "border-border-hairline bg-bg-surface-raised hover:border-data/50"
                      }`}
                    >
                      <Briefcase className={`w-4 h-4 ${isSelected ? "text-signal" : "text-text-secondary"}`} />
                      <span className="font-mono text-[8px] mt-0.5 text-text-secondary">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Node Terminal Inspector Output */}
            <div className="lg:col-span-6">
              <div className="border border-border-hairline bg-bg-surface rounded-lg p-6 font-mono text-xs text-text-secondary min-h-[380px] flex flex-col justify-between">
                
                {/* Terminal Header */}
                <div className="flex justify-between items-center pb-3 border-b border-border-hairline/60 mb-4">
                  <span className="text-signal tracking-widest">// RADIAL_INSPECTOR // NODE_0{selectedRadialIndex + 1}</span>
                  <span className="text-status-positive animate-pulse">SYSTEM_ACTIVE</span>
                </div>

                {/* Terminal Details */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <span className="text-[10px] text-text-secondary/50">SYSTEM_ENTITY_COMPANY</span>
                    <h3 className="text-text-primary text-sm font-bold uppercase">
                      {experiences[selectedRadialIndex].company}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-text-secondary/50">ASSIGNED_ROLE_TITLE</span>
                    <p className="text-data text-sm font-bold">
                      {experiences[selectedRadialIndex].title}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-text-secondary/50">TEMPORAL_DUR_RANGE</span>
                    <p className="text-text-primary font-bold">
                      {experiences[selectedRadialIndex].period}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-text-secondary/50">DELIVERABLES_LOG</span>
                    <ul className="space-y-2 text-[11px] font-sans leading-relaxed text-text-secondary">
                      {experiences[selectedRadialIndex].bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-2 items-start">
                          <ChevronRight className="w-3.5 h-3.5 text-signal shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Module components footer */}
                {experiences[selectedRadialIndex].techStack && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-hairline/60 mt-4">
                    <span className="text-[9px] text-text-secondary/50">MODULES_SYS:</span>
                    {experiences[selectedRadialIndex].techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] px-2 py-0.5 rounded border border-border-hairline bg-bg-surface-raised text-data"
                      >
                        {tech.toLowerCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
