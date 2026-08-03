"use client"

import { useEffect, type ReactNode } from "react"

export default function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: ReturnType<typeof import("@/lib/lenis").default> | null = null
    import("@/lib/lenis").then((mod) => {
      lenis = mod.default?.()
    })
    return () => {
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
