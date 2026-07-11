import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/notify";

export const runtime = "nodejs";

// Best-effort in-memory throttle (per serverless instance). Enough to stop
// naive spam without a database; the honeypot field catches most bots.
const lastHit = new Map<string, number>();
const WINDOW_MS = 30_000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const prev = lastHit.get(ip) ?? 0;
  if (now - prev < WINDOW_MS) {
    return NextResponse.json({ sent: false, reason: "rate-limited" }, { status: 429 });
  }
  lastHit.set(ip, now);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ sent: false, reason: "invalid-json" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ sent: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const senderPhone = String(body.senderPhone ?? "").trim().slice(0, 32);
  const topic = String(body.topic ?? "").trim().slice(0, 60);
  const message = String(body.message ?? "").trim().slice(0, 2000);

  if (name.length < 2 || message.length < 10 || senderPhone.length < 8) {
    return NextResponse.json({ sent: false, reason: "invalid-input" }, { status: 400 });
  }

  const result = await sendContactNotification({ name, senderPhone, topic, message });
  if (!result.ok) {
    // "not-configured" (or provider failure) -> client falls back to wa.me.
    return NextResponse.json({ sent: false, reason: result.reason }, { status: 200 });
  }
  return NextResponse.json({ sent: true });
}
