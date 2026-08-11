"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Layers } from "lucide-react";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_META = [
  { index: "01", accent: "#ccff00", hint: "react · node · python" },
  { index: "02", accent: "#7da2ff", hint: "mongo · postgres · firebase" },
  { index: "03", accent: "#38bdf8", hint: "rest · jwt · third-party" },
  { index: "04", accent: "#4ade80", hint: "llms · agents · no-code" },
  { index: "05", accent: "#c084fc", hint: "git · docker · postman" },
  { index: "06", accent: "#ffb84d", hint: "clients · agile · tracking" },
];

export default function Skills() {
  const groups = content.skills;
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const current = filteredGroups[Math.min(active, filteredGroups.length - 1)];
  const meta = CATEGORY_META[
    Math.min(
      groups.findIndex((g) => g.category === current.category),
      CATEGORY_META.length - 1,
    ) >>> 0
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-border-subtle bg-bg"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ccff00, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
        <SectionHeader
          eyebrow="04 // Capabilities // Dev stack & tools"
          title="Core capabilities"
          accent="across development and coordination"
          description="Six areas, each with the tools I actually use day to day. Select a group to see the toolkit, or filter by name."
        />

        {/* Search */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-surface/70 px-4 py-3.5 backdrop-blur-sm focus-within:border-[#ccff00]/40">
          <Search className="h-4 w-4 shrink-0 text-text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Filter skills, e.g. React, MongoDB, Docker, Scrum…"
            className="w-full bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14">
          {/* Rail */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {filteredGroups.map((group, i) => {
                const m = CATEGORY_META[
                  Math.min(groups.findIndex((g) => g.category === group.category), 5)
                ] ?? CATEGORY_META[i % CATEGORY_META.length];
                const isActive = i === Math.min(active, filteredGroups.length - 1);
                return (
                  <button
                    key={group.category}
                    onClick={() => setActive(i)}
                    className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-transparent bg-bg-surface/90"
                        : "border-transparent hover:bg-bg-surface/40"
                    }`}
                    style={isActive ? { boxShadow: `inset 0 0 0 1px ${m.accent}55, 0 18px 40px rgba(0,0,0,.25)` } : undefined}
                  >
                    <span
                      className="font-mono text-xs font-medium"
                      style={{ color: isActive ? m.accent : "#475569" }}
                    >
                      {filteredGroups.length === 6 ? m.index : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block truncate text-sm font-semibold transition-colors ${
                          isActive ? "text-white" : "text-text-secondary"
                        }`}
                      >
                        {group.category}
                      </span>
                      <span className="block truncate font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                        {m.hint}
                      </span>
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isActive
                          ? "border-transparent"
                          : "border-border-subtle"
                      }`}
                      style={
                        isActive
                          ? { background: m.accent, color: "#0a0b0e" }
                          : undefined
                      }
                    >
                      <Layers className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Active panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.category}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-3xl border border-border-subtle/70 bg-bg-surface/50 p-7 md:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: meta.accent }}
                    >
                      {meta.hint}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
                      {current.category}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    <Layers className="h-3.5 w-3.5" />
                    {current.items.length}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {current.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 + si * 0.03, ease: EASE }}
                      className="cursor-default rounded-full border border-border-subtle bg-bg-elevated/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-[#ccff00]/40 hover:text-[#ccff00]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}