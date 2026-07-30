"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { content } from "@/data/content"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pillarRefs = useRef<(HTMLButtonElement | null)[]>([])
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])
  const [activePillar, setActivePillar] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

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

      const lines = linesRef.current.filter(Boolean) as HTMLParagraphElement[]
      if (lines.length > 0) {
        ScrollTrigger.create({
          trigger: textRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress
            const total = lines.length
            lines.forEach((line, idx) => {
              const t = Math.max(0, Math.min(1, (progress * total - idx) / 2))
              line.style.opacity = String(0.15 + t * 0.85)
              line.style.transform = `translateY(${(1 - t) * 16}px)`
              if (t > 0.9) {
                line.style.textShadow = "0 0 20px rgba(244, 245, 247, 0.2)"
              } else {
                line.style.textShadow = "none"
              }
            })
          },
        })
      }

      gsap.fromTo(
        pillarRefs.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePillarHover = (idx: number | null) => {
    setActivePillar(idx)
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[180px] border-t border-border-subtle relative"
    >
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-glow blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)] relative">
        <div className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)]">
          <div className="col-span-12 lg:col-span-4 sticky-sidebar">
            <span
              ref={indexRef}
              className="font-mono text-[0.85rem] text-text-muted block mb-4"
            >
              01 // PHILOSOPHY &amp; LEADERSHIP
            </span>

            <h2
              ref={headerRef}
              className="font-display text-[clamp(1.75rem,2.5vw,2.25rem)] font-bold text-text-primary mb-12"
            >
              Strategic Manifesto
            </h2>

            <div className="hidden lg:flex flex-col gap-3">
              {content.about.corePillars.map((pillar, i) => (
                <button
                  key={pillar}
                  ref={(el) => {
                    pillarRefs.current[i] = el
                  }}
                  onMouseEnter={() => handlePillarHover(i)}
                  onMouseLeave={() => handlePillarHover(null)}
                  className={`text-left font-mono text-xs uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    activePillar === i
                      ? "border-accent-primary text-accent-primary bg-accent-primary/5"
                      : "border-border-subtle text-text-muted hover:border-border-strong hover:text-text-secondary"
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="mb-12">
              <p className="font-sans text-[clamp(1.5rem,2.5vw,2.35rem)] font-medium leading-[1.5] text-text-primary/80">
                {content.about.manifest}
              </p>
            </div>

            <div ref={textRef} className="space-y-8">
              {content.about.philosophy.map((paragraph, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    linesRef.current[i] = el
                  }}
                  className="font-sans text-[clamp(1.5rem,2.5vw,2.35rem)] font-medium leading-[1.5]"
                  style={{ opacity: 0.15, transform: "translateY(16px)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 lg:hidden flex flex-wrap gap-3">
          {content.about.corePillars.map((pillar, i) => (
            <button
              key={pillar}
              onMouseEnter={() => handlePillarHover(i)}
              onMouseLeave={() => handlePillarHover(null)}
              className={`font-mono text-xs uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-all duration-300 ${
                activePillar === i
                  ? "border-accent-primary text-accent-primary bg-accent-primary/5"
                  : "border-border-subtle text-text-muted"
              }`}
            >
              {pillar}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
