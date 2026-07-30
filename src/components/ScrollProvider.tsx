"use client"

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

const ScrollContext = createContext<Lenis | null>(null)
export const useScroll = () => useContext(ScrollContext)

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  interface WindowWithLenis {
    __lenis?: Lenis
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.setAttribute("data-revealed", "true")
      })
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis
    ;(window as unknown as WindowWithLenis).__lenis = lenis

    lenis.on("scroll", () => ScrollTrigger.update())

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true })
        }
        return lenis.scroll ?? lenis.progress * 100
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

    return () => {
      delete (window as unknown as WindowWithLenis).__lenis
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <ScrollContext.Provider value={null}>{children}</ScrollContext.Provider>
}
