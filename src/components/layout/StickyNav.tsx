"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { content } from "@/data/content"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("hero")
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 100)
      const pos = y + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && pos >= el.offsetTop) {
          setActive(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        height: scrolled ? 64 : 88,
        duration: 0.4,
        ease: "power3.out",
      })
      gsap.to(bgRef.current, {
        opacity: scrolled ? 1 : 0,
        duration: 0.4,
        ease: "power3.out",
      })
    }, headerRef)
    return () => ctx.revert()
  }, [scrolled])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, opts?: Record<string, unknown>) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
      style={{ height: 88 }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 glass-strong"
        style={{ opacity: 0 }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-[clamp(20px,5vw,80px)] flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-[1.5rem] font-bold text-text-primary tracking-tight"
        >
          {content.personal.initials}
          <span className="text-accent-primary">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="relative font-mono text-[0.75rem] tracking-[0.1em] uppercase py-1"
            >
              <span
                className={
                  active === s.id
                    ? "text-accent-primary"
                    : "text-text-muted hover:text-text-primary transition-colors"
                }
              >
                {s.label}
              </span>
              {active === s.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            scrollTo("contact")
          }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent-primary/40 text-accent-primary font-mono text-xs uppercase tracking-[0.1em] hover:bg-accent-primary/10 transition-all"
        >
          Hire Me
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all ${
              mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all ${
              mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 glass border-b border-border-subtle px-6 py-6 flex flex-col gap-4 md:hidden">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`font-mono text-sm tracking-wider text-left ${
                active === s.id
                  ? "text-accent-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="font-mono text-sm tracking-wider text-left text-accent-primary mt-2 pt-4 border-t border-border-subtle"
          >
            Hire Me &rarr;
          </button>
        </div>
      )}
    </header>
  )
}
