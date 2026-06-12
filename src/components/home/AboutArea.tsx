import React from 'react'
import Count from '../common/Count'

const counter_data = [
{
id: 1,
title: 'Tahun Onsite (Dubai)',
count: 4,
cls: "plus",
},
{
id: 2,
title: 'Proyek Production',
count: 15,
cls: "plus",
},
{
id: 3,
title: 'Integrasi Sistem',
count: 5,
cls: "plus",
},
]

export default function AboutArea() {
return (
<>
<section id="about" className="about-area">
<div className="container">
<div className="row">
<div className="col-lg-3 col-sm-3">
<h2 className="about-pre-title">Tentang Saya</h2>
</div>
<div className="col-lg-9 col-sm-9">
<div className="about-content-part wow fadeInUp delay-0-2s">
<p>
Sejak 2022 saya bekerja onsite di Dubai sebagai Full-Stack Developer untuk PT Infini Software
House Technology, membangun aplikasi enterprise dengan <strong>Java/Spring Boot</strong> dan
<strong>Next.js</strong>. Fokus saya backend: API yang andal, integrasi sistem, dan arsitektur
yang tidak bikin pusing saat skala bertumbuh. Di luar kerjaan, saya membangun
<strong> Dexova</strong> — platform ERP terintegrasi (HRIS, Payroll, POS, Inventori) yang lahir
dari masalah nyata di lapangan. Kalau Anda butuh developer yang paham sisi teknis sekaligus sisi
bisnis, mari ngobrol.
</p>
<a
href="https://github.com/oksasatya"
target="_blank"
rel="noopener noreferrer"
className="about-github-link"
>
<i className="ri-github-line" aria-hidden></i> Lihat kode &amp; proyek open-source saya di GitHub →
</a>
<div className="about-actions">
<a
href="https://cdn.dexova.id/assets/img/public/cv/cv-2026-ats.pdf"
target="_blank"
rel="noopener noreferrer"
className="theme-btn"
>
<i className="ri-download-line" aria-hidden></i> Download CV
</a>
</div>
</div>
<div className="hero-counter-area d-flex justify-content-between wow fadeInUp delay-0-4s">
{counter_data.map((item, i) => (
<div key={i} className="counter-item react-counter-wrap">
                                        <span className={`react-count-text ${item.cls}`}>
                                          <Count number={item.count}/>
                                        </span>
<span className="counter-title">{item.title}</span>
</div>
))}
</div>
</div>
</div>
</div>
</section>
</>
)
}
