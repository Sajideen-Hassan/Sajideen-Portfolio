"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, ExternalLink, Terminal, Sparkles } from "lucide-react";
import { content } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

const commands = [
  { label: "/show", description: "Show available commands" },
  { label: "/show linkedin", description: "Open LinkedIn profile" },
  { label: "/show email", description: "Copy email address" },
  { label: "/show resume", description: "Download resume" },
  { label: "/show socials", description: "Show social links" },
  { label: "/show all", description: "Show full contact directory" },
  { label: "/show clear", description: "Clear the terminal" },
  { label: "/show help", description: "List syntax" },
];

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

export default function TerminalContact() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const runCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let outputNode: React.ReactNode = null;

    switch (cleanCmd) {
      case "/show":
        outputNode = (
          <div className="space-y-2 py-2 font-mono text-sm text-text-secondary">
            <p className="font-semibold text-accent-cyan">
              AVAILABLE SHOW COMMANDS:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {commands.map((command) => (
                <li key={command.label}>
                  <span className="text-text-primary">{command.label}</span> —{" "}
                  {command.description}
                </li>
              ))}
            </ul>
          </div>
        );
        break;
      case "/show linkedin":
        outputNode = (
          <div className="py-2 font-mono text-sm">
            <p className="text-text-secondary">🔗 LinkedIn Profile:</p>
            <a
              href={content.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-accent-cyan underline"
            >
              {content.personal.linkedin}{" "}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        );
        break;
      case "/show email":
        outputNode = (
          <div className="flex flex-wrap items-center gap-3 py-2 font-mono text-sm">
            <span className="text-text-secondary">✉️ Email:</span>
            <span className="font-semibold text-text-primary">
              {content.personal.email}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(content.personal.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="rounded border border-border-subtle bg-bg-elevated px-2 py-1 text-xs text-accent-cyan transition hover:bg-accent-cyan hover:text-black"
            >
              {copied ? "[Copied]" : "[Copy Email]"}
            </button>
          </div>
        );
        break;
      case "/show github":
        outputNode = (
          <div className="py-2 font-mono text-sm">
            <p className="text-text-secondary">🐙 GitHub Profile:</p>
            <a
              href={content.personal.github}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-accent-cyan underline"
            >
              {content.personal.github} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        );
        break;
      case "/show socials":
        outputNode = (
          <div className="flex flex-wrap gap-3 py-2 font-mono text-sm">
            {[
              { label: "LinkedIn", href: content.personal.linkedin },
              { label: "GitHub", href: content.personal.github },
              { label: "Email", href: `mailto:${content.personal.email}` },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded border border-border-subtle bg-bg-elevated px-3 py-2 text-accent-cyan transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        );
        break;
      case "/show resume":
        outputNode = (
          <div className="py-2 font-mono text-sm text-text-secondary">
            <a
              href={content.personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-accent-cyan underline"
            >
              Download Resume <Download className="h-3.5 w-3.5" />
            </a>
          </div>
        );
        break;
      case "/show all":
        outputNode = (
          <div className="my-2 space-y-2 rounded-lg border border-accent-cyan/30 bg-bg-surface p-4 font-mono text-sm">
            <p className="font-semibold text-accent-emerald">
              === PROJECT COORDINATOR CONTACT DIRECTORY ===
            </p>
            <p>📍 Location: Remote / Available Globally</p>
            <p>📧 Email: {content.personal.email}</p>
            <p>💼 LinkedIn: {content.personal.linkedin}</p>
            <p>🌐 GitHub: {content.personal.github}</p>
            <p>⚡ Status: Ready for sprint onboarding</p>
          </div>
        );
        break;
      case "/show clear":
        setHistory([]);
        return;
      case "/show help":
        outputNode = (
          <div className="space-y-2 py-2 font-mono text-sm text-text-secondary">
            <p className="font-semibold text-accent-cyan">SUPPORTED SYNTAX:</p>
            <p>
              Use /show [linkedin|email|github|socials|resume|all|clear|help]
            </p>
          </div>
        );
        break;
      default:
        outputNode = (
          <p className="py-1 font-mono text-sm text-red-400">
            Command not recognized: &quot;{cmd}&quot;. Type{" "}
            <span className="font-semibold text-accent-cyan">/show</span> for
            the command list.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
  };

  const promptLine = useMemo(
    () => `~/portfolio ${input ? input : ""}`.trim(),
    [input],
  );

  return (
    <ScrollReveal
      id="terminal"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.32em] text-accent-cyan">
              08 // Terminal // Direct Contact
            </p>
            <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
              Launch the command surface
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface/70 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.24em] text-text-secondary">
            <Sparkles className="h-3.5 w-3.5 text-accent-cyan" /> Interactive
            CLI
          </div>
        </div>

        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[28px] border border-border-subtle bg-bg-surface/85 shadow-[0_25px_120px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-elevated/80 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <div className="ml-3 flex items-center gap-2 rounded-full border border-border-subtle bg-bg px-3 py-1 text-[11px] font-mono text-text-secondary">
              <Terminal className="h-3.5 w-3.5 text-accent-cyan" />{" "}
              coordinator-terminal v2.4.0 — bash
            </div>
          </div>

          <div className="terminal-grid min-h-[440px] bg-bg/70 p-5 font-mono text-sm">
            <div className="mb-4 space-y-2 rounded-lg border border-border-subtle bg-bg/70 p-4 text-text-secondary">
              <p className="text-accent-emerald">
                Welcome to the contact terminal.
              </p>
              <p>
                Type <span className="text-accent-cyan">/show</span> to explore
                supported commands.
              </p>
            </div>

            <div className="space-y-3">
              {history.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="space-y-2">
                  <div className="flex items-center gap-2 text-accent-cyan">
                    <span className="text-accent-terminal">$</span>
                    <span>{entry.command}</span>
                  </div>
                  {entry.output}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-accent-cyan">
              <span className="text-accent-terminal">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!input.trim()) return;
                    runCommand(input);
                    setInput("");
                  }
                }}
                className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-muted"
                placeholder="Type /show"
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
