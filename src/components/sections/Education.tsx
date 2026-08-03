"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function Education() {
  if (!content.education.length) return null;

  return (
    <section
      id="education"
      className="bg-paper-deep border-t border-hairline py-24 px-6 md:px-16"
    >
      <div className="max-w-[1680px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-forest block mb-4"
        >
          05 // Foundation // Academic Background
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold font-display italic tracking-tight mb-16"
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-hairline bg-surface p-8 group hover:border-forest/30 transition-all duration-500 rounded-2xl"
            >
              <span className="font-mono text-xs text-forest">
                [{String(i + 1).padStart(2, "0")}]{" "}
                {edu.degree.split(" ").slice(0, 3).join(" ")}
              </span>
              <h3 className="text-2xl font-bold font-display text-ink mt-3 mb-2 group-hover:text-terracotta transition-colors">
                {edu.degree}
              </h3>
              <p className="font-sans text-sm text-muted mb-5">
                {edu.institution} <span className="text-faint">|</span>{" "}
                {edu.period}
              </p>
              <div className="mt-4">
                <span className="font-mono text-[10px] text-faint uppercase tracking-wider block mb-3">
                  Core Domains
                </span>
                <div className="flex flex-wrap gap-2">
                  {edu.details.map((d, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono tag-forest px-2.5 py-1.5 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
