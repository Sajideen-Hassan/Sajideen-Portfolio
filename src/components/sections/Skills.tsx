"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"

const categories = [
  "All",
  "Project Management",
  "AI & Machine Learning",
  "Cloud & Architecture",
  "Backend & APIs",
  "Frontend Engineering",
  "Collaboration & Tools",
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [tiltStyles, setTiltStyles] = useState<Record<number, { rotateY: number; rotateX: number }>>(
    {}
  )

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

      cardsRef.current.forEach((card) => {
        if (!card) return
        const idx = card.dataset.index ? parseInt(card.dataset.index) : 0
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: idx * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, i: number) => {
      const card = cardsRef.current[i]
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setTiltStyles((prev) => ({
        ...prev,
        [i]: { rotateY: x * 10, rotateX: -y * 10 },
      }))
    },
    []
  )

  const handleMouseLeave = useCallback((i: number) => {
    setTiltStyles((prev) => ({
      ...prev,
      [i]: { rotateY: 0, rotateX: 0 },
    }))
  }, [])

  const filteredSkills =
    activeFilter === "All"
      ? content.skills
      : content.skills.filter((s) => s.category === activeFilter)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-[160px] border-t border-border-subtle relative"
    >
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent-glow blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)] relative z-10">
        <span
          ref={indexRef}
          className="font-mono text-[0.85rem] text-text-muted block mb-4"
        >
          04 // CAPABILITY MATRIX
        </span>

        <h2
          ref={headerRef}
          className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-8"
        >
          Skills &amp; Expertise
        </h2>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === cat
                  ? "border-accent-primary text-accent-primary bg-accent-primary/5"
                  : "border-border-subtle text-text-muted hover:border-border-strong hover:text-text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((group) => {
            const originalIndex = content.skills.indexOf(group)
            const tilt = tiltStyles[originalIndex] || { rotateY: 0, rotateX: 0 }

            return (
              <div
                key={group.category}
              ref={(el) => {
                  cardsRef.current[originalIndex] = el
                  if (el) el.dataset.index = String(originalIndex)
                }}
                onMouseMove={(e) => handleMouseMove(e, originalIndex)}
                onMouseLeave={() => handleMouseLeave(originalIndex)}
                className="rounded-[24px] border border-border-subtle bg-bg-surface-1 p-8 transition-all duration-300 hover:border-accent-primary/20"
                style={{
                  transform: `perspective(800px) rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg)`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <h3 className="font-display text-[clamp(1.1rem,1.25vw,1.25rem)] font-bold text-text-primary mb-1">
                  {group.category}
                </h3>
                <span className="font-mono text-[0.75rem] text-accent-primary uppercase tracking-[0.05em] block mb-5">
                  {group.items.length} skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[0.85rem] px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface-2/40 text-text-secondary hover:text-text-primary hover:border-accent-primary/30 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
