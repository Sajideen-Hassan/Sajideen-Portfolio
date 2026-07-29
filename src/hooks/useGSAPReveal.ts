"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useGSAPReveal
 * -------------
 * Attaches a GSAP ScrollTrigger animation to a set of target elements
 * when they enter the viewport. Cleans up automatically on unmount.
 *
 * @param triggerRef  Ref to the scroll trigger container element
 * @param getTargets  Function that returns the elements to animate (called inside useEffect)
 * @param fromVars    GSAP from-vars
 * @param toVars      GSAP to-vars (merged with ScrollTrigger config)
 */

export interface GsapRevealConfig {
  triggerRef: RefObject<HTMLElement | null>;
  getTargets: () => NodeListOf<Element> | HTMLElement[] | null | undefined;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
  triggerStart?: string;
  triggerEnd?: string;
  stagger?: number;
}

export function useGSAPReveal({
  triggerRef,
  getTargets,
  fromVars = {},
  toVars = {},
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
  stagger = 0,
}: GsapRevealConfig) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const targets = getTargets();
    if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y: 40,
          opacity: 0,
          ...fromVars,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          ease: "power3.out",
          ...toVars,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: triggerStart,
            end: triggerEnd,
            toggleActions: "play none none none",
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
