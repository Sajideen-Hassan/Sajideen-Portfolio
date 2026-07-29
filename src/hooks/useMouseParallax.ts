"use client";

import { useEffect, useRef } from "react";

/**
 * useMouseParallax
 * ----------------
 * Tracks mouse position relative to the viewport center and returns
 * normalized values in [-1, 1] range. Uses a lerp (linear interpolation)
 * for smooth damping — no jitter, no layout thrashing.
 *
 * @param strength  Multiplier for the parallax displacement (default: 1)
 * @param lerpFactor  Smoothing factor 0-1; lower = smoother (default: 0.06)
 */

interface MouseParallaxOptions {
  strength?: number;
  lerpFactor?: number;
}

interface ParallaxState {
  x: number;
  y: number;
}

export function useMouseParallax(
  callback: (state: ParallaxState) => void,
  options: MouseParallaxOptions = {}
) {
  const { strength = 1, lerpFactor = 0.06 } = options;

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isActive = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -1 → 1 relative to viewport center
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * strength;
      mouse.current.y = ((e.clientY / window.innerHeight) * 2 - 1) * strength;
      if (!isActive.current) {
        isActive.current = true;
      }
    };

    const animate = () => {
      // Lerp toward target
      current.current.x +=
        (mouse.current.x - current.current.x) * lerpFactor;
      current.current.y +=
        (mouse.current.y - current.current.y) * lerpFactor;

      callback({ x: current.current.x, y: current.current.y });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [callback, strength, lerpFactor]);
}
