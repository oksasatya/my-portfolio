import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import { serviceLandings, type ServiceLanding } from "@/data/services";
import { getCaseStudy } from "@/data/projects";

const DOMAIN = "https://oksasatya.dev";
const WA = "https://wa.me/62818846228";

export default function ServiceLandingArea({
  landing: s,
}: {
  readonly landing: ServiceLanding;
}) {
  const url = `${DOMAIN}/jasa/${s.slug}`;
  const waHref = `${WA}?text=${encodeURIComponent(
    `Halo Oksa, saya tertarik dengan ${s.keyword}. Boleh diskusi?`,
  )}`;

  const related = s.relatedProjects
    .map((slug) => getCaseStudy(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const others = serviceLandings.filter((o) => o.slug !== s.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.h1,
      serviceType: s.keyword,
      description: s.metaDescription,
      url,
      provider: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
      areaServed: ["Indonesia", "Worldwide"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "Layanan", item: `${DOMAIN}/service` },
        { "@type": "ListItem", position: 3, name: s.h1, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <article className="jl">
              {/* ---------- Hero ---------- */}
              <header className="jl-hero">
                <div className="container">
                  <nav className="jl-crumb jl-reveal" data-d="1" aria-label="Breadcrumb">
                    <Link href="/">Beranda</Link> / <Link href="/service">Layanan</Link> / <span>{s.h1}</span>
                  </nav>
                  <p className="jl-eyebrow jl-reveal" data-d="1">Jasa Profesional</p>
                  <h1 className="jl-h1 jl-reveal" data-d="2">{s.h1}</h1>
                  <p className="jl-tagline jl-reveal" data-d="3">{s.tagline}</p>
                  <div className="jl-cta-row jl-reveal" data-d="4">
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="jl-btn jl-btn--primary">
                      <i className="ri-whatsapp-line" aria-hidden></i> Diskusi gratis via WhatsApp
                    </a>
                    <Link href="/projects" className="jl-btn jl-btn--ghost">Lihat contoh proyek</Link>
                  </div>
                  <div className="jl-trust jl-reveal" data-d="5">
                    <span><b>4 tahun</b>&nbsp;onsite Dubai</span>
                    <span><b>8+</b>&nbsp;proyek production</span>
                    <span>Respon&nbsp;<b>&lt;24 jam</b></span>
                    <span>Estimasi&nbsp;<b>gratis</b></span>
                  </div>
                </div>
              </header>

              {/* ---------- Intro ---------- */}
              <section className="jl-section">
                <div className="container">
                  <p className="jl-label">Kenapa ini penting</p>
                  <p className="jl-intro">{s.intro}</p>
                </div>
              </section>

              {/* ---------- What you get ---------- */}
              <section className="jl-section">
                <div className="container">
                  <p className="jl-label">Yang Anda Dapat</p>
                  <h2 className="jl-h2">Bukan sekadar &ldquo;jadi&rdquo; — tapi benar &amp; siap tumbuh.</h2>
                  <ul className="jl-get">
                    {s.whatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ---------- Process ---------- */}
              <section className="jl-section">
                <div className="container">
                  <p className="jl-label">Cara Kerja</p>
                  <h2 className="jl-h2">Transparan dari awal sampai rilis.</h2>
                  <div className="jl-steps">
                    {s.process.map((step, i) => (
                      <div className="jl-step" key={step.title}>
                        <div className="jl-step-num">{String(i + 1).padStart(2, "0")}</div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ---------- Proof + detail ---------- */}
              <section className="jl-section">
                <div className="container">
                  <div className="jl-split">
                    <div>
                      <p className="jl-label">Bukti Nyata</p>
                      <h2 className="jl-h2">Sudah dipakai di proyek production.</h2>
                      {related.length > 0 ? (
                        <div className="jl-proof">
                          {related.map((c) => (
                            <Link key={c.slug} href={`/projects/${c.slug}`} className="jl-proof-card">
                              <span>
                                <span className="c">{c.category}</span>
                                <br />
                                <span className="t">{c.title}</span>
                              </span>
                              <span className="go" aria-hidden>→</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="jl-lead">
                          Lihat kumpulan proyek &amp; studi kasus saya —{" "}
                          <Link href="/projects" style={{ color: "var(--accent)", fontWeight: 600 }}>
                            semua proyek →
                          </Link>
                        </p>
                      )}
                    </div>

                    <aside aria-label="Detail layanan">
                      <div className="jl-card">
                        <p className="jl-label" style={{ margin: 0 }}>Tech Stack</p>
                        <ul className="jl-chips">
                          {s.stack.map((t) => (
                            <li className="jl-chip" key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="jl-card">
                        <p className="jl-label" style={{ margin: 0 }}>Estimasi Biaya</p>
                        <p className="jl-estimate-note">{s.estimateNote}</p>
                        <a href={waHref} target="_blank" rel="noopener noreferrer" className="jl-btn jl-btn--primary" style={{ marginTop: 16 }}>
                          Minta estimasi <span aria-hidden>→</span>
                        </a>
                      </div>
                    </aside>
                  </div>
                </div>
              </section>

              {/* ---------- FAQ ---------- */}
              <section className="jl-section">
                <div className="container">
                  <p className="jl-label">Pertanyaan Umum</p>
                  <h2 className="jl-h2">Yang sering ditanyakan.</h2>
                  <div className="jl-faq">
                    {s.faq.map((f) => (
                      <details className="jl-faq-item" key={f.q}>
                        <summary>{f.q}</summary>
                        <p>{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>

              {/* ---------- Final dark CTA ---------- */}
              <section className="jl-cta-band" aria-label="Ajakan kerja sama">
                <div className="container">
                  <p className="jl-label">Mulai sekarang</p>
                  <h2>Ceritakan kebutuhan Anda. Saya bantu wujudkan.</h2>
                  <p>Diskusi &amp; estimasi gratis, tanpa komitmen. Biasanya saya balas dalam &lt;24 jam.</p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="jl-btn jl-btn--light">
                    <i className="ri-whatsapp-line" aria-hidden></i> Chat WhatsApp sekarang
                  </a>
                  <div className="jl-cta-others">
                    <span className="jl-label" style={{ alignSelf: "center", margin: 0, color: "rgba(243,239,230,0.5)" }}>Layanan lain:</span>
                    {others.map((o) => (
                      <Link key={o.slug} href={`/jasa/${o.slug}`}>{o.h1}</Link>
                    ))}
                  </div>
                </div>
              </section>
            </article>
          </main>
          <FooterOne />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
