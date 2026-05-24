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
                <h1 className={'text-black'}>Oksa Satya — Full-Stack Developer (Go, Java, Next.js)</h1>
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
                    Keahlian terbukti dalam <strong>Java</strong>, <strong>Go</strong>, dan <strong>Next.js</strong>
                    <p>Spesialis membangun sistem backend skalabel, aplikasi web modern, dan platform SaaS.</p>
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
                  Saya Oksa Satya — Fullstack Developer dengan keahlian kuat di
                  <strong> Java</strong>, <strong> Spring Boot</strong>, dan pengembangan backend.
                  Saya juga aktif mengerjakan proyek menggunakan <strong> Go</strong> dan framework
                  frontend modern seperti <strong> Next.js</strong>.
                  Saat ini sedang membangun <strong> Dexova</strong>, sebuah platform ERP lengkap
                  mencakup <strong>HRIS</strong>, <strong>Payroll</strong>, <strong>POS</strong>, dan
                  <strong> Manajemen Inventori</strong> — dirancang untuk bisnis yang butuh solusi terintegrasi.
                </p>
                <a className="theme-btn" href="/contact">Hubungi Saya</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
