import React from "react";

export default function ResumeArea() {
  return (
      <>
        <section id="resume" className="resume-area no-padding" aria-label="Resume">
          <div className="container">
            {/* Header */}
            <header className="row">
              <div className="col-12">
                <h1 className="mb-2 text-black">Resume</h1>
                <p className="text-muted">
                  Full Stack Developer with a strong backend focus—building secure, fast, and maintainable APIs.
                </p>
              </div>
            </header>
            
            <div className="row mt-4">
              {/* Experience Column */}
              <div className="col-xl-6 col-md-6">
                <section
                    className="resume-wrapper wow fadeInUp delay-0-2s"
                    aria-labelledby="exp-heading"
                >
                  <h2 id="exp-heading" className="h4 mb-3">
                    Work Experience
                  </h2>
                  
                  {/* Current role */}
                  <article className="resume-box">
                    <p className="resume-date">
                      <time dateTime="2022-07">Jul 2022</time> – Present
                    </p>
                    <h3 className="h5 text-black-50">Full Stack Developer</h3>
                    <p className="mb-1">
                      <strong>PT INFINI SOFTWARE HOUSE TECHNOLOGY DMCC</strong> — Dubai, UAE
                    </p>
                    <ul className="mb-2 text-black-50">
                      <li >
                        Developed and maintained enterprise applications using{" "}
                        <strong>Java (Spring Boot)</strong> on the backend and{" "}
                        <strong>Next.js</strong> on the frontend.
                      </li>
                      <li>
                        Designed and integrated <strong>RESTful APIs</strong> across services and external systems with a focus on security and performance.
                      </li>
                      <li>
                        Collaborated in agile teams to deliver <em>scalable</em>, <em>secure</em>, and <em>high-performance</em> software.
                      </li>
                    </ul>
                    <p className="mb-0">
                      <strong>Stack:</strong> Spring Boot, Next.js, PostgreSQL/MySQL, Redis, Docker, Linux, Git
                    </p>
                  </article>
                  
                  {/* Internship role */}
                  <article className="resume-box">
                    <p className="resume-date">
                      <time dateTime="2021-08">Aug 2021</time> –{" "}
                      <time dateTime="2022-06">Jun 2022</time>
                    </p>
                    <h3 className="h5 text-black-50">Backend Developer (Intern)</h3>
                    <p className="mb-1">
                      <strong>PT Citiasia</strong> — Jakarta, Indonesia
                    </p>
                    <ul className="mb-2 text-black-50">
                      <li>
                        Built backend features and <strong>REST APIs</strong> with{" "}
                        <strong>Laravel</strong>; designed database schema and optimized queries.
                      </li>
                      <li>
                        Collaborated with frontend and PM teams to ship reliable features on schedule.
                      </li>
                    </ul>
                    <p className="mb-0">
                      <strong>Stack:</strong> PHP (Laravel), MySQL, Git
                    </p>
                  </article>
                  
                  {/* Selected projects */}
                  <article className="resume-box">
                    <h3 className="h5 text-black-50">Selected Projects</h3>
                    <ul className="mb-2 text-black-50">
                      <li>
                        <strong>Logistics Web System — PT Top Kargo Indonesia</strong>:
                        Logistics app (land/sea/air) using <strong>Laravel + MySQL</strong> for order tracking and operations.
                      </li>
                      <li>
                        <strong>Company Profile SPA — PT Innox Indonesia</strong>: Modern SPA with <strong>React.js</strong> focusing on performance and UX.
                      </li>
                    </ul>
                  </article>
                </section>
              </div>
              
              {/* Education / Certifications Column */}
              <div className="col-xl-6 col-md-6">
                <section
                    className="resume-wrapper wow fadeInUp delay-0-4s"
                    aria-labelledby="edu-heading"
                >
                  <h2 id="edu-heading" className="h4 mb-3">
                    Education & Certifications
                  </h2>
                  
                  <article className="resume-box">
                    <p className="resume-date">
                      <time dateTime="2024">2024</time>
                    </p>
                    <h3 className="h5 text-black-50">Certification — Full Time Backend Golang</h3>
                    <p className="mb-1">
                      <strong>Hacktiv8</strong> — Jakarta, Indonesia
                    </p>
                    <ul className="mb-0 text-black-50">
                      <li>
                        Built <strong>LMS microservices</strong> with Go (Echo/Gin),
                        <strong> REST APIs</strong>, authentication, and service-to-service communication.
                      </li>
                      <li>
                        Used <strong>PostgreSQL</strong>, <strong>MongoDB</strong>, and{" "}
                        <strong>Docker</strong> for containerized development.
                      </li>
                    </ul>
                  </article>
                  
                  <article className="resume-box">
                    <p className="resume-date">
                      <time dateTime="2017">2017</time> – <time dateTime="2021">2021</time>
                    </p>
                    <h3 className="h5 text-black-50">Bachelor — Information Systems (GPA 3.33/4.00)</h3>
                    <p className="mb-0">
                      <strong>Gunadarma University</strong> — Depok, Indonesia
                    </p>
                  </article>
                  
                  <article className="resume-box">
                    <h3 className="h5 text-black-50">Certificates</h3>
                    <ul className="mb-0 text-black-50">
                      <li>Learn Golang from Beginner to Advance — Udemy (2024)</li>
                      <li>Internship Certification — Citiasia Inc (2022)</li>
                    </ul>
                  </article>
                  
                  <article className="resume-box">
                    <h3 className="h5 text-black-50">Skills</h3>
                    <p className="mb-1">
                      <strong>Backend:</strong> Golang (Echo, Gin), PHP (Laravel), Java (Spring Boot), Node.js (Express)
                    </p>
                    <p className="mb-1 text-black-50">
                      <strong>Frontend:</strong> React.js / Next.js
                    </p>
                    <p className="mb-1">
                      <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, Redis
                    </p>
                    <p className="mb-1">
                      <strong>DevOps:</strong> Docker, Linux, Git (GitHub/GitLab)
                    </p>
                    <p className="mb-0">
                      <strong>Soft Skills:</strong> Problem Solving, Teamwork, Communication, Adaptability, Time Management
                    </p>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}
