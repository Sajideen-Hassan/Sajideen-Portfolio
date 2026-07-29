"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useSplitText
 * -----------
 * Splits a target element's text content into individual <span> wrappers
 * for char-by-char or word-by-word GSAP animation. No Club GSAP license needed.
 *
 * Usage:
 *   const { ref, chars, words } = useSplitText<HTMLHeadingElement>();
 *   // Then animate `chars` or `words` with gsap.fromTo(chars, ...)
 *
 * The hook wraps each character in:
 *   <span class="sh-word" style="display:inline-block; overflow:hidden;">
 *     <span class="sh-char" style="display:inline-block; will-change:transform,opacity">
 *       {char}
 *     </span>
 *   </span>
 */

interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
}

export function useSplitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const splitRef = useRef<SplitResult>({ chars: [], words: [] });
  const originalHTML = useRef<string>("");

  const split = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Store original for cleanup
    originalHTML.current = el.innerHTML;

    const text = el.textContent ?? "";
    const wordsArray = text.split(" ").filter(Boolean);

    el.innerHTML = "";

    const chars: HTMLElement[] = [];
    const words: HTMLElement[] = [];

    wordsArray.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "sh-word";
      wordSpan.style.cssText = "display:inline-block; overflow:hidden; vertical-align:bottom;";
      words.push(wordSpan);

      Array.from(word).forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "sh-char";
        charSpan.style.cssText =
          "display:inline-block; will-change:transform,opacity,filter;";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      el.appendChild(wordSpan);

      // Add space between words (except last)
      if (wi < wordsArray.length - 1) {
        const space = document.createElement("span");
        space.style.cssText = "display:inline-block; width:0.3em;";
        space.setAttribute("aria-hidden", "true");
        el.appendChild(space);
      }
    });

    splitRef.current = { chars, words };
    return { chars, words };
  }, []);

  const revert = useCallback(() => {
    const el = ref.current;
    if (!el || !originalHTML.current) return;
    el.innerHTML = originalHTML.current;
    splitRef.current = { chars: [], words: [] };
  }, []);

  useEffect(() => {
    split();
    return () => {
      revert();
    };
  }, [split, revert]);

  return {
    ref,
    chars: splitRef.current.chars,
    words: splitRef.current.words,
    split,
    revert,
  };
}
