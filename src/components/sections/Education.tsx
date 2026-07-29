"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, ArrowRight, Award } from "lucide-react";

export default function Education() {
  const education = portfolioData.education;

  return (
    <section
      id="education"
      className="py-32 relative bg-bg-void border-t border-border-hairline overflow-hidden"
    >
      <div className="absolute inset-0 console-grid opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 items-center text-center">
          <span className="font-mono text-xs text-signal tracking-widest">// 06 // ACADEMIC_MILESTONES.LOG</span>
          <h2 className="font-display text-3xl font-extrabold text-text-primary">
            EDUCATION MATRIX
          </h2>
        </div>

        {/* Stepper layout */}
        <div className="relative pl-6 md:pl-12 border-l border-border-hairline/80 space-y-12">
          {education.map((edu, idx) => (
            <div key={idx} className="relative group">
              
              {/* Stepper Dot node */}
              <span className="absolute -left-6 md:-left-12 top-1.5 -translate-x-[7.5px] w-4.5 h-4.5 rounded-full border border-border-hairline bg-bg-surface-raised flex items-center justify-center group-hover:border-signal transition-colors duration-300">
                <GraduationCap className="w-2.5 h-2.5 text-text-secondary group-hover:text-signal transition-colors" />
              </span>

              {/* Card Container */}
              <div className="p-6 rounded-lg border border-border-hairline bg-bg-surface hover:border-signal/20 hover:bg-bg-surface-raised/40 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-data uppercase tracking-widest block">
                    STAGE_0{idx + 1} // {edu.period}
                  </span>
                  
                  <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-signal transition-colors">
                    {edu.degree}
                  </h3>
                  
                  <p className="font-sans text-sm text-text-secondary">
                    {edu.institution} {edu.location ? `— ${edu.location}` : ""}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {edu.details.map((detail, dIdx) => (
                      <span
                        key={dIdx}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded border border-border-hairline bg-bg-surface-raised text-text-secondary"
                      >
                        {detail.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] text-status-positive px-2.5 py-1 rounded border border-status-positive/20 bg-status-positive/5 shrink-0 self-start md:self-auto">
                  <Award className="w-3.5 h-3.5" />
                  <span>VERIFIED [OK]</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
