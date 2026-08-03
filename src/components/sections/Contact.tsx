"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Linkedin, Github, Copy, Check, Terminal } from "lucide-react"
import { content } from "@/data/content"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState("")

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(content.personal.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [])

  const handleTerminal = (cmd: string) => {
    switch (cmd.trim().toLowerCase()) {
      case "/help":
        setTerminalOutput("Available: /email, /cv, /linkedin, /github")
        break
      case "/email":
        copyEmail()
        setTerminalOutput("Email copied to clipboard!")
        break
      case "/cv":
        setTerminalOutput("Opening CV...")
        window.open(content.personal.resumeUrl, "_blank")
        break
      case "/linkedin":
        setTerminalOutput("Opening LinkedIn...")
        window.open(content.personal.linkedin, "_blank")
        break
      case "/github":
        setTerminalOutput("Opening GitHub...")
        window.open(content.personal.github, "_blank")
        break
      default:
        setTerminalOutput(`Command not found: ${cmd}. Type /help`)
    }
  }

  return (
    <section id="contact" className="bg-canvas-void border-t border-grid-wire py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1680px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-signal-emerald mb-4">
            Ready to Build the Unexpected?
          </p>
          <h2 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight mb-6">
            Let&apos;s <span className="text-text-steel">Connect</span>
          </h2>
          <p className="text-sm text-text-steel mb-8 max-w-xl mx-auto">{content.contact.description}</p>

          <div className="border border-grid-wire bg-surface-monolith p-4 mb-8 text-left rounded-xl max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-signal-cobalt" />
              <span className="font-mono text-[10px] text-text-wireframe uppercase tracking-wider">Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-signal-cobalt">$</span>
              <input
                type="text"
                placeholder="Type /help"
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-text-alabaster placeholder:text-text-wireframe"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTerminal((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }}
              />
            </div>
            {terminalOutput && (
              <div className="font-mono text-[10px] text-text-steel border-t border-grid-wire pt-2 mt-2">
                {terminalOutput}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${content.personal.email}`}
              className="inline-flex items-center gap-2 bg-text-alabaster text-canvas-void font-semibold px-8 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-signal-cobalt hover:text-white transition-all duration-300"
            >
              Initiate Conversation <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 border border-grid-wire text-text-alabaster px-6 py-4 rounded-full text-sm tracking-wider uppercase hover:border-signal-emerald transition-all duration-300"
            >
              {copied ? <><Check className="w-4 h-4 text-signal-emerald" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Email</>}
            </button>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-grid-wire"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href={content.personal.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-text-wireframe uppercase tracking-wider hover:text-signal-emerald transition-colors">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href={content.personal.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-text-wireframe uppercase tracking-wider hover:text-signal-emerald transition-colors">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
            <div className="font-mono text-[10px] text-text-wireframe tracking-wider">
              &copy; 2026 Sajideen Hassan &mdash; Cinematic Portfolio
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
