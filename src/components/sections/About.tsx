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
  "I'm Sajideen Hassan, a Project Coordinator and Full Stack Developer passionate about building scalable digital products. I specialize in coordinating cross-functional teams, aligning client requirements, and turning ideas into successful software solutions. Working with both local and international clients, I ensure smooth communication, efficient execution, and on-time delivery. With hands-on experience in MERN, PERN, and Python, I actively contribute to development, solve technical challenges, and help teams ship reliable, high-quality products faster.";

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
    offset: ["start end", "end start"],
  });
  const words = ABOUT_STATEMENT.split(" ");

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-clip" aria-labelledby="about-statement-heading">
      <div className="sticky top-0 flex min-h-[100svh] w-full items-center overflow-hidden px-6 py-16 md:px-16">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[1px_minmax(0,1fr)] items-start gap-10">
          <div className="relative h-32 w-px overflow-hidden bg-border-subtle" aria-hidden="true">
            <motion.span
              className="absolute inset-0 block origin-top bg-[#ccff00]"
              style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
            />
          </div>

          <div className="max-w-4xl">
            <p
              id="about-statement-heading"
              className="font-display text-[clamp(1.35rem,2.8vw,2.5rem)] font-medium leading-[1.16] tracking-[-0.02em] text-[#cbd5e1]"
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
          description="Beyond the title, this is who I am — a coordinator who speaks both engineering and execution."
        />
      </div>

      <ScrollWordReveal />
    </section>
  );
}
