import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className ?? "mb-8"}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ccff00]"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-3xl md:text-4xl font-semibold text-text-primary"
      >
        {title} <span className="text-text-secondary">{accent}</span>
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
