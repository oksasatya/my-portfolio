
import React from 'react'

export default function HeroArea() {
  return (
    <>
      <section id="home" className="main-hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              <div className="hero-content wow fadeInUp text-center delay-0-2s">
                <h2>Oksa Satya</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <div className="clienti-reviews">
                  <ul className="clienti-profile">
                    <li>
                      <img className="img-fluid" src="/assets/images/stack/java.png" alt="Java" />
                    </li>
                    <li>
                      <img className="img-fluid" src="/assets/images/stack/Go.png" alt="Go" />
                    </li>
                    <li>
                      <img className="img-fluid" src="/assets/images/stack/next-js.png" alt="Next.js" />
                    </li>
                  </ul>
                  <div className="reviews">
                    Proven expertise in <strong>Java</strong>, <strong>Go</strong>, and <strong>Next.js</strong>
                    <p>Specialized in building scalable backend systems, modern web apps, and SaaS platforms.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src="/assets/images/about/me.jpg" alt="" />
              </div>

            </div>
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-4s">
                <p>
                  I’m Oksa Satya — a Fullstack Developer with strong expertise in
                  <strong>Java</strong>, <strong>Spring Boot</strong>, and backend development.
                  I also actively work on projects using <strong>Go</strong> and modern
                  frontend frameworks like <strong>Next.js</strong>.
                  Currently, I’m building <strong>Nuvora</strong>, a SaaS project developed
                  with Go and Next.js, focused on delivering scalable and efficient web solutions.
                </p>
                <a className="theme-btn" href="">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
