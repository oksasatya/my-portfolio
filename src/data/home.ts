// Homepage content — kept out of presentational components on purpose.

export interface Capability {
  readonly title: string;
  readonly description: string;
  readonly tech: readonly string[];
}

export const capabilities: readonly Capability[] = [
  {
    title: "Backend Engineering",
    description:
      "API dan service production: arsitektur hexagonal, domain logic yang kompleks (payroll, rekonsiliasi kas), job async, dan error handling yang disiplin.",
    tech: ["Go", "Java / Spring Boot", "Laravel", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    title: "Frontend Engineering",
    description:
      "Dashboard admin, portal self-service, dan PWA — dibangun dengan React/Next.js, dioptimalkan untuk Core Web Vitals.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "System Architecture",
    description:
      "Memecah sistem menjadi modul berbatas jelas: empat modul bisnis Dexova berjalan di satu codebase Go tanpa saling merusak.",
    tech: ["Hexagonal / Clean Architecture", "gRPC", "SSE", "Event-driven"],
  },
  {
    title: "SaaS & Multi-Tenancy",
    description:
      "Isolasi data per tenant, RBAC, subscription + trial — dipraktikkan di Dexova dan Helixio, bukan teori.",
    tech: ["Multi-tenant PostgreSQL", "RBAC", "Billing / trial flow"],
  },
  {
    title: "Business Automation",
    description:
      "Aturan bisnis yang jalan sendiri: payroll dengan lembur bertingkat (PP 35/2021), eskalasi approval ber-SLA, bulk import Excel async.",
    tech: ["Job queue", "Scheduler / cron", "Excel pipeline"],
  },
  {
    title: "Third-Party Integration",
    description:
      "Payment, kalender, dan AI terintegrasi dengan aman: Midtrans QRIS untuk POS, Google Calendar sync, OpenAI/Google AI di atas data operasional.",
    tech: ["Midtrans", "Google APIs", "OpenAI", "Webhook / HMAC"],
  },
  {
    title: "Cloud & Deployment",
    description:
      "Containerized deployment dengan migrasi database yang aman, konfigurasi env yang bersih, dan observability dasar.",
    tech: ["Docker", "Linux", "CI/CD", "Nginx"],
  },
  {
    title: "Performance & SEO",
    description:
      "Aplikasi cepat dan bisa ditemukan: SSR/SSG, structured data, budget Lighthouse, dan query database yang tidak N+1.",
    tech: ["Next.js SSR/SSG", "Lighthouse", "Schema.org", "Query tuning"],
  },
];

export interface ExperienceItem {
  readonly org: string;
  readonly role: string;
  readonly period: string;
  readonly problem: string;
  readonly outcome: string;
}

export const experience: readonly ExperienceItem[] = [
  {
    org: "PT Infini Software House Technology DMCC — Dubai",
    role: "Full Stack Developer",
    period: "Jul 2022 – sekarang",
    problem:
      "Membangun dan memelihara aplikasi enterprise untuk klien software house: backend Java/Spring Boot dengan frontend Next.js, kebutuhan integrasi sistem yang beragam.",
    outcome:
      "4+ tahun mengirim fitur production untuk aplikasi enterprise — dari desain API, integrasi antar-sistem, sampai UI yang dipakai user bisnis setiap hari.",
  },
  {
    org: "Dexova",
    role: "Architect & Full-Stack Developer",
    period: "2024 – sekarang",
    problem:
      "Bisnis Indonesia menjalankan HR, gaji, kasir, dan stok di tool terpisah — data tidak sinkron dan rawan salah hitung.",
    outcome:
      "Platform ERP dengan empat modul (HRIS, Payroll, POS, Inventory) di satu backend Go — tiga aplikasi production: dashboard admin, PWA absensi karyawan, dan aplikasi kasir.",
  },
  {
    org: "PT Citiasia Inti Solusi — Jakarta",
    role: "Backend Developer (Internship)",
    period: "2021 – 2022",
    problem: "Kebutuhan backend untuk produk smart-city berbasis Laravel.",
    outcome:
      "Fondasi engineering profesional pertama: REST API Laravel, kolaborasi tim, dan disiplin version control.",
  },
];

export const trustItems: readonly string[] = [
  "4+ tahun aplikasi enterprise (Dubai)",
  "3 aplikasi production di Dexova",
  "HRIS · Payroll · POS · Inventory",
  "Go · Java · Laravel · Next.js",
];

export interface DexovaProblem {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
}

export const dexovaProblems: readonly DexovaProblem[] = [
  {
    tag: "payroll-engine",
    title: "Payroll sadar regulasi",
    description:
      "Lembur bertingkat sesuai PP 35/2021, PPh 21, BPJS, pro-rata, dan payday yang otomatis bergeser saat libur bank — dihitung dari periode absensi yang terkunci.",
  },
  {
    tag: "geofence-attendance",
    title: "Absensi geofence dual-address",
    description:
      "Check-in PWA dengan deteksi kantor terdekat, selfie wajib anti titip-absen, dukungan WFH lewat model dua alamat, dan koreksi kehadiran ber-approval.",
  },
  {
    tag: "pos-reconciliation",
    title: "Kasir dengan rekonsiliasi shift",
    description:
      "Buka/tutup shift dengan kas awal, split payment, QRIS Midtrans, void & retur dengan pengembalian stok otomatis, sampai rekonsiliasi kas harian.",
  },
];
