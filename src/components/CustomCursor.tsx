"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dot.style.display = "none";
      return;
    }

    const onMouse = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouse);

    const loop = () => {
      dot.style.transform = `translate(${pos.current.x - 2}px, ${pos.current.y - 2}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-1 h-1 bg-ink rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: "translate(-100px, -100px)",
        willChange: "transform",
      }}
    />
  );
}
