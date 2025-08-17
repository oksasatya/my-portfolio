"use client";
import Image, {StaticImageData} from "next/image";
import React, {useState} from "react";
import dynamic from "next/dynamic";

// Lazy load biar aman di Next (hindari SSR issues di lib yang akses window)
const ImagePopup = dynamic(() => import("@/modals/ImagePopup"), {ssr: false});

// Images
import portfolio_img_1 from "@/assets/images/projects/code1.jpeg";
import portfolio_img_2 from "@/assets/images/projects/code2.jpeg";
import portfolio_img_3 from "@/assets/images/projects/code3.jpeg";
import portfolio_img_4 from "@/assets/images/projects/code4.jpeg";
import portfolio_img_5 from "@/assets/images/projects/code5.jpeg";

interface DataType {
	id: number;
	col: string;
	image: StaticImageData;
	title: string;
	category: string;
}

const portfolio_data: DataType[] = [
	{id: 1, col: "6", image: portfolio_img_1, title: "E-commerce Platform", category: "Web App"},
	{id: 2, col: "6", image: portfolio_img_2, title: "Real-time Chat API", category: "API"},
	{id: 3, col: "4", image: portfolio_img_3, title: "Data Analytics Dashboard", category: "Fullstack"},
	{id: 4, col: "4", image: portfolio_img_4, title: "Mobile App Backend", category: "Database"},
	{id: 5, col: "4", image: portfolio_img_5, title: "Blog CMS with Next.js", category: "Frontend"},
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
					<div className="row g-4 portfolio-grid">
						{portfolio_data.map((item, i) => (
							<div key={item.id} className={`col-md-6 col-xl-${item.col} portfolio-item category-1`}>
								<a style={{cursor: "pointer"}} onClick={() => handleImagePopup(i)}
								   className="work-popup">
									<div className="portfolio-box">
										<Image src={item.image} alt={item.title} style={{height: "auto"}} data-rjs="2"/>
										<span className="portfolio-category">{item.category}</span>
										<div className="portfolio-caption">
											<h1>{item.title}</h1>
										</div>
									</div>
								</a>
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
