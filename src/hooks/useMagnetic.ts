"use client"

import { useRef, useCallback, type RefObject } from "react"
import gsap from "gsap"

export function useMagnetic<T extends HTMLElement>(): {
  ref: RefObject<T | null>
  onPointerMove: (e: React.PointerEvent) => void
  onPointerLeave: () => void
} {
  const ref = useRef<T | null>(null)

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.04,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    })
  }, [])

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    })
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
