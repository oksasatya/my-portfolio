"use client";
import Image, {StaticImageData} from "next/image";
import React, {useState, useRef, useEffect} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImagePopup = dynamic(() => import("@/modals/ImagePopup"), {ssr: false});

import img_totabuan from "@/assets/images/projects/totabuan.jpeg";
import img_rahanmancar from "@/assets/images/projects/rahanmancar.jpeg";
import img_trofigroup from "@/assets/images/projects/trofigroup.jpeg";
import img_helixio from "@/assets/images/projects/helixio.jpeg";
import img_rahanmancar_online from "@/assets/images/projects/rahanmancar-online.jpeg";
import img_dashboard_rahan from "@/assets/images/projects/dashboard-rahan.jpeg";
import img_dexova from "@/assets/images/projects/dexova.png";
import img_absensi from "@/assets/images/projects/absensi.png";
import img_nuvora from "@/assets/images/projects/code1.jpeg";

interface ProjectItem {
	id: number;
	image: StaticImageData;
	title: string;
	category: string;
	description: string;
	portrait?: boolean;
	caseStudySlug?: string;
}

interface TimelineEntry {
	year: number;
	projects: ProjectItem[];
}

const timeline_data: TimelineEntry[] = [
	{
		year: 2020,
		projects: [
			{id: 1, image: img_totabuan, title: "Totabuan", category: "Web Profile", description: "Company profile website untuk Totabuan"},
		],
	},
	{
		year: 2021,
		projects: [
			{id: 2, image: img_rahanmancar, title: "Rahan Mancar", category: "Web App", description: "Aplikasi web untuk manajemen Rahan Mancar"},
			{id: 3, image: img_trofigroup, title: "Trofi Group", category: "Web Profile", description: "Website company profile Trofi Group"},
		],
	},
	{
		year: 2022,
		projects: [
			{id: 4, image: img_helixio, title: "Helixio", category: "SaaS", description: "SaaS produktivitas multi-tenant: Notes, Kanban & Calendar Sync", caseStudySlug: "helixio"},
			{id: 5, image: img_rahanmancar_online, title: "Rahan Mancar", category: "Platform", description: "Platform website & CMS multi-tenant dengan modul SEO & lead", caseStudySlug: "rahan-mancar"},
		],
	},
	{
		year: 2023,
		projects: [
			{id: 6, image: img_dashboard_rahan, title: "Dashboard Rahan", category: "Dashboard", description: "Dashboard admin & monitoring Rahan"},
		],
	},
	{
		year: 2024,
		projects: [
			{id: 7, image: img_dexova, title: "Dexova", category: "Web App", description: "Aplikasi web modern Dexova"},
		],
	},
	{
		year: 2025,
		projects: [
			{id: 8, image: img_absensi, title: "Absensi App", category: "Mobile App", description: "Aplikasi absensi berbasis mobile", portrait: true},
			{id: 9, image: img_nuvora, title: "Dexova ERP", category: "ERP", description: "Platform ERP terintegrasi: HRIS, Payroll, POS & Manajemen Inventori", caseStudySlug: "dexova-erp"},
		],
	},
];

// Flatten all projects for lightbox index
const all_projects: ProjectItem[] = timeline_data.flatMap((e) => e.projects);

