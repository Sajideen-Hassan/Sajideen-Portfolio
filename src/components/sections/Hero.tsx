"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { content } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const VOLT = "#ccff00";

const NAV = [
  { index: "01", label: "About", href: "about" },
  { index: "02", label: "Experience", href: "experience" },
  { index: "03", label: "Work", href: "projects" },
  { index: "04", label: "Connect", href: "terminal" },
];

const MARQUEE = [
  "Coordinating Teams",
  "Building Products",
  "Delivering Results",
  "MERN",
  "PERN",
  "Python",
  "AI Solutions",
  "Agile Workflows",
  "Quality-Driven Development",
];

const SOCIALS = [
  { href: content.personal.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: content.personal.github, Icon: Github, label: "GitHub" },
  { href: content.personal.twitter, Icon: Twitter, label: "X" },
  { href: `mailto:${content.personal.email}`, Icon: Mail, label: "Email" },
];

function useLocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Karachi",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function RotatingBadge() {
  const words = "• OPEN TO WORK • SAJIDEEN HASSAN ";
  return (
    <div className="absolute -bottom-10 -left-10 z-20 hidden sm:block">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="hero-ring-spin absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id="badgeCircle"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text className="fill-[#94a3b8] font-mono text-[8.5px] uppercase tracking-[0.22em]">
            <textPath href="#badgeCircle">{words}</textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

function FloatChip({ value, label, x, y, align }: { value: string; label: string; x: number; y: number; align: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -120 : 120, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: align === "left" ? -120 : 120, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`absolute z-20 hidden flex-col md:flex ${align === "left" ? "items-start" : "items-end"}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
        <span className="font-display text-2xl font-bold leading-none text-[#ccff00]">{value}</span>
        <span className="max-w-[120px] font-mono text-[8px] uppercase leading-tight tracking-[0.18em] text-text-secondary">
          {label}
        </span>
      </div>
      <span className={`mt-2 h-3 w-px bg-[#ccff00]/60 ${align === "left" ? "ml-6" : "mr-6"}`} />
    </motion.div>
  );
}

function OrbitBurst() {
  return (
    <>
      {[0, 72, 144, 216, 288].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#ccff00]"
          style={{
            transform: `rotate(${deg}deg) translateX(158px)`,
            boxShadow: "0 0 14px rgba(204,255,0,0.9)",
            opacity: 0.7,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

const HERO_CHIPS = [
  { value: "20+", label: "Projects Delivered", x: -26, y: 12, align: "left" as const },
  { value: "100K+", label: "Lines of Code", x: 100, y: 46, align: "right" as const },
  { value: "20+", label: "Happy Customers", x: 100, y: 84, align: "right" as const },
];

function PortraitLockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative hidden justify-self-center md:block"
      style={{ perspective: 1200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute -left-14 -top-14 h-40 w-40 border-l-2 border-t-2 border-[#ccff00]/40" aria-hidden="true" />
      <div className="absolute -bottom-14 -right-14 h-40 w-40 border-b-2 border-r-2 border-[#ccff00]/40" aria-hidden="true" />

      <AnimatePresence>
        {hovered && HERO_CHIPS.map((c) => (
          <FloatChip key={c.label} value={c.value} label={c.label} x={c.x} y={c.y} align={c.align} />
        ))}
      </AnimatePresence>

      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative">
        <div className="hero-conic-spin absolute -inset-6 rounded-[2.5rem] bg-[conic-gradient(from_0deg,transparent,transparent_35%,rgba(204,255,0,0.55),transparent_65%,transparent)] blur-md" aria-hidden="true" />

        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-bg-elevated">
          <Image
            src="/SajideenHassanprofile.jpg"
            alt={content.personal.name}
            width={864}
            height={1184}
            priority
            className="h-[360px] w-auto object-cover grayscale contrast-125 lg:h-[400px]"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-transparent" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: "linear-gradient(160deg, transparent 45%, rgba(204,255,0,0.28) 60%, transparent 75%)" }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100" aria-hidden="true">
            <span className="rounded-full border border-[#ccff00]/50 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#ccff00] backdrop-blur-sm">
              {content.personal.name}
            </span>
          </div>
        </div>

        <OrbitBurst />
        <RotatingBadge />
      </motion.div>
    </div>
  );
}

function Headline() {
  return (
    <div className="font-display font-semibold tracking-[-0.045em] text-text-primary">
      <motion.span
        initial={{ y: "112%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.05, delay: 0.15, ease: EASE }}
        className="block overflow-hidden pb-[0.08em] -mb-[0.08em] text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.84] will-change-transform"
      >
        SAJIDEEN
      </motion.span>
      <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
        <motion.span
          initial={{ y: "112%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.05, delay: 0.26, ease: EASE }}
          className="block text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.9] will-change-transform"
          style={{
            color: "transparent",
            WebkitTextStroke: `2px ${VOLT}`,
          }}
        >
          HASSAN
        </motion.span>
      </span>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        {["Project Coordinator", "Full Stack Developer", "AI"].map((word, i) => (
          <span key={word} className="flex items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
              {word}
            </span>
            {i < 2 && <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00]" />}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 py-4">
      <div className="marquee" style={{ ["--marquee-speed" as string]: "70s" }} aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {MARQUEE.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
                  {half === 1 ? (
                    <span className="text-transparent" style={{ WebkitTextStroke: `1px ${VOLT}` }}>
                      {item}
                    </span>
                  ) : (
                    <span className="text-text-primary">{item}</span>
                  )}
                </span>
                <span className="mx-6 shrink-0 text-[#ccff00]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

export default function HeroSection() {
  const time = useLocalTime();
  const ref = useRef<HTMLElement>(null);

  const scrollTo = useMemo(
    () => (id: string) =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    [],
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[80svh] w-full flex-col overflow-hidden bg-bg"
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 95% 75% at 50% 25%, black 25%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 top-[-20rem] h-[46rem] w-[46rem] rounded-full bg-[#ccff00]/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-[-12rem] h-[36rem] w-[36rem] rounded-full bg-[#38bdf8]/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col px-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-[#ccff00]/30 font-display text-xs font-bold text-[#ccff00]">
              {content.personal.initials}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary">
              {content.personal.name}
            </span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden items-center gap-8 md:flex"
          >
            {NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="group cursor-pointer text-left"
                aria-label={item.label}
              >
                <span className="block font-mono text-[9px] tracking-[0.2em] text-text-muted transition-colors duration-300 group-hover:text-[#ccff00]">
                  {item.index}
                </span>
                <span className="block font-display text-xs font-medium uppercase tracking-[0.18em] text-text-primary transition-colors duration-300 group-hover:text-[#ccff00]">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ccff00] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ccff00]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-secondary">
              Open for work
            </span>
          </motion.div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:py-12">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-10 shrink-0 bg-[#ccff00]/60" />
              <p className="font-mono text-sm font-medium uppercase tracking-[0.35em] text-text-secondary">
                Intro
              </p>
            </motion.div>

            <Headline />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex cursor-pointer items-center gap-3 bg-[#ccff00] px-7 py-4 font-display text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#d6ff33]"
              >
                Selected work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo("about")}
                className="group inline-flex cursor-pointer items-center gap-3 border border-white/15 px-7 py-4 font-display text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-[#ccff00]/40"
              >
                The practice
                <span className="text-[#ccff00] transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>

              <a
                href={content.personal.resumeUrl}
                download
                className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.25em] text-text-secondary underline underline-offset-8 transition-colors duration-300 hover:text-[#ccff00]"
              >
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                <span className="text-text-secondary">&gt; status:</span>{" "}
                {content.personal.role}
              </span>
              <div className="hidden h-3 w-px bg-border-subtle sm:block" />
              <div className="flex items-center gap-4">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="cursor-pointer text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-[#ccff00]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <PortraitLockup />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center justify-between pb-6 pt-0"
        >
          <div className="flex items-center gap-3 text-text-muted">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#ccff00]"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-text-muted">
            <span className="text-[#ccff00]">{time}</span>
            <span>PKT · {content.personal.location}</span>
          </div>
        </motion.footer>
      </div>

      <Marquee />
    </section>
  );
}