"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Credentials" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + window.innerHeight / 3;
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && pos >= el.offsetTop) current = section.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-[90]"
    >
      <div
        className={`flex items-center justify-between border-b px-6 transition-colors duration-500 md:px-10 lg:px-16 ${
          scrolled
            ? "border-border-subtle bg-bg/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex cursor-pointer items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-[#ccff00]/30 font-display text-xs font-bold text-[#ccff00]">
              {content.personal.initials}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary sm:block">
              {content.personal.name}
            </span>
          </button>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`group relative flex cursor-pointer flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active === s.id ? "text-[#ccff00]" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {s.label}
                <span
                  className={`h-px w-4 transition-colors duration-300 ${
                    active === s.id ? "bg-[#ccff00]" : "bg-transparent group-hover:bg-text-muted"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="relative hidden items-center gap-2.5 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ccff00] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ccff00]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Open for work
              </span>
            </span>

            <button
              onClick={() => scrollTo("contact")}
              className="group hidden cursor-pointer items-center gap-2 border border-[#ccff00]/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.15em] text-[#ccff00] transition-colors duration-300 hover:bg-[#ccff00] hover:text-black md:inline-flex"
            >
              Connect
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex flex-col gap-1.5 p-2 md:hidden"
            >
              <span
                className={`block h-px w-6 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-b border-border-subtle bg-bg/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex cursor-pointer items-center justify-between border-b border-border-subtle/50 py-3 text-left transition-colors ${
                    active === s.id ? "text-[#ccff00]" : "text-text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
                      {s.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </button>
              ))}

              <button
                onClick={() => scrollTo("contact")}
                className="mt-4 flex cursor-pointer items-center justify-center gap-2 bg-[#ccff00] px-4 py-3 font-display text-sm font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-[#d6ff33]"
              >
                Connect
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
