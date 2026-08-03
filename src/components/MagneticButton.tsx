"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  href?: string
  target?: string
  rel?: string
}

export default function MagneticButton({ children, onClick, className = "", href, target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPos({ x, y })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} target={target} rel={rel} className="inline-block">{content}</a>
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
