import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Breadcrumb from "../common/Breadcrumb";
import type { ServiceLanding } from "@/data/services";
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
            <Breadcrumb title={s.h1} as="h1" />

            <article className="cs-area">
              <div className="container">
                <Link href="/service" className="cs-back">
                  <span aria-hidden>←</span> Semua layanan
                </Link>

                <header className="cs-hero">
                  <p className="cs-tagline">{s.tagline}</p>
                </header>

                <div className="cs-grid">
                  <div>
                    <section className="cs-section">
                      <p className="cs-prose">{s.intro}</p>
                    </section>

                    <section className="cs-section">
                      <h2 className="cs-section-label">Apa yang Anda dapat</h2>
                      <ul className="cs-list cs-list--check">
                        {s.whatYouGet.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="cs-section">
                      <h2 className="cs-section-label">Cara Kerja</h2>
                      <ol className="jasa-steps">
                        {s.process.map((step, i) => (
                          <li key={step.title}>
                            <span className="jasa-step-no" aria-hidden>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="jasa-step-title">{step.title}</h3>
                              <p className="jasa-step-desc">{step.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>

                    <section className="cs-section">
                      <h2 className="cs-section-label">Pertanyaan Umum</h2>
                      <div className="jasa-faq">
                        {s.faq.map((f) => (
                          <details key={f.q} className="jasa-faq-item">
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                          </details>
                        ))}
                      </div>
                    </section>
                  </div>

                  <aside className="cs-aside" aria-label="Detail layanan">
                    <h2 className="cs-section-label">Tech Stack</h2>
                    <ul className="cs-chips">
                      {s.stack.map((tech) => (
                        <li className="cs-chip" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <h2 className="cs-section-label">Estimasi</h2>
                    <p className="jasa-estimate">{s.estimateNote}</p>

                    {related.length > 0 && (
                      <>
                        <h2 className="cs-section-label">Contoh Proyek</h2>
                        <ul className="jasa-related">
                          {related.map((c) => (
                            <li key={c.slug}>
                              <Link href={`/projects/${c.slug}`}>{c.title} →</Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </aside>
                </div>

                <section className="cs-cta" aria-label="Ajakan kerja sama">
                  <h2>Tertarik dengan {s.keyword}?</h2>
                  <p>Ceritakan kebutuhan Anda — diskusi & estimasi gratis, biasanya saya balas dalam &lt;24 jam.</p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="cs-cta-btn">
                    Chat WhatsApp <span aria-hidden>→</span>
                  </a>
                </section>
              </div>
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
