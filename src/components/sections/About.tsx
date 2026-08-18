"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const ABOUT_STATEMENT =
  "I'm Sajideen Hassan, an Associate Software Engineer focused on building reliable, scalable, and user-focused digital products. I work across modern web technologies, contributing to both frontend and backend development while solving technical challenges and improving application performance. With hands-on experience in MERN, PERN, and Python, I collaborate closely with developers and project teams to turn requirements into practical solutions, write clean and maintainable code, and help deliver high-quality software on time.";

const START_OPACITY = 0.12;
const SPREAD = 0.5;
const WORD_DURATION = 0.2;

function getWordProgressRange(index: number, count: number) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  return { start, end: Math.min(1, start + WORD_DURATION) };
}

function getWordOpacity(progress: number, { start, end }: { start: number; end: number }, startOpacity = START_OPACITY) {
  if (progress <= start) return startOpacity;
  if (progress >= end) return 1;
  const wordProgress = (progress - start) / (end - start);
  return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  reducedMotion: boolean;
}) {
  const range = getWordProgressRange(index, count);
  const opacity = useTransform(progress, (latest) => getWordOpacity(latest, range));
  const color = useTransform(progress, (latest) => {
    const t = Math.min(1, Math.max(0, (latest - range.start) / (range.end - range.start)));
    const r = Math.round(203 + (204 - 203) * t);
    const g = Math.round(213 + (255 - 213) * t);
    const b = Math.round(225 + (0 - 225) * t);
    return `rgb(${r}, ${g}, ${b})`;
  });

  return (
    <motion.span aria-hidden="true" style={reducedMotion ? undefined : { opacity, color }}>
      {children}
    </motion.span>
  );
}

function ScrollWordReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end start"],
  });
  const words = ABOUT_STATEMENT.split(" ");

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-x-clip px-6 py-24 md:px-16 md:py-36"
      aria-labelledby="about-statement-heading"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-10 sm:grid-cols-[1px_minmax(0,1fr)] sm:gap-14">
        <div className="relative hidden h-32 w-px overflow-hidden bg-border-subtle sm:block" aria-hidden="true">
          <motion.span
            className="absolute inset-0 block origin-top bg-[#ccff00]"
            style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
          />
        </div>

        <div className="w-full">
          <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted sm:mb-10">
            <span className="h-px w-8 bg-[#ccff00]/60" aria-hidden="true" />
            Scroll to reveal
          </p>

          <p
            id="about-statement-heading"
            className="text-left font-display text-[clamp(1.35rem,2.8vw,2.5rem)] font-medium leading-[1.16] tracking-[-0.02em] text-[#cbd5e1]"
            aria-label={ABOUT_STATEMENT}
          >
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <Word
                  progress={scrollYProgress}
                  index={index}
                  count={words.length}
                  reducedMotion={Boolean(reducedMotion)}
                >
                  {word}
                </Word>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="border-t border-border-subtle bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-16">
        <SectionHeader
          eyebrow="01 // About Me"
          title="Engineer the plan."
          accent="Ship the outcome."
          description="A software developer who also coordinates. I work with clients, understand what needs building, and help teams ship it."
        />
      </div>

      <ScrollWordReveal />
    </section>
  );
}
