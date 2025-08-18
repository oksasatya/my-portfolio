"use client";
import Image, {StaticImageData} from "next/image";
import React, {useState} from "react";
import dynamic from "next/dynamic";

// Lazy load biar aman di Next (hindari SSR issues di lib yang akses window)
const ImagePopup = dynamic(() => import("@/modals/ImagePopup"), {ssr: false});

// Images - Tetap menggunakan gambar yang sudah ada
import portfolio_img_1 from "@/assets/images/projects/code1.jpg";
import portfolio_img_2 from "@/assets/images/projects/code2.jpg";
import portfolio_img_3 from "@/assets/images/projects/code3.jpg";
import portfolio_img_4 from "@/assets/images/projects/code4.jpg";
import portfolio_img_5 from "@/assets/images/projects/code5.jpeg";

interface DataType {
	id: number;
	image: StaticImageData;
	title: string;
	category: string;
	description?: string;
}

const portfolio_data: DataType[] = [
	{
		id: 1,
		image: portfolio_img_1,
		title: "E-commerce Platform",
		category: "Web App",
		description: "Full-stack e-commerce solution with payment integration"
	},
	{
		id: 2,
		image: portfolio_img_2,
		title: "Mobile App Backend",
		category: "Mobile App",
		description: "Scalable API backend for mobile applications"
	},
	{
		id: 3,
		image: portfolio_img_3,
		title: "Admin Dashboard",
		category: "Fullstack",
		description: "Modern admin interface with real-time data"
	},
	{
		id: 4,
		image: portfolio_img_4,
		title: "Data Analytics Dashboard",
		category: "Database",
		description: "Interactive dashboard for data visualization"
	},
	{
		id: 5,
		image: portfolio_img_5,
		title: "Blog CMS with Next.js",
		category: "Frontend",
		description: "Content management system built with Next.js"
	},
];

export default function PortfolioArea() {
	// index harus number
	const [photoIndex, setPhotoIndex] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	
	const handleImagePopup = (i: number) => {
		setPhotoIndex(i);
		setIsOpen(true);
	};
	
	// array URL string untuk lightbox
	const images: string[] = portfolio_data.map((item) => item.image.src);
	
	return (
		<>
			<div className="projects-area" id="portfolio">
				<div className="custom-icon">
					<img src="/assets/images/custom/work-scribble.svg" alt="custom"/>
				</div>
				<div className="container-fluid">
					{/* Section Header */}
					<div className="row justify-content-center mb-5">
						<div className="col-lg-8 text-center">
							<h2 className="display-4 fw-bold text-white mb-4">
								My <span style={{color: 'var(--primary-color)'}}>Portfolio</span>
							</h2>
							<p className="lead text-white-50 mb-5">
								Explore my latest projects showcasing modern web development, mobile apps, and full-stack solutions
							</p>
						</div>
					</div>
					
					{/* Portfolio Grid - Layout 5 items: 2-2-1 pattern */}
					<div className="row g-4 portfolio-grid justify-content-center">
						{/* First Row - 2 items */}
						{portfolio_data.slice(0, 2).map((item, i) => (
							<div key={item.id} className="col-lg-6 col-md-6 portfolio-item category-1">
								<div
									className="portfolio-box"
									style={{cursor: "pointer"}}
									onClick={() => handleImagePopup(i)}
								>
									{/* Fixed aspect ratio container */}
									<div style={{
										position: 'relative',
										width: '100%',
										paddingTop: '60%', // 5:3 aspect ratio untuk layout yang lebih baik
										overflow: 'hidden',
										borderRadius: '0.5em'
									}}>
										<Image
											src={item.image}
											alt={item.title}
											fill
											style={{
												objectFit: 'cover',
												objectPosition: 'center'
											}}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
											data-rjs="2"
										/>
										
										{/* Category Badge - menggunakan style yang sudah ada */}
										<span className="portfolio-category">
											{item.category}
										</span>
										
										{/* Portfolio Caption - menggunakan style yang sudah ada */}
										<div className="portfolio-caption">
											<h1>{item.title}</h1>
											{item.description && (
												<p style={{
													fontSize: '16px',
													fontWeight: '400',
													textTransform: 'none',
													letterSpacing: 'normal',
													marginTop: '8px',
													opacity: 0.9,
													lineHeight: '1.4'
												}}>
													{item.description}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
						
						{/* Second Row - 2 items */}
						{portfolio_data.slice(2, 4).map((item, i) => (
							<div key={item.id} className="col-lg-6 col-md-6 portfolio-item category-1">
								<div
									className="portfolio-box"
									style={{cursor: "pointer"}}
									onClick={() => handleImagePopup(i + 2)}
								>
									{/* Fixed aspect ratio container */}
									<div style={{
										position: 'relative',
										width: '100%',
										paddingTop: '60%', // 5:3 aspect ratio untuk layout yang lebih baik
										overflow: 'hidden',
										borderRadius: '0.5em'
									}}>
										<Image
											src={item.image}
											alt={item.title}
											fill
											style={{
												objectFit: 'cover',
												objectPosition: 'center'
											}}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
											data-rjs="2"
										/>
										
										{/* Category Badge - menggunakan style yang sudah ada */}
										<span className="portfolio-category">
											{item.category}
										</span>
										
										{/* Portfolio Caption - menggunakan style yang sudah ada */}
										<div className="portfolio-caption">
											<h1>{item.title}</h1>
											{item.description && (
												<p style={{
													fontSize: '16px',
													fontWeight: '400',
													textTransform: 'none',
													letterSpacing: 'normal',
													marginTop: '8px',
													opacity: 0.9,
													lineHeight: '1.4'
												}}>
													{item.description}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
						
						{/* Third Row - 1 centered item */}
						{portfolio_data.slice(4, 5).map((item, i) => (
							<div key={item.id} className="col-lg-6 col-md-8 portfolio-item category-1">
								<div
									className="portfolio-box"
									style={{cursor: "pointer"}}
									onClick={() => handleImagePopup(i + 4)}
								>
									{/* Fixed aspect ratio container */}
									<div style={{
										position: 'relative',
										width: '100%',
										paddingTop: '60%', // 5:3 aspect ratio untuk layout yang lebih baik
										overflow: 'hidden',
										borderRadius: '0.5em'
									}}>
										<Image
											src={item.image}
											alt={item.title}
											fill
											style={{
												objectFit: 'cover',
												objectPosition: 'center'
											}}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
											data-rjs="2"
										/>
										
										{/* Category Badge - menggunakan style yang sudah ada */}
										<span className="portfolio-category">
											{item.category}
										</span>
										
										{/* Portfolio Caption - menggunakan style yang sudah ada */}
										<div className="portfolio-caption">
											<h1>{item.title}</h1>
											{item.description && (
												<p style={{
													fontSize: '16px',
													fontWeight: '400',
													textTransform: 'none',
													letterSpacing: 'normal',
													marginTop: '8px',
													opacity: 0.9,
													lineHeight: '1.4'
												}}>
													{item.description}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			
			{/* Lightbox */}
			{isOpen && images.length > 0 && photoIndex >= 0 && photoIndex < images.length && (
				<ImagePopup
					images={images}
					setIsOpen={setIsOpen}
					photoIndex={photoIndex}
					setPhotoIndex={setPhotoIndex}
				/>
			)}
		</>
	);
}
