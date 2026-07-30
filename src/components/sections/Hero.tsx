"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { content } from "@/data/content"
import HeroCanvas from "@/components/HeroCanvas"
import { useMagnetic } from "@/hooks/useMagnetic"

function MagneticLink({
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-magnetic
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(tagRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })

      const words = headlineRef.current?.querySelectorAll(".hero-word")
      if (words?.length) {
        tl.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.05, ease: "power4.out" },
          "-=0.3"
        )
      }

      tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")

      const ctas = ctaRef.current?.querySelectorAll("[data-cta]")
      if (ctas?.length) {
        tl.fromTo(ctas, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
      }

      tl.fromTo(metricsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.1")

      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = content.personal.name.split(" ")

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-base pt-40 pb-32"
    >
      <HeroCanvas />

      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,135,0.12) 0%, rgba(0,225,255,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/0 via-bg-base/0 to-bg-base pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)]">
          <div className="col-span-12 lg:col-span-7">
            <span
              ref={tagRef}
              className="font-mono text-[0.85rem] text-accent-primary uppercase tracking-[0.1em] block mb-8"
            >
              {content.personal.role}
            </span>

            <h1
              ref={headlineRef}
              className="font-display text-[clamp(3rem,9vw,9.5rem)] font-extrabold text-text-primary tracking-[-0.04em] leading-[0.92] mb-6"
            >
              {words.map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.15em]">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="font-sans text-[clamp(1.1rem,1.3vw,1.35rem)] text-text-secondary leading-[1.6] max-w-2xl mb-10"
            >
              Bridging strategic executive leadership with advanced software architecture.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <MagneticLink
                href="#projects"
                data-cta
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  const el = document.getElementById("projects")
                  if (el) {
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, opts?: Record<string, unknown>) => void } }).__lenis
                    if (lenis) lenis.scrollTo(el, { offset: -80 })
                    else el.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-primary text-bg-base font-semibold text-sm tracking-wide overflow-hidden transition-all hover:bg-accent-primary/90"
                data-cursor="magnetic"
              >
                <span className="relative z-10">Explore Work</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </MagneticLink>

              <MagneticLink
                href={`mailto:${content.personal.email}`}
                data-cta
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border-strong text-text-primary hover:bg-bg-surface-1 transition-all text-sm"
                data-cursor="magnetic"
              >
                Schedule Strategy Call
              </MagneticLink>
            </div>

            <div
              ref={metricsRef}
              className="flex flex-wrap gap-8 sm:gap-12"
            >
              {content.metrics.map((m) => (
                <div key={m.label}>
                  <span className="font-display text-[clamp(1.5rem,2vw,1.75rem)] font-bold text-text-primary block">
                    {m.value}
                  </span>
                  <span className="font-mono text-[0.75rem] text-text-muted uppercase tracking-[0.05em]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border border-border-subtle relative">
                <div className="absolute inset-4 rounded-full border border-border-subtle" />
                <div className="absolute inset-[30%] rounded-full bg-accent-primary/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[8px] tracking-[0.3em] text-text-dim uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-text-muted/30 to-transparent" />
      </div>
    </section>
  )
}
