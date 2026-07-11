// /about page content.

export interface ResumeEntry {
  readonly org: string;
  readonly role: string;
  readonly location: string;
  readonly period: string;
  readonly bullets: readonly string[];
  readonly stack?: string;
}

export const workExperience: readonly ResumeEntry[] = [
  {
    org: "PT Infini Software House Technology DMCC",
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    period: "Jul 2022 – sekarang",
    bullets: [
      "Membangun dan memelihara aplikasi enterprise: backend Java (Spring Boot), frontend Next.js.",
      "Merancang dan mengintegrasikan REST API antar-service dan sistem eksternal — payment gateway, HRIS (Mekari Talenta), API logistik, dan layanan email.",
      "Bekerja dalam tim agile untuk mengirim software yang aman, cepat, dan scalable.",
    ],
    stack: "Spring Boot, Next.js, PostgreSQL/MySQL, Redis, Docker, Linux, Git",
  },
  {
    org: "Dexova",
    role: "Architect & Full-Stack Developer",
    location: "Produk sendiri — dexova.id",
    period: "2024 – sekarang",
    bullets: [
      "Merancang dan membangun platform ERP (HRIS, Payroll, POS, Inventory) di satu backend Go hexagonal.",
      "Mengoperasikan tiga aplikasi production: dashboard admin, PWA absensi karyawan, dan aplikasi kasir.",
    ],
    stack: "Go, PostgreSQL + sqlc, Redis, gRPC, SSE, Next.js, Midtrans",
  },
  {
    org: "PT Citiasia Inti Solusi",
    role: "Backend Developer (Internship)",
    location: "Jakarta, Indonesia",
    period: "Agu 2021 – Jun 2022",
    bullets: [
      "Membangun fitur backend dan REST API dengan Laravel; merancang skema database dan optimasi query.",
      "Berkolaborasi dengan tim frontend dan PM untuk merilis fitur tepat waktu.",
    ],
    stack: "PHP (Laravel), MySQL, Git",
  },
];

export const clientProjects: readonly string[] = [
  "Logistics Web System — PT Top Kargo Indonesia: aplikasi logistik (darat/laut/udara) dengan Laravel + MySQL untuk tracking order dan operasional.",
  "Company Profile SPA — PT Innox Indonesia: SPA modern dengan React.js, fokus pada performa dan UX.",
];

export const education: readonly ResumeEntry[] = [
  {
    org: "Hacktiv8",
    role: "Certification — Full Time Backend Golang",
    location: "Jakarta, Indonesia",
    period: "2024",
    bullets: [
      "Membangun LMS microservices dengan Go (Echo/Gin): REST API, autentikasi, dan komunikasi antar-service.",
      "PostgreSQL, MongoDB, dan Docker untuk development ter-container.",
    ],
  },
  {
    org: "Universitas Gunadarma",
    role: "S1 Sistem Informasi (IPK 3.33/4.00)",
    location: "Depok, Indonesia",
    period: "2017 – 2021",
    bullets: [],
  },
];

export const certificates: readonly string[] = [
  "Learn Golang from Beginner to Advance — Udemy (2024)",
  "Internship Certification — Citiasia Inc (2022)",
];

export const skillGroups: readonly { readonly label: string; readonly items: string }[] = [
  { label: "Backend", items: "Go (Echo, Gin), Java (Spring Boot), PHP (Laravel), Node.js (Express)" },
  { label: "Frontend", items: "React.js / Next.js, TypeScript, Tailwind CSS" },
  { label: "Database", items: "PostgreSQL, MySQL, MongoDB, Redis" },
  { label: "DevOps", items: "Docker, Linux, CI/CD, Git (GitHub/GitLab)" },
];

export interface ApproachItem {
  readonly title: string;
  readonly body: string;
}

export const approach: readonly ApproachItem[] = [
  {
    title: "Outcome dulu, teknologi belakangan",
    body: "Saya mulai dari masalah bisnisnya — bukan dari framework favorit. Sistem yang benar adalah yang menyelesaikan masalah nyata dan bisa dirawat, bukan yang paling keren di kertas.",
  },
  {
    title: "Kualitas production, bukan sekadar 'jadi'",
    body: "Arsitektur yang bersih, error handling yang disiplin, keamanan, dan observability — hal-hal yang baru terasa penting justru saat aplikasi sudah dipakai orang setiap hari.",
  },
  {
    title: "Sistem yang bisa diaudit",
    body: "Payroll yang bisa ditelusuri, kas yang selalu cocok, stok yang jujur. Setiap perubahan meninggalkan jejak — supaya Anda percaya pada angka yang keluar dari sistem.",
  },
  {
    title: "Komunikasi jujur & transparan",
    body: "Estimasi realistis, kabar progres rutin, dan jujur soal trade-off. Saya lebih suka bilang 'ini butuh waktu' daripada menjanjikan yang tidak bisa ditepati.",
  },
];
