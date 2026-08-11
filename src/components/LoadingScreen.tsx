"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAME = "SAJIDEEN HASSAN";
const ROLE = "Associate Software Engineer";
const STATUS_LINES = ["Loading projects", "Wiring interactions", "Fetching fonts"];

const R = 44;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function LoadingScreen() {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 7 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(id);
        setTimeout(() => setIsComplete(true), reducedMotion ? 250 : 700);
      }
      setProgress(current);
    }, 90);
    return () => clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    const id = setInterval(() => setStatus((s) => (s + 1) % STATUS_LINES.length), 800);
    return () => clearInterval(id);
  }, []);

  const pct = Math.min(100, Math.round(progress));
  const activeChars = Math.round((pct / 100) * NAME.length);

  const angleDeg = (pct / 100) * 360 - 90;
  const rad = (angleDeg * Math.PI) / 180;
  const dotX = 50 + R * Math.cos(rad);
  const dotY = 50 + R * Math.sin(rad);

  const exitTransition = reducedMotion ? { duration: 0.25 } : { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0a0b0e]"
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: exitTransition,
          }}
        >
          {/* framing hairlines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

          {/* grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 85%)",
            }}
          />

          {/* glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccff00]/[0.06] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-[#38bdf8]/[0.04] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 bottom-24 h-96 w-96 rounded-full bg-[#7da2ff]/[0.04] blur-3xl"
          />

          {/* corner metadata */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted md:px-12">
            <span>Portfolio</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              S.H
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted md:px-12">
            <span>Lahore, PK</span>
            <span>© 2026</span>
          </div>

          {/* center block */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* progress ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative h-[220px] w-[220px] sm:h-[250px] sm:w-[250px]"
            >
              {/* rotating dashed halo */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full border border-dashed border-white/10"
                animate={reducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute -inset-9 rounded-full border border-white/[0.04]"
                animate={reducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle cx="50" cy="50" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  stroke="#ccff00"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - pct / 100)}
                  style={{ filter: "drop-shadow(0 0 8px rgba(204,255,0,0.6))", transition: "stroke-dashoffset 0.2s ease-out" }}
                />
                <circle cx={dotX} cy={dotY} r="2.4" fill="#ccff00">
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
                </circle>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-text-primary sm:text-6xl">
                  {pct}
                </span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.4em] text-[#ccff00]">
                  percent
                </span>
              </div>
            </motion.div>

            {/* name, lights up with progress */}
            <h1
              className="mt-10 font-display text-[clamp(1.7rem,5.5vw,2.6rem)] font-semibold tracking-[-0.02em]"
              aria-label={NAME}
            >
              {NAME.split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  aria-hidden="true"
                  className={`inline-block transition-colors duration-300 ${
                    i < activeChars ? "text-text-primary" : "text-white/15"
                  } ${ch === " " ? "w-[0.45em]" : ""}`}
                >
                  {ch}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] text-text-secondary"
            >
              {ROLE}
            </motion.p>

            {/* status + meter */}
            <div className="mt-10 flex h-5 items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted">
                Loading
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ccff00]"
                >
                  {STATUS_LINES[status]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* baseline meter */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]">
            <div
              className="h-full bg-[#ccff00] transition-[width] duration-200 ease-out"
              style={{ width: `${pct}%`, boxShadow: "0 0 16px rgba(204,255,0,0.8)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
