"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)
  const hoverTarget = useRef<HTMLElement | null>(null)
  const hoverState = useRef<{ type: string; label: string }>({ type: "", label: "" })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      dot.style.display = "none"
      ring.style.display = "none"
      label.style.display = "none"
      return
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("[data-cursor], a, button, [data-magnetic]") as HTMLElement | null
      if (interactive) {
        hoverTarget.current = interactive
        const cursorType = interactive.dataset.cursor || "magnetic"
        hoverState.current = { type: cursorType, label: interactive.dataset.cursorLabel || "" }
      } else {
        hoverTarget.current = null
        hoverState.current = { type: "", label: "" }
      }
    }

    window.addEventListener("mousemove", onMouse)
    window.addEventListener("mouseover", onMouseOver)

    const loop = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const target = hoverTarget.current

      if (target) {
        const rect = target.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2

        if (hoverState.current.type === "magnetic") {
          ringPos.current.x += (cx - ringPos.current.x) * 0.15
          ringPos.current.y += (cy - ringPos.current.y) * 0.15
          const maxW = Math.max(rect.width, rect.height) + 20
          ring.style.width = `${maxW}px`
          ring.style.height = `${maxW}px`
          ring.style.borderColor = "rgba(0, 255, 135, 0.5)"
          ring.style.backgroundColor = "rgba(0, 255, 135, 0.05)"
        } else if (hoverState.current.type === "case-study" || hoverState.current.type === "explore") {
          ringPos.current.x += (cx - ringPos.current.x) * 0.1
          ringPos.current.y += (cy - ringPos.current.y) * 0.1
          ring.style.width = "80px"
          ring.style.height = "80px"
          ring.style.borderColor = "transparent"
          ring.style.backgroundColor = "#00ff87"
          label.textContent = hoverState.current.label || "EXPLORE"
          label.style.opacity = "1"
        } else {
          ringPos.current.x += (mx - ringPos.current.x) * 0.1
          ringPos.current.y += (my - ringPos.current.y) * 0.1
          ring.style.width = "40px"
          ring.style.height = "40px"
          ring.style.borderColor = "rgba(255,255,255,0.3)"
          ring.style.backgroundColor = "transparent"
          label.style.opacity = "0"
        }
      } else {
        ringPos.current.x += (mx - ringPos.current.x) * 0.1
        ringPos.current.y += (my - ringPos.current.y) * 0.1
        ring.style.width = "40px"
        ring.style.height = "40px"
        ring.style.borderColor = "rgba(255,255,255,0.3)"
        ring.style.backgroundColor = "transparent"
        label.style.opacity = "0"
      }

      dot.style.transform = `translate(${mx}px, ${my}px)`
      ring.style.transform = `translate(${ringPos.current.x - parseFloat(ring.style.width || "40") / 2}px, ${ringPos.current.y - parseFloat(ring.style.height || "40") / 2}px)`

      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("mouseover", onMouseOver)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-accent-primary rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-100px, -100px)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          transform: "translate(-100px, -100px)",
          border: "1px solid rgba(255,255,255,0.3)",
          willChange: "transform, width, height",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s",
        }}
      >
        <div ref={labelRef} className="font-mono text-[8px] text-black font-bold tracking-wider opacity-0 select-none">
          EXPLORE
        </div>
      </div>
    </>
  )
}
