"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Terminal } from "lucide-react";

export default function Contact() {
  const { email, phone, location, github, linkedin } = portfolioData.personalInfo;
  
  const [formData, setFormData] = useState({
    sender: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender || !formData.message) return;
    
    setSending(true);
    // Simulate sending communications packet
    setTimeout(() => {
      setSending(false);
      setSentStatus("success");
      setFormData({ sender: "", message: "" });
      
      setTimeout(() => {
        setSentStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="pt-32 pb-12 relative bg-bg-void border-t border-border-hairline overflow-hidden"
    >
      <div className="absolute inset-0 console-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-between min-h-[600px]">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Col: Contact info & Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-signal tracking-widest block">// 07 // ESTABLISH_COMMUNICATIONS.CFG</span>
              <h2 className="font-display text-3xl font-extrabold text-text-primary">
                COMMS TERMINAL
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
                Initiate a direct communications connection. Specify your terminal identifier (email) and the operational message below.
              </p>
            </div>

            {/* Readouts details */}
            <div className="space-y-4 font-mono text-xs text-text-secondary">
              <div className="flex items-center gap-3 p-3 rounded border border-border-hairline bg-bg-surface hover:border-signal/20 transition-all">
                <Mail className="w-4 h-4 text-signal shrink-0" />
                <a href={`mailto:${email}`} className="text-text-primary hover:text-signal transition-colors focus:outline-none">
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-border-hairline bg-bg-surface hover:border-signal/20 transition-all">
                <Phone className="w-4 h-4 text-data shrink-0" />
                <a href={`tel:${phone}`} className="text-text-primary hover:text-data transition-colors focus:outline-none">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-border-hairline bg-bg-surface">
                <MapPin className="w-4 h-4 text-signal shrink-0" />
                <span className="text-text-primary">{location}</span>
              </div>
            </div>

            {/* Social credentials links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded border border-border-hairline bg-bg-surface hover:border-signal/30 text-text-secondary hover:text-signal transition-all focus:outline-none"
                aria-label="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded border border-border-hairline bg-bg-surface hover:border-data/30 text-text-secondary hover:text-data transition-all focus:outline-none"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Col: Console Form */}
          <div className="lg:col-span-7">
            <div className="border border-border-hairline bg-bg-surface rounded-lg p-6 relative">
              
              {/* Scanline visual */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-primary/[0.01] to-transparent bg-[length:100%_4px] rounded-lg pointer-events-none" />

              {/* Console Header */}
              <div className="flex justify-between items-center pb-3 border-b border-border-hairline/60 mb-6 font-mono text-[10px] text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-signal" />
                  <span>COMMS_TRANSMITTER.SH</span>
                </div>
                <span>PACKET_SIZE: {formData.message.length} BYTES</span>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Sender Email */}
                <div className="space-y-2">
                  <label htmlFor="sender" className="font-mono text-[10px] text-text-secondary uppercase block">
                    &gt; SENDER_IDENTITY (EMAIL):
                  </label>
                  <input
                    id="sender"
                    type="email"
                    required
                    value={formData.sender}
                    onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                    placeholder="client_node@domain.com"
                    className="w-full px-4 py-3 rounded border border-border-hairline/80 bg-bg-void font-mono text-xs text-text-primary focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/30 placeholder:text-text-secondary/30 transition-colors"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-[10px] text-text-secondary uppercase block">
                    &gt; PACKET_BODY (MESSAGE):
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe mission objectives, timelines, and technical scope..."
                    className="w-full px-4 py-3 rounded border border-border-hairline/80 bg-bg-void font-sans text-xs text-text-primary focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/30 placeholder:text-text-secondary/30 transition-colors resize-none"
                  />
                </div>

                {/* Submission CTA */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={sending || !formData.sender || !formData.message}
                    className="magnetic-btn flex items-center gap-2 bg-signal hover:bg-signal/90 disabled:bg-border-hairline disabled:text-text-secondary/50 text-bg-void px-6 py-3 rounded font-mono text-xs tracking-wider font-bold transition-all focus:outline-none cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>RUN_COMMS_LINK.SH</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Submission Status readout */}
                  {sentStatus === "success" && (
                    <span className="font-mono text-[10px] text-status-positive animate-pulse uppercase">
                      [+] Transmitted packet successfully!
                    </span>
                  )}
                </div>

              </form>

            </div>
          </div>

        </div>

        {/* Footer Credit Strip */}
        <footer className="mt-24 pt-8 border-t border-border-hairline/50 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-text-secondary/50">
          <div>
            <span>© {new Date().getFullYear()} SAJIDEEN HASSAN. ALL OPERATIONS LOGGED.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>CRAFTED WITH NEXT.JS, GSAP & LENIS</span>
          </div>
        </footer>

      </div>
    </section>
  );
}
