import { useEffect, useRef, useState } from "react"

interface SpringConfig {
  stiffness?: number
  damping?: number
}

interface Point {
  x: number
  y: number
}

export function useSpringPhysics(targetPos: Point, config: SpringConfig = {}): Point {
  const { stiffness = 0.1, damping = 0.75 } = config
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let animId: number

    const updatePhysics = () => {
      const dx = targetPos.x - currentPos.current.x
      const dy = targetPos.y - currentPos.current.y

      const ax = dx * stiffness
      const ay = dy * stiffness

      velocity.current.x = (velocity.current.x + ax) * damping
      velocity.current.y = (velocity.current.y + ay) * damping

      currentPos.current.x += velocity.current.x
      currentPos.current.y += velocity.current.y

      setPos({ x: currentPos.current.x, y: currentPos.current.y })

      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [targetPos, stiffness, damping])

  return pos
}
