"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { content } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";

export default function Certifications() {
  if (!content.certifications.length) return null;

  return (
    <section
      id="certifications"
      className="border-t border-border-subtle bg-bg px-6 py-24 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="06 // Credentials // Verified certifications"
          title="Credentials"
          accent="with proof of delivery readiness"
          description="Professional training that supports the way I lead teams and manage delivery risk."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <BentoCard className="h-full">
                <div className="flex items-center gap-2 text-accent-emerald">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
                    Verified
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {cert.issuer}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge tone="cyan">{cert.credentialId}</Badge>
                </div>
                <a
                  href={cert.verifyUrl}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan"
                >
                  Verify credential <ExternalLink className="h-4 w-4" />
                </a>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
