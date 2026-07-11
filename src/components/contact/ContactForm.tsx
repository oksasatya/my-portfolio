"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { WA_BASE } from "@/lib/contact";

type Locale = "id" | "en";

const TOPICS: Record<Locale, readonly string[]> = {
  id: ["Proyek freelance", "Peluang kerja remote", "Konsultasi teknis", "Kolaborasi"],
  en: ["Freelance project", "Remote role", "Technical consultation", "Collaboration"],
};

const TEXT: Record<Locale, Record<string, string>> = {
  id: {
    greeting: "Halo Oksa, saya", topicLabel: "Keperluan", name: "Nama", namePh: "Nama Anda",
    phone: "Nomor WhatsApp Anda", phoneNote: "Untuk saya balas.",
    msg: "Ceritakan kebutuhan Anda", msgPh: "Contoh: saya butuh sistem kasir + stok untuk 3 outlet…",
    submit: "Kirim ke WhatsApp Saya", sending: "Mengirim…",
    sentTitle: "Pesan terkirim ✓",
    sentBody1: "Pesan anda sudah masuk ke WhatsApp saya. Saya balas ke nomor",
    sentBody2: "— biasanya kurang dari 24 jam.",
    err1: "Gagal mengirim — coba lagi, atau", errLink: "lanjutkan lewat WhatsApp Anda",
    privacy: "Pesan diteruskan langsung ke WhatsApp saya — tidak ada data yang disimpan di situs ini.",
  },
  en: {
    greeting: "Hi Oksa, I am", topicLabel: "I'm reaching out about", name: "Name", namePh: "Your name",
    phone: "Your WhatsApp number", phoneNote: "So I can reply.",
    msg: "Tell me what you need", msgPh: "e.g. we're hiring a remote full-stack engineer…",
    submit: "Send to My WhatsApp", sending: "Sending…",
    sentTitle: "Message sent ✓",
    sentBody1: "Your message reached my WhatsApp. I'll reply to",
    sentBody2: "— usually within 24 hours.",
    err1: "Failed to send — try again, or", errLink: "continue via your WhatsApp",
    privacy: "Messages are forwarded straight to my WhatsApp — nothing is stored on this site.",
  },
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Submits to /api/contact (server-side WhatsApp notification when a provider
 * is configured). Falls back to a prefilled wa.me link otherwise. No data is
 * stored on this site.
 */
export function ContactForm() {
  const locale = useLocale() as Locale;
  const t = TEXT[locale];
  const topics = TOPICS[locale];
  const [name, setName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [topic, setTopic] = useState<string>(topics[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const waFallback = () => {
    const lines = [
      `${t.greeting} ${name || "…"} (${senderPhone || "-"}).`,
      `${t.topicLabel}: ${topic}.`,
      message && `Detail: ${message}`,
    ].filter(Boolean);
    globalThis.open?.(
      `${WA_BASE}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, senderPhone, topic, message, website: "" }),
      });
      const data = (await res.json()) as { sent: boolean };
      if (data.sent) {
        setStatus("sent");
        return;
      }
      // Provider not configured / failed -> visitor's own WhatsApp.
      setStatus("idle");
      waFallback();
    } catch {
      setStatus("error");
    }
  };

  const invalid = name.trim().length < 2 || message.trim().length < 10 || senderPhone.trim().length < 8;

  if (status === "sent") {
    return (
      <output className="block rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="font-display text-xl font-semibold">{t.sentTitle}</p>
        <p className="mt-2 text-sm text-muted">
          {t.sentBody1} <span className="text-ink">{senderPhone}</span> {t.sentBody2}
        </p>
      </output>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!invalid) void submit();
      }}
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium">
              {t.name}
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePh}
              autoComplete="name"
              required
              className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-violet-deep"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium">
              {t.phone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
              required
              className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-violet-deep"
            />
            <p className="mt-1 text-xs text-muted">{t.phoneNote}</p>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-medium">{t.topicLabel}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((opt) => (
              <label
                key={opt}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-lg border px-4 text-sm transition-colors ${
                  topic === opt
                    ? "border-violet-deep bg-violet/10 font-medium text-violet-deep"
                    : "border-line text-muted hover:border-violet-glow"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={opt}
                  checked={topic === opt}
                  onChange={() => setTopic(opt)}
                  className="sr-only"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium">
            {t.msg}
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            placeholder={t.msgPh}
            className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-violet-deep"
          />
        </div>

        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-violet px-7 text-base font-semibold text-dark transition-colors hover:bg-violet-deep disabled:opacity-60"
        >
          <MessageCircle size={18} aria-hidden />
          {status === "sending" ? t.sending : t.submit}
        </button>

        {status === "error" && (
          <p role="alert" className="text-center text-sm text-violet-glow">
            {t.err1}{" "}
            <button type="button" onClick={waFallback} className="underline underline-offset-4">
              {t.errLink}
            </button>
            .
          </p>
        )}
        <p className="text-center text-xs text-muted">
          {t.privacy}
        </p>
      </div>
    </form>
  );
}
