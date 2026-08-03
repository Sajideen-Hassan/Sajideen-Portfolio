"use client"

import { useEffect, useRef } from "react"

export default function QuantumFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.lastX = mouse.x
      mouse.lastY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    const gridSize = 72
    const nodes: { x: number; y: number; baseAlpha: number; alpha: number }[] = []
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        nodes.push({ x, y, baseAlpha: 0.05, alpha: 0.05 })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = "rgba(249, 250, 251, 0.025)"
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      nodes.forEach((node) => {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 180) {
          const factor = (180 - dist) / 180
          node.alpha = 0.05 + factor * 0.45

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(96, 165, 250, ${factor * 0.25})`
          ctx.stroke()
        } else {
          node.alpha += (node.baseAlpha - node.alpha) * 0.05
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${node.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
