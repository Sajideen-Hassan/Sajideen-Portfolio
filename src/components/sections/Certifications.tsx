"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "@/data/content"
import { Shield } from "lucide-react"

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({})

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`,
      boxShadow: `${x * 10}px ${y * 10}px 30px rgba(0, 255, 135, 0.08)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateY(0deg) rotateX(0deg)",
      boxShadow: "none",
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!content.certifications.length) return

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onStart: () => {
              gsap.to(item, {
                borderColor: "rgba(0, 255, 135, 0.2)",
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              })
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!content.certifications.length) return null

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-[140px] border-t border-border-subtle"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(20px,5vw,80px)]">
        <span
          ref={indexRef}
          className="font-mono text-[0.85rem] text-text-muted block mb-4"
        >
          06 // PROFESSIONAL CERTIFICATIONS
        </span>

        <h2
          ref={headerRef}
          className="font-display text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-12"
        >
          Certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.certifications.map((cert, i) => (
            <TiltCard key={cert.title}>
              <div
                ref={(el) => {
                  itemsRef.current[i] = el
                }}
                className="rounded-[24px] border border-border-subtle bg-bg-surface-1 p-8 flex flex-col gap-5 h-full transition-all duration-300 hover:border-accent-primary/30"
                style={{ transform: "translateY(0)" }}
              >
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-[1.35rem] font-bold text-text-primary mb-1">
                    {cert.title}
                  </h3>
                  <p className="font-sans text-[0.95rem] text-text-secondary mb-2">
                    {cert.issuer}
                  </p>
                  <span className="font-mono text-[0.8rem] text-text-muted block">
                    ID: {cert.credentialId}
                  </span>
                </div>

                <a
                  href={cert.verifyUrl}
                  className="inline-flex items-center gap-2 font-mono text-xs text-accent-primary uppercase tracking-[0.05em] hover:text-accent-primary/80 transition-colors"
                >
                  Verify Credential
                  <span>&rarr;</span>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
