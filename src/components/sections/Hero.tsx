"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Cpu, Sparkles } from "lucide-react";
import { content } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

const focusAreas = [
  {
    title: "Execution systems",
    description:
      "Roadmaps, prioritisation, and delivery coordination that create calm momentum.",
    icon: Compass,
  },
  {
    title: "AI product delivery",
    description:
      "Technical strategy and product execution for complex modern build cycles.",
    icon: Cpu,
  },
  {
    title: "Team alignment",
    description:
      "Cross-functional leadership that keeps stakeholders, engineers, and operations in sync.",
    icon: Sparkles,
  },
];

const highlights = [
  { label: "On-time delivery", value: "98%" },
  { label: "Sprints directed", value: "30+" },
  { label: "Teams led", value: "24+" },
];

export default function HeroSection() {
  return (
    <ScrollReveal
      id="hero"
      className="relative isolate overflow-hidden bg-[#0a0b0e] px-6 py-6 sm:px-8 lg:px-12 lg:py-10"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-[#ccff00]/12 blur-3xl" />
        <div className="absolute bottom-[-3rem] right-[-4rem] h-80 w-80 rounded-full bg-[#ff9900]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          data-reveal
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
        >
          <button
            onClick={() =>
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white"
          >
            {content.personal.initials} / {content.personal.name.split(" ")[1]}
          </button>

          <nav className="hidden items-center gap-6 text-[10px] font-mono uppercase tracking-[0.28em] text-[#94a3b8] md:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#experience" className="transition hover:text-white">
              Services
            </a>
            <a href="#projects" className="transition hover:text-white">
              Work
            </a>
            <a href="#terminal" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href={`mailto:${content.personal.email}`}
            className="rounded-full border border-[#ccff00]/30 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-[#ccff00] transition hover:border-[#ccff00]/60 hover:bg-[#ccff00]/10"
          >
            {content.personal.email}
          </a>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.82fr] lg:items-stretch">
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-md lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(204,255,0,0.14),_transparent_45%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/25 bg-[#ccff00]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ccff00]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ccff00]" />
                  Available for work
                </div>

                <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,4.6vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-white">
                  Building calm execution for
                  <span className="mt-2 block text-[#ccff00]">
                    ambitious digital teams.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#94a3b8]">
                  {content.personal.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      document
                        .getElementById("experience")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
                  >
                    Explore work <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      document
                        .getElementById("terminal")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:border-[#ccff00]/40"
                  >
                    Contact me <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">
                      {item.label}
                    </div>
                    <div className="mt-2 font-display text-2xl font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            data-reveal
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
            className="flex flex-col gap-4"
          >
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#12141a]/90 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(204,255,0,0.12),_transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#94a3b8]">
                    Profile
                  </p>
                  <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-[#ccff00]">
                    Active
                  </span>
                </div>

                <div className="mt-6 rounded-[30px] border border-white/10 bg-[#0d1016] p-3">
                  <div className="rounded-[24px] border border-[#ccff00]/20 bg-[radial-gradient(circle_at_top,_rgba(204,255,0,0.14),_transparent_70%)] p-3">
                    <svg
                      viewBox="0 0 320 420"
                      className="w-full rounded-[20px] bg-[#0f1218]"
                      role="img"
                      aria-label="Portrait illustration of Sajideen Hassan"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="320"
                        height="420"
                        rx="24"
                        fill="#10131A"
                      />
                      <circle cx="160" cy="140" r="70" fill="#1C2330" />
                      <path d="M110 360c10-82 90-82 100 0" fill="#1C2330" />
                      <rect
                        x="94"
                        y="115"
                        width="132"
                        height="118"
                        rx="48"
                        fill="#ccff00"
                        opacity="0.16"
                      />
                      <circle cx="160" cy="140" r="54" fill="#11151E" />
                      <path
                        d="M125 135c8-28 36-44 60-38 24 6 34 30 35 58 0 23-8 46-30 58-19 11-45 10-61-5-17-16-24-42-20-73Z"
                        fill="#F3C89B"
                      />
                      <path
                        d="M116 365c20-54 70-84 121-70 27 7 40 20 53 41"
                        stroke="#ccff00"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-xl font-semibold text-white">
                    {content.personal.role}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#94a3b8]">
                    {content.personal.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {focusAreas.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ccff00]/25 bg-[#ccff00]/10 text-[#ccff00]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#94a3b8]">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#94a3b8]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}
