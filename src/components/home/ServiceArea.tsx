import React from 'react'

export default function ServiceArea() {
	return (
		<>
			<section id="services" className="services-area">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12">
							<div className="section-title section-black-title wow fadeInUp delay-0-2s">
								<h2>Services</h2>
							</div>
						</div>
					</div>
					
					<div className="row">
						{/* 01 - Full-Stack Development */}
						<div className="col-lg-8 col-md-7">
							<div className="service-item wow fadeInUp delay-0-2s">
								<i className="ri-code-s-slash-line"></i>
								<h5>01</h5>
								<h4>Full-Stack Development</h4>
								<p>
									Design and develop end-to-end web applications using <b>Java/JSP
									(Spring)</b>, <b>Laravel/PHP</b>, <b>Go</b>, and <b>Next.js</b>.
									Focused on building scalable solutions with clean architecture and maintainable
									codebase.
								</p>
							</div>
						</div>
						
						{/* 02 - API & Integrations */}
						<div className="col-lg-4 col-md-5">
							<div className="service-item wow fadeInUp delay-0-4s">
								<i className="ri-plug-line"></i>
								<h5>02</h5>
								<h4>API & System Integrations</h4>
								<p>
									Experienced in integrating third-party services such as <b>payment gateways</b>, <b>HRIS
									(Mekari Talenta)</b>,
									<b>logistics APIs</b>, and <b>email services</b>. Ensuring reliable communication
									through
									secure API design, webhooks, and monitoring.
								</p>
							</div>
						</div>
						
						{/* 03 - Cloud & DevOps */}
						<div className="col-lg-4 col-md-5">
							<div className="service-item wow fadeInUp delay-0-6s">
								<i className="ri-cloud-line"></i>
								<h5>03</h5>
								<h4>Cloud & DevOps</h4>
								<p>
									Deployment and infrastructure management on <b>Vercel</b>, <b>Railway</b>, and <b>Google
									Kubernetes Engine</b>.
									Skilled in <b>Docker</b>, CI/CD pipelines, and cloud storage solutions such as <b>Google
									Cloud Storage</b>.
								</p>
							</div>
						</div>
						
						{/* 04 - Performance & Security */}
						<div className="col-lg-8 col-md-7">
							<div className="service-item wow fadeInUp delay-0-8s">
								<i className="ri-shield-check-line"></i>
								<h5>04</h5>
								<h4>Performance & Security</h4>
								<p>
									Strong focus on application performance optimization (caching, database tuning,
									Redis) and
									implementing security best practices including <b>JWT/OAuth2 authentication</b>,
									input validation, and rate limiting. Quality-driven approach from prior QA
									background.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
