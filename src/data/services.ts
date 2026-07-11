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

/** Shared 3-step engagement process — used by every /jasa spoke and the /service hub. */
export const serviceProcess: readonly ProcessStep[] = [
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
    process: serviceProcess,
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
    process: serviceProcess,
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
    title: "Jasa Pembuatan API & Integrasi Sistem — Go, Java, Laravel",
    h1: "Jasa Pembuatan API & Integrasi Sistem",
    tagline:
      "REST API yang andal dan integrasi antar-sistem — Midtrans, HRIS, logistik, webhook — spesialisasi utama saya, bukan layanan sampingan.",
    metaDescription:
      "Jasa pembuatan REST API & integrasi sistem oleh backend developer (Go, Java/Spring Boot, Laravel): integrasi Midtrans/payment gateway, webhook, gRPC, dokumentasi OpenAPI, dan observability. Dipakai di ERP production. Diskusi gratis.",
    keywords: [
      "jasa pembuatan API",
      "jasa pembuatan REST API",
      "jasa integrasi sistem",
      "jasa backend developer",
      "backend developer freelance",
      "jasa integrasi payment gateway",
      "jasa integrasi midtrans",
      "jasa pembuatan API Golang",
      "jasa pembuatan webhook",
      "jasa integrasi API pihak ketiga",
    ],
    intro:
      "Ini spesialisasi utama saya — bukan layanan tambahan. Backend yang sama yang menjalankan payroll, kasir, dan stok di ERP production (Dexova) saya pakai standarnya untuk proyek Anda: REST API untuk aplikasi mobile/web, webhook pembayaran yang tidak kehilangan transaksi, atau menyambungkan sistem-sistem yang selama ini jalan sendiri-sendiri (kasir tidak nyambung ke stok, HRIS tidak nyambung ke payroll). Fokusnya tiga hal: aman, andal, dan gampang dipantau saat ada masalah.",
    whatYouGet: [
      "REST API aman & terdokumentasi (auth JWT/OAuth2, validasi, rate limiting, OpenAPI/Swagger)",
      "Integrasi payment gateway (Midtrans — QRIS, VA, e-wallet) dengan webhook yang terverifikasi HMAC",
      "Integrasi pihak ketiga lain: HRIS, API logistik/ekspedisi, email, kalender",
      "Webhook & komunikasi antar-service yang andal (retry, idempotency, HTTP/gRPC)",
      "Observability: logging terstruktur, metrics, dan tracing supaya masalah cepat ketahuan",
      "Arsitektur bersih + testing supaya aman dirawat dan dikembangkan jangka panjang",
    ],
    process: serviceProcess,
    stack: ["Go (Echo/Gin)", "Java/Spring Boot", "Laravel", "PostgreSQL", "Redis", "gRPC", "Docker"],
    faq: [
      { q: "Saya cuma butuh sambungin 2 sistem, bisa?", a: "Bisa. Integrasi (mis. menghubungkan website ke sistem HRIS, atau kasir ke stok) justru pekerjaan yang paling sering saya tangani — tidak harus proyek besar." },
      { q: "Bisa integrasi pembayaran Midtrans / payment gateway lain?", a: "Bisa — ini yang saya jalankan di production: QRIS Midtrans di sistem kasir Dexova, lengkap dengan webhook konfirmasi otomatis dan verifikasi signature supaya tidak ada transaksi palsu atau hilang." },
      { q: "API-nya dipakai aplikasi mobile, didukung?", a: "Ya. API yang saya buat agnostik — bisa dikonsumsi web, mobile (Android/iOS), atau service lain, dengan versioning yang jelas." },
      { q: "Apakah ada dokumentasi API-nya?", a: "Ada. Saya sediakan dokumentasi OpenAPI/Swagger supaya tim Anda atau developer lain gampang memakainya tanpa harus tanya-tanya." },
      { q: "Sistem lama (legacy) bisa disambungkan?", a: "Umumnya bisa, selama sistem lama punya akses database atau endpoint yang bisa dipanggil. Saya audit dulu kondisinya, lalu rekomendasikan pola integrasi yang paling aman — tanpa harus menulis ulang sistem lama." },
      { q: "Bagaimana soal keamanan?", a: "Standar yang saya pakai: autentikasi token, validasi input, rate limiting, security headers, verifikasi HMAC untuk webhook, dan scanning kerentanan sebelum rilis." },
    ],
    estimateNote:
      "Biaya tergantung jumlah endpoint & integrasi. Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
  {
    slug: "sistem-pos-kasir",
    keyword: "jasa pembuatan sistem kasir (POS)",
    title: "Jasa Pembuatan Sistem Kasir / Aplikasi POS Custom",
    h1: "Jasa Pembuatan Sistem Kasir (POS)",
    tagline:
      "Aplikasi kasir custom dengan QRIS Midtrans, rekonsiliasi kas per shift, dan stok yang selalu sinkron — standar yang sama dengan POS yang saya operasikan di production.",
    metaDescription:
      "Jasa pembuatan sistem kasir / aplikasi POS custom: QRIS Midtrans, split payment, shift & rekonsiliasi kas, void/retur dengan stok balik otomatis, multi-outlet, printer thermal. Dibangun oleh developer POS production. Diskusi gratis.",
    keywords: [
      "jasa pembuatan sistem kasir",
      "jasa pembuatan aplikasi kasir",
      "jasa pembuatan sistem POS",
      "aplikasi kasir custom",
      "sistem kasir toko",
      "aplikasi kasir multi outlet",
      "sistem POS restoran",
      "aplikasi kasir dengan QRIS",
    ],
    intro:
      "Kasir yang cuma bisa catat penjualan itu belum menyelesaikan masalah. Yang sering bikin rugi: kas akhir shift tidak cocok, stok di sistem beda dengan fisik, dan pembayaran QRIS yang harus dicek manual. Saya bangun sistem kasir custom dengan pola yang sama seperti Dexova POS yang saya operasikan di production — dari alur transaksi, pembayaran, sampai rekonsiliasi kas per shift.",
    whatYouGet: [
      "Alur kasir cepat: katalog, keranjang, diskon, dan split payment (tunai + non-tunai)",
      "Pembayaran QRIS Midtrans terkonfirmasi otomatis lewat webhook — tanpa cek manual",
      "Shift kasir dengan modal awal, setoran, dan rekonsiliasi kas harian (selisih langsung ketahuan)",
      "Void & retur dengan stok kembali otomatis — stok sistem selalu cocok dengan fisik",
      "Multi-outlet dengan laporan penjualan per outlet, per kasir, per periode",
      "Cetak struk ke printer thermal (ESC/POS) dan laporan yang bisa diekspor",
    ],
    process: serviceProcess,
    stack: ["Next.js (PWA)", "Go", "PostgreSQL", "Redis", "Midtrans (QRIS)", "ESC/POS"],
    faq: [
      { q: "Bedanya dengan aplikasi kasir jadi (Moka, Majoo, dll) apa?", a: "Aplikasi kasir SaaS bagus untuk alur standar. Custom masuk akal kalau alur Anda tidak standar — mis. harga per pelanggan, integrasi ke sistem stok/akuntansi yang sudah ada, aturan diskon khusus, atau Anda ingin data penuh di tangan sendiri tanpa biaya langganan per outlet." },
      { q: "Bisa terima pembayaran QRIS?", a: "Bisa. Saya integrasikan QRIS Midtrans dengan webhook konfirmasi otomatis — kasir tidak perlu cek mutasi manual, status pembayaran masuk sendiri ke sistem." },
      { q: "Kalau internet mati, kasir tetap jalan?", a: "Bisa dirancang offline-first (PWA): transaksi tersimpan lokal dan tersinkron otomatis saat koneksi kembali. Sampaikan kebutuhan ini di awal supaya masuk scope." },
      { q: "Apakah stok ikut terkelola?", a: "Ya. Setiap penjualan memotong stok otomatis, dan void/retur mengembalikannya. Kalau Anda butuh manajemen stok multi-gudang yang lebih dalam, itu juga bisa — pola yang sama dengan modul inventori Dexova." },
      { q: "Printer kasir (thermal) didukung?", a: "Didukung. Saya pernah menulis driver cetak ESC/POS langsung dari browser (Web Bluetooth) untuk Dexova POS — tanpa aplikasi tambahan." },
      { q: "Berapa lama pengerjaannya?", a: "POS single-outlet dengan pembayaran dan laporan dasar biasanya beberapa minggu; multi-outlet + integrasi stok lebih lama. Estimasi pasti setelah scope jelas — diskusi gratis." },
    ],
    estimateNote:
      "Biaya tergantung jumlah outlet, integrasi pembayaran, dan kedalaman manajemen stok. Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "sistem-hris-payroll",
    keyword: "jasa pembuatan sistem HRIS & payroll",
    title: "Jasa Pembuatan Sistem HRIS, Payroll & Absensi Custom",
    h1: "Jasa Pembuatan Sistem HRIS & Payroll",
    tagline:
      "HRIS custom dengan payroll sesuai aturan Indonesia (lembur PP 35/2021, PPh 21, BPJS) dan absensi geofence — pola yang sama dengan HRIS yang saya operasikan di production.",
    metaDescription:
      "Jasa pembuatan sistem HRIS & payroll custom: perhitungan gaji dengan lembur bertingkat PP 35/2021, PPh 21, BPJS, absensi geofence + selfie, approval berjenjang, dan slip gaji. Dibangun oleh developer HRIS production. Diskusi gratis.",
    keywords: [
      "jasa pembuatan HRIS",
      "jasa pembuatan sistem payroll",
      "jasa pembuatan aplikasi absensi",
      "sistem penggajian karyawan custom",
      "aplikasi HRIS custom",
      "sistem absensi karyawan geofence",
      "aplikasi payroll indonesia",
      "sistem absensi selfie",
    ],
    intro:
      "Menghitung gaji di spreadsheet masih jalan — sampai karyawan bertambah, aturan lembur bertingkat mulai salah hitung, dan rekap absensi makan waktu berhari-hari tiap akhir bulan. Saya bangun sistem HRIS & payroll custom dengan aturan bisnis yang sudah saya implementasikan di production (Dexova HRIS): lembur bertingkat PP 35/2021, PPh 21, BPJS, proration, sampai tanggal gajian yang bergeser karena hari libur bank.",
    whatYouGet: [
      "Mesin payroll dengan aturan Indonesia: lembur bertingkat (PP 35/2021), PPh 21, BPJS, proration",
      "Absensi berbasis lokasi (geofence) dengan selfie — anti titip absen, mendukung WFH dua alamat",
      "Periode absensi terkunci sebelum payroll dihitung — angka gaji tidak berubah diam-diam",
      "Approval berjenjang (cuti, izin, koreksi absen, lembur) dengan eskalasi otomatis",
      "Shift & penjadwalan kerja, termasuk pola shift yang berputar",
      "Slip gaji digital + ekspor laporan untuk keperluan pembukuan",
    ],
    process: serviceProcess,
    stack: ["Go", "Next.js (PWA)", "PostgreSQL", "Redis", "Excel import/export"],
    faq: [
      { q: "Apakah perhitungan pajaknya dijamin sesuai peraturan?", a: "Saya mengimplementasikan aturan perhitungan (lembur PP 35/2021, PPh 21, BPJS) sebagai logika sistem berdasarkan parameter yang Anda dan konsultan pajak/HR Anda tetapkan — saya developer, bukan konsultan pajak. Sistemnya saya buat mudah diaudit: setiap komponen gaji bisa ditelusuri asal angkanya." },
      { q: "Bedanya dengan HRIS SaaS (Talenta, Gadjian, dll) apa?", a: "SaaS cocok untuk aturan standar. Custom masuk akal kalau aturan Anda spesifik — struktur tunjangan khusus, pola shift tidak umum, integrasi ke sistem internal, atau kebutuhan data penuh di server sendiri tanpa biaya per karyawan per bulan." },
      { q: "Absensinya bagaimana mencegah titip absen?", a: "Kombinasi geofence (hanya bisa absen dalam radius lokasi kerja) + selfie wajib saat check-in. Untuk WFH, sistem mendukung alamat kerja kedua yang disetujui admin." },
      { q: "Bisa impor data karyawan dari Excel?", a: "Bisa. Impor massal karyawan, jadwal, dan komponen gaji dari Excel — dengan validasi supaya data salah tidak ikut masuk." },
      { q: "Karyawan akses lewat apa?", a: "Aplikasi web/PWA di HP masing-masing — absen, lihat slip gaji, ajukan cuti/izin — tanpa install dari app store." },
      { q: "Data gaji kan sensitif — bagaimana keamanannya?", a: "Akses dibatasi per peran (RBAC), data sensitif dienkripsi, dan setiap perubahan penting tercatat di audit log. Server bisa di infrastruktur pilihan Anda." },
    ],
    estimateNote:
      "Biaya tergantung jumlah modul (payroll, absensi, cuti, shift) dan kompleksitas aturan gaji. Diskusi & estimasi gratis lewat WhatsApp.",
    relatedProjects: ["dexova-hris", "dexova-erp"],
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
    process: serviceProcess,
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
