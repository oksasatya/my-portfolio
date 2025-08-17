import React from 'react'

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
									<img
										src="/assets/images/testimonials/author.jpeg"
										alt="Ahmad R."
									/>
								</div>
								<div className="text">
									“Working with Oksa was seamless. He delivered a robust Java/Go backend,
									clean documentation, and integrated third-party services flawlessly.
									His calm problem-solving approach kept our timeline on track.”
								</div>
								<div className="testi-des">
									<h5>Ahmad R.</h5>
									<span>Project Manager – Dubai Tech Solutions</span>
								</div>
							</div>
						</div>
						
						{/* 2 */}
						<div className="col-lg-6 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-4s">
								<div className="author">
									<img
										src="/assets/images/testimonials/author1.jpeg"
										alt="Sarah K."
									/>
								</div>
								<div className="text">
									“Oksa built our e-commerce platform with Next.js and Laravel, optimized
									performance, and integrated payment/logistics APIs end-to-end. The result
									was fast, stable, and easy to maintain.”
									_
								</div>
								<div className="testi-des">
									<h5>Sarah K.</h5>
									<span>Founder – Ecom Startup</span>
								</div>
							</div>
						</div>
						
						{/* 3 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-6s">
								<div className="author">
									<img
										src="/assets/images/testimonials/author2.jpeg"
										alt="Michael B."
									/>
								</div>
								<div className="text">
									“As a teammate, Oksa is dependable and methodical. His QA background shows
									in how he writes tests and prevents regressions. Code reviews are thorough
									and always constructive.”
								</div>
								<div className="testi-des">
									<h5>Michael B.</h5>
									<span>Senior Developer – Alva Auto</span>
								</div>
							</div>
						</div>
						
						{/* 4 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-8s">
								<div className="author">
									<img
										src="/assets/images/testimonials/author3.jpeg"
										alt="Eliana T."
									/>
								</div>
								<div className="text">
									“Great communication and ownership. Oksa translated product requirements
									into a clear technical roadmap and kept stakeholders aligned through each
									milestone.”
								</div>
								<div className="testi-des">
									<h5>Eliana T.</h5>
									<span>Product Manager – Fintech App</span>
								</div>
							</div>
						</div>
						
						{/* 5 */}
						<div className="col-lg-4 col-md-6">
							<div className="testimonial-item wow fadeInUp delay-0-9s">
								<div className="author">
									<img
										src="/assets/images/testimonials/author4.jpeg"
										alt="Henry C."
									/>
								</div>
								<div className="text">
									“We relied on Oksa for DevOps as well—Docker, CI/CD, and GKE. Deployments
									became predictable, our error rate dropped, and observability improved
									significantly.”
								</div>
								<div className="testi-des">
									<h5>Henry C.</h5>
									<span>CTO – SaaS Platform</span>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</section>
		</>
	)
}