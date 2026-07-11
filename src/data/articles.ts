// Engineering notes / articles. Metadata + body (rendered on /articles/[slug]).
// Launch scope: 2 deep articles. More topics ship only with a real writing cadence
// (roadmap in docs/redesign-plan.md).

export interface ArticleSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  /** ISO date, also used for Article JSON-LD + sitemap lastmod. */
  readonly publishedAt: string;
  readonly readingMinutes: number;
  readonly tags: readonly string[];
  readonly intro: string;
  readonly sections: readonly ArticleSection[];
  /** Related case study slugs for internal linking. */
  readonly relatedProjects: readonly string[];
}

export const articles: readonly Article[] = [
  {
    slug: "arsitektur-hris-payroll-indonesia",
    title: "Arsitektur Aplikasi HRIS & Payroll: Pelajaran dari Membangun Dexova",
    description:
      "Kenapa payroll adalah domain logic paling berbahaya untuk di-hardcode — dan bagaimana Dexova menyusun periode terkunci, aturan lembur PP 35/2021, dan payroll run async.",
    publishedAt: "2026-07-11",
    readingMinutes: 8,
    tags: ["HRIS", "Payroll", "Go", "Arsitektur"],
    intro:
      "Menghitung gaji terlihat seperti aritmetika: jam kerja dikali tarif, potong pajak, selesai. Sampai Anda benar-benar membangunnya. Artikel ini merangkum keputusan arsitektur terpenting saat saya membangun modul HRIS & Payroll di Dexova — dan kesalahan yang untungnya ketahuan lebih awal.",
    sections: [
      {
        heading: "Kenapa payroll tidak boleh dihitung dari data hidup",
        paragraphs: [
          "Kesalahan pertama yang hampir semua sistem payroll amatir lakukan: menghitung gaji langsung dari tabel absensi yang masih bisa berubah. Karyawan mengajukan koreksi jam masuk, HR menyetujuinya — dan slip gaji yang sudah dibayar tiba-tiba tidak cocok dengan data.",
          "Solusinya adalah periode yang dikunci. Di Dexova, rekap kehadiran bulanan mengunci data absensi sebagai snapshot; payroll run hanya boleh digenerate dari periode yang sudah terkunci. Koreksi setelah kunci masuk ke periode berikutnya sebagai penyesuaian — bukan mengubah sejarah.",
        ],
      },
      {
        heading: "Aturan regulasi sebagai konfigurasi, bukan if-else",
        paragraphs: [
          "Lembur di Indonesia diatur bertingkat (PP 35/2021): jam pertama dan jam berikutnya punya pengali berbeda, hari libur berbeda lagi. Menuliskannya sebagai rantai if-else berarti setiap perubahan regulasi atau kebijakan perusahaan adalah deploy baru.",
          "Di Dexova, tarif lembur, pembagi tarif harian, strategi pembulatan, dan tipe minggu kerja adalah konfigurasi per perusahaan. Kode hanya tahu cara mengevaluasi aturan; nilai aturannya milik data. Efek sampingnya bagus: menguji perhitungan jadi soal menyiapkan konfigurasi + input absensi, lalu membandingkan output.",
        ],
        bullets: [
          "Tarif lembur bertingkat per jam ke-1 / berikutnya / hari libur — konfigurasi.",
          "Cutoff vs payday dipisah; payday bergeser otomatis saat libur bank.",
          "Komponen gaji dan tarif per karyawan (pro-rata karyawan baru) — data, bukan kode.",
          "Penyesuaian satu-kali (bonus, THR, severance) hidup di run, bukan di komponen permanen.",
        ],
      },
      {
        heading: "Payroll run sebagai job async",
        paragraphs: [
          "Menghitung gaji ratusan karyawan bukan pekerjaan satu request HTTP. Payroll run di Dexova berjalan sebagai job async dengan progress monitoring: HR menekan satu tombol, melihat progresnya, dan mendapat hasil yang bisa diperiksa sebelum finalisasi.",
          "Pola yang sama dipakai untuk bulk import karyawan dari Excel — pekerjaan berat apa pun yang menyentuh banyak baris tidak boleh memblokir UI, dan harus bisa dilacak statusnya.",
        ],
      },
      {
        heading: "Absensi: jaga validitas di sumbernya",
        paragraphs: [
          "Payroll hanya sebaik data absensinya. Karena itu validasi dilakukan di titik masuk: check-in lewat PWA dengan geofence (aplikasi mendeteksi kantor terdekat dan menolak absen di luar radius), WFH lewat model dua alamat yang ber-approval, dan koreksi kehadiran yang selalu melewati persetujuan — bukan edit bebas di database.",
          "Membersihkan data kotor belakangan selalu lebih mahal daripada menolaknya sejak awal.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Kalau harus diringkas satu kalimat: pisahkan aturan dari kode, kunci data sebelum menghitung, dan jadikan pekerjaan berat sebagai job yang terlacak. Tiga hal itu yang membuat payroll bisa diaudit — dan membuat tidur lebih nyenyak di tanggal gajian.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "membangun-saas-multi-tenant",
    title: "Membangun SaaS Multi-Tenant: Isolasi Data Tanpa Drama",
    description:
      "Pola isolasi tenant yang saya pakai di Dexova dan Helixio: satu skema dengan tenant context yang disiplin, RBAC, dan jebakan-jebakan yang baru terasa saat ada background job.",
    publishedAt: "2026-07-11",
    readingMinutes: 7,
    tags: ["SaaS", "Multi-tenant", "PostgreSQL", "Go"],
    intro:
      "Multi-tenancy adalah janji sederhana dengan konsekuensi panjang: banyak perusahaan memakai satu aplikasi, dan data mereka tidak boleh saling terlihat — bukan kadang-kadang, tapi selalu. Ini pola yang saya pakai di dua sistem production (Dexova dan Helixio), plus jebakan yang saya temui.",
    sections: [
      {
        heading: "Pilih model isolasinya secara sadar",
        paragraphs: [
          "Ada tiga pilihan umum: database terpisah per tenant, skema terpisah per tenant, atau satu skema bersama dengan kolom tenant. Untuk SaaS dengan banyak tenant kecil–menengah, skema bersama hampir selalu titik mulai yang benar: operasional paling murah, migrasi sekali jalan, dan kapasitas tenant baru praktis gratis.",
          "Harganya: isolasi sepenuhnya menjadi tanggung jawab disiplin aplikasi. Setiap query harus dibatasi tenant — dan 'setiap' di sini benar-benar berarti setiap.",
        ],
      },
      {
        heading: "Tenant context yang tidak bisa lupa",
        paragraphs: [
          "Kesalahan klasik: mengandalkan setiap developer untuk ingat menambahkan filter tenant di query. Sekali lupa, data bocor. Konteks tenant harus mengalir dari autentikasi ke seluruh jalur eksekusi — di Go, lewat context.Context yang diisi middleware setelah token divalidasi, lalu dibaca lapisan data.",
          "Prinsipnya: jalur yang aman harus menjadi jalur yang paling mudah. Query helper yang menerima tenant dari context secara eksplisit membuat 'lupa filter' berubah dari bug diam-diam menjadi kode yang terlihat janggal saat review.",
        ],
      },
      {
        heading: "RBAC di atas isolasi, bukan sebagai gantinya",
        paragraphs: [
          "Isolasi tenant menjawab 'data perusahaan mana' — belum menjawab 'siapa boleh apa'. Di Helixio saya memakai empat peran (Owner, Admin, Member, Viewer) per workspace; di Dexova, peran per modul (mis. kasir vs manajer di POS, dengan pencabutan akses dari dashboard).",
          "Keduanya lapisan berbeda dan jangan dicampur: cek tenant terjadi di lapisan data, cek permission di lapisan use-case. Mencampurnya membuat keduanya sulit diuji.",
        ],
      },
      {
        heading: "Jebakan yang baru terasa belakangan",
        bullets: [
          "Background job: job async tidak punya request — konteks tenant harus dibawa eksplisit di payload job, bukan diambil dari 'user yang sedang login'.",
          "Cache key: key tanpa prefix tenant adalah kebocoran data yang menunggu jadwal. Semua key di-namespace per tenant.",
          "Data global vs tenant: tabel referensi (mis. daftar bank, hari libur) sengaja global — tandai jelas mana yang global supaya tidak ada yang 'memperbaikinya' dengan menambah kolom tenant.",
          "Export dan laporan: jalur yang paling sering menggabungkan banyak query — dan tempat paling umum satu filter terlewat. Uji isolasi justru paling penting di sini.",
        ],
        paragraphs: [],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Multi-tenancy bukan fitur, tapi properti yang harus dijaga oleh arsitektur: konteks tenant yang mengalir otomatis, jalur aman yang paling mudah dipakai, dan kecurigaan sehat pada semua jalur yang tidak melewati request — job, cache, dan laporan.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
];

export function getAllArticleSlugs(): readonly string[] {
  return articles.map((a) => a.slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
