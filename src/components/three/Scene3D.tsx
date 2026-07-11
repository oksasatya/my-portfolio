"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const BlueprintScene = dynamic(() => import("./BlueprintScene"), {
  ssr: false,
});

type Scene3DProps = Readonly<{
  /** Static fallback (SVG backdrop) for reduced-motion / pre-load / no-JS. */
  fallback: ReactNode;
  dense?: boolean;
  className?: string;
}>;

/**
 * Lazy 3D layer: renders the static fallback immediately; swaps in the
 * three.js scene only when the section is near the viewport, the visitor
 * does not prefer reduced motion, and the device has some headroom.
 * The canvas unmounts again when scrolled far away (GPU idle).
 */
export function Scene3D({ fallback, dense = true, className = "" }: Scene3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // Very low-end signal: skip 3D entirely.
    const nav = navigator as Navigator & { hardwareConcurrency?: number };
    if ((nav.hardwareConcurrency ?? 4) < 4) return;

    // Defer the three.js mount past the load window (protects LCP/TBT);
    // the static SVG fallback is shown until then.
    const idle = setTimeout(() => setEnabled(true), 2200);

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => {
      clearTimeout(idle);
      observer.disconnect();
    };
  }, []);

  const showScene = enabled && visible;

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {!showScene && fallback}
      {showScene && <BlueprintScene dense={dense} />}
    </div>
  );
}
