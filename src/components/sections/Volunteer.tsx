"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"

function CountUp({
  value,
  suffix = "",
  label,
  triggerRef,
}: {
  value: number
  suffix?: string
  label: string
  triggerRef: React.RefObject<HTMLDivElement | null>
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration: 2,
        snap: { val: 1 },
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${obj.val}${suffix}`
          }
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [value, suffix, triggerRef])

  return (
    <div>
      <span
        ref={ref}
        className="font-display text-[clamp(2.5rem,2.75vw,2.75rem)] font-extrabold text-accent-primary"
      >
        0
      </span>
      <span className="font-mono text-[0.85rem] text-text-secondary block mt-1">
        {label}
      </span>
    </div>
  )
}

export default function Volunteer() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!content.volunteer.length) return

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

      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!content.volunteer.length) return null

  const totalDevelopers = 500
  const totalMentees = 30
  const totalWorkshops = 12

  return (
    <section
      id="volunteer"
      ref={sectionRef}
      className="py-[140px] border-t border-border-subtle relative"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)]">
        <span
          ref={indexRef}
          className="font-mono text-[0.85rem] text-text-muted block mb-4"
        >
          07 // LEADERSHIP &amp; COMMUNITY IMPACT
        </span>

        <h2
          ref={headerRef}
          className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-12"
        >
          Volunteer
        </h2>

        <div
          ref={contentRef}
          className="rounded-[24px] border border-border-subtle bg-bg-surface-1 p-[clamp(24px,3vw,48px)]"
        >
          {content.volunteer.map((v, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:border-r lg:border-border-subtle lg:pr-8">
                <span className="font-mono text-[0.75rem] text-accent-primary uppercase tracking-[0.05em] block mb-2">
                  {v.organization}
                </span>
                <h3 className="font-display text-[clamp(1.5rem,1.75vw,1.75rem)] font-bold text-text-primary mb-2">
                  {v.title}
                </h3>
                <span className="font-mono text-[0.85rem] text-text-muted block mb-6">
                  {v.period}
                </span>
                <ul className="space-y-3">
                  {v.impact.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[1.05rem] text-text-secondary leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:pl-8">
                <div ref={metricsRef} className="grid grid-cols-3 gap-6 h-full items-center">
                  <CountUp
                    value={totalDevelopers}
                    suffix="+"
                    label="Developers Reached"
                    triggerRef={metricsRef}
                  />
                  <CountUp
                    value={totalMentees}
                    suffix="+"
                    label="Mentees Guided"
                    triggerRef={metricsRef}
                  />
                  <CountUp
                    value={totalWorkshops}
                    label="Workshops Delivered"
                    triggerRef={metricsRef}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
