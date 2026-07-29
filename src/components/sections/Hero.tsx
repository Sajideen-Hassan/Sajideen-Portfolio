"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData, calculateExperience } from "@/data/portfolio";
import { ArrowDown, ArrowRight } from "lucide-react";

const TRUST_LOGOS = [
  { name: "TechTideCo", initials: "TT" },
  { name: "ISPR", initials: "IS" },
  { name: "LGU", initials: "LG" },
  { name: "IT Club", initials: "IT" },
];

export default function Hero() {
  const { personalInfo } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const trustedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const yearsExp = calculateExperience().replace("+ Years", "").replace(" Years", "");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headingEl = headingRef.current;
    if (!headingEl) return;
    const headingText = headingEl.textContent ?? "";
    const headingWords = headingText.split(" ");
    headingEl.innerHTML = headingWords
      .map((word, wi) => {
        const chars = Array.from(word)
          .map(
            (ch) =>
              `<span class="hero-char" style="display:inline-block;will-change:transform,opacity,filter;">${ch}</span>`
          )
          .join("");
        return `<span style="display:inline-block;overflow:hidden;margin-right:${wi < headingWords.length - 1 ? "0.25em" : "0"};">${chars}</span>`;
      })
      .join("");

    const chars = headingEl.querySelectorAll<HTMLElement>(".hero-char");

    if (prefersReduced) {
      gsap.set(
        [taglineRef.current, trustedRef.current, ctaRef.current, chars, scrollIndicatorRef.current, statsRef.current],
        { opacity: 1, y: 0, filter: "blur(0px)" }
      );
      return;
    }

    gsap.set(chars, { y: "110%", opacity: 0, filter: "blur(8px)" });
    gsap.set(
      [taglineRef.current, trustedRef.current, ctaRef.current, scrollIndicatorRef.current, statsRef.current],
      { y: 24, opacity: 0 }
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0.2);

    tl.to(
      chars,
      {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.0,
        stagger: 0.025,
        ease: "power4.out",
      },
      0.5
    );

    tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.1);

    tl.to(trustedRef.current, { y: 0, opacity: 1, duration: 0.7 }, 1.35);

    tl.to(statsRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.6);

    tl.to(scrollIndicatorRef.current, { y: 0, opacity: 1, duration: 0.5 }, 1.9);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(headingEl, {
          scale: 1 - p * 0.08,
          filter: `blur(${p * 4}px)`,
          opacity: 1 - p * 0.6,
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const el = scrollIndicatorRef.current;
    if (!el) return;
    const loop = gsap.to(el.querySelector(".arrow-bounce"), {
      y: 6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => { loop.kill(); };
  }, []);

  const totalProjects = portfolioData.projects.length;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-void"
      aria-label="Hero section"
    >
      <div className="console-grid absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-hairline to-transparent opacity-60" aria-hidden="true" />
      <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-hairline/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24 flex flex-col items-center text-center">

        <p
          ref={taglineRef}
          className="font-sans text-sm sm:text-base text-text-secondary/80 tracking-wide max-w-xl leading-relaxed mb-10 opacity-0"
        >
          {personalInfo.summary}
        </p>

        <h1
          ref={headingRef}
          className="font-display font-extrabold tracking-[-0.015em] text-text-primary leading-[1.0] mb-12
            text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem]"
          aria-label={personalInfo.name}
        >
          {personalInfo.name}
        </h1>

        <div ref={ctaRef} className="opacity-0 mb-12">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
              bg-signal text-bg-void font-semibold text-sm tracking-wider uppercase
              hover:bg-signal/90 transition-all duration-300
              hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(255,122,51,0.2)]
              hover:shadow-[0_8px_32px_rgba(255,122,51,0.3)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div
          ref={trustedRef}
          className="flex items-center gap-5 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.15em] text-text-secondary/50 uppercase shrink-0">
            trusted by
          </span>
          <div className="flex items-center gap-3">
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="w-10 h-10 rounded-full bg-bg-surface-raised border border-border-hairline flex items-center justify-center"
                title={logo.name}
              >
                <span className="font-mono text-[9px] font-bold text-text-secondary tracking-wider">
                  {logo.initials}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div
        ref={statsRef}
        className="absolute bottom-20 left-0 right-0 z-10 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border-hairline/40 rounded-xl overflow-hidden bg-border-hairline/20">
            {[
              { label: "Years Active", value: yearsExp, suffix: "+" },
              { label: "Projects Shipped", value: String(totalProjects), suffix: "" },
              { label: "Teams Led", value: "5", suffix: "+" },
              { label: "Open to Work", value: "Yes", suffix: "" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-5 px-4 bg-bg-surface/50 backdrop-blur-sm"
              >
                <span className="font-display text-3xl font-extrabold text-text-primary">
                  {stat.value}
                  {stat.suffix && <span className="text-signal">{stat.suffix}</span>}
                </span>
                <span className="font-mono text-[10px] text-text-secondary tracking-widest mt-1 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-0"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-secondary/50 uppercase">
          Scroll
        </span>
        <div className="arrow-bounce text-text-secondary/40">
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
