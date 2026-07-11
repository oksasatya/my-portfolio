// Single source of truth for contact channels.
// Previously duplicated across ContactArea, FooterOne, and ServiceLandingArea.

export const CONTACT = {
  waNumber: "62818846228",
  waDisplay: "+62 818-846-228",
  email: "oksasatyaa@gmail.com",
  github: "https://github.com/oksasatya",
  linkedin: "https://www.linkedin.com/in/oksastya/",
} as const;

export const WA_BASE = `https://wa.me/${CONTACT.waNumber}`;

/** WhatsApp deep link with an optional prefilled message. */
export function waLink(message?: string): string {
  if (!message) return WA_BASE;
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MESSAGE =
  "Halo Oksa, saya ingin mendiskusikan proyek. Boleh kita ngobrol?";

export const CV_URL = "https://cdn.dexova.id/assets/img/public/cv/cv-2026-ats.pdf";
