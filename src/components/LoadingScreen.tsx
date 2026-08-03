"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  "CALIBRATING_EXECUTION_VECTOR",
  "SYNCHRONIZING_ROADMAPS",
  "INITIALIZATION_COMPLETE",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(steps[0]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 450);
          return 100;
        }
        return next;
      });
    }, 70);

    const timer = window.setInterval(() => {
      setStatus((current) => {
        const index = steps.indexOf(current);
        return steps[(index + 1) % steps.length];
      });
    }, 900);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0a0b0e]"
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.08),_transparent_70%)]" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#ccff00]">
              SYSTEM CALIBRATION
            </p>
            <h1 className="mb-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold tracking-[-0.04em] text-text-primary">
              EXECUTION VECTOR
            </h1>
            <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary">
              {status}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-[140px] text-right font-mono text-xs text-text-secondary tabular-nums">
                {Math.round(progress).toString().padStart(3, "0")}%
              </span>
              <div className="h-[2px] w-[220px] overflow-hidden rounded-full border border-border-subtle bg-bg-surface">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#ccff00] to-[#ff9900]"
                  animate={{ scaleX: progress / 100 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
