// Service landing pages (hub-and-spoke from /service).
// Each page targets ONE commercial keyword with genuinely distinct, honest
// content (what you get, process, stack, FAQ) — not thin doorway duplicates.

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

export interface ProcessStep {
  readonly title: string;
  readonly desc: string;
}

export interface ServiceLanding {
  /** URL slug under /jasa — e.g. "pembuatan-website" -> /jasa/pembuatan-website */
  readonly slug: string;
  /** Primary keyword this page targets. */
  readonly keyword: string;
  /** <title> (brand appended by the route). */
  readonly title: string;
  /** H1. */
  readonly h1: string;
  readonly tagline: string;
  readonly metaDescription: string;
  readonly keywords: readonly string[];
  readonly intro: string;
  /** "Apa yang Anda dapat". */
  readonly whatYouGet: readonly string[];
  readonly process: readonly ProcessStep[];
  readonly stack: readonly string[];
  readonly faq: readonly FaqItem[];
  /** Honest estimate note (no fabricated price). */
  readonly estimateNote: string;
  /** Case-study slugs (from projects.ts) to cross-link as proof. */
  readonly relatedProjects: readonly string[];
}

const PROCESS_DEFAULT: readonly ProcessStep[] = [
  { title: "Diskusi & scope", desc: "Kita bahas kebutuhan, target, dan batasan. Saya bantu rumuskan scope yang jelas + estimasi waktu/biaya — gratis, tanpa komitmen." },
  { title: "Desain & pengerjaan", desc: "Saya kerjakan bertahap dengan update rutin. Anda bisa lihat progress, bukan kerja di balik layar." },
  { title: "Rilis & support", desc: "Deploy ke production, serah-terima dokumentasi, plus masa dukungan untuk perbaikan & penyesuaian." },
];

