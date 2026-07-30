"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        indexRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: indexRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const totalWidth = track.scrollWidth

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth + 200}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const maxX = window.innerWidth - totalWidth
          const x = progress * maxX
          gsap.set(track, { x })
          setActiveProject(Math.round(progress * (content.projects.length - 1)))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-[160px] border-t border-border-subtle overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-glow blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)] relative mb-16">
        <div className="flex items-center justify-between">
          <div>
            <span
              ref={indexRef}
              className="font-mono text-[0.85rem] text-text-muted block mb-4"
            >
              03 // FEATURED CASE STUDIES
            </span>
            <h2
              ref={headerRef}
              className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary"
            >
              Projects
            </h2>
          </div>
          <span className="font-mono text-[0.85rem] text-accent-secondary">
            {String(activeProject + 1).padStart(2, "0")} /{" "}
            {String(content.projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-[clamp(20px,5vw,80px)] will-change-transform"
        style={{ width: "max-content" }}
      >
        {content.projects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-[24px] border border-border-subtle bg-bg-surface-1 overflow-hidden flex flex-col transition-all duration-500 hover:border-accent-primary/30"
            style={{
              width: "clamp(380px, 40vw, 520px)",
              flexShrink: 0,
            }}
          >
            <div className="h-[200px] bg-bg-surface-2 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-border-subtle flex items-center justify-center">
                  <span className="font-mono text-xs text-accent-secondary">
                    {project.id.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(0,255,135,0.08) 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="p-8 flex flex-col gap-5 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[0.75rem] text-accent-primary uppercase tracking-[0.05em] block mb-1">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,2vw,1.85rem)] font-semibold text-text-primary">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-[0.75rem] text-text-muted whitespace-nowrap px-3 py-1 rounded-full border border-border-subtle">
                  {project.timeline}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.75rem] px-2.5 py-1 rounded-full border border-border-subtle bg-bg-surface-2/40 text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-[0.95rem] text-text-secondary leading-relaxed">
                {project.overview}
              </p>

              <div className="grid grid-cols-2 gap-4 text-[0.85rem] leading-relaxed">
                <div>
                  <span className="font-mono text-[0.7rem] text-text-muted uppercase tracking-[0.05em] block mb-1">
                    Challenge
                  </span>
                  <p className="text-text-secondary">{project.challenge}</p>
                </div>
                <div>
                  <span className="font-mono text-[0.7rem] text-accent-primary uppercase tracking-[0.05em] block mb-1">
                    Solution
                  </span>
                  <p className="text-text-secondary">{project.solution}</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.75rem] text-text-muted">
                    Role:{" "}
                    <span className="text-text-primary font-semibold">
                      {project.role}
                    </span>
                  </span>
                  <span className="font-mono text-[0.7rem] text-accent-primary uppercase tracking-[0.05em]">
                    {project.results}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
