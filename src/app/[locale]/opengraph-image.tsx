import { ImageResponse } from "next/og";

export const alt =
  "Oksa Satya — Full-Stack Developer · Sistem Bisnis (HRIS, POS, SaaS)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded 1200x630 social card, aligned with the site design tokens (DESIGN.md).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1116",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#d97757",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f2f0ea",
              letterSpacing: 1,
            }}
          >
            OKSA SATYA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              color: "#e48768",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Full-Stack Developer · Backend-Focus
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.08,
              color: "#f2f0ea",
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            Membangun sistem operasional bisnis — dari database sampai UI.
          </div>
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#9ca3af",
            display: "flex",
            gap: 18,
          }}
        >
          <span>HRIS · Payroll · POS · Inventory · SaaS</span>
          <span style={{ color: "#e48768" }}>·</span>
          <span>Go · Java · Next.js</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
