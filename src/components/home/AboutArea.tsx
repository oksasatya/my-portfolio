import React from 'react'
import Count from '../common/Count'

const counter_data = [
	{
		id: 1,
		title: 'Years Of Experience',
		count: 3,
		cls: "plus",
	},
	{
		id: 2,
		title: 'Completed Projects',
		count: 15,
		cls: "k-plus",
	},
	{
		id: 3,
		title: 'Client Satisfactions',
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
							<h2 className="about-pre-title">About Me</h2>
						</div>
						<div className="col-lg-9 col-sm-9">
							<div className="about-content-part wow fadeInUp delay-0-2s">
								<p>
									I am Oksa Satya, a Full-Stack Developer experienced in Java, Go, Laravel, and
									Next.js. With over 3 years of professional experience and 15+ completed projects, I
									specialize in building scalable applications with clean architecture and strong
									attention to detail. I am passionate about problem-solving, teamwork, and continuous
									learning to deliver impactful software solutions.
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
