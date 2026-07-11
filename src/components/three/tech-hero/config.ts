/**
 * Single source of truth for the tech-hero illustration — a 2.5D layered
 * composition built from the pre-rendered node artwork in
 * `public/assets/images/hero/nodes/*.webp`.
 *
 * Layout lives in a fixed 1000 x 750 (4:3) design space. Node `cx`/`cy` are the
 * centre of each layer in that space; the container and the SVG connection
 * overlay share the same viewBox, so lines always meet the node centres.
 */

export const DESIGN = { width: 1000, height: 750 } as const;

export type AccentColor = "orange" | "teal";

export type SceneNode = Readonly<{
  id: string;
  /** webp basename in /assets/images/hero/nodes. */
  file: string;
  label: string;
  description: string;
  /** Centre in the 1000x750 design space. */
  cx: number;
  cy: number;
  /** Displayed width in design units (height follows the image aspect). */
  width: number;
  /** Intrinsic pixel size of the source webp (for next/image). */
  iw: number;
  ih: number;
  /** Stacking order — background nodes low, foreground nodes high. */
  z: number;
  /** Parallax depth multiplier (0 = locked, 1 = full swing). */
  depth: number;
  accent: AccentColor;
}>;

export type FlowConnection = Readonly<{
  id: string;
  from: string;
  to: string;
  accent: AccentColor;
  duration: number;
  delay: number;
  particleCount: number;
}>;

export const COLORS = {
  orange: "#d97757",
  orangeSoft: "#e48768",
  teal: "#6f8ad0",
  tealSoft: "#8f9fe0",
  track: "#2b3442",
} as const;

export function accentHex(accent: AccentColor): { base: string; bright: string } {
  return accent === "orange"
    ? { base: COLORS.orange, bright: COLORS.orangeSoft }
    : { base: COLORS.teal, bright: COLORS.tealSoft };
}

export const SCENE_NODES: readonly SceneNode[] = [
  { id: "laptop", file: "laptop", label: "Application", description: "Full-stack web application", cx: 476, cy: 392, width: 470, iw: 1000, ih: 988, z: 5, depth: 0.25, accent: "orange" },
  { id: "cloud", file: "cloud", label: "Cloud", description: "Cloud deployment & sync", cx: 512, cy: 96, width: 150, iw: 862, ih: 886, z: 2, depth: 0.7, accent: "teal" },
  { id: "database", file: "database", label: "Database", description: "Data storage & persistence", cx: 152, cy: 196, width: 216, iw: 952, ih: 943, z: 3, depth: 0.95, accent: "orange" },
  { id: "server", file: "server", label: "Server", description: "Backend services & infrastructure", cx: 852, cy: 196, width: 214, iw: 922, ih: 968, z: 3, depth: 0.95, accent: "teal" },
  { id: "code", file: "code", label: "Code", description: "Web application development", cx: 110, cy: 432, width: 168, iw: 678, ih: 874, z: 6, depth: 1.1, accent: "orange" },
  { id: "api", file: "api", label: "API", description: "Application integration", cx: 902, cy: 430, width: 182, iw: 890, ih: 882, z: 6, depth: 1.1, accent: "teal" },
  { id: "gear", file: "gear", label: "Config", description: "System configuration & processing", cx: 182, cy: 658, width: 188, iw: 974, ih: 815, z: 6, depth: 1.2, accent: "orange" },
  { id: "analytics", file: "analytics", label: "Analytics", description: "Metrics & business insights", cx: 470, cy: 754, width: 258, iw: 1000, ih: 583, z: 7, depth: 0.85, accent: "orange" },
  { id: "phone", file: "phone", label: "Mobile", description: "Responsive mobile experience", cx: 806, cy: 684, width: 120, iw: 648, ih: 1029, z: 7, depth: 1.25, accent: "teal" },
];

/** Each connection links a node to the laptop hub; `from` sets flow direction. */
export const FLOW_CONNECTIONS: readonly FlowConnection[] = [
  { id: "database-laptop", from: "database", to: "laptop", accent: "orange", duration: 3.2, delay: 0, particleCount: 3 },
  { id: "code-laptop", from: "code", to: "laptop", accent: "orange", duration: 3.8, delay: 0.4, particleCount: 2 },
  { id: "gear-laptop", from: "gear", to: "laptop", accent: "orange", duration: 4.1, delay: 0.8, particleCount: 2 },
  { id: "laptop-analytics", from: "laptop", to: "analytics", accent: "orange", duration: 3.6, delay: 0.2, particleCount: 2 },
  { id: "cloud-laptop", from: "cloud", to: "laptop", accent: "teal", duration: 4.4, delay: 0.6, particleCount: 3 },
  { id: "server-laptop", from: "server", to: "laptop", accent: "teal", duration: 3, delay: 0, particleCount: 3 },
  { id: "laptop-api", from: "laptop", to: "api", accent: "teal", duration: 3.5, delay: 0.3, particleCount: 2 },
  { id: "laptop-phone", from: "laptop", to: "phone", accent: "teal", duration: 4, delay: 0.5, particleCount: 2 },
];