export default function PortfolioArea() {
	const [photoIndex, setPhotoIndex] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [lineProgress, setLineProgress] = useState<number>(0);
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const el = timelineRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const windowH = window.innerHeight;
			// start filling when top of section enters viewport, finish when bottom leaves
			const total = rect.height + windowH;
			const passed = windowH - rect.top;
			const progress = Math.min(1, Math.max(0, passed / total));
			setLineProgress(progress);
		};
		window.addEventListener('scroll', handleScroll, {passive: true});
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleImagePopup = (globalIndex: number) => {
		setPhotoIndex(globalIndex);
		setIsOpen(true);
	};

	const images: string[] = all_projects.map((item) => item.image.src);

	return (
		<>
			<div className="projects-area" id="portfolio">
				<div className="custom-icon">
					<img src="/assets/images/custom/work-scribble.svg" alt="custom"/>
				</div>
				<div className="container">
					{/* Section Header */}
					<div className="row justify-content-center mb-4">
						<div className="col-lg-8 text-center">
							<h2 className="display-4 fw-bold text-white mb-3">
								Proyek <span style={{color: 'var(--primary-color)'}}>Saya</span>
							</h2>
							<p className="lead mb-0" style={{color: 'rgba(255,255,255,0.55)'}}>
								Perjalanan proyek dari 2020 hingga sekarang — dari company profile hingga platform SaaS modern.
							</p>
						</div>
					</div>

					{/* YouTube Embed */}
					<div className="row justify-content-center mb-5">
						<div className="col-lg-8">
							<div style={{
								background: 'rgba(255,255,255,0.04)',
								border: '1px solid rgba(255,255,255,0.08)',
								borderRadius: '16px',
								padding: '20px',
							}}>
								<p style={{
									color: 'rgba(255,255,255,0.4)',
									fontSize: '12px',
									textTransform: 'uppercase',
									letterSpacing: '2px',
									marginBottom: '12px',
									textAlign: 'center',
								}}>
									▶ Featured Work
								</p>
								<div style={{
									position: 'relative',
									paddingBottom: '56.25%',
									height: 0,
									overflow: 'hidden',
									borderRadius: '10px',
								}}>
									<iframe
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											border: 0,
										}}
										src="https://www.youtube.com/embed/bqN1uyQiYp8?si=a3zdkljpmxoIBqKx"
										title="YouTube video player"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div ref={timelineRef} style={{position: 'relative', paddingBottom: '40px'}}>
						{/* Background line (always visible, redup) */}
						<div style={{
							position: 'absolute',
							left: '120px',
							top: 0,
							bottom: 0,
							width: '2px',
							background: 'rgba(244,243,237,0.1)',
							pointerEvents: 'none',
						}} className="timeline-line-desktop"/>
						{/* Foreground line (grows on scroll) */}
						<div style={{
							position: 'absolute',
							left: '120px',
							top: 0,
							width: '2px',
							height: `${lineProgress * 100}%`,
							background: 'linear-gradient(to bottom, #a78bfa, #60a5fa, #34d399)',
							boxShadow: '0 0 10px rgba(167,139,250,0.5)',
							transition: 'height 80ms linear',
							pointerEvents: 'none',
							zIndex: 1,
						}} className="timeline-line-desktop"/>

						{timeline_data.map((entry) => {
							const startIndex = all_projects.findIndex((p) => p.id === entry.projects[0].id);
							return (
								<div key={entry.year} style={{
									display: 'flex',
									alignItems: 'flex-start',
									gap: '0',
									marginBottom: '48px',
									position: 'relative',
								}} className="timeline-row">
									{/* Year label */}
									<div style={{
										width: '100px',
										flexShrink: 0,
										paddingTop: '12px',
										textAlign: 'right',
										paddingRight: '0',
									}} className="timeline-year-col">
										<span style={{
											fontSize: '28px',
											fontWeight: '700',
											color: 'var(--primary-color)',
											fontFamily: 'var(--title-font)',
											letterSpacing: '-1px',
											lineHeight: 1,
										}}>
											{entry.year}
										</span>
									</div>

									{/* Dot + connector */}
									<div style={{
										width: '40px',
										flexShrink: 0,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										paddingTop: '20px',
										position: 'relative',
										zIndex: 2,
									}} className="timeline-dot-col">
										<div style={{
											width: '12px',
											height: '12px',
											borderRadius: '50%',
											background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
											boxShadow: '0 0 14px rgba(167,139,250,0.7)',
											flexShrink: 0,
										}}/>
									</div>

									{/* Project cards */}
									<div style={{
										flex: 1,
										display: 'flex',
										flexWrap: 'wrap',
										gap: '16px',
									}}>
										{entry.projects.map((item, idx) => {
											const cardStyle: React.CSSProperties = {
												flex: '0 0 calc(50% - 8px)',
												maxWidth: 'calc(50% - 8px)',
												minWidth: '220px',
												cursor: 'pointer',
												borderRadius: '12px',
												overflow: 'hidden',
												background: 'rgba(255,255,255,0.03)',
												border: '1px solid rgba(255,255,255,0.07)',
												transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
												textDecoration: 'none',
												display: 'block',
											};
											const onEnter = (e: React.MouseEvent<HTMLElement>) => {
												const el = e.currentTarget;
												el.style.transform = 'translateY(-4px)';
												el.style.borderColor = 'rgba(244,243,237,0.3)';
												el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)';
											};
											const onLeave = (e: React.MouseEvent<HTMLElement>) => {
												const el = e.currentTarget;
												el.style.transform = 'translateY(0)';
												el.style.borderColor = 'rgba(255,255,255,0.07)';
												el.style.boxShadow = 'none';
											};
											const inner = (
												<>
													<div style={{
														position: 'relative',
														width: '100%',
														paddingTop: item.portrait ? '177%' : '58%',
														overflow: 'hidden',
													}}>
														<Image
															src={item.image}
															alt={`Tampilan proyek ${item.title}`}
															fill
															style={{objectFit: 'cover', objectPosition: 'center'}}
															sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
														/>
														{item.caseStudySlug && (
															<span style={{
																position: 'absolute',
																top: '12px',
																left: '12px',
																background: 'rgba(52,211,153,0.15)',
																backdropFilter: 'blur(8px)',
																color: '#6ee7b7',
																fontSize: '11px',
																fontWeight: '700',
																letterSpacing: '0.5px',
																padding: '4px 10px',
																borderRadius: '20px',
																border: '1px solid rgba(52,211,153,0.35)',
															}}>
																✦ Dianalisa AI
															</span>
														)}
														<span style={{
															position: 'absolute',
															top: '12px',
															right: '12px',
															background: 'rgba(0,0,0,0.6)',
															backdropFilter: 'blur(8px)',
															color: 'var(--primary-color)',
															fontSize: '11px',
															fontWeight: '600',
															letterSpacing: '1px',
															textTransform: 'uppercase',
															padding: '4px 10px',
															borderRadius: '20px',
															border: '1px solid rgba(244,243,237,0.2)',
														}}>
															{item.category}
														</span>
													</div>
													<div style={{padding: '16px 18px 18px'}}>
														<h3 style={{
															fontSize: '17px',
															fontWeight: '600',
															color: '#fff',
															marginBottom: '4px',
															fontFamily: 'var(--title-font)',
														}}>
															{item.title}
														</h3>
														<p style={{
															fontSize: '13px',
															color: 'rgba(255,255,255,0.45)',
															margin: 0,
															lineHeight: '1.5',
														}}>
															{item.description}
														</p>
														{item.caseStudySlug && (
															<span style={{
																display: 'inline-block',
																marginTop: '12px',
																fontSize: '12px',
																fontWeight: '600',
																color: 'var(--primary-color)',
																letterSpacing: '0.3px',
															}}>
																Lihat studi kasus <span aria-hidden>→</span>
															</span>
														)}
													</div>
												</>
											);

											return item.caseStudySlug ? (
												<Link
													key={item.id}
													href={`/projects/${item.caseStudySlug}`}
													className="timeline-card"
													style={cardStyle}
													onMouseEnter={onEnter}
													onMouseLeave={onLeave}
													aria-label={`Buka studi kasus ${item.title}`}
												>
													{inner}
												</Link>
											) : (
												<div
													key={item.id}
													className="timeline-card"
													onClick={() => handleImagePopup(startIndex + idx)}
													style={cardStyle}
													onMouseEnter={onEnter}
													onMouseLeave={onLeave}
												>
													{inner}
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Responsive overrides */}
			<style>{`
				@media (max-width: 640px) {
					.timeline-line-desktop { left: 16px !important; }
					.timeline-row { flex-direction: column !important; gap: 8px !important; border-left: 2px solid rgba(167,139,250,0.2) !important; padding-left: 12px !important; }
					.timeline-year-col { width: auto !important; text-align: left !important; padding-left: 0 !important; }
					.timeline-dot-col { display: none !important; }
					.timeline-card { flex: 0 0 100% !important; max-width: 100% !important; min-width: 0 !important; }
					.timeline-year-col span { display: inline-block !important; background: rgba(167,139,250,0.1) !important; border: 1px solid rgba(167,139,250,0.3) !important; border-radius: 20px !important; padding: 2px 12px !important; font-size: 13px !important; color: #a78bfa !important; letter-spacing: 0 !important; }
				}
			`}</style>

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
