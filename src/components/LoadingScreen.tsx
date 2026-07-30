"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { content } from "@/data/content"

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const topCurtain = useRef<HTMLDivElement>(null)
  const bottomCurtain = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(SplitText)

    let split: SplitText | null = null

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = "none"
      },
    })

    if (textRef.current) {
      split = new SplitText(textRef.current, { type: "chars" })
      gsap.set(split.chars, { y: "120%", opacity: 0 })

      tl.to(split.chars, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
      }, 0.2)
    }

    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}%`
        }
      },
    }, 0)

    if (barRef.current) {
      tl.to(barRef.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
    }

    tl.to(containerRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.3")

    tl.to(counterRef.current, { opacity: 0, duration: 0.3 }, "-=0.3")

    tl.to(topCurtain.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.9,
      ease: "power3.inOut",
    }, "-=0.1")

    tl.to(bottomCurtain.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.9,
      ease: "power3.inOut",
    }, "-=0.9")

    return () => {
      split?.revert()
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col bg-bg-base overflow-hidden"
    >
      <div
        ref={topCurtain}
        className="w-full h-1/2 bg-bg-base"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />
      <div
        ref={bottomCurtain}
        className="w-full h-1/2 bg-bg-base"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />

      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1
          ref={textRef}
          className="font-display text-[clamp(3.5rem,9vw,9.5rem)] font-extrabold text-text-primary tracking-[-0.04em] leading-[0.92]"
        >
          {content.personal.name}
        </h1>

        <div className="flex items-center gap-4 mt-8">
          <span
            ref={counterRef}
            className="font-mono text-[1.5rem] font-medium text-text-primary tabular-nums"
          >
            0%
          </span>
        </div>

        <div className="w-[240px] h-[1px] bg-border-strong rounded-full overflow-hidden mt-2">
          <div
            ref={barRef}
            className="h-full w-full bg-accent-primary rounded-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <div className="absolute top-10 left-10 pointer-events-none">
        <span className="font-mono text-xs text-text-muted">
          SYS.INIT // 2026
        </span>
      </div>
      <div className="absolute top-10 right-10 pointer-events-none text-right">
        <span className="font-mono text-xs text-text-muted block">
          LATENCY: 12ms
        </span>
        <span className="font-mono text-xs text-text-muted block">
          FRAME_RATE: 60FPS
        </span>
      </div>
      <div className="absolute bottom-10 left-10 pointer-events-none">
        <span className="font-mono text-xs text-text-muted">
          ARCHITECTING DIGITAL EXPERIENCE
        </span>
      </div>
    </div>
  )
}
