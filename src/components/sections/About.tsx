"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

const STATS: Stat[] = [
  { label: "Successful Projects Completed", value: 7, suffix: "+" },
  { label: "Years of Experience", value: 1.5, suffix: "+" },
  { label: "Teams Led", value: 5, suffix: "+" },
  { label: "Satisfaction Rate", value: 95, suffix: "%" },
];

const PROCESS_STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your goals, pain points, audience, and what sets you apart.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Setting up projects, aligning on scope and milestones, and diving into the work.",
  },
  {
    number: "03",
    title: "Execute & Refine",
    description: "Sharing initial deliverables, gathering feedback, and fine-tuning together.",
  },
  {
    number: "04",
    title: "Deliver & Grow",
    description: "Launching with confidence and supporting your next moves.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWordRefs = useRef<HTMLElement[]>([]);
  const statsIntroRef = useRef<HTMLParagraphElement>(null);
  const introWordRefs = useRef<HTMLElement[]>([]);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [statValues, setStatValues] = useState<number[]>(STATS.map(() => 0));
  const hasCountedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const allEls = [
        eyebrowRef.current,
        headingRef.current ? Array.from(headingRef.current.querySelectorAll(".heading-word")) : [],
        statsIntroRef.current ? Array.from(statsIntroRef.current.querySelectorAll(".scroll-word")) : [],
        statsIntroRef.current,
        ...(statsRowRef.current?.querySelectorAll(".stat-item") || []),
        testimonialRef.current,
        ...stepRefs.current,
      ].flat().filter(Boolean);
      gsap.set(allEls, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {

      gsap.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } }
      );

      const headingEl = headingRef.current;
      let headingWords: HTMLElement[] = [];

      if (headingEl) {
        const text = headingEl.textContent ?? "";
        const words = text.split(" ");
        headingEl.innerHTML = "";
        words.forEach((word, wi) => {
          const span = document.createElement("span");
          span.className = "heading-word";
          span.textContent = word + (wi < words.length - 1 ? "\u00A0" : "");
          headingEl.appendChild(span);
          headingWords.push(span);
        });
        headingWordRefs.current = headingWords;
      }

      if (headingWords.length && !prefersReduced) {
        gsap.set(headingWords, { opacity: 0.15 });

        ScrollTrigger.create({
          trigger: headingEl,
          start: "top 85%",
          end: "top 35%",
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress;
            const total = headingWords.length;
            const revealCount = Math.floor(progress * total);
            headingWords.forEach((word, i) => {
              if (i <= revealCount) {
                gsap.to(word, {
                  opacity: 1,
                  duration: 0.01,
                  overwrite: "auto",
                });
              } else {
                gsap.to(word, {
                  opacity: 0.15,
                  duration: 0.01,
                  overwrite: "auto",
                });
              }
            });
          },
        });
      }

      const introEl = statsIntroRef.current;
      let introWords: HTMLElement[] = [];

      if (introEl) {
        const text = introEl.textContent ?? "";
        const words = text.split(" ");
        introEl.innerHTML = "";
        words.forEach((word, wi) => {
          const span = document.createElement("span");
          span.className = "scroll-word";
          span.textContent = word + (wi < words.length - 1 ? "\u00A0" : "");
          introEl.appendChild(span);
          introWords.push(span);
        });
        introWordRefs.current = introWords;
      }

      if (introWords.length && !prefersReduced) {
        gsap.set(introWords, { opacity: 0.15 });

        ScrollTrigger.create({
          trigger: introEl,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress;
            const total = introWords.length;
            const revealCount = Math.floor(progress * total);
            introWords.forEach((word, i) => {
              if (i <= revealCount) {
                gsap.to(word, {
                  opacity: 1,
                  duration: 0.01,
                  overwrite: "auto",
                });
              }
            });
          },
        });
      }

      const statItems = statsRowRef.current?.querySelectorAll<HTMLElement>(".stat-item");
      if (statItems?.length) {
        gsap.fromTo(
          Array.from(statItems),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: statsRowRef.current, start: "top 82%", toggleActions: "play none none none",
              onEnter: () => {
                if (hasCountedRef.current) return;
                hasCountedRef.current = true;
                STATS.forEach((stat, i) => {
                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: stat.value, duration: 2, delay: i * 0.15, ease: "power1.inOut",
                    onUpdate: () => {
                      setStatValues((prev) => {
                        const next = [...prev];
                        next[i] = parseFloat(obj.val.toFixed(1));
                        return next;
                      });
                    },
                  });
                });
              },
            },
          }
        );
      }

      gsap.fromTo(
        testimonialRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: testimonialRef.current, start: "top 85%", toggleActions: "play none none none" } }
      );

      stepRefs.current.forEach((stepEl) => {
        if (!stepEl) return;
        gsap.fromTo(
          stepEl,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: stepEl, start: "top 85%", toggleActions: "play none none none" } }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-bg-void border-t border-border-hairline overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 console-grid opacity-[0.07] pointer-events-none" aria-hidden="true" />

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-signal/5 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">

        <div ref={eyebrowRef} className="flex items-center gap-4 mb-12 opacity-0">
          <span className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase font-semibold">
            About
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-signal/40 via-border-hairline to-transparent" />
        </div>

        <h2
          id="about-heading"
          ref={headingRef}
          className="font-display font-extrabold tracking-tight text-text-primary leading-[1.1] mb-20
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl"
          style={{ opacity: 1 }}
        >
          I combine technical project management with hands-on engineering expertise to deliver products that work.
        </h2>

        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary/60 uppercase">
              Numbers Don&apos;t Lie
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-border-hairline/40 to-transparent" />
          </div>

          <p
            ref={statsIntroRef}
            className="font-sans text-base sm:text-lg text-text-secondary/70 max-w-2xl mb-12 leading-relaxed"
            style={{ opacity: 1 }}
          >
            With a track record in project coordination and full-stack delivery, I craft digital products that drive results.
          </p>

          <div ref={statsRowRef}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-hairline/20 border border-border-hairline/30 rounded-xl overflow-hidden">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stat-item flex flex-col items-center justify-center py-10 px-6
                    bg-bg-surface/30 backdrop-blur-sm
                    hover:bg-bg-surface transition-colors duration-300 opacity-0"
                >
                  <span className="font-display text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
                    {stat.prefix}
                    {stat.value % 1 === 0
                      ? Math.floor(statValues[i])
                      : statValues[i].toFixed(1)}
                    <span className="text-signal">{stat.suffix}</span>
                  </span>
                  <span className="font-mono text-[10px] text-text-secondary tracking-[0.15em] uppercase mt-2 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={testimonialRef}
          className="relative rounded-2xl border border-border-hairline/40 bg-bg-surface/20 backdrop-blur-sm p-10 md:p-14 mb-24 overflow-hidden opacity-0"
        >
          <Quote className="absolute top-4 left-4 w-16 h-16 text-signal/5" aria-hidden="true" />

          <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-signal/50 to-transparent" aria-hidden="true" />

          <blockquote className="relative z-10">
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary leading-[1.4] tracking-tight max-w-3xl">
              &ldquo;Working with Sajideen felt personal. The process was smooth, the deliverables were clean, and every detail had meaning.&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-signal/20 border border-signal/30 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-signal">DS</span>
              </div>
              <div>
                <cite className="font-sans text-sm text-text-primary not-italic font-semibold block">
                  Client Name
                </cite>
                <span className="font-mono text-[10px] text-text-secondary/60 tracking-widest uppercase">
                  Founder at Company
                </span>
              </div>
            </footer>
          </blockquote>
        </div>

        <div ref={processRef}>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase font-semibold">
              How We Work
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-signal/40 via-border-hairline to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="group p-6 rounded-xl border border-border-hairline bg-bg-surface/40 backdrop-blur-sm
                  hover:border-signal/20 hover:bg-bg-surface transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-text-secondary/50">
                    STEP {step.number}
                  </span>
                  <span className="text-signal font-display text-lg font-bold">.</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg mb-3 group-hover:text-signal transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
