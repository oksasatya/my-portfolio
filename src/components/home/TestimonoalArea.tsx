import React from 'react'
import Image from 'next/image'

export default function TestimonialArea() {
	return (
		<>
			<section className="testimonials-area">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12">
							<div className="section-title section-black-title wow fadeInUp delay-0-2s">
								<h2>Testimonials</h2>
							</div>
						</div>
					</div>

					<div className="row">
						{/* 1 */}
						<div className="col-lg-6 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-2s">
								<div className="author">
									<Image
										src="/assets/images/testimonials/author.jpeg"
										alt="Rizky Aditya"
										width={80}
										height={80}
									/>
								</div>
								<div className="text">
									"Saya sudah kerja sama Oksa buat project company profile kami. Hasilnya
									melebihi ekspektasi — desainnya bersih, loadingnya cepat, dan beliau
									responsif banget kalau ada revisi. Nggak perlu nunggu lama buat feedback."
								</div>
								<div className="testi-des">
									<h5>Rizky Aditya</h5>
									<span>Owner – CV Totabuan Mandiri</span>
								</div>
							</div>
						</div>

						{/* 2 */}
						<div className="col-lg-6 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-4s">
								<div className="author">
									<Image
										src="/assets/images/testimonials/author1.jpeg"
										alt="Sari Wulandari"
										width={80}
										height={80}
									/>
								</div>
								<div className="text">
									"Platform online kami dibangun dari nol sama Oksa. Mulai dari backend,
									database, sampai tampilan depannya. Yang paling saya suka, beliau bisa
									jelasin proses teknisnya dengan bahasa yang mudah kami mengerti."
								</div>
								<div className="testi-des">
									<h5>Sari Wulandari</h5>
									<span>Direktur – Rahan Mancar Online</span>
								</div>
							</div>
						</div>

						{/* 3 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-6s">
								<div className="author">
									<Image
										src="/assets/images/testimonials/author2.jpeg"
										alt="Doni Pratama"
										width={80}
										height={80}
									/>
								</div>
								<div className="text">
									"Dashboard yang Oksa buat beneran ngebantu tim kami monitor data harian.
									Sebelumnya kami masih manual pakai spreadsheet. Sekarang semua real-time
									dan jauh lebih efisien."
								</div>
								<div className="testi-des">
									<h5>Doni Pratama</h5>
									<span>Manajer Operasional – Helixio</span>
								</div>
							</div>
						</div>

						{/* 4 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-8s">
								<div className="author">
									<Image
										src="/assets/images/testimonials/author3.jpeg"
										alt="Mega Lestari"
										width={80}
										height={80}
									/>
								</div>
								<div className="text">
									"Aplikasi absensi yang dibuat Oksa langsung kami pakai di kantor. Simpel,
									nggak ribet, dan karyawan kami yang kurang familiar teknologi pun bisa
									langsung pakai tanpa training panjang."
								</div>
								<div className="testi-des">
									<h5>Mega Lestari</h5>
									<span>HRD Manager – Dexova Group</span>
								</div>
							</div>
						</div>

						{/* 5 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-9s">
								<div className="author">
									<Image
										src="/assets/images/testimonials/author4.jpeg"
										alt="Hendra Saputra"
										width={80}
										height={80}
									/>
								</div>
								<div className="text">
									"Oksa orangnya jujur soal timeline dan biaya. Nggak ada hidden cost,
									nggak ada janji kosong. Kalau ada kendala teknis, langsung dikasih tau
									solusinya. Profesional banget."
								</div>
								<div className="testi-des">
									<h5>Hendra Saputra</h5>
									<span>Co-founder – Trofi Group</span>
								</div>
							</div>
						</div>
					</div>

				</div>
			</section>
		</>
	)
}
