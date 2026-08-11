"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download, ExternalLink, Terminal, Mail, Linkedin, Github,
  MapPin, Clock, Copy, Check, ChevronRight, Command,
} from "lucide-react";
import { content } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const COMMANDS = [
  { cmd: "whoami", desc: "identity & role" },
  { cmd: "email", desc: "copy email" },
  { cmd: "linkedin", desc: "open profile" },
  { cmd: "github", desc: "open profile" },
  { cmd: "cv", desc: "download CV" },
  { cmd: "help", desc: "list commands" },
  { cmd: "clear", desc: "clear console" },
] as const;

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
  timestamp: string;
};

function formatTime() {
  return new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function useTypedText(text: string, active: boolean, speed = 45) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);

  return { out, done };
}

const PROMPT = "sajideen@portfolio:~$";

export default function TerminalContact() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [now, setNow] = useState("--:--:--");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNow(formatTime());
    const id = setInterval(() => setNow(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const bootRef = useRef<HTMLDivElement>(null);
  const bootInView = useInViewOnce(bootRef);
  const boot = useTypedText("connecting to sajideen.dev ... channel_secure ✓", bootInView, 32);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, showHelp]);

  useEffect(() => {
    if (bootInView && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), boot.out.length * 0.01 + 800);
      return () => clearTimeout(t);
    }
  }, [bootInView, boot.out.length]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(content.personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, []);

  const push = (cmd: string, outputNode: React.ReactNode) => {
    setHistory((prev) => [...prev, { command: cmd, output: outputNode, timestamp: formatTime() }]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setInput("");
    setShowHelp(false);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    if (cmd === "help") {
      setShowHelp(true);
      return;
    }

    let node: React.ReactNode;
    switch (cmd) {
      case "whoami":
        node = (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-accent-cyan">
              <span className="text-accent-terminal">▸</span>
              <span className="font-semibold text-text-primary">Sajideen Hassan</span>
            </div>
            <div className="ml-4 text-text-secondary">Associate Software Engineer</div>
            <div className="ml-4 text-text-muted">Based in Lahore, Pakistan • Remote-first</div>
          </div>
        );
        break;
      case "email":
        copyEmail();
        node = (
          <div className="flex items-center gap-2 text-accent-emerald">
            <Check className="h-3.5 w-3.5" />
            <span>copied to clipboard → {content.personal.email}</span>
          </div>
        );
        break;
      case "linkedin":
        window.open(content.personal.linkedin, "_blank");
        node = <Opening label="linkedin.com/in/sajideen-hassan" />;
        break;
      case "github":
        window.open(content.personal.github, "_blank");
        node = <Opening label="github.com/Sajideen-Hassan" />;
        break;
      case "cv":
        window.open(content.personal.resumeUrl, "_blank");
        node = <Opening label="Sajideen-CV.pdf" />;
        break;
      default:
        node = (
          <div className="flex items-center gap-2 text-red-400">
            <span>✗</span>
            <span>
              command not found: <span className="font-semibold text-accent-cyan">{cmd}</span>. Type <span className="font-semibold">help</span>
            </span>
          </div>
        );
    }
    push(cmd, node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = COMMANDS.filter((c) => c.cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0].cmd);
    } else if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      setInput(history[history.length - 1].command);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border-subtle bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 60% at 70% 0%, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #ccff00, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF9900, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]">
            <Terminal className="h-4 w-4" />
            07 // Contact // Open a secure channel
          </span>
          <h2 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
            Initiate a
            <span className="bg-gradient-to-r from-[#ccff00] to-[#ff9900] bg-clip-text text-transparent"> connection</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
            {content.contact.description} Drop a line, or run a command below. Every
            path reaches a real human on the other end.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border-subtle/70 bg-bg-surface/70 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ccff00] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ccff00]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-text-secondary">
                  Channel open, accepting
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-text-muted" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">Location</p>
                    <p className="mt-1 text-sm text-text-primary">{content.personal.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-text-muted" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">Response time</p>
                    <p className="mt-1 text-sm text-text-primary">&lt; 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-text-muted" />
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">Email</p>
                    <button
                      onClick={copyEmail}
                      className="mt-1 flex max-w-full items-center gap-2 text-sm text-accent-cyan transition-colors hover:text-text-primary"
                    >
                      <span className="truncate">{content.personal.email}</span>
                      {copied ? <Check className="h-3.5 w-3.5 shrink-0 text-accent-emerald" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-border-subtle/50 pt-5">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: content.personal.linkedin },
                  { icon: Github, label: "GitHub", href: content.personal.github },
                  { icon: Download, label: "Download CV", href: content.personal.resumeUrl, download: "sajideenhassan-cv(Ase).pdf" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.download ? undefined : "_blank"}
                    rel={link.download ? undefined : "noopener noreferrer"}
                    download={link.download}
                    className="group flex items-center justify-between rounded-lg border border-border-subtle bg-bg-elevated/40 px-4 py-3 transition-all duration-300 hover:border-[#ccff00]/40 hover:bg-bg-elevated"
                  >
                    <span className="flex items-center gap-3 text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                      <link.icon className="h-4 w-4 text-accent-cyan" />
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#ccff00]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface/85 shadow-[0_25px_120px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-elevated/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="ml-3 flex min-w-0 items-center gap-2 rounded-full border border-border-subtle bg-bg px-3 py-1 font-mono text-[10px] text-text-secondary">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-accent-cyan" />
                <span className="truncate">sajideen@portfolio: ~/connect</span>
              </div>
              <div className="ml-auto hidden items-center gap-2 font-mono text-[10px] text-text-muted sm:flex">
                <Command className="h-3 w-3" />
                bash v3.1
              </div>
            </div>

            <div
              ref={terminalRef}
              className="terminal-grid bg-bg/70 p-5 font-mono text-sm sm:p-6"
              style={{
                maxHeight: "520px",
                minHeight: "360px",
                overflowY: "auto",
              }}
            >
              <div ref={bootRef} className="min-h-[280px]">
                <div className="mb-1 flex items-center gap-2 text-accent-cyan">
                  <span className="text-accent-terminal">{now}</span>
                  <span className="text-accent-terminal">$</span>
                  <span className="text-[11px] text-text-muted">/connect</span>
                </div>
                <div className="mb-2 text-accent-emerald">
                  {boot.out}
                  {!boot.done && <span className="ml-0.5 inline-block h-3 w-2 animate-pulse bg-accent-cyan align-middle" />}
                </div>
                <div className="mb-3 text-[11px] text-text-muted">
                  Type <span className="text-accent-cyan">help</span> for commands • <span className="text-accent-cyan">Tab</span> autocompletes • <span className="text-accent-cyan">↑/↓</span> history
                </div>

                {showHelp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-3 space-y-1 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-3 text-[11px]"
                  >
                    <div className="text-accent-cyan font-semibold">AVAILABLE COMMANDS</div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {COMMANDS.map((c) => (
                        <div key={c.cmd} className="flex items-center gap-1.5">
                          <span className="text-accent-terminal">▸</span>
                          <span className="text-accent-cyan">{c.cmd}</span>
                          <span className="text-text-muted">{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  {history.map((entry, index) => (
                    <motion.div
                      key={`${entry.command}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="space-y-1"
                    >
                      <div className="flex items-baseline gap-2 text-accent-cyan">
                        <span className="text-accent-terminal text-[11px]">{entry.timestamp}</span>
                        <span className="text-accent-terminal">$</span>
                        <span className="font-semibold">{entry.command}</span>
                      </div>
                      <div className="ml-7 text-sm">{entry.output}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-border-subtle/30 pt-3 text-accent-cyan">
                  <span className="text-accent-terminal text-[11px]">{now}</span>
                  <span className="font-mono text-sm">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
                    placeholder="enter a command..."
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                  <span className="inline-block h-4 w-2 animate-pulse bg-accent-cyan" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle bg-bg-elevated/60 px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-muted">Quick run:</span>
              {COMMANDS.map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => runCommand(c.cmd)}
                  className="cursor-pointer rounded-md border border-border-subtle bg-bg px-2.5 py-1 font-mono text-[10px] text-text-secondary transition-all duration-300 hover:border-accent-cyan/40 hover:text-accent-cyan"
                >
                  {c.cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-text-muted">
            <ExternalLink className="h-3.5 w-3.5 text-accent-cyan" />
            © 2026 Sajideen Hassan. Built with Next.js & Precision
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-text-muted">
            exit_code <span className="text-accent-emerald">0</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

function useInViewOnce(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function Opening({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-accent-cyan">
      <span className="text-accent-terminal">▸</span>
      <span>opening</span>
      <span className="text-text-primary">{label}</span>
      <ExternalLink className="h-3 w-3" />
    </div>
  );
}