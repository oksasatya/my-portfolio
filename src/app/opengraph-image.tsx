import { ImageResponse } from "next/og";

export const alt = "Oksa Satya — Backend Engineer (Go · Java · Next.js)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded 1200x630 social card (replaces the stretched portrait photo).
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
          background: "#faf8f3",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#6d28d9",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#17150f",
              letterSpacing: 1,
            }}
          >
            OKSA SATYA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              color: "#6d28d9",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Backend Engineer
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              color: "#17150f",
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            Membangun sistem yang skalabel
          </div>
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#4a463d",
            display: "flex",
            gap: 18,
          }}
        >
          <span>Go</span>
          <span style={{ color: "#cabfe6" }}>·</span>
          <span>Java / Spring Boot</span>
          <span style={{ color: "#cabfe6" }}>·</span>
          <span>Next.js</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
