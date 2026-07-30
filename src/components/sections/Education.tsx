"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])
  const dividersRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!content.education.length) return

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

      dividersRef.current.forEach((divider) => {
        if (!divider) return
        gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 85%",
              toggleActions: "play once",
            },
          }
        )
      })

      rowsRef.current.forEach((row, i) => {
        if (!row) return
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!content.education.length) return null

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-[120px] border-t border-border-subtle"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)]">
        <span
          ref={indexRef}
          className="font-mono text-[0.85rem] text-text-muted block mb-4"
        >
          05 // ACADEMIC FOUNDATION
        </span>

        <h2
          ref={headerRef}
          className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-16"
        >
          Education
        </h2>

        <div>
          {content.education.map((edu, i) => (
            <div key={i}>
              {i > 0 && (
                <div
                  ref={(el) => {
                    dividersRef.current[i] = el
                  }}
                  className="h-[1px] bg-border-subtle origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              )}
              <div
                ref={(el) => {
                  rowsRef.current[i] = el
                }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="py-10 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 rounded-xl"
                style={{
                  background:
                    hoveredRow === i ? "rgba(255,255,255,0.03)" : "transparent",
                }}
              >
                <div className="flex-1">
                  <h3
                    className="font-display text-[1.5rem] font-bold text-text-primary transition-all duration-300"
                    style={{
                      transform:
                        hoveredRow === i ? "translateX(12px)" : "translateX(0)",
                      color:
                        hoveredRow === i
                          ? "var(--color-accent-primary)"
                          : "var(--color-text-primary)",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="font-sans text-[1rem] text-text-secondary mt-1">
                    {edu.institution}
                  </p>
                </div>
                <div className="text-right sm:w-[200px]">
                  <span className="font-mono text-[0.9rem] text-text-muted block">
                    {edu.period}
                  </span>
                </div>
              </div>
              {edu.details.length > 0 && (
                <div className="px-4 pb-4 -mt-2">
                  <div className="flex flex-wrap gap-2">
                    {edu.details.map((d, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[0.85rem] text-accent-primary"
                      >
                        {d}
                        {idx < edu.details.length - 1 && (
                          <span className="text-text-muted mx-2">|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
