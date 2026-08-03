"use client";

import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: number;
};

export default function ScrollReveal({
  children,
  className,
  id,
  stagger = 0.08,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealItems = Array.from(
      node.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: node,
        start: "top 82%",
        once: true,
      },
    });

    tl.fromTo(
      node,
      { opacity: 0, y: 32, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
    );

    if (revealItems.length) {
      tl.fromTo(
        revealItems,
        { opacity: 0, y: 34, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger,
          ease: "power3.out",
        },
        "-=.2",
      );
    }
  }, [stagger]);

  return (
    <section id={id} ref={ref} className={className} {...rest}>
      {children}
    </section>
  );
}
