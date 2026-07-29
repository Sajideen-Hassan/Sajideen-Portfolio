"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData, Project } from "@/data/portfolio";
import { ExternalLink, FolderGit2, CheckCircle2, Award, Settings2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const leadCardRef = useRef<HTMLDivElement>(null);
  const projects = portfolioData.projects;
  
  // Separate lead project from others
  const leadProject = projects[0];
  const secondaryProjects = projects.slice(1);

  // Spotlight mouse track state for hover effects
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Scale-up & Perspective Tilt effect on scroll for lead project
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leadCardRef.current,
        { scale: 0.9, rotationX: 8, transformOrigin: "top center" },
        {
          scale: 1,
          rotationX: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
          }
        }
      );
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="py-32 relative bg-bg-void border-t border-border-hairline overflow-hidden"
    >
      {/* Console grid bg */}
      <div className="absolute inset-0 console-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-signal tracking-widest">// 05 // PROJECT_REPOSITORY.DB</span>
          <h2 className="font-display text-3xl font-extrabold text-text-primary">
            SHIPPED PROJECTS & CASE STUDIES
          </h2>
        </div>

        {/* 1. Lead Project Showcase (Container-Scroll Pin/Scale) */}
        <div ref={pinContainerRef} className="mb-24 flex flex-col gap-6">
          <div className="font-mono text-[10px] text-signal tracking-widest uppercase">// FEATURED_DELIVERY.EXE</div>
          
          <div
            ref={leadCardRef}
            className="w-full rounded-xl border border-signal/30 bg-bg-surface p-6 sm:p-8 hover:border-signal/60 transition-all duration-300 flex flex-col gap-8 shadow-[0_8px_30px_rgba(255,122,51,0.05)] relative overflow-hidden"
          >
            {/* Spotlight overlay */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[10px] text-status-positive px-2 py-0.5 rounded border border-status-positive/20 bg-status-positive/5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-positive animate-pulse" />
              <span>LIVE_DEployed</span>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left col: Title, description, outcomes */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs text-data uppercase tracking-wider block mb-1">
                    {leadProject.subtitle}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight">
                    {leadProject.title}
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                  {leadProject.description.map((desc, idx) => (
                    <p key={idx}>{desc}</p>
                  ))}
                </div>

                <div className="mt-2 p-4 rounded border border-border-hairline bg-bg-surface-raised/40">
                  <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold mb-1.5">
                    <Award className="w-4 h-4" />
                    <span>OPERATIONAL_IMPACT:</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-text-primary leading-relaxed">
                    {leadProject.impact}
                  </p>
                </div>
              </div>

              {/* Right col: PM contributions, Tech, Links */}
              <div className="lg:col-span-5 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border-hairline/50 pt-6 lg:pt-0 lg:pl-8">
                
                {/* PM contributions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-data font-bold">
                    <Settings2 className="w-4 h-4" />
                    <span>PM_CONTRIBUTIONS:</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {leadProject.pmContribution.map((contrib, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-signal shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech chips */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-text-secondary uppercase">MODULES_STACK:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {leadProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded border border-border-hairline bg-bg-surface-raised text-data"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-center pt-4 border-t border-border-hairline/30 font-mono text-xs text-text-secondary">
                  <div>
                    <span>ROLE: </span>
                    <span className="text-text-primary font-bold">{leadProject.role}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {leadProject.githubLink && (
                      <a href={leadProject.githubLink} className="hover:text-signal transition-colors focus:outline-none" aria-label="GitHub Repository">
                        <FolderGit2 className="w-4 h-4" />
                      </a>
                    )}
                    {leadProject.liveLink && (
                      <a href={leadProject.liveLink} className="hover:text-signal transition-colors flex items-center gap-1 focus:outline-none" aria-label="Live Project Link">
                        <span className="text-[10px] tracking-widest font-semibold uppercase">LAUNCH</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* 2. Secondary Projects (Bento Grid) */}
        <div>
          <div className="font-mono text-[10px] text-signal tracking-widest uppercase mb-6">// ASSOCIATE_PROJECTS.LOG</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProjects.map((project) => {
              const isHovered = hoveredId === project.id;
              
              return (
                <div
                  key={project.id}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative group rounded-lg border border-border-hairline bg-bg-surface p-6 transition-all duration-300 hover:border-signal/30 hover:bg-bg-surface-raised/40 flex flex-col justify-between gap-6 min-h-[360px] overflow-hidden"
                >
                  {/* Spotlight overlay container */}
                  {isHovered && (
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(255, 122, 51, 0.05), transparent 80%)`
                      }}
                    />
                  )}

                  {/* Header & Description */}
                  <div className="space-y-4 relative z-10">
                    <div>
                      <span className="font-mono text-[10px] text-data uppercase tracking-wider block mb-0.5">
                        {project.subtitle}
                      </span>
                      <h4 className="font-display text-lg font-bold text-text-primary group-hover:text-signal transition-colors">
                        {project.title}
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {project.description.map((desc, idx) => (
                        <p key={idx}>{desc}</p>
                      ))}
                    </div>
                  </div>

                  {/* PM Role & Tech stack */}
                  <div className="space-y-4 relative z-10">
                    {/* PM Bullet Highlight */}
                    <div className="p-3 rounded border border-border-hairline/60 bg-bg-void/50 text-[11px] leading-relaxed">
                      <span className="font-mono text-[9px] text-signal font-bold uppercase block mb-1">PM CONTRIBUTION:</span>
                      <p className="text-text-primary/90">{project.pmContribution[0]}</p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] px-2 py-0.5 rounded border border-border-hairline/50 bg-bg-void/60 text-data"
                        >
                          {t.toLowerCase()}
                        </span>
                      ))}
                    </div>

                    {/* Footer link line */}
                    <div className="flex justify-between items-center pt-3 border-t border-border-hairline/40 font-mono text-[10px] text-text-secondary">
                      <div>
                        <span>ROLE: </span>
                        <span className="text-text-primary">{project.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.githubLink && (
                          <a href={project.githubLink} className="hover:text-signal transition-colors focus:outline-none" aria-label="GitHub repository">
                            <FolderGit2 className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} className="hover:text-signal transition-colors flex items-center gap-0.5 focus:outline-none" aria-label="Live project link">
                            <span>LAUNCH</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
