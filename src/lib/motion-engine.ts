import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export class MotionEngine {
  private lenis: Lenis | null = null

  init() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    this.lenis = lenis

    lenis.on("scroll", () => ScrollTrigger.update())

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll ?? 0
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    })

    ScrollTrigger.defaults({ scroller: document.body })
    lenis.start()
  }

  scrollTo(target: HTMLElement | string, opts?: Record<string, unknown>) {
    this.lenis?.scrollTo(target, opts)
  }

  destroy() {
    this.lenis?.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}

export function initRevealAnimations() {
  ScrollTrigger.batch("[data-reveal]", {
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.08,
        overwrite: "auto",
      }),
    once: true,
  })
}

export function initHairlineReveal() {
  ScrollTrigger.batch(".hairline-reveal", {
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      }),
    once: true,
  })
}
