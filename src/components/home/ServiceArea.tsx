import React from 'react'

const serviceLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Oksa Satya — Jasa Pembuatan Website, Aplikasi & Backend",
	url: "https://oksasatya.dev/service",
	description:
		"Jasa pembuatan website, aplikasi web, sistem informasi, dan API/integrasi sistem dengan Golang, Laravel, Spring Boot, dan Next.js — dari company profile dan toko online sampai platform SaaS.",
	provider: { "@type": "Person", name: "Oksa Satya", url: "https://oksasatya.dev" },
	areaServed: ["Indonesia", "Worldwide"],
	serviceType: [
		"Jasa Pembuatan Website",
		"Jasa Pembuatan Aplikasi Web",
		"Jasa Pembuatan API & Integrasi Sistem",
		"Jasa Pembuatan Sistem Informasi",
		"Backend Development",
		"Cloud & DevOps",
	],
	knowsAbout: ["Go", "Java", "Spring Boot", "Laravel", "Next.js", "REST API", "SaaS", "Docker"],
	makesOffer: [
		{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pembuatan Website & Aplikasi Web Full-Stack" } },
		{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pembuatan API & Integrasi Sistem" } },
		{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud & DevOps (Docker, CI/CD)" } },
		{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Optimasi Performa & Keamanan Aplikasi" } },
	],
};

export default function ServiceArea() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
			/>
			<section id="services" className="services-area">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12">
							<div className="section-title section-black-title wow fadeInUp delay-0-2s">
								<h2>Layanan</h2>
								<p>Jasa pembuatan website, aplikasi web, sistem informasi, dan API/integrasi sistem — dari company profile sampai platform SaaS, dengan Golang, Laravel, dan Next.js. Bukan sekadar &ldquo;bikin aplikasi&rdquo;: saya bantu Anda menyelesaikan masalah bisnis dengan sistem yang andal dan siap tumbuh.</p>
							</div>
						</div>
					</div>
					<div className="row">
						{/* 01 */}
						<div className="col-lg-8 col-md-7">
							<div className="service-item wow fadeInUp delay-0-2s">
								<i className="ri-code-s-slash-line"></i>
								<h5>01</h5>
								<h4>Pengembangan Full-Stack</h4>
								<p>
									Merancang dan mengembangkan aplikasi web end-to-end menggunakan <b>Java/JSP (Spring)</b>,
									<b>Laravel/PHP</b>, <b>Go</b>, dan <b>Next.js</b>.
									Berfokus pada solusi skalabel dengan arsitektur bersih dan kode yang mudah dipelihara.
								</p>
								<p className="service-benefit"><strong>Hasil:</strong> aplikasi cepat dirilis, mudah dirawat, dan siap tumbuh seiring bisnis.</p>
							</div>
						</div>
						{/* 02 */}
						<div className="col-lg-4 col-md-5">
							<div className="service-item wow fadeInUp delay-0-4s">
								<i className="ri-plug-line"></i>
								<h5>02</h5>
								<h4>API & Integrasi Sistem</h4>
								<p>
									Berpengalaman mengintegrasikan layanan pihak ketiga seperti <b>payment gateway</b>,
									<b>HRIS (Mekari Talenta)</b>, <b>API logistik</b>, dan <b>layanan email</b>.
									Memastikan komunikasi yang andal melalui desain API aman, webhook, dan monitoring.
								</p>
								<p className="service-benefit"><strong>Hasil:</strong> sistem Anda terhubung mulus — tanpa data nyangkut atau input ganda.</p>
							</div>
						</div>
						{/* 03 */}
						<div className="col-lg-4 col-md-5">
							<div className="service-item wow fadeInUp delay-0-6s">
								<i className="ri-cloud-line"></i>
								<h5>03</h5>
								<h4>Cloud & DevOps</h4>
								<p>
									Deployment dan manajemen infrastruktur di <b>Vercel</b>, <b>Railway</b>, dan
									<b>Google Kubernetes Engine</b>. Mahir dalam <b>Docker</b>, pipeline CI/CD,
									dan solusi penyimpanan cloud seperti <b>Google Cloud Storage</b>.
								</p>
								<p className="service-benefit"><strong>Hasil:</strong> deploy otomatis, downtime minim, biaya infrastruktur terkendali.</p>
							</div>
						</div>
						{/* 04 */}
						<div className="col-lg-8 col-md-7">
							<div className="service-item wow fadeInUp delay-0-8s">
								<i className="ri-shield-check-line"></i>
								<h5>04</h5>
								<h4>Performa & Keamanan</h4>
								<p>
									Fokus kuat pada optimasi performa aplikasi (caching, database tuning, Redis)
									dan penerapan praktik keamanan terbaik termasuk <b>autentikasi JWT/OAuth2</b>,
									validasi input, dan rate limiting. Pendekatan berorientasi kualitas dari latar belakang QA.
								</p>
								<p className="service-benefit"><strong>Hasil:</strong> aplikasi cepat = pelanggan tidak kabur, dan data Anda terlindungi.</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 text-center wow fadeInUp delay-0-2s" style={{ marginTop: 32 }}>
								<a className="theme-btn" href="/contact">Punya proyek serupa? Diskusikan kebutuhan Anda →</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
