"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal that never gates visibility: content is rendered visible
 * (SSR, no-JS, crawlers). After mount, elements still below the viewport
 * are marked "pending" and released with a transition when they enter.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: Readonly<{ children: ReactNode; className?: string; delay?: number }>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide elements that are still below the fold at mount time.
    if (el.getBoundingClientRect().top <= globalThis.innerHeight) return;

    el.dataset.reveal = "pending";
    const release = () => {
      setTimeout(() => {
        el.dataset.reveal = "done";
      }, delay);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          release();
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    // Failsafe: never leave content hidden if the observer doesn't fire
    // (headless renderers, print, audit tools). Released INSTANTLY (no
    // transition) so nothing is ever caught semi-transparent.
    const failsafe = setTimeout(() => {
      observer.disconnect();
      el.style.transition = "none";
      el.dataset.reveal = "done";
    }, 1800);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
