"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Menu, X, Terminal } from "lucide-react";

interface NavItem {
  number: string;
  label: string;
  targetId: string;
}

const navItems: NavItem[] = [
  { number: "01", label: "HERO", targetId: "hero" },
  { number: "02", label: "ABOUT", targetId: "about" },
  { number: "03", label: "JOURNEY", targetId: "journey" },
  { number: "04", label: "SKILLS", targetId: "skills" },
  { number: "05", label: "PROJECTS", targetId: "projects" },
  { number: "06", label: "CONTACT", targetId: "contact" },
];

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Section tracking for active state
      const sections = navItems.map((item) => document.getElementById(item.targetId));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navItems[i].targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-bg-surface/80 backdrop-blur-md border-border-hairline py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo - Mission Control Terminal style */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded border border-signal/40 flex items-center justify-center bg-bg-surface-raised group-hover:border-signal transition-colors">
            <Terminal className="w-4 h-4 text-signal" />
          </div>
          <span className="font-mono text-sm tracking-widest text-text-primary group-hover:text-signal transition-colors font-semibold">
            {portfolioData.personalInfo.name.toUpperCase()} // SYS_OP
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="group flex items-center gap-1.5 focus:outline-none py-1.5 relative"
            >
              <span className="font-mono text-[10px] text-text-secondary group-hover:text-signal transition-colors">
                {item.number}
              </span>
              <span
                className={`font-mono text-xs tracking-wider transition-colors ${
                  activeSection === item.targetId
                    ? "text-signal font-semibold"
                    : "text-text-secondary group-hover:text-text-primary"
                }`}
              >
                {item.label}
              </span>
              {activeSection === item.targetId && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-signal rounded-full shadow-[0_0_8px_var(--signal)]" />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded border border-border-hairline bg-bg-surface-raised text-text-primary focus:outline-none hover:text-signal"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-surface border-b border-border-hairline p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-250">
          {navItems.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="flex items-center gap-3 py-2 border-b border-border-hairline/30 group"
            >
              <span className="font-mono text-xs text-signal">{item.number}</span>
              <span
                className={`font-mono text-sm tracking-widest ${
                  activeSection === item.targetId
                    ? "text-signal font-semibold"
                    : "text-text-secondary group-hover:text-text-primary"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
