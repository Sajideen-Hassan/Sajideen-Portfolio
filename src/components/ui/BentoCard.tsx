import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BentoCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  className?: string;
};

export default function BentoCard({
  children,
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-2xl border border-border-subtle/70 bg-bg-surface/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
