// app/components/ServiceArea.tsx
// Services tailored to Oksa Satya’s profile (backend-leaning full stack)
// - Semantic HTML + accessible labels
// - Responsive grid matching your original layout (8/4 split alternated)
// - DRY via data mapping; easy to reorder or add services

import React from "react";

type Service = {
  id: string;
  number: string;
  title: string;
  blurb: string;
  tags: string[];
  // "wide" = col-lg-8 col-md-7, "narrow" = col-lg-4 col-md-5
  layout: "wide" | "narrow";
  delay: "0-2s" | "0-4s" | "0-6s" | "0-8s";
};

const services: Service[] = [
  {
    id: "backend-apis",
    number: "01",
    title: "Backend API Development",
    blurb:
        "Design and build secure, scalable REST APIs with robust auth, validation, and clean architecture.",
    tags: ["Golang (Echo/Gin)", "Laravel", "Spring Boot"],
    layout: "wide",
    delay: "0-2s",
  },
  {
    id: "system-design",
    number: "02",
    title: "Microservices & System Design",
    blurb:
        "Service decomposition, inter-service communication, and fault-tolerant patterns for growth-ready systems.",
    tags: ["Domain Modeling", "gRPC/HTTP", "Observability"],
    layout: "narrow",
    delay: "0-4s",
  },
  {
    id: "frontend-next",
    number: "03",
    title: "Frontend (Next.js) Apps",
    blurb:
        "SSR/SSG SPAs with clean UX, fast LCP, and strong state/data fetching patterns for production UIs.",
    tags: ["Next.js", "React", "TypeScript"],
    layout: "narrow",
    delay: "0-6s",
  },
  {
    id: "database-performance",
    number: "04",
    title: "Database Design & Performance",
    blurb:
        "Schema design, indexing, query optimization, and caching strategies to keep apps fast under load.",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    layout: "wide",
    delay: "0-8s",
  },
  {
    id: "devops",
    number: "05",
    title: "DevOps & Containerization",
    blurb:
        "Dockerized environments, CI/CD pipelines, and secure configs to streamline build, test, and deploy.",
    tags: ["Docker", "Linux", "CI/CD"],
    layout: "narrow",
    delay: "0-4s",
  },
  {
    id: "integration-automation",
    number: "06",
    title: "Integrations & Automation",
    blurb:
        "Payment, HR, and workflow integrations plus scripted automations that reduce manual work.",
    tags: ["Midtrans", "Mekari/Talenta", "Power Automate"],
    layout: "wide",
    delay: "0-6s",
  },
];

export default function ServiceArea() {
  return (
      <>
        <section id="services" className="services-area no-padding" aria-label="Services">
          <div className="container">
            <header className="row">
              <div className="col-12">
                <h2 className="mb-2">Services</h2>
                <p className="text-muted">
                  Backend-leaning full stack development focused on APIs, performance, and reliable delivery.
                </p>
              </div>
            </header>
            
            <div className="row" role="list">
              {services.map((s, idx) => {
                const isWide = s.layout === "wide";
                const colClass = isWide ? "col-lg-8 col-md-7" : "col-lg-4 col-md-5";
                const delayClass = `wow fadeInUp delay-${s.delay}`;
                
                return (
                    <div key={s.id} className={colClass} role="listitem">
                      <article className={`service-item ${delayClass}`} aria-labelledby={`${s.id}-title`}>
                        <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
                        <h5 aria-label={`Service ${s.number}`}>{s.number}</h5>
                        <h4 id={`${s.id}-title`}>{s.title}</h4>
                        <p>{s.blurb}</p>
                        
                        {/* tags/badges */}
                        {s.tags?.length ? (
                            <ul className="service-tags d-flex flex-wrap gap-2 m-0 p-0" aria-label={`${s.title} tech stack`}>
                              {s.tags.map((t) => (
                                  <li key={t} className="badge text-bg-light">{t}</li>
                              ))}
                            </ul>
                        ) : null}
                      </article>
                    </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
  );
}
