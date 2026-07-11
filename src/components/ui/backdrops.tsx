/**
 * Decorative SVG backdrops — static, tiny, aria-hidden.
 * Used on exactly three surfaces (hero, dark sections, final CTA); see DESIGN.md.
 */

export function DotGridBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:linear-gradient(to_bottom,black_35%,transparent_92%)]"
    >
      <defs>
        <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#3d4a5c" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

/** Connected-nodes topology — abstract derivative of the Dexova system blueprint. */
export function NodesBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
    >
      <g stroke="#6f8a84" strokeWidth="1" fill="none">
        <path d="M80 90 L240 60 L410 130 L600 80 L740 150" />
        <path d="M240 60 L300 220 L410 130" />
        <path d="M300 220 L140 300 L80 90" />
        <path d="M300 220 L520 300 L600 80" />
        <path d="M520 300 L740 150 M520 300 L680 350" />
      </g>
      <g fill="#6f8a84">
        {[
          [80, 90],
          [240, 60],
          [410, 130],
          [600, 80],
          [740, 150],
          [300, 220],
          [140, 300],
          [520, 300],
          [680, 350],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

export function ContourBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 300"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
    >
      <g stroke="#9ca3af" strokeWidth="1" fill="none">
        <path d="M-20 240 C 150 180, 300 280, 460 220 S 720 160, 820 210" />
        <path d="M-20 200 C 150 140, 300 240, 460 180 S 720 120, 820 170" />
        <path d="M-20 160 C 150 100, 300 200, 460 140 S 720 80, 820 130" />
        <path d="M-20 120 C 150 60, 300 160, 460 100 S 720 40, 820 90" />
      </g>
    </svg>
  );
}
