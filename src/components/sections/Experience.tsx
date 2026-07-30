"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, i) => {
        gsap.set(card, { y: 40, opacity: 0, scale: 0.95 })

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "bottom 25%",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress
            gsap.to(card, {
              y: (1 - p) * 40,
              opacity: Math.min(p + 0.2, 1),
              scale: 0.95 + p * 0.05,
              duration: 0.1,
              overwrite: "auto",
            })
          },
        })

        if (i > 0) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 120px",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            id: `pin-${i}`,
          })
        }
      })

      ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "bottom bottom",
        end: "bottom top",
        onLeave: () => {
          cards.forEach((card) => {
            gsap.to(card, {
              scale: 0.9,
              brightness: 0.4,
              duration: 0.3,
              ease: "power3.out",
            })
          })
        },
        onEnterBack: () => {
          cards.forEach((card) => {
            gsap.to(card, {
              scale: 1,
              brightness: 1,
              duration: 0.3,
              ease: "power3.out",
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-[160px] border-t border-border-subtle relative"
    >
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-accent-glow blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)] relative">
        <span
          ref={indexRef}
          className="font-mono text-[0.85rem] text-text-muted block mb-4"
        >
          02 // PROFESSIONAL JOURNEY
        </span>

        <h2
          ref={headerRef}
          className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-16"
        >
          Experience
        </h2>

        <div className="space-y-8">
          {content.experience.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group rounded-[24px] border border-border-subtle bg-bg-surface-1 overflow-hidden transition-all duration-500"
              style={{
                boxShadow:
                  hoveredCard === i
                    ? "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "none",
              }}
            >
              <div className="p-[clamp(24px,3vw,48px)]">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-[0.9rem] text-accent-primary block mb-1">
                      {exp.company}
                    </span>
                    <h3 className="font-display text-[clamp(1.5rem,1.85vw,1.85rem)] font-bold text-text-primary">
                      {exp.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.9rem] text-text-muted whitespace-nowrap px-3 py-1 rounded-full border border-border-subtle">
                    {exp.period}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div className="sm:col-span-2">
                    <span className="font-mono text-[0.75rem] text-text-muted uppercase tracking-[0.05em] block mb-3">
                      Key Impact
                    </span>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-[0.95rem] text-text-secondary leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary shrink-0 mt-2" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[0.75rem] text-text-muted uppercase tracking-[0.05em] block mb-3">
                      Deliverables
                    </span>
                    <ul className="space-y-2">
                      {exp.responsibilities.slice(0, 2).map((r, idx) => (
                        <li
                          key={idx}
                          className="text-[0.85rem] text-text-secondary leading-relaxed"
                        >
                          &rarr; {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border-subtle">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.8rem] px-3 py-1.5 rounded-full border border-border-subtle bg-bg-surface-2/50 text-text-muted hover:text-text-primary hover:border-accent-primary/40 transition-all duration-300 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
