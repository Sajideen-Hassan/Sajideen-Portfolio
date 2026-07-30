"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let w = window.innerWidth
    let h = window.innerHeight
    const particles: Particle[] = []
    const PARTICLE_COUNT = 64
    const CONNECTION_DIST = 160
    const MOUSE_RADIUS = 220

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w
      canvas!.height = h
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }
    window.addEventListener("mousemove", onMouse)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * Math.min(w, h) * 0.4
      particles.push({
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        z: Math.random() * 200 - 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
      })
    }

    const draw = () => {
      ctx!.clearRect(0, 0, w, h)

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const cx = w / 2
      const cy = h / 2

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const angleToCenter = Math.atan2(cy - p.y, cx - p.x)
        const distToCenter = Math.hypot(p.x - cx, p.y - cy)
        const orbitForce = 0.005
        p.vx += Math.cos(angleToCenter + Math.PI / 2) * orbitForce
        p.vy += Math.sin(angleToCenter + Math.PI / 2) * orbitForce

        p.x += p.vx
        p.y += p.vy

        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          const pushX = (dx / dist) * force * -4
          const pushY = (dy / dist) * force * -4
          p.x += pushX
          p.y += pushY
        }

        if (distToCenter > Math.min(w, h) * 0.5) {
          p.vx += (cx - p.x) * 0.001
          p.vy += (cy - p.y) * 0.001
        }

        p.vx *= 0.98
        p.vy *= 0.98
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25
            const gradient = ctx!.createLinearGradient(a.x, a.y, b.x, b.y)
            gradient.addColorStop(0, `rgba(0, 255, 135, ${alpha})`)
            gradient.addColorStop(1, `rgba(0, 225, 255, ${alpha})`)
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = gradient
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, "rgba(0, 255, 135, 0.8)")
        gradient.addColorStop(1, "rgba(0, 225, 255, 0)")
        ctx!.fillStyle = gradient
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  )
}
