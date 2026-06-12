import React from 'react'
import Image from 'next/image'

export default function HeroArea() {
  return (
    <>
      <section id="home" className="main-hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content wow fadeInUp text-black text-center delay-0-2s">
                <h1 className={'text-black'}>Backend Engineer yang Membangun Sistem Skalabel</h1>
                <p className="hero-subhead">
                  Go · Java/Spring Boot · Next.js — saya bantu bisnis &amp; startup membangun API yang andal,
                  integrasi sistem (payment, HRIS, logistik), dan platform SaaS end-to-end.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <div className="clienti-reviews">
                  <ul className="clienti-profile">
                    <li>
                      <Image
                        className="img-fluid"
                        src="/assets/images/stack/java.png"
                        alt="Java logo"
                        width={40}
                        height={40}
                      />
                    </li>
                    <li>
                      <Image
                        className="img-fluid"
                        src="/assets/images/stack/Go.png"
                        alt="Go logo"
                        width={40}
                        height={40}
                      />
                    </li>
                    <li>
                      <Image
                        className="img-fluid"
                        src="/assets/images/stack/next-js.png"
                        alt="Next.js logo"
                        width={40}
                        height={40}
                      />
                    </li>
                  </ul>
                  <div className="reviews">
                    3+ tahun remote (Dubai) · 8+ proyek production
                    <p>Spesialis backend: API skalabel, integrasi sistem, dan platform SaaS modern.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <Image
                  src="/assets/images/about/me.jpg"
                  alt="Oksa Satya — Full-Stack Developer"
                  width={600}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-4s">
                <p>
                  Saya Oksa Satya. Fokus saya <strong>backend</strong> — API yang andal,
                  integrasi sistem, dan arsitektur yang tidak bikin pusing saat skala bertumbuh,
                  dengan <strong>Go</strong>, <strong>Java/Spring Boot</strong>, dan <strong>Next.js</strong>.
                  Saat ini membangun <strong>Dexova</strong>, platform ERP terintegrasi
                  (HRIS, Payroll, POS, Inventori).
                </p>
                <a className="theme-btn" href="/contact">Diskusikan Proyek</a>
                <a className="hero-link-secondary" href="/projects">Lihat Studi Kasus →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
