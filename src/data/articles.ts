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
  {
    slug: "membangun-pos-rekonsiliasi-kas",
    title: "Membangun Sistem Kasir (POS) yang Bisa Diaudit: Shift, Rekonsiliasi Kas, dan QRIS",
    description:
      "Kasir bukan sekadar menjumlahkan harga. Ini cara Dexova POS menjaga uang tetap cocok: buka/tutup shift dengan kas awal, split payment, QRIS Midtrans, void & retur yang mengembalikan stok, sampai rekonsiliasi kas harian.",
    publishedAt: "2026-07-08",
    readingMinutes: 8,
    tags: ["POS", "Kasir", "Rekonsiliasi", "Midtrans"],
    intro:
      "Sistem kasir yang buruk baru ketahuan di penghujung hari — saat uang fisik di laci tidak cocok dengan angka di sistem, dan tidak ada yang bisa menjelaskan selisihnya. Modul POS di Dexova saya bangun dengan satu obsesi: setiap rupiah harus bisa ditelusuri. Ini keputusan-keputusan yang membuatnya bisa diaudit.",
    sections: [
      {
        heading: "Shift adalah unit akuntabilitas, bukan sekadar login",
        paragraphs: [
          "Kasir membuka shift dengan mencatat kas awal (modal laci). Setiap transaksi — tunai, kartu, QRIS — menempel ke shift itu. Saat tutup shift, sistem menghitung kas yang seharusnya ada, kasir menghitung fisik, dan selisihnya dicatat, bukan disembunyikan.",
          "Tanpa batas shift, 'uang kurang Rp50.000' adalah misteri seharian penuh. Dengan shift, ia menjadi pertanyaan spesifik ke satu orang di satu rentang waktu — dan itu jauh lebih mudah dijawab.",
        ],
      },
      {
        heading: "Void dan retur bukan sekadar menghapus baris",
        paragraphs: [
          "Menghapus transaksi yang salah adalah cara tercepat menghancurkan audit trail. Di Dexova, void dan retur adalah kejadian baru yang tercatat — dengan alasan, operator, dan waktu — bukan penghapusan data lama.",
          "Yang sering dilupakan: retur harus mengembalikan stok. Barang yang dikembalikan pelanggan naik lagi ke inventori secara otomatis. Kalau tidak, laporan penjualan dan stok akan pelan-pelan menyimpang sampai tidak ada yang percaya keduanya.",
        ],
      },
      {
        heading: "Pembayaran: split payment dan QRIS yang tidak menggantung",
        paragraphs: [
          "Pelanggan nyata membayar dengan cara campuran: sebagian tunai, sisanya QRIS. Sistem harus memperlakukan satu transaksi sebagai kumpulan pembayaran, bukan satu metode tunggal.",
          "QRIS lewat Midtrans bersifat asynchronous: transaksi berstatus pending sampai webhook mengonfirmasi settlement. Kuncinya adalah memperlakukan webhook sebagai sumber kebenaran, memverifikasi tanda tangannya, dan idempoten — notifikasi yang sama boleh datang dua kali tanpa menggandakan pembayaran.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "POS yang bisa diaudit lahir dari tiga hal: shift sebagai unit akuntabilitas, void/retur sebagai kejadian (bukan penghapusan), dan pembayaran yang jujur soal status async-nya. Sisanya hanya menjumlahkan harga.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "absensi-geofence-anti-titip-absen",
    title: "Absensi Geofence: Dari Titip-Absen ke Check-in yang Bisa Dipercaya",
    description:
      "Absensi manual mudah dicurangi. Ini cara membangun absensi PWA dengan deteksi kantor terdekat, selfie wajib, model dua alamat untuk WFH, dan koreksi ber-approval — tanpa memenjarakan karyawan yang jujur.",
    publishedAt: "2026-07-02",
    readingMinutes: 7,
    tags: ["HRIS", "Absensi", "Geofence", "PWA"],
    intro:
      "Titip-absen adalah olahraga nasional di kantor yang absensinya cuma tanda tangan. Saat membangun absensi Dexova, tujuannya bukan mengawasi karyawan seperti tahanan, tapi membuat data kehadiran cukup dapat dipercaya untuk menghitung gaji tanpa perdebatan. Itu keseimbangan yang halus.",
    sections: [
      {
        heading: "Validasi di titik masuk, bukan pembersihan belakangan",
        paragraphs: [
          "Check-in dilakukan lewat PWA: aplikasi membaca lokasi, mencari kantor terdekat, dan menolak absen di luar radius (geofence). Ditambah selfie wajib pada saat check-in — bukan foto profil, tapi bukti kehadiran real-time.",
          "Prinsipnya sederhana: membersihkan data absensi kotor di akhir bulan jauh lebih mahal daripada menolak data yang meragukan sejak detik pertama.",
        ],
      },
      {
        heading: "WFH nyata butuh model dua alamat",
        paragraphs: [
          "Geofence naif langsung patah begitu ada WFH atau kunjungan kerja: karyawan sah berada di luar kantor. Solusinya adalah model dua alamat — kantor penempatan tetap dan lokasi kerja sementara — dengan alur persetujuan.",
          "Karyawan yang berada di luar kantor bisa memilih: absen sebagai kunjungan kerja (sementara, periode tertentu) atau mengajukan penempatan tetap yang butuh approval HR. Kebijakan hidup di data, bukan di-hardcode per perusahaan.",
        ],
      },
      {
        heading: "Koreksi selalu lewat persetujuan",
        paragraphs: [
          "Jam masuk yang salah pasti terjadi — sinyal jelek, lupa, aplikasi nge-lag. Yang tidak boleh terjadi: karyawan atau admin mengedit langsung angka absensi di database.",
          "Setiap koreksi kehadiran adalah pengajuan yang melewati approval, meninggalkan jejak siapa mengubah apa dan kenapa. Ini yang membuat rekap bulanan bisa dikunci dengan percaya diri sebelum masuk ke payroll.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Absensi yang bisa dipercaya bukan soal teknologi paling canggih, tapi soal menolak data buruk di sumbernya, mengakomodasi cara kerja nyata (WFH), dan memastikan setiap perubahan meninggalkan jejak. Data kehadiran yang bersih adalah fondasi payroll yang tidak diperdebatkan.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "arsitektur-hexagonal-go",
    title: "Arsitektur Hexagonal di Go: Kenapa Domain Tidak Boleh Tahu Soal Database",
    description:
      "Ports & adapters bukan ritual akademis. Ini cara saya memakai hexagonal di modul-modul Dexova untuk membuat domain logic bisa diuji tanpa database, dan adapter bisa diganti tanpa menyentuh aturan bisnis.",
    publishedAt: "2026-06-24",
    readingMinutes: 8,
    tags: ["Go", "Arsitektur", "Hexagonal", "Clean Architecture"],
    intro:
      "Banyak developer mendengar 'hexagonal' lalu membayangkan diagram rumit dan banyak folder. Padahal intinya satu kalimat: aturan bisnis tidak boleh tahu dari mana datanya datang. Ini alasan kenapa disiplin itu terbayar di sistem production seperti Dexova, dan bagaimana menerapkannya di Go tanpa berlebihan.",
    sections: [
      {
        heading: "Arah dependensi yang mengalir ke dalam",
        paragraphs: [
          "Aturannya cuma satu dan keras: lapisan domain tidak mengimpor apa pun dari adapter atau platform. Domain mendefinisikan port (interface) yang ia butuhkan — mis. sebuah repository — dan lapisan luar yang mengimplementasikannya dengan pgx atau apa pun.",
          "Efeknya: use-case bisa diuji dengan implementasi port palsu di memori, tanpa PostgreSQL, tanpa jaringan. Uji payroll jadi soal menyiapkan input dan memeriksa output — bukan menyiapkan seluruh infrastruktur.",
        ],
      },
      {
        heading: "Port adalah kontrak milik domain",
        paragraphs: [
          "Kesalahan umum: mendefinisikan interface repository di paket adapter, 'dekat' dengan implementasinya. Itu membalik arah dependensi. Port adalah kebutuhan domain, jadi ia hidup di domain; adapter yang menyesuaikan diri, bukan sebaliknya.",
          "Di Go ini terasa alami karena interface bersifat implicit — domain mendeklarasikan interface kecil sesuai kebutuhannya, dan adapter cukup memenuhinya. Interface yang ramping (satu-dua method) jauh lebih mudah di-mock daripada repository raksasa serba bisa.",
        ],
      },
      {
        heading: "Jangan over-engineer: hexagonal-lite",
        paragraphs: [
          "Hexagonal tidak berarti CQRS, event sourcing, dan tujuh lapisan abstraksi untuk CRUD sederhana. Untuk solo/tim kecil, cukup: domain (entity + port + use-case) yang murni, adapter (DB, HTTP, pihak ketiga), dan composition root yang merakit semuanya.",
          "Tanda over-engineering: interface dengan satu implementasi yang tidak akan pernah punya kedua, factory untuk satu produk, abstraksi 'untuk nanti'. Aturannya: tambahkan lapisan saat rasa sakitnya nyata, bukan saat membayangkannya.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Hexagonal terbayar bukan karena diagramnya indah, tapi karena membuat aturan bisnis bisa diuji cepat dan infrastruktur bisa ditukar tanpa drama. Jaga arah dependensi mengalir ke domain, biarkan port jadi milik domain, dan berhenti di lapisan seminimal yang menyelesaikan masalah.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "postgresql-row-level-security-multi-tenant",
    title: "Isolasi Multi-Tenant dengan PostgreSQL Row-Level Security (RLS)",
    description:
      "Filter tenant di aplikasi mudah lupa — dan sekali lupa, data bocor. RLS memindahkan isolasi ke database sebagai jaring pengaman terakhir. Ini cara memakainya dengan benar, plus uji kebocoran yang wajib ada.",
    publishedAt: "2026-06-12",
    readingMinutes: 7,
    tags: ["PostgreSQL", "Multi-tenant", "RLS", "Keamanan"],
    intro:
      "Isolasi tenant di lapisan aplikasi punya satu kelemahan fatal: ia bergantung pada setiap developer mengingat menambahkan filter di setiap query, selamanya. Row-Level Security memindahkan aturan itu ke database, sehingga meski aplikasi lupa, PostgreSQL yang menolak. Ini jaring pengaman, bukan pengganti disiplin aplikasi.",
    sections: [
      {
        heading: "Cara kerja RLS secara ringkas",
        paragraphs: [
          "Setiap tabel tenant mendapat policy: baris hanya terlihat jika kolom tenant-nya cocok dengan tenant di sesi saat ini. Tenant sesi di-set per transaksi lewat parameter (mis. SET LOCAL app.current_tenant_id), dan policy membacanya.",
          "Karena SET LOCAL terikat ke transaksi, ia otomatis bersih saat transaksi selesai — tidak ada state yang bocor antar-request di connection pool. Ini detail kecil yang, kalau salah, justru menjadi sumber kebocoran baru.",
        ],
      },
      {
        heading: "RLS melengkapi, bukan menggantikan filter aplikasi",
        paragraphs: [
          "Aplikasi tetap membawa konteks tenant dan memfilter — itu jalur utama dan yang paling informatif untuk query planner. RLS adalah lapisan kedua: kalau suatu query lupa filter, database menolak alih-alih membocorkan.",
          "Dua lapisan yang saling menutupi jauh lebih kuat daripada satu lapisan yang sempurna. Dan 'sempurna selamanya' bukan asumsi yang aman untuk kode yang disentuh banyak orang selama bertahun-tahun.",
        ],
      },
      {
        heading: "Uji kebocoran adalah bagian dari fitur",
        bullets: [
          "Untuk setiap tabel tenant, tulis tes integrasi yang menyetel tenant A, lalu memastikan data tenant B tidak pernah terlihat lewat jalur apa pun.",
          "Uji juga jalur yang sering lolos: agregasi, join lintas tabel, dan laporan.",
          "Pastikan role aplikasi tidak punya BYPASSRLS; superuser dan pemilik tabel bisa melewati policy tanpa sadar.",
          "Perlakukan penambahan tabel tenant baru tanpa policy sebagai kegagalan build, bukan sekadar catatan.",
        ],
        paragraphs: [],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "RLS mengubah isolasi tenant dari 'harap semua orang ingat' menjadi 'database yang menegakkan'. Pakai sebagai lapisan kedua di atas filter aplikasi, set tenant per transaksi, dan jadikan uji kebocoran syarat wajib setiap tabel baru.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "manajemen-stok-inventory-akurat",
    title: "Manajemen Stok yang Tidak Bohong: Retur, Void, dan Multi-Gudang",
    description:
      "Stok yang tidak akurat membuat seluruh laporan tidak dipercaya. Ini prinsip menjaga inventori tetap jujur: setiap perubahan stok adalah kejadian tercatat, retur mengembalikan barang, dan mutasi antar-gudang yang bisa ditelusuri.",
    publishedAt: "2026-05-28",
    readingMinutes: 7,
    tags: ["Inventory", "Stok", "POS", "Arsitektur"],
    intro:
      "Angka stok yang salah adalah racun pelan: satu selisih kecil hari ini, dan dalam sebulan tidak ada yang percaya laporan stok maupun penjualan. Saat membangun modul inventori yang terhubung ke POS Dexova, prinsip utamanya adalah stok tidak pernah 'di-set', ia hanya berubah lewat kejadian yang tercatat.",
    sections: [
      {
        heading: "Stok adalah hasil dari kejadian, bukan angka yang diedit",
        paragraphs: [
          "Godaan terbesar adalah menyimpan satu kolom 'jumlah stok' dan meng-update-nya langsung. Sekali dua developer meng-update bersamaan, atau satu proses gagal di tengah, angkanya salah dan tidak ada cara tahu kenapa.",
          "Pendekatan yang lebih jujur: setiap penjualan, pembelian, retur, dan penyesuaian adalah pergerakan stok yang tercatat. Jumlah saat ini adalah akumulasi pergerakan — sehingga selalu ada jawaban untuk 'kenapa stoknya segini'.",
        ],
      },
      {
        heading: "Retur dan void harus menutup lingkaran",
        paragraphs: [
          "Ini titik yang paling sering bocor: transaksi POS yang di-void atau barang yang diretur harus mengembalikan stok secara otomatis. Kalau penjualan mengurangi stok tapi retur tidak menambahkannya kembali, sistem penjualan dan sistem stok pelan-pelan berpisah.",
          "Karena POS dan inventori berbagi kebenaran yang sama, void di kasir dan pengembalian stok adalah satu alur yang tidak bisa setengah jalan — keduanya berhasil atau keduanya batal.",
        ],
      },
      {
        heading: "Multi-gudang: mutasi yang bisa ditelusuri",
        paragraphs: [
          "Begitu ada lebih dari satu lokasi, 'stok' tidak lagi satu angka tapi angka per gudang. Perpindahan barang antar-gudang adalah mutasi: keluar dari satu, masuk ke yang lain, tercatat sebagai pasangan yang seimbang.",
          "Yang membedakan sistem serius dari spreadsheet: setiap keping stok punya cerita lengkap tentang di mana ia berada dan bagaimana ia sampai di sana.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Inventori yang akurat lahir dari satu prinsip: jangan pernah mengedit angka stok, catat kejadian yang mengubahnya. Tutup lingkaran retur/void, dan buat mutasi antar-gudang bisa ditelusuri. Hasilnya adalah laporan yang benar-benar bisa dipercaya.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "job-async-payroll-bulk-import",
    title: "Job Async untuk Pekerjaan Berat: Payroll Run, Bulk Import, dan Progress yang Terlihat",
    description:
      "Pekerjaan yang menyentuh ribuan baris tidak boleh berjalan di satu request HTTP. Ini pola job async yang saya pakai di Dexova: idempotency, retry yang aman, progress monitoring, dan dead-letter untuk kegagalan permanen.",
    publishedAt: "2026-05-16",
    readingMinutes: 7,
    tags: ["Go", "Async", "Queue", "Arsitektur"],
    intro:
      "Menghitung gaji ratusan karyawan atau mengimpor ribuan baris Excel di dalam satu request HTTP adalah resep timeout dan UI yang membeku. Di Dexova, semua pekerjaan berat berjalan sebagai job async yang bisa dipantau. Ini pola yang membuatnya andal, bukan sekadar 'dipindah ke background'.",
    sections: [
      {
        heading: "Idempotency lebih penting daripada yang terlihat",
        paragraphs: [
          "Job bisa dijalankan ulang: worker mati di tengah jalan, jaringan hiccup, retry otomatis. Kalau job tidak idempoten, retry menggandakan efeknya — payroll dihitung dua kali, stok dikurangi dua kali.",
          "Kuncinya adalah ID job yang stabil dan pengecekan 'sudah dikerjakan belum' sebelum efek terjadi. Untuk job terjadwal, ID yang mengandung tanggal mencegah dua replika mengeksekusi tugas harian yang sama.",
        ],
      },
      {
        heading: "Retry yang aman, dan tahu kapan menyerah",
        paragraphs: [
          "Kegagalan sementara (DB sibuk, API pihak ketiga lambat) layak di-retry dengan backoff. Kegagalan permanen (data tidak valid) tidak — retry hanya membuang waktu dan menutupi masalah.",
          "Bedakan keduanya secara eksplisit: kesalahan yang tidak akan pernah berhasil harus menghentikan retry dan masuk ke dead-letter untuk diperiksa manusia, bukan berputar selamanya.",
        ],
      },
      {
        heading: "Progress yang terlihat mengubah pengalaman",
        paragraphs: [
          "Payroll run di Dexova bukan tombol yang lalu senyap. HR menekannya, melihat progres, dan mendapat hasil yang bisa diperiksa sebelum finalisasi. Pekerjaan yang lama tanpa umpan balik terasa seperti rusak — meski sebenarnya berjalan baik.",
          "Pola yang sama dipakai untuk bulk import karyawan: unggah, proses di background, dan laporan baris mana yang gagal beserta alasannya — bukan satu error generik yang menggagalkan seluruh file.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Memindahkan pekerjaan berat ke background hanya setengah pekerjaan. Setengah lainnya: idempoten supaya retry aman, membedakan gagal sementara vs permanen, dan menampilkan progres supaya manusia percaya sistemnya bekerja.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "integrasi-midtrans-qris-webhook",
    title: "Integrasi Pembayaran QRIS Midtrans: Webhook, Verifikasi, dan Idempotency",
    description:
      "Pembayaran online bersifat asynchronous — dan di situ letak jebakannya. Ini cara mengintegrasikan QRIS Midtrans dengan benar: webhook sebagai sumber kebenaran, verifikasi tanda tangan, idempotency, dan rekonsiliasi.",
    publishedAt: "2026-05-02",
    readingMinutes: 7,
    tags: ["Midtrans", "Pembayaran", "Webhook", "Keamanan"],
    intro:
      "Kesalahan paling umum dalam integrasi pembayaran: menganggap status pembayaran diketahui saat pelanggan menekan 'bayar'. Kenyataannya pembayaran itu async — statusnya baru pasti saat penyedia mengonfirmasi lewat webhook. Ini yang saya pelajari saat mengintegrasikan QRIS Midtrans ke POS Dexova.",
    sections: [
      {
        heading: "Webhook adalah sumber kebenaran, bukan respons frontend",
        paragraphs: [
          "Frontend yang menampilkan 'pembayaran berhasil' berdasarkan respons langsung adalah bug yang menunggu terjadi. Pelanggan bisa menutup tab, sinyal bisa putus, dan pembayaran tetap settle beberapa detik kemudian.",
          "Kebenaran datang dari webhook (notifikasi server-to-server) yang mengubah status transaksi dari pending ke settled. Frontend cukup menampilkan status yang tercatat, bukan menebaknya.",
        ],
      },
      {
        heading: "Verifikasi tanda tangan, selalu",
        paragraphs: [
          "Endpoint webhook publik: siapa pun bisa mengirim POST berpura-pura jadi Midtrans. Karena itu setiap notifikasi harus diverifikasi tanda tangannya (signature key) sebelum dipercaya. Notifikasi yang gagal verifikasi dibuang tanpa mengubah apa pun.",
          "Ini bukan opsional. Menerima status pembayaran tanpa verifikasi berarti membiarkan siapa pun menandai pesanan sebagai 'lunas' secara gratis.",
        ],
      },
      {
        heading: "Idempotency: notifikasi yang sama boleh datang dua kali",
        paragraphs: [
          "Penyedia pembayaran menjamin at-least-once, bukan exactly-once: webhook yang sama bisa terkirim ulang. Handler harus idempoten — memproses notifikasi kedua tidak boleh menggandakan pembayaran atau memicu efek ganda.",
          "Praktiknya: kunci transaksi berdasarkan ID pesanan, cek status saat ini, dan hanya lakukan transisi yang valid. Rekonsiliasi harian dengan dashboard Midtrans menutup celah kalau ada webhook yang terlewat sama sekali.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Integrasi pembayaran yang benar berpusat pada tiga hal: perlakukan webhook sebagai kebenaran (bukan respons frontend), verifikasi setiap tanda tangan, dan buat handler idempoten. Tambah rekonsiliasi untuk tidur nyenyak.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "error-handling-go-api-production",
    title: "Error Handling di Go untuk API Production: Sentinel, Wrapping, dan Pesan yang Aman",
    description:
      "Error handling yang buruk membocorkan detail internal ke pengguna dan menyulitkan debugging. Ini pola error di Go yang saya pakai: sentinel error, wrapping dengan %w, pemetaan ke HTTP di satu titik, dan pesan yang aman.",
    publishedAt: "2026-04-20",
    readingMinutes: 6,
    tags: ["Go", "Error Handling", "API", "Keamanan"],
    intro:
      "Di Go, error adalah nilai — dan bagaimana Anda memperlakukannya menentukan seberapa mudah sistem di-debug saat jam 3 pagi. Ini pola error handling yang saya pakai di API production supaya jejaknya kaya untuk developer, tapi pesannya aman untuk pengguna.",
    sections: [
      {
        heading: "Wrapping menjaga konteks tanpa kehilangan asal",
        paragraphs: [
          "Mengembalikan error mentah ke atas menghilangkan konteks; menelannya dan membuat error baru menghilangkan asal. Jalan tengahnya adalah membungkus dengan %w — menambahkan konteks di setiap lapisan sambil mempertahankan rantai aslinya.",
          "Dengan errors.Is dan errors.As, lapisan atas tetap bisa memeriksa jenis error di dasar rantai, meski sudah dibungkus beberapa kali. Konteks bertambah, identitas tidak hilang.",
        ],
      },
      {
        heading: "Sentinel error untuk keputusan, bukan string matching",
        paragraphs: [
          "Membandingkan error dengan mencocokkan teks pesannya adalah kode rapuh yang patah begitu pesannya diubah. Sentinel error (variabel error yang dideklarasikan) memberi identitas stabil untuk kondisi yang perlu dibedakan — mis. 'tidak ditemukan' vs 'sudah ada'.",
          "Ini yang memungkinkan lapisan HTTP memutuskan 404 vs 409 tanpa menebak dari teks — keputusan berbasis tipe, bukan string.",
        ],
      },
      {
        heading: "Petakan ke HTTP di satu choke point",
        paragraphs: [
          "Menyebar kode status HTTP ke seluruh handler membuat perilaku error tidak konsisten. Lebih baik satu titik yang menerjemahkan error domain ke respons HTTP: sentinel tertentu jadi 4xx dengan pesan aman dan bisa di-i18n, sisanya jadi 5xx dengan detail hanya di log.",
          "Pengguna mendapat pesan yang jelas dan tidak membocorkan struktur internal; developer mendapat jejak lengkap di log. Keduanya menang tanpa saling mengorbankan.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Error handling Go yang baik: bungkus dengan %w untuk konteks, pakai sentinel untuk keputusan berbasis tipe, dan petakan ke HTTP di satu tempat dengan pesan aman untuk pengguna serta jejak kaya untuk log.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "autentikasi-jwt-refresh-rotation",
    title: "Autentikasi JWT yang Aman: Refresh Rotation, Reuse Detection, dan Cookie HttpOnly",
    description:
      "JWT mudah dipakai, tapi mudah juga dipakai secara tidak aman. Ini pola auth yang saya terapkan: access token pendek, refresh rotation, deteksi penggunaan ulang token, dan penyimpanan di cookie HttpOnly.",
    publishedAt: "2026-04-06",
    readingMinutes: 7,
    tags: ["Keamanan", "Auth", "JWT", "Go"],
    intro:
      "JWT sering diimplementasikan dengan cara yang justru menurunkan keamanan: token berumur panjang disimpan di localStorage, tanpa cara mencabutnya. Ini pola autentikasi yang saya pakai supaya nyaman dipakai tapi tetap bisa dipertanggungjawabkan saat token bocor.",
    sections: [
      {
        heading: "Access pendek, refresh yang berputar",
        paragraphs: [
          "Access token dibuat berumur pendek supaya jendela penyalahgunaannya kecil. Refresh token berumur lebih panjang dan dipakai untuk mendapatkan access baru — tapi setiap kali dipakai, ia diputar: refresh lama dibatalkan, yang baru diterbitkan.",
          "Rotation ini yang memberi kemampuan mendeteksi pencurian. Token yang seharusnya sudah tidak berlaku tapi tiba-tiba dipakai lagi adalah sinyal jelas ada yang tidak beres.",
        ],
      },
      {
        heading: "Reuse detection: sinyal token dicuri",
        paragraphs: [
          "Kalau refresh token yang sudah diputar (jadi tidak valid) muncul lagi, kemungkinan besar ada dua pihak memegang token yang sama — pengguna asli dan pencuri. Respons yang benar: batalkan seluruh rantai sesi itu, paksa login ulang.",
          "Tanpa rotation + reuse detection, token yang dicuri bisa dipakai diam-diam sampai kedaluwarsa alami. Dengan keduanya, pencurian meninggalkan jejak yang bisa ditindak otomatis.",
        ],
      },
      {
        heading: "Simpan di cookie HttpOnly, bukan localStorage",
        paragraphs: [
          "Token di localStorage bisa dibaca skrip apa pun di halaman — satu celah XSS dan token melayang. Cookie HttpOnly + Secure + SameSite tidak bisa dibaca JavaScript, memindahkan permukaan serangan menjauh dari script injection.",
          "Konsekuensinya perlu perlindungan CSRF (mis. double-submit token), tapi itu pertukaran yang jauh lebih baik daripada membiarkan token terekspos ke setiap skrip pihak ketiga.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Auth JWT yang aman bukan soal library, tapi pola: access pendek, refresh yang berputar, deteksi penggunaan ulang untuk menangkap pencurian, dan penyimpanan di cookie HttpOnly dengan perlindungan CSRF. Nyaman dipakai, dan bisa dicabut saat perlu.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "membunuh-n-plus-1-query",
    title: "Membunuh N+1 Query: Kenapa Aplikasi Cepat di Demo tapi Lambat di Production",
    description:
      "N+1 query adalah pembunuh performa paling umum dan paling sering lolos review — instan di data seed, timeout di tabel nyata. Ini cara mengenali, mengukur, dan memperbaikinya sebelum production yang menemukannya.",
    publishedAt: "2026-03-22",
    readingMinutes: 6,
    tags: ["Performa", "Database", "PostgreSQL", "Optimasi"],
    intro:
      "Aplikasi terasa instan di laptop dengan data seed 50 baris, lalu tercekik saat tabel produksi menyentuh puluhan ribu. Biang keroknya sering satu pola sederhana: N+1 query. Ia lolos review karena kodenya terlihat wajar — dan baru terasa saat n bertumbuh.",
    sections: [
      {
        heading: "Apa yang sebenarnya terjadi",
        paragraphs: [
          "Pola N+1 muncul saat Anda mengambil daftar (1 query), lalu untuk setiap item mengambil data terkait dengan satu query lagi (N query). Sepuluh item = 11 query; sepuluh ribu item = 10.001 query. Di data kecil tak terasa; di data nyata, ia meledak secara linier.",
          "Yang membuatnya berbahaya: kodenya sering ditulis dalam loop yang terlihat bersih, atau tersembunyi di balik lazy-loading ORM. Tidak ada yang 'salah' secara sintaksis — yang salah adalah jumlah round-trip ke database.",
        ],
      },
      {
        heading: "Perbaikannya: batasi round-trip, bukan mempercantik loop",
        bullets: [
          "Ambil data terkait dalam satu query dengan JOIN, atau satu query IN untuk semua id sekaligus (dua query total, bukan N+1).",
          "Untuk hubungan banyak-ke-banyak, ambil batch lalu petakan di memori (O(n)) alih-alih query per item.",
          "Pastikan kolom yang difilter/di-join punya index yang tepat — komposit yang sesuai urutan query.",
          "Ukur dengan menghitung query aktual (log/tracing), bukan menebak. Angka query per request adalah metrik yang jujur.",
        ],
        paragraphs: [],
      },
      {
        heading: "Uji di ukuran n yang realistis",
        paragraphs: [
          "Akar masalahnya sering bukan kodenya, tapi datanya: tes dan demo memakai n yang terlalu kecil untuk memunculkan masalah. Uji jalur data-berat pada ukuran yang mendekati produksi, dan regresi performa akan tertangkap saat masih murah diperbaiki.",
          "Aturan praktis: sebelum menulis loop yang menyentuh database, tanyakan berapa query yang akan dihasilkan saat n besar. Kalau jawabannya tumbuh bersama n, ada yang perlu dibatch.",
        ],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "N+1 bukan bug eksotis, tapi pola default yang mudah ditulis tanpa sadar. Kenali bentuknya, batasi round-trip dengan JOIN/IN + index yang tepat, dan uji di n realistis. Perbedaan antara instan dan timeout sering hanya soal jumlah query.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
  {
    slug: "memilih-stack-sistem-bisnis",
    title: "Memilih Stack untuk Sistem Bisnis: Go, Java/Spring, atau Laravel?",
    description:
      "Tidak ada stack terbaik, hanya yang paling cocok dengan masalah, tim, dan skala Anda. Panduan jujur memilih backend untuk sistem bisnis — dari pengalaman membangun dengan ketiganya di production.",
    publishedAt: "2026-03-08",
    readingMinutes: 8,
    tags: ["Arsitektur", "Go", "Java", "Laravel"],
    intro:
      "Pertanyaan 'pakai stack apa' hampir selalu dijawab dengan preferensi pribadi yang disamarkan sebagai fakta teknis. Setelah membangun sistem production dengan Go, Java/Spring Boot, dan Laravel, jawaban saya lebih membosankan: tergantung masalah, tim, dan skala. Ini kerangka memilihnya dengan jujur.",
    sections: [
      {
        heading: "Laravel: kecepatan ke pasar untuk CRUD bisnis",
        paragraphs: [
          "Untuk sistem bisnis yang didominasi CRUD, form, dan alur admin — company profile dengan dashboard, toko online, sistem internal sederhana — Laravel memberi kecepatan luar biasa. Baterai lengkap: auth, ORM, migrasi, queue, semua ada.",
          "Titik lemahnya muncul saat logika bisnis menjadi rumit dan performa concurrency jadi kritis. Selama masalahnya adalah 'bangun cepat, jalankan andal, skala sedang', Laravel sering pilihan paling rasional.",
        ],
      },
      {
        heading: "Go: concurrency, deployment ringan, dan disiplin",
        paragraphs: [
          "Go bersinar saat Anda butuh concurrency yang efisien, binary tunggal yang mudah di-deploy, dan latensi rendah yang konsisten. Dexova saya bangun di Go justru karena banyak pekerjaan berjalan bersamaan — job payroll, webhook pembayaran, real-time.",
          "Harganya: ekosistem yang lebih 'rakit sendiri' dibanding framework baterai-lengkap. Untuk sistem yang akan hidup lama dan tumbuh, disiplin arsitektur yang dituntut Go justru menjadi aset, bukan beban.",
        ],
      },
      {
        heading: "Java/Spring Boot: ekosistem matang untuk enterprise",
        paragraphs: [
          "Untuk sistem enterprise dengan integrasi banyak, tim besar, dan kebutuhan tooling matang, Java/Spring Boot sulit dikalahkan. Empat tahun membangun aplikasi enterprise dengan stack ini mengajarkan bahwa 'membosankan dan matang' sering justru yang Anda inginkan di sistem kritis.",
          "Biayanya adalah verbositas dan footprint yang lebih berat dibanding Go. Tapi untuk konteks yang tepat — banyak developer, banyak integrasi, umur panjang — kematangan ekosistemnya terbayar.",
        ],
      },
      {
        heading: "Kerangka memilih (bukan aturan mati)",
        bullets: [
          "Didominasi CRUD + perlu cepat + skala sedang → Laravel.",
          "Concurrency tinggi + deployment ringan + latensi konsisten → Go.",
          "Enterprise + tim besar + banyak integrasi + tooling matang → Java/Spring.",
          "Yang paling penting: pilih yang tim Anda bisa rawat, bukan yang paling keren di Twitter.",
        ],
        paragraphs: [],
      },
      {
        heading: "Ringkasan",
        paragraphs: [
          "Tidak ada pemenang mutlak. Cocokkan stack dengan bentuk masalah (CRUD vs concurrency vs enterprise), kemampuan tim, dan skala yang realistis. Stack terbaik adalah yang membuat sistem Anda tetap bisa dirawat dua tahun dari sekarang.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
];

export function getAllArticleSlugs(): readonly string[] {
  return articles.map((a) => a.slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
