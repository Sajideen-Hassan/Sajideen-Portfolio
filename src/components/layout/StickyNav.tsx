"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Philosophy" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Capabilities" },
  { id: "contact", label: "Connect" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const pos = y + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && pos >= el.offsetTop) {
          setActive(sections[i].id);
          break;
        }
      }
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
      transition={{ duration: 0.6, delay: 1.5 }}
      className="fixed top-0 left-0 right-0 z-[90]"
    >
      <div className="flex items-center justify-between h-14 px-6 md:px-16 max-w-[1680px] mx-auto">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-sm font-bold text-ink tracking-tight"
        >
          {content.personal.initials}
          <span className="text-terracotta">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                active === s.id
                  ? "text-terracotta"
                  : "text-faint hover:text-ink-soft"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-terracotta/30 text-terracotta font-mono text-[9px] uppercase tracking-[0.15em] rounded-full hover:bg-terracotta/10 transition-all"
        >
          Initiate
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-4 h-[1px] bg-ink transition-all ${mobileOpen ? "rotate-45 translate-y-[2.5px]" : ""}`}
          />
          <span
            className={`block w-4 h-[1px] bg-ink transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-4 h-[1px] bg-ink transition-all ${mobileOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`}
          />
        </button>
      </div>

      {scrolled && <div className="absolute inset-0 glass-strong -z-10" />}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass border-b border-hairline px-6 py-6 flex flex-col gap-4"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`font-mono text-xs tracking-wider text-left ${active === s.id ? "text-terracotta" : "text-faint hover:text-ink-soft"}`}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="font-mono text-xs tracking-wider text-left text-terracotta mt-2 pt-4 border-t border-hairline"
            >
              Initiate &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
