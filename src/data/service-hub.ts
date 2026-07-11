// /service hub content, per locale. Follows the locale-data pattern:
// UI chrome stays in the component, long-form marketing copy lives here so
// the page component and the route's JSON-LD share one source of truth.

import type { Locale } from "@/i18n/routing";
import { serviceProcess, type FaqItem, type ProcessStep } from "./services";

export type ServiceIcon = "web" | "app" | "api" | "store";

export interface HubServiceItem {
  /** /jasa spoke slug — Indonesian-only landing pages. */
  readonly slug?: string;
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly tagline: string;
  readonly highlights: readonly string[];
  readonly stack: string;
}

export interface WhyCard {
  readonly tag: string;
  readonly title: string;
  readonly desc: string;
}

export interface ServiceHubCopy {
  readonly hero: {
    readonly h1: string;
    readonly intro: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly secondaryHref: string;
    readonly waMessage: string;
    readonly trust: readonly string[];
  };
  readonly services: {
    readonly heading: string;
    readonly intro: string;
    readonly learn: string;
    readonly items: readonly HubServiceItem[];
  };
  readonly why: {
    readonly kicker: string;
    readonly heading: string;
    readonly intro: string;
    readonly cards: readonly WhyCard[];
  };
  readonly process: {
    readonly heading: string;
    readonly intro: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly proof: {
    readonly heading: string;
    readonly intro: string;
    readonly slugs: readonly string[];
    readonly allLabel: string;
    readonly readCase: string;
  };
  readonly faq: {
    readonly heading: string;
    readonly items: readonly FaqItem[];
  };
  readonly cta: {
    readonly heading: string;
    readonly body: string;
    readonly button: string;
    readonly othersLabel: string;
  };
}

const ID: ServiceHubCopy = {
  hero: {
    h1: "Jasa Pembuatan Website, Aplikasi & API",
    intro:
      "Dari company profile sampai platform SaaS — saya rancang dan bangun sistem yang cepat, aman, dan siap tumbuh. Standarnya sama dengan sistem ERP yang saya bangun dan operasikan sendiri di production.",
    ctaPrimary: "Diskusi gratis via WhatsApp",
    ctaSecondary: "Lihat studi kasus",
    secondaryHref: "/projects",
    waMessage: "Halo Oksa, saya ingin mendiskusikan proyek. Boleh kita ngobrol?",
    trust: [
      "4+ tahun aplikasi enterprise (Dubai)",
      "30+ proyek dikirim end-to-end",
      "Respon < 24 jam",
      "Estimasi gratis, tanpa komitmen",
    ],
  },
  services: {
    heading: "Pilih layanan sesuai kebutuhan",
    intro:
      "Empat layanan inti — masing-masing punya halaman detail berisi apa yang Anda dapat, proses kerja, dan FAQ.",
    learn: "Pelajari layanan",
    items: [
      {
        slug: "pembuatan-website",
        icon: "web",
        title: "Jasa Pembuatan Website",
        tagline:
          "Company profile, landing page, dan web app yang cepat, rapi, dan gampang ditemukan di Google.",
        highlights: [
          "Cepat & SEO-ready — Core Web Vitals terjaga",
          "Responsif di HP, tablet, dan desktop",
          "Opsi CMS: update konten sendiri tanpa coding",
        ],
        stack: "Next.js · React · Laravel · Tailwind",
      },
      {
        slug: "pembuatan-aplikasi",
        icon: "app",
        title: "Jasa Pembuatan Aplikasi Web",
        tagline:
          "Dashboard admin, sistem internal, dan platform SaaS yang mengikuti alur bisnis Anda — bukan template kaku.",
        highlights: [
          "Dashboard dengan data real-time & laporan",
          "Multi-user dengan role & hak akses (RBAC)",
          "Arsitektur siap tumbuh saat data bertambah",
        ],
        stack: "Next.js · Go · Laravel · PostgreSQL",
      },
      {
        slug: "pembuatan-api",
        icon: "api",
        title: "Jasa Pembuatan API & Integrasi Sistem",
        tagline:
          "Spesialisasi utama saya: REST API yang andal dan integrasi antar-sistem — payment, HRIS, logistik.",
        highlights: [
          "API aman & terdokumentasi (JWT, rate limit)",
          "Integrasi Midtrans, HRIS, logistik, email",
          "Observability: logging, metrics, tracing",
        ],
        stack: "Go · Java/Spring Boot · gRPC · Redis",
      },
      {
        slug: "pembuatan-toko-online",
        icon: "store",
        title: "Jasa Pembuatan Toko Online",
        tagline:
          "Toko online milik sendiri — katalog, keranjang, pembayaran otomatis, dan panel admin yang gampang dipakai.",
        highlights: [
          "Checkout + pembayaran otomatis (Midtrans)",
          "Panel admin produk, stok, dan pesanan",
          "Tanpa potongan marketplace, data pelanggan milik Anda",
        ],
        stack: "Next.js · Go · PostgreSQL · Midtrans",
      },
    ],
  },
  why: {
    kicker: "Kenapa saya",
    heading: "Kerja langsung dengan engineer-nya, bukan lewat perantara",
    intro:
      "Yang Anda ajak diskusi adalah orang yang sama yang menulis kodenya — dan yang menanggung standarnya.",
    cards: [
      {
        tag: "PRODUCTION-PROVEN",
        title: "Standar sistem yang saya operasikan sendiri",
        desc: "Dexova — ERP dengan HRIS/payroll, POS, dan inventori — saya bangun dan jalankan di production. Standar yang sama dipakai di proyek Anda.",
      },
      {
        tag: "BACKEND-FIRST",
        title: "Fondasi backend yang kuat",
        desc: "Go, Java/Spring Boot, Laravel. API aman, terukur, dan terdokumentasi — bukan sekadar tampilan yang bagus di demo.",
      },
      {
        tag: "PERFORMA + SEO",
        title: "Cepat & mudah ditemukan sejak hari pertama",
        desc: "Core Web Vitals, structured data, dan sitemap dibangun sejak awal — bukan tambalan setelah rilis.",
      },
      {
        tag: "TANPA PERANTARA",
        title: "Komunikasi langsung, progress transparan",
        desc: "Diskusi, estimasi, dan update rutin langsung dengan saya. Anda melihat progress, bukan kerja di balik layar.",
      },
    ],
  },
  process: {
    heading: "Transparan dari awal sampai rilis",
    intro: "Tiga tahap sederhana — Anda selalu tahu posisi proyek ada di mana.",
    steps: serviceProcess,
  },
  proof: {
    heading: "Dikerjakan dengan standar production",
    intro:
      "Bukan portofolio template — ini sistem yang benar-benar dipakai. Baca masalah bisnisnya, keputusan arsitekturnya, dan hasilnya.",
    slugs: ["dexova-erp", "dexova-pos", "helixio", "rahan-mancar"],
    allLabel: "Lihat semua proyek",
    readCase: "Baca studi kasus",
  },
  faq: {
    heading: "Yang sering ditanyakan",
    items: [
      {
        q: "Berapa biaya pembuatan website atau aplikasi?",
        a: "Tergantung scope: jumlah halaman, fitur, dan integrasi. Setelah diskusi kebutuhan (gratis, tanpa komitmen), saya kirim estimasi biaya dan waktu yang jelas — jadi Anda bisa memutuskan dengan tenang.",
      },
      {
        q: "Berapa lama pengerjaannya?",
        a: "Landing page sederhana biasanya 1–2 minggu. Aplikasi web, API, atau toko online lebih lama tergantung kompleksitas fitur. Estimasi pasti diberikan setelah scope jelas.",
      },
      {
        q: "Apakah bisa kerja remote / beda kota?",
        a: "Bisa. Semua proyek saya kerjakan remote — komunikasi via WhatsApp atau video call, dengan update progress rutin sehingga Anda selalu tahu perkembangannya.",
      },
      {
        q: "Bagaimana sistem pembayarannya?",
        a: "Bertahap sesuai milestone yang disepakati di awal — bukan lunas di depan. Rinciannya kita sepakati bersama sebelum pengerjaan dimulai.",
      },
      {
        q: "Setelah rilis, apakah ada dukungan?",
        a: "Ada masa dukungan untuk perbaikan bug dan penyesuaian kecil setelah serah terima. Untuk jangka panjang, tersedia opsi maintenance terpisah.",
      },
      {
        q: "Apakah source code jadi milik saya?",
        a: "Ya. Setelah proyek selesai dan serah terima, source code beserta akses deployment sepenuhnya milik Anda.",
      },
    ],
  },
  cta: {
    heading: "Ceritakan kebutuhan Anda",
    body: "Diskusi & estimasi gratis, tanpa komitmen. Biasanya saya balas dalam kurang dari 24 jam.",
    button: "Chat WhatsApp sekarang",
    othersLabel: "Layanan:",
  },
};

const EN: ServiceHubCopy = {
  hero: {
    h1: "Web, Application & API Development Services",
    intro:
      "From company profiles to SaaS platforms — I design and build systems that are fast, secure, and ready to grow. The same standards as the ERP I build and operate in production.",
    ctaPrimary: "Free consultation via WhatsApp",
    ctaSecondary: "See case studies",
    secondaryHref: "/en/projects",
    waMessage: "Hi Oksa, I'd like to discuss a project.",
    trust: [
      "4+ years of enterprise apps (Dubai)",
      "30+ projects shipped end-to-end",
      "Replies < 24 hours",
      "Free estimate, no commitment",
    ],
  },
  services: {
    heading: "Pick the service that fits",
    intro:
      "Four core services — each backed by the same production discipline: clean architecture, tests, and observability.",
    learn: "Learn more",
    items: [
      {
        icon: "web",
        title: "Websites & Landing Pages",
        tagline:
          "Fast, SEO-ready company profiles and landing pages that look sharp on every screen.",
        highlights: [
          "Fast & SEO-ready — Core Web Vitals in check",
          "Responsive across phone, tablet, desktop",
          "Optional CMS: update content without code",
        ],
        stack: "Next.js · React · Laravel · Tailwind",
      },
      {
        icon: "app",
        title: "Web Application Development",
        tagline:
          "Custom dashboards, internal tools, and SaaS platforms shaped around your workflow — not a rigid template.",
        highlights: [
          "Dashboards with real-time data & reports",
          "Multi-user with roles & access control (RBAC)",
          "Architecture that scales as data grows",
        ],
        stack: "Next.js · Go · Laravel · PostgreSQL",
      },
      {
        icon: "api",
        title: "API & System Integration",
        tagline:
          "My core specialty: reliable REST APIs and integrations — payments, HRIS, logistics.",
        highlights: [
          "Secure, documented APIs (JWT, rate limiting)",
          "Payment gateway, HRIS, logistics, email integrations",
          "Observability: logging, metrics, tracing",
        ],
        stack: "Go · Java/Spring Boot · gRPC · Redis",
      },
      {
        icon: "store",
        title: "E-commerce & Online Stores",
        tagline:
          "Your own store — catalog, cart, automated payments, and an admin panel your team can actually use.",
        highlights: [
          "Checkout + automated payments (Midtrans)",
          "Admin panel for products, stock, and orders",
          "No marketplace fees — you own the customer data",
        ],
        stack: "Next.js · Go · PostgreSQL · Midtrans",
      },
    ],
  },
  why: {
    kicker: "Why me",
    heading: "Work directly with the engineer, not a middleman",
    intro:
      "The person you talk to is the person who writes the code — and owns the standard.",
    cards: [
      {
        tag: "PRODUCTION-PROVEN",
        title: "Standards from systems I operate myself",
        desc: "Dexova — an ERP with HRIS/payroll, POS, and inventory — is built and run by me in production. Your project gets the same standard.",
      },
      {
        tag: "BACKEND-FIRST",
        title: "A strong backend foundation",
        desc: "Go, Java/Spring Boot, Laravel. Secure, measurable, documented APIs — not just a UI that looks good in a demo.",
      },
      {
        tag: "PERFORMANCE + SEO",
        title: "Fast & discoverable from day one",
        desc: "Core Web Vitals, structured data, and sitemaps built in from the start — not patched on after launch.",
      },
      {
        tag: "NO MIDDLEMAN",
        title: "Direct communication, transparent progress",
        desc: "Discussion, estimates, and regular updates come straight from me. You see progress, not work behind a curtain.",
      },
    ],
  },
  process: {
    heading: "Transparent from kickoff to release",
    intro: "Three simple stages — you always know where the project stands.",
    steps: [
      {
        title: "Scope & estimate",
        desc: "We discuss goals, needs, and constraints. I help define a clear scope plus a time/cost estimate — free, no commitment.",
      },
      {
        title: "Design & build",
        desc: "I work in stages with regular updates. You see progress as it happens, not work behind a curtain.",
      },
      {
        title: "Release & support",
        desc: "Deploy to production, hand over documentation, plus a support window for fixes and adjustments.",
      },
    ],
  },
  proof: {
    heading: "Built to production standards",
    intro:
      "Not a template portfolio — these systems are in real use. Read the business problem, the architecture decisions, and the outcome.",
    slugs: ["dexova-erp", "dexova-pos", "helixio", "rahan-mancar"],
    allLabel: "See all projects",
    readCase: "Read case study",
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "How much does a website or application cost?",
        a: "It depends on scope: pages, features, and integrations. After a free discovery chat, I send a clear time and cost estimate so you can decide with confidence.",
      },
      {
        q: "How long does it take?",
        a: "A simple landing page is usually 1–2 weeks. Web apps, APIs, and online stores take longer depending on feature complexity. You get a firm estimate once scope is clear.",
      },
      {
        q: "Do you work remotely?",
        a: "Yes — all projects are delivered remotely, with communication over WhatsApp or video calls and regular progress updates.",
      },
      {
        q: "How does payment work?",
        a: "In stages, tied to milestones agreed upfront — never full payment in advance.",
      },
      {
        q: "Do I own the source code?",
        a: "Yes. After handover, the source code and deployment access are fully yours.",
      },
    ],
  },
  cta: {
    heading: "Tell me what you need",
    body: "Free discussion & estimate, no commitment. I usually reply within 24 hours.",
    button: "Chat on WhatsApp",
    othersLabel: "Services:",
  },
};

export function getServiceHub(locale: Locale): ServiceHubCopy {
  return locale === "en" ? EN : ID;
}
