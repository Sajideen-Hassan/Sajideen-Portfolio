"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionAnchors: Record<string, number> = {
  hero: 0,
  about: 0.12,
  experience: 0.28,
  projects: 0.45,
  skills: 0.58,
  education: 0.7,
  volunteer: 0.8,
  certifications: 0.88,
  terminal: 1,
};

export default function ExecutionVector() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const path = useMemo(
    () =>
      "M 20 0 C 20 220 20 360 20 560 C 20 760 20 980 20 1180 C 20 1420 20 1640 20 1880",
    [],
  );

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(1, Math.max(0, current)));

      const currentId = Object.entries(sectionAnchors).reduce(
        (closest, [id]) => {
          const element = document.getElementById(id);
          if (!element) return closest;

          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closest.distance) {
            return { id, distance };
          }
          return closest;
        },
        { id: "hero", distance: Number.POSITIVE_INFINITY },
      ).id;

      setActiveSection(currentId);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const dotPosition = sectionAnchors[activeSection] ?? progress;

  return (
    <div className="pointer-events-none fixed left-3 top-0 z-[60] hidden h-screen w-12 md:block">
      <svg viewBox="0 0 40 1880" className="h-full w-full">
        <path
          d={path}
          stroke="rgba(204, 255, 0, 0.18)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={path}
          stroke="#CCFF00"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={1600}
          strokeDashoffset={1600 * (1 - progress)}
          style={{ filter: "drop-shadow(0 0 10px rgba(204, 255, 0, 0.6))" }}
        />
      </svg>
      <div
        className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-[#CCFF00] bg-[#12141A] shadow-[0_0_18px_rgba(204,255,0,0.65)] transition-transform duration-300"
        style={{
          transform: `translateX(-50%) translateY(${Math.max(0, dotPosition * 1800)}px)`,
        }}
      />
    </div>
  );
}
