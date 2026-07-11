"use client";

import type { CSSProperties } from "react";
import { COLORS, DESIGN, FLOW_CONNECTIONS, SCENE_NODES, accentHex } from "./config";
import styles from "./tech-hero.module.css";

type FlowStyle = CSSProperties & Record<`--${string}`, string>;
type Point = readonly [number, number];

const CENTER = new Map(SCENE_NODES.map((n) => [n.id, [n.cx, n.cy] as Point]));

/** Smooth cubic eased along the dominant axis — cable-like, no kinks. */
function smoothPath([x0, y0]: Point, [x1, y1]: Point): string {
  if (Math.abs(x1 - x0) >= Math.abs(y1 - y0)) {
    const mx = (x0 + x1) / 2;
    return `M ${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  const my = (y0 + y1) / 2;
  return `M ${x0} ${y0} C ${x0} ${my}, ${x1} ${my}, ${x1} ${y1}`;
}

type FlowConnectionsProps = Readonly<{
  activeNode: string | null;
  reducedMotion: boolean;
}>;

export function FlowConnections({ activeNode, reducedMotion }: FlowConnectionsProps) {
  const hub = CENTER.get("laptop");
  if (!hub) return null;

  return (
    <svg
      className={styles.svgOverlay}
      viewBox={`0 0 ${DESIGN.width} ${DESIGN.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {FLOW_CONNECTIONS.map((conn) => {
        const outerId = conn.from === "laptop" ? conn.to : conn.from;
        const outer = CENTER.get(outerId);
        if (!outer) return null;

        // Meet the laptop a little in from its centre so lines fan around it.
        const dx = outer[0] - hub[0];
        const dy = outer[1] - hub[1];
        const len = Math.hypot(dx, dy) || 1;
        const r = Math.min(len * 0.36, 120);
        const attach: Point = [hub[0] + (dx / len) * r, hub[1] + (dy / len) * r];

        const start = conn.from === "laptop" ? attach : outer;
        const end = conn.from === "laptop" ? outer : attach;
        const d = smoothPath(start, end);

        const { base, bright } = accentHex(conn.accent);
        const highlighted =
          activeNode !== null && (conn.from === activeNode || conn.to === activeNode);
        const stroke = highlighted ? bright : base;

        const activeStyle: FlowStyle = {
          stroke,
          "--flow-duration": `${conn.duration}s`,
          "--flow-delay": `${conn.delay}s`,
        };

        return (
          <g key={conn.id} className={highlighted ? styles.flowHighlighted : undefined} style={{ color: base }}>
            <path className={styles.flowBase} d={d} style={{ stroke: COLORS.track }} />
            <path className={styles.flowActive} d={d} style={activeStyle} />

            {!reducedMotion &&
              Array.from({ length: conn.particleCount }).map((_, i) => {
                const particleStyle: FlowStyle = {
                  offsetPath: `path("${d}")`,
                  fill: stroke,
                  "--flow-duration": `${conn.duration}s`,
                  "--particle-delay": `${conn.delay + (i * conn.duration) / conn.particleCount}s`,
                };
                return (
                  <circle
                    key={`${conn.id}-p${i}`}
                    className={styles.flowParticle}
                    r={highlighted ? 6 : 4.5}
                    cx={0}
                    cy={0}
                    style={particleStyle}
                  />
                );
              })}
          </g>
        );
      })}
    </svg>
  );
}