export const serviceLandings: readonly ServiceLanding[] = [
  {
    slug: "pembuatan-website",
    keyword: "jasa pembuatan website",
    title: "Jasa Pembuatan Website (Company Profile, Landing, Web App)",
    h1: "Jasa Pembuatan Website",
    tagline:
      "Website company profile, landing page, dan web app yang cepat, rapi, dan siap ditemukan di Google.",
    metaDescription:
      "Jasa pembuatan website profesional: company profile, landing page, dan web app dengan Next.js & Laravel. Cepat (LCP bagus), responsif, SEO-friendly, dan mudah dirawat. Diskusi gratis.",
    keywords: [
      "jasa pembuatan website",
      "jasa pembuatan website company profile",
      "jasa pembuatan landing page",
      "jasa bikin website",
      "jasa pembuatan website murah profesional",
    ],
    intro:
      "Butuh website yang bukan cuma 'jadi', tapi cepat dibuka, enak dilihat di HP, dan bisa ditemukan calon pelanggan di Google? Saya bantu rancang dan bangun website company profile, landing page, sampai web app — dengan fondasi teknis yang benar sejak awal.",
    whatYouGet: [
      "Website responsif (rapi di HP, tablet, desktop) dengan performa cepat (Core Web Vitals terjaga)",
      "Company profile, landing page, atau web app sesuai kebutuhan",
      "SEO dasar siap-indeks: meta tag, struktur heading, sitemap, dan structured data",
      "Opsi CMS supaya Anda bisa update konten sendiri tanpa coding",
      "Integrasi form/kontak ke WhatsApp atau email",
    ],
    process: PROCESS_DEFAULT,
    stack: ["Next.js", "React", "TypeScript", "Laravel (CMS)", "Tailwind/Bootstrap"],
    faq: [
      { q: "Berapa lama pengerjaannya?", a: "Landing page sederhana biasanya 1–2 minggu; company profile multi-halaman atau web app lebih lama, tergantung fitur. Estimasi pasti diberikan setelah scope jelas." },
      { q: "Apakah sudah termasuk domain & hosting?", a: "Bisa saya bantu setup domain + hosting (mis. Vercel/Railway), atau pakai milik Anda. Biaya domain/hosting di luar jasa pengembangan." },
      { q: "Bisa update konten sendiri nanti?", a: "Bisa, kalau Anda pilih opsi CMS. Saya siapkan panel admin yang mudah dipakai non-teknis." },
      { q: "Apakah website-nya SEO-friendly?", a: "Ya. Saya bangun dengan SSR/SSG, meta tag, sitemap, dan structured data supaya cepat terindeks Google." },
    ],
    estimateNote:
      "Biaya disesuaikan scope (jumlah halaman, fitur, CMS). Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["rahan-mancar", "dexova-erp"],
  },
  {
    slug: "pembuatan-aplikasi",
    keyword: "jasa pembuatan aplikasi",
    title: "Jasa Pembuatan Aplikasi Web & Dashboard Custom",
    h1: "Jasa Pembuatan Aplikasi Web",
    tagline:
      "Aplikasi web custom, dashboard admin, dan sistem internal yang benar-benar sesuai alur bisnis Anda.",
    metaDescription:
      "Jasa pembuatan aplikasi web custom: dashboard admin, sistem internal, dan platform SaaS dengan Next.js + backend Go/Laravel. Multi-user, role akses, integrasi, dan siap skala. Diskusi gratis.",
    keywords: [
      "jasa pembuatan aplikasi",
      "jasa pembuatan aplikasi web",
      "jasa pembuatan aplikasi custom",
      "jasa pembuatan dashboard admin",
      "jasa pembuatan sistem informasi",
      "jasa pembuatan aplikasi SaaS",
    ],
    intro:
      "Spreadsheet sudah mulai kewalahan? Proses manual rawan salah dan susah dipantau? Saya bantu bangun aplikasi web custom — dashboard admin, sistem internal, sampai platform SaaS — yang dirancang mengikuti alur kerja Anda, bukan template kaku.",
    whatYouGet: [
      "Aplikasi web custom sesuai proses bisnis (bukan template paksaan)",
      "Dashboard admin dengan data real-time, filter, dan laporan",
      "Multi-user dengan role & hak akses (RBAC) dan autentikasi aman",
      "Integrasi ke layanan lain (payment, HRIS, logistik, email)",
      "Arsitektur yang siap tumbuh saat data & pengguna bertambah",
    ],
    process: PROCESS_DEFAULT,
    stack: ["Next.js", "Go (Echo/Gin)", "Laravel", "PostgreSQL", "Redis", "Docker"],
    faq: [
      { q: "Bedanya dengan jasa pembuatan website apa?", a: "Website fokus menampilkan informasi (company profile, landing). Aplikasi web itu sistem interaktif: ada login, data yang diolah, peran pengguna, dan alur kerja — seperti dashboard, POS, atau HRIS." },
      { q: "Apakah bisa multi-user dengan hak akses berbeda?", a: "Bisa. Saya terapkan role-based access control (mis. Owner/Admin/Staff) dan isolasi data antar tenant kalau multi-perusahaan." },
      { q: "Apakah aplikasinya bisa berkembang nanti?", a: "Ya. Saya pakai arsitektur bersih (hexagonal/modular) supaya nambah fitur tidak merusak yang sudah ada." },
      { q: "Bisa lanjutkan/perbaiki aplikasi yang sudah ada?", a: "Bisa, selama kode-nya bisa diakses. Saya audit dulu lalu kasih rekomendasi sebelum lanjut." },
    ],
    estimateNote:
      "Biaya & waktu tergantung kompleksitas fitur. Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "pembuatan-api",
    keyword: "jasa pembuatan API & integrasi sistem",
    title: "Jasa Pembuatan API & Integrasi Sistem (Backend)",
    h1: "Jasa Pembuatan API & Integrasi Sistem",
    tagline:
      "REST API yang andal dan integrasi antar-sistem (payment, HRIS, logistik) — spesialisasi backend saya.",
    metaDescription:
      "Jasa pembuatan REST API & integrasi sistem dengan Go (Echo/Gin) dan Java/Spring Boot. API aman dan terdokumentasi, integrasi payment gateway/HRIS/logistik, dan backend skalabel. Diskusi gratis.",
    keywords: [
      "jasa pembuatan API",
      "jasa pembuatan REST API",
      "jasa integrasi sistem",
      "jasa backend developer",
      "jasa integrasi payment gateway",
      "jasa pembuatan API Golang",
    ],
    intro:
      "Ini spesialisasi saya. Kalau Anda butuh backend yang kuat — REST API untuk aplikasi mobile/web, atau menyambungkan beberapa sistem yang tadinya jalan sendiri-sendiri — saya bantu rancang dan bangun dengan fokus pada keamanan, keandalan, dan kemudahan dipantau.",
    whatYouGet: [
      "REST API aman & terdokumentasi (auth JWT/OAuth2, validasi, rate limiting)",
      "Integrasi pihak ketiga: payment gateway (mis. Midtrans), HRIS, API logistik, email",
      "Webhook & komunikasi antar-service yang andal (HTTP/gRPC)",
      "Observability: logging, metrics, dan tracing supaya masalah cepat ketahuan",
      "Arsitektur bersih + testing supaya aman dirawat jangka panjang",
    ],
    process: PROCESS_DEFAULT,
    stack: ["Go (Echo/Gin)", "Java/Spring Boot", "PostgreSQL", "Redis", "gRPC", "Docker"],
    faq: [
      { q: "Saya cuma butuh sambungin 2 sistem, bisa?", a: "Bisa. Integrasi (mis. menghubungkan website ke sistem HRIS atau payment) justru pekerjaan yang sering saya tangani." },
      { q: "API-nya dipakai aplikasi mobile, didukung?", a: "Ya. API yang saya buat agnostik — bisa dikonsumsi web, mobile (Android/iOS), atau service lain." },
      { q: "Apakah ada dokumentasi API-nya?", a: "Ada. Saya sediakan dokumentasi (mis. OpenAPI/Swagger) supaya tim Anda atau developer lain gampang memakainya." },
      { q: "Bagaimana soal keamanan?", a: "Standar: autentikasi token, validasi input, rate limiting, security headers, dan scanning kerentanan sebelum rilis." },
    ],
    estimateNote:
      "Biaya tergantung jumlah endpoint & integrasi. Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
  {
    slug: "pembuatan-toko-online",
    keyword: "jasa pembuatan toko online",
    title: "Jasa Pembuatan Toko Online & Website E-commerce",
    h1: "Jasa Pembuatan Toko Online",
    tagline:
      "Toko online dengan katalog, keranjang, pembayaran online, dan panel admin yang gampang dikelola.",
    metaDescription:
      "Jasa pembuatan toko online & website e-commerce: katalog produk, keranjang, checkout, pembayaran (Midtrans), dan dashboard admin. Cepat, aman, dan siap jualan. Diskusi gratis.",
    keywords: [
      "jasa pembuatan toko online",
      "jasa pembuatan website e-commerce",
      "jasa bikin toko online",
      "jasa pembuatan website jualan online",
    ],
    intro:
      "Mau jualan online dengan toko sendiri (bukan numpang marketplace)? Saya bantu bangun toko online — dari katalog produk, keranjang, checkout, sampai pembayaran online dan panel admin untuk kelola pesanan & stok.",
    whatYouGet: [
      "Katalog produk + kategori + pencarian",
      "Keranjang, checkout, dan pembayaran online (mis. Midtrans)",
      "Panel admin untuk kelola produk, pesanan, dan stok",
      "Manajemen user & autentikasi pelanggan",
      "Siap mobile + cepat supaya pembeli tidak kabur",
    ],
    process: PROCESS_DEFAULT,
    stack: ["Next.js", "Go (Gin)", "PostgreSQL", "Redis", "Midtrans"],
    faq: [
      { q: "Bisa terima pembayaran otomatis?", a: "Bisa. Saya integrasikan payment gateway (mis. Midtrans) supaya pembayaran terkonfirmasi otomatis lewat webhook." },
      { q: "Beda toko online sendiri vs marketplace apa?", a: "Toko sendiri = Anda pegang penuh brand, data pelanggan, dan tanpa potongan marketplace. Cocok untuk jangka panjang." },
      { q: "Apakah ada manajemen stok?", a: "Ada. Panel admin mencakup kelola produk, stok, dan pesanan." },
    ],
    estimateNote:
      "Biaya tergantung jumlah fitur (mis. multi-payment, voucher, multi-gudang). Diskusi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
];

const bySlug = new Map<string, ServiceLanding>(serviceLandings.map((s) => [s.slug, s]));

export function getServiceLanding(slug: string): ServiceLanding | undefined {
  return bySlug.get(slug);
}

export function getAllServiceSlugs(): readonly string[] {
  return serviceLandings.map((s) => s.slug);
}
