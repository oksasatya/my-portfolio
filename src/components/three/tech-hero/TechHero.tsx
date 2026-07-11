"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { DESIGN, SCENE_NODES, accentHex } from "./config";
import { FlowConnections } from "./FlowConnections";
import { useIsTouch, useReducedMotion } from "./hooks";
import styles from "./tech-hero.module.css";

const ARIA_LABEL =
  "Ilustrasi arsitektur aplikasi full-stack: laptop dengan dashboard di tengah, terhubung ke database, source code, cloud, backend server, API, analytics, konfigurasi, dan mobile dashboard.";

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export function TechHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Whole-scene pointer parallax — the layers and the connections tilt together,
  // so the lines stay attached. Lerped for smoothness; off for touch / reduced.
  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene || reducedMotion || isTouch) return;

    let raf = 0;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      tgX = (e.clientX - r.left) / r.width - 0.5;
      tgY = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      tgX = 0;
      tgY = 0;
    };
    const loop = () => {
      curX += (tgX - curX) * 0.06;
      curY += (tgY - curY) * 0.06;
      scene.style.transform =
        `translate3d(${curX * -10}px, ${curY * -8}px, 0)` +
        ` rotateY(${curX * 5}deg) rotateX(${curY * -3.5}deg)`;
      raf = requestAnimationFrame(loop);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion, isTouch]);

  // Hover detection is decoupled from the parallax. We hit-test on the pointer's
  // OWN move via elementFromPoint — never via per-node enter/leave listeners.
  // The scene tilts under the cursor every animation frame, so enter/leave used
  // to fire repeatedly as a node slid across a near-stationary pointer, thrashing
  // the active state (worst on nodes farthest from the tilt centre). Re-evaluating
  // only when the pointer itself moves closes that feedback loop; elementFromPoint
  // reads the real transformed geometry, so the hit stays visually accurate.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isTouch) return;

    let last: string | null = null;
    const apply = (id: string | null) => {
      if (id !== last) {
        last = id;
        setActiveNode(id);
      }
    };
    const onHover = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      apply(el?.closest<HTMLElement>("[data-node-id]")?.dataset.nodeId ?? null);
    };
    const onLeave = () => apply(null);

    root.addEventListener("pointermove", onHover);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onHover);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [isTouch]);

  const activeData = useMemo(
    () => SCENE_NODES.find((n) => n.id === activeNode) ?? null,
    [activeNode],
  );

  return (
    <div ref={rootRef} className={styles.root} role="img" aria-label={ARIA_LABEL}>
      <div ref={sceneRef} className={styles.scene}>
        <div className={`${styles.float} ${reducedMotion ? styles.floatStill : ""}`}>
          <FlowConnections activeNode={activeNode} reducedMotion={reducedMotion} />

          {SCENE_NODES.map((node) => (
            <div
              key={node.id}
              data-node-id={node.id}
              className={`${styles.node} ${activeNode === node.id ? styles.nodeActive : ""}`}
              style={{
                left: pct(node.cx, DESIGN.width),
                top: pct(node.cy, DESIGN.height),
                width: pct(node.width, DESIGN.width),
                zIndex: node.z,
              }}
            >
              <Image
                src={`/assets/images/hero/nodes/${node.file}.webp`}
                alt=""
                width={node.iw}
                height={node.ih}
                priority={node.id === "laptop"}
                // Eager-load the rest too: they sit inside a 3D-transformed
                // container where next/image's lazy IntersectionObserver is
                // unreliable, so a first hover could otherwise trigger a
                // decode + flash. All are above the fold anyway.
                loading={node.id === "laptop" ? undefined : "eager"}
                sizes="(min-width: 1024px) 340px, 42vw"
                className={styles.nodeImg}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {activeData && !isTouch && (
        <div
          className={`${styles.tooltip} ${styles.tooltipVisible}`}
          style={{ left: pct(activeData.cx, DESIGN.width), top: pct(activeData.cy, DESIGN.height) }}
        >
          <span className={styles.tooltipTitle} style={{ color: accentHex(activeData.accent).bright }}>
            {activeData.label}
          </span>
          <span className={styles.tooltipBody}>{activeData.description}</span>
        </div>
      )}
    </div>
  );
}
