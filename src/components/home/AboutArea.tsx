import React from 'react'
import Count from '../common/Count'

const counter_data = [
{
id: 1,
title: 'Tahun Pengalaman',
count: 3,
cls: "plus",
},
{
id: 2,
title: 'Proyek Selesai',
count: 15,
cls: "k-plus",
},
{
id: 3,
title: 'Kepuasan Klien',
count: 90,
cls: "percent",
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
Saya Oksa Satya, seorang Full-Stack Developer berpengalaman dalam Java, Go, Laravel, dan
Next.js. Dengan lebih dari 3 tahun pengalaman profesional dan 15+ proyek yang telah diselesaikan,
saya spesialis dalam membangun aplikasi skalabel dengan arsitektur bersih dan perhatian kuat
terhadap detail. Saya passionate dalam problem-solving, kerja tim, dan pembelajaran berkelanjutan
untuk menghasilkan solusi perangkat lunak yang berdampak.
</p>
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
