"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award, ShieldCheck, ExternalLink, CheckCircle2, Layers,
  Database, Cpu, Terminal, Globe, Workflow, BadgeCheck,
  ArrowUpRight, BookOpen, Fingerprint,
} from "lucide-react";
import { content } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Table: Database,
  Diagram: Workflow,
  Bot: Cpu,
  Code: Terminal,
  Layers: Layers,
  Cloud: Globe,
};

type Cert = typeof content.certifications[0];

const PLATFORM_METADATA: Record<string, { color: string; category: string; maturity: "core" | "specialized" | "emerging" }> = {
  Coursera: { color: "#0056D2", category: "CS Fundamentals", maturity: "core" },
  "Development Island": { color: "#10B981", category: "AI Engineering", maturity: "emerging" },
  Udemy: { color: "#EC5252", category: "Full-Stack Engineering", maturity: "core" },
  NAVTTC: { color: "#6366F1", category: "Modern Web Architecture", maturity: "core" },
  AWS: { color: "#FF9900", category: "Cloud Architecture", maturity: "specialized" },
};

function getMaturityBadge(maturity: "core" | "specialized" | "emerging") {
  const configs = {
    core: { label: "CORE", color: "#ccff00", bg: "rgba(204, 255, 0, 0.1)" },
    specialized: { label: "SPECIALIZED", color: "#FF9900", bg: "rgba(255, 153, 0, 0.1)" },
    emerging: { label: "EMERGING", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
  };
  return configs[maturity];
}

function useCountUp(target: number, start: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

function OrbitVault({
  certs,
  active,
  onHover,
  onSelect,
}: {
  certs: Cert[];
  active: number | null;
  onHover: (i: number | null) => void;
  onSelect: (i: number) => void;
}) {
  const n = certs.length;
  const radius = 36;
  const activeCert = active !== null ? certs[active] : null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(204,255,0,0.10), transparent 65%)" }}
      />

      <div
        aria-hidden="true"
        className="seal-ring absolute inset-[16%] rounded-full border border-dashed border-[#ccff00]/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[27%] rounded-full border border-border-subtle/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[14%] top-1/2 h-px -translate-y-1/2 rotate-[-12deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[14%] top-1/2 h-px -translate-y-1/2 rotate-[12deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[24%] top-1/2 h-px -translate-y-1/2 rotate-90 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />

      <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {activeCert ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative flex h-full w-full items-center justify-center rounded-2xl border border-border-subtle/80 bg-bg-surface/95 p-4 text-center shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-5"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${activeCert.platformColor}, transparent)` }}
              />
              <div className="flex flex-col items-center">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: `${activeCert.platformColor}18`, color: activeCert.platformColor, border: `1px solid ${activeCert.platformColor}40` }}
                >
                  {(() => {
                    const Icon = ICON_MAP[activeCert.icon] || Award;
                    return <Icon className="h-4 w-4" />;
                  })()}
                </span>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.24em]" style={{ color: activeCert.platformColor }}>
                  {activeCert.platform}
                </p>
                <h4 className="mt-1.5 font-display text-[15px] font-bold leading-tight text-text-primary">
                  {activeCert.title}
                </h4>
                <p className="mt-1.5 text-[11px] leading-5 text-text-secondary">{activeCert.issuer}</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-text-muted">
                  {activeCert.period}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="core"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-[#ccff00]/30 bg-bg-surface/90 text-center backdrop-blur-md"
            >
              <span className="font-display text-6xl font-bold leading-none text-[#ccff00]">
                {String(certs.length).padStart(2, "0")}
              </span>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
                Certified
              </span>
              <span className="mt-5 max-w-[140px] font-mono text-[8px] uppercase leading-4 tracking-[0.24em] text-text-muted/70">
                Tap or hover an icon to inspect
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {certs.map((cert, i) => {
        const Icon = ICON_MAP[cert.icon] || Award;
        const angle = (i / n) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const left = `${50 + radius * Math.cos(rad)}%`;
        const top = `${50 + radius * Math.sin(rad)}%`;
        const isActive = active === i;

        return (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left, top }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(i)}
            role="button"
            tabIndex={0}
            aria-label={cert.title}
            aria-pressed={isActive}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(i);
              }
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5 + i * 0.45, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 sm:h-14 sm:w-14"
                style={{
                  background: isActive ? cert.platformColor : `${cert.platformColor}1a`,
                  borderColor: isActive ? cert.platformColor : `${cert.platformColor}55`,
                  color: isActive ? "#0a0b0e" : cert.platformColor,
                  boxShadow: isActive
                    ? `0 0 30px ${cert.platformColor}88`
                    : `0 0 20px ${cert.platformColor}25`,
                }}
                title={cert.platform}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span
                className="mt-1.5 max-w-[72px] truncate font-mono text-[7px] uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: isActive ? cert.platformColor : "rgba(148,163,184,0.8)" }}
              >
                {cert.platform}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Certifications() {
  const certs = content.certifications;

  const statRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statRef, { once: true, margin: "-80px" });
  const count = useCountUp(certs.length, inView);
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  if (!certs.length) return null;

  const platforms = new Set(certs.map((c) => c.platform));
  const categories = new Set(certs.map((c) => PLATFORM_METADATA[c.platform]?.category || "General"));

  const active = pinned !== null ? pinned : hovered;
  const activeCert = active !== null ? certs[active] : null;
  const activeMeta = activeCert ? PLATFORM_METADATA[activeCert.platform] || { category: "Professional Development" } : null;

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border-subtle bg-bg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black, transparent 85%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-10 h-[480px] w-[480px] rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #0056D2, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF9900, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]">
            <ShieldCheck className="h-4 w-4" />
            06 // Credentials // Certifications
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-6xl xl:text-7xl">
                Credentials that
                <br />
                <span className="text-[#ccff00]">back the work</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-text-secondary">
                I keep my learning visible. Hover or tap an icon on the ring to
                see the platform, the focus, and what I studied in each course.
              </p>
            </div>

            <div
              ref={statRef}
              className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-6 border-t border-border-subtle/50 pt-6 sm:gap-x-14 lg:border-t-0 lg:pt-0"
            >
              {[
                { value: count, suffix: "", label: "Credentials" },
                { value: platforms.size, suffix: "", label: "Platforms" },
                { value: categories.size, suffix: "", label: "Domains" },
                { value: 100, suffix: "%", label: "Verifiable" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-3xl font-bold text-[#ccff00] md:text-4xl">
                    {String(stat.value).padStart(2, "0")}{stat.suffix}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16"
        >
          <div className="w-full flex-1">
            <OrbitVault
              certs={certs}
              active={active}
              onHover={setHovered}
              onSelect={(i) => setPinned(i)}
            />
          </div>

          <AnimatePresence mode="wait">
            {activeCert ? (
              <motion.aside
                key={activeCert.title}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full max-w-sm lg:w-[360px]"
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-border-subtle/80 bg-bg-surface/70 p-7 backdrop-blur-md"
                  style={{ boxShadow: `0 0 60px ${activeCert.platformColor}14` }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${activeCert.platformColor}, transparent 80%)` }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: activeCert.platformColor }}>
                      Inspector // {activeCert.platform}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted">
                      SHA-{String((active ?? 0) + 1).padStart(3, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-text-primary">
                    {activeCert.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    {activeCert.issuer} · {activeCert.period}
                  </p>

                  <div className="mt-5 flex items-start gap-3 rounded-lg border border-border-subtle bg-bg-elevated/40 p-3.5">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#ccff00]" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-text-muted">
                        What I studied
                      </p>
                      <p className="mt-1.5 text-[13px] leading-6 text-text-secondary">
                        {activeCert.focus}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {activeMeta && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-secondary">
                        <BadgeCheck className="h-3 w-3 text-[#ccff00]" /> {activeMeta.category}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                      <CheckCircle2 className="h-3 w-3" style={{ color: activeCert.platformColor }} /> Verified
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border-subtle/40 pt-5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                      <Fingerprint className="h-3.5 w-3.5" style={{ color: activeCert.platformColor }} />
                      100% verifiable
                    </span>
                    {activeCert.verifyUrl && (
                      <a
                        href={activeCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/verify inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300"
                        style={{ borderColor: `${activeCert.platformColor}45`, color: activeCert.platformColor }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = activeCert.platformColor; e.currentTarget.style.color = "#0a0b0e"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = activeCert.platformColor; }}
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.aside>
            ) : (
              <motion.aside
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden w-full max-w-sm lg:block lg:w-[360px]"
              >
                <div className="flex h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle/70 p-8 text-center">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 text-[#ccff00]">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <p className="font-mono text-[10px] uppercase leading-6 tracking-[0.26em] text-text-muted">
                    Tap or hover an icon to inspect each credential
                  </p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col gap-6 border-t border-border-subtle/40 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {certs.map((cert) => (
              <span key={cert.title} className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-text-secondary">
                {cert.platform}
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-text-muted transition-colors hover:text-[#ccff00]"
          >
            Request full transcripts <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}