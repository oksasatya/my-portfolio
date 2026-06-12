import Image from "next/image";
import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Breadcrumb from "../common/Breadcrumb";
import type { CaseStudy } from "@/data/projects";

const DOMAIN = "https://oksasatya.dev";

export default function CaseStudyDetail({
  caseStudy: cs,
}: {
  readonly caseStudy: CaseStudy;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: cs.title,
      headline: cs.tagline,
      abstract: cs.summary,
      creator: {
        "@type": "Person",
        name: "Oksa Satya",
        url: DOMAIN,
      },
      keywords: [...cs.stack, ...cs.highlights].join(", "),
      dateCreated: String(cs.year),
      image: `${DOMAIN}${cs.image}`,
      url: `${DOMAIN}/projects/${cs.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "Proyek", item: `${DOMAIN}/projects` },
        {
          "@type": "ListItem",
          position: 3,
          name: cs.title,
          item: `${DOMAIN}/projects/${cs.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title={cs.title} as="h1" />

            <article className="cs-area">
              <div className="container">
                <Link href="/projects" className="cs-back">
                  <span aria-hidden>←</span> Semua proyek
                </Link>

                <header className="cs-hero">
                  <div className="cs-badges">
                    <span className="cs-badge">{cs.category}</span>
                    <span className="cs-badge cs-badge--ai">
                      <span aria-hidden>✦</span> Dianalisa AI
                    </span>
                    <span className="cs-badge cs-badge--repo">
                      {cs.repoVisibility === "private"
                        ? "Repo privat"
                        : "Open source"}
                    </span>
                  </div>
                  <p className="cs-tagline">{cs.tagline}</p>

                  <dl className="cs-meta">
                    <div className="cs-meta-item">
                      <dt className="cs-meta-label">Peran</dt>
                      <dd className="cs-meta-value">{cs.role}</dd>
                    </div>
                    <div className="cs-meta-item">
                      <dt className="cs-meta-label">Periode</dt>
                      <dd className="cs-meta-value">{cs.timeframe}</dd>
                    </div>
                    <div className="cs-meta-item">
                      <dt className="cs-meta-label">Sumber</dt>
                      <dd className="cs-meta-value">
                        {cs.repoVisibility === "private"
                          ? "Privat (ringkasan AI)"
                          : "GitHub publik"}
                      </dd>
                    </div>
                  </dl>
                </header>

                <div className="cs-cover">
                  <Image
                    src={cs.image}
                    alt={`Tampilan proyek ${cs.title}`}
                    fill
                    sizes="(max-width: 992px) 100vw, 1100px"
                  />
                </div>

                <div className="cs-grid">
                  <div>
                    <section className="cs-section">
                      <h2 className="cs-section-label">Masalah</h2>
                      <p className="cs-prose">{cs.problem}</p>
                    </section>

                    <section className="cs-section">
                      <h2 className="cs-section-label">Solusi</h2>
                      <ul className="cs-list">
                        {cs.solution.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="cs-section">
                      <h2 className="cs-section-label">Hasil</h2>
                      <ul className="cs-list cs-list--check">
                        {cs.results.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <aside className="cs-aside" aria-label="Detail teknis">
                    <h2 className="cs-section-label">Tech Stack</h2>
                    <ul className="cs-chips">
                      {cs.stack.map((tech) => (
                        <li className="cs-chip" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <h2 className="cs-section-label">Highlight</h2>
                    <ul className="cs-chips">
                      {cs.highlights.map((h) => (
                        <li className="cs-chip" key={h}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>

                <section className="cs-cta" aria-label="Ajakan kerja sama">
                  <h2>Punya kebutuhan sistem yang serupa?</h2>
                  <p>
                    Saya bantu rancang dan bangun backend yang andal, integrasi
                    sistem, dan platform SaaS end-to-end.
                  </p>
                  <Link href="/contact" className="cs-cta-btn">
                    Diskusikan proyek Anda <span aria-hidden>→</span>
                  </Link>
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
