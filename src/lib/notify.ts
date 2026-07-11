// Server-side contact notification. Provider-agnostic:
//   CONTACT_PROVIDER=whatsapp-cloud  -> official Meta WhatsApp Cloud API
//     env: WHATSAPP_CLOUD_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_TO (e.g. 62818846228)
//   CONTACT_PROVIDER=fonnte          -> Fonnte gateway (unofficial)
//     env: FONNTE_TOKEN, WHATSAPP_TO
// No provider configured -> { ok: false, reason: "not-configured" } and the
// form falls back to the wa.me flow. No message content is stored anywhere.

export interface ContactPayload {
  readonly name: string;
  readonly senderPhone: string;
  readonly topic: string;
  readonly message: string;
}

export interface NotifyResult {
  readonly ok: boolean;
  readonly reason?: string;
}

function formatMessage(p: ContactPayload): string {
  return [
    "Pesan baru dari oksasatya.dev",
    `Nama: ${p.name}`,
    `WhatsApp: ${p.senderPhone}`,
    `Keperluan: ${p.topic}`,
    "",
    p.message,
  ].join("\n");
}

async function sendViaWhatsAppCloud(p: ContactPayload): Promise<NotifyResult> {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_TO;
  if (!token || !phoneId || !to) return { ok: false, reason: "not-configured" };

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: formatMessage(p) },
    }),
  });
  if (!res.ok) return { ok: false, reason: `cloud-api-${res.status}` };
  return { ok: true };
}

async function sendViaFonnte(p: ContactPayload): Promise<NotifyResult> {
  const token = process.env.FONNTE_TOKEN;
  const to = process.env.WHATSAPP_TO;
  if (!token || !to) return { ok: false, reason: "not-configured" };

  const res = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target: to, message: formatMessage(p) }),
  });
  if (!res.ok) return { ok: false, reason: `fonnte-${res.status}` };
  return { ok: true };
}

export async function sendContactNotification(p: ContactPayload): Promise<NotifyResult> {
  switch (process.env.CONTACT_PROVIDER) {
    case "whatsapp-cloud":
      return sendViaWhatsAppCloud(p);
    case "fonnte":
      return sendViaFonnte(p);
    default:
      return { ok: false, reason: "not-configured" };
  }
}
