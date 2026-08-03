import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "cyan" | "emerald" | "indigo" | "volt" | "default";
  className?: string;
};

export default function Badge({
  children,
  tone = "default",
  className,
}: BadgeProps) {
  const toneClass = {
    cyan: "border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
    emerald:
      "border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald",
    indigo:
      "border border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
    volt: "border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00]",
    default:
      "border border-border-subtle bg-bg-elevated/70 text-text-secondary",
  }[tone];

  return (
    <span
      className={twMerge(
        "rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em]",
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
