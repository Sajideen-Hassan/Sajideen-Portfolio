import { useState, useCallback, useRef } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@*!+?%0123456789"

export function useScrambleText(targetText: string, speed = 35) {
  const [displayText, setDisplayText] = useState(targetText)
  const isScrambling = useRef(false)

  const triggerScramble = useCallback(() => {
    if (isScrambling.current) return
    isScrambling.current = true

    let iteration = 0
    const maxIterations = targetText.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration / 3) return targetText[index]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")
      )

      iteration += 1

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(targetText)
        isScrambling.current = false
      }
    }, speed)
  }, [targetText, speed])

  return { displayText, triggerScramble }
}
