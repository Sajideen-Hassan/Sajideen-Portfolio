"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"
import { useMagnetic } from "@/hooks/useMagnetic"

function MagneticButton({
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

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(content.personal.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        emailRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        actionsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 20,
          repeat: -1,
          ease: "none",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const marqueeText =
    "STRATEGIC LEADERSHIP \u2022 SOFTWARE ARCHITECTURE \u2022 AI PRODUCTS \u2022 "

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-[180px] pb-[60px] border-t border-border-subtle overflow-hidden bg-bg-base"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-display text-[clamp(4rem,10vw,8rem)] font-extrabold uppercase leading-none"
          style={{ color: "rgba(244, 245, 247, 0.04)", position: "absolute", top: "40%", left: "0" }}
        >
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="text-center">
          <p className="font-sans text-[clamp(1rem,1.2vw,1.2rem)] text-text-secondary mb-6 max-w-xl mx-auto">
            {content.contact.heading}
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold text-text-primary tracking-[-0.04em] leading-[0.95] mb-12"
          >
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Extraordinary Together.</span>
          </h1>

          <div ref={emailRef} className="mb-8">
            <button
              onClick={copyEmail}
              data-cursor="magnetic"
              className="inline-flex items-center gap-3 font-mono text-[clamp(1.1rem,2vw,1.75rem)] font-semibold text-accent-primary px-8 py-4 rounded-full border border-accent-primary/30 hover:border-accent-primary/60 transition-all duration-300 bg-accent-primary/5 hover:bg-accent-primary/10"
            >
              {copied ? (
                <>
                  <span>Copied to Clipboard!</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              ) : (
                <>{content.personal.email}</>
              )}
            </button>
          </div>

          <div ref={actionsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <MagneticButton
              href={`https://calendly.com/${content.personal.email.split("@")[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-primary text-bg-base font-semibold text-sm tracking-wide hover:bg-accent-primary/90 transition-all"
            >
              Schedule Strategy Call
            </MagneticButton>
          </div>
        </div>
      </div>

      <footer
        ref={footerRef}
        className="relative z-10 max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)] pt-8 mt-12 border-t border-border-subtle"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href={content.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.85rem] text-text-muted uppercase tracking-[0.05em] hover:text-accent-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={content.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.85rem] text-text-muted uppercase tracking-[0.05em] hover:text-accent-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href={content.personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.85rem] text-text-muted uppercase tracking-[0.05em] hover:text-accent-primary transition-colors"
            >
              X / Twitter
            </a>
          </div>
          <div className="font-mono text-[0.85rem] text-text-muted tracking-[0.05em]">
            &copy; 2026 Sajideen Hassan. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  )
}
