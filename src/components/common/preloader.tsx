"use client";
import {useEffect, useState, useRef} from 'react';

export default function Preloader() {
	const [isLoading, setIsLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const preloaderRef = useRef<HTMLDivElement>(null);
	const cleanupHandledRef = useRef(false);
	
	useEffect(() => {
		// Prevent scrolling during loading
		document.body.style.overflow = 'hidden';
		document.body.style.height = '100vh';
		document.documentElement.style.overflow = 'hidden';
		document.body.classList.add('loaded');
		
		// Listen untuk perubahan dari JavaScript
		const checkCompletion = setInterval(() => {
			// Cek apakah preloader masih ada di DOM
			const preloaderElement = document.querySelector('.preloader');
			if (!preloaderElement && !cleanupHandledRef.current) {
				cleanupHandledRef.current = true;
				setIsLoading(false);
				clearInterval(checkCompletion);
			}
		}, 100);
		
		// Cleanup jika component unmount
		return () => {
			clearInterval(checkCompletion);
			if (!cleanupHandledRef.current) {
				document.body.style.overflow = '';
				document.body.style.height = '';
				document.documentElement.style.overflow = '';
				document.body.classList.remove('loaded');
			}
		};
	}, []);
	
	// Update progress state dari DOM untuk menampilkan status text yang tepat
	useEffect(() => {
		const updateProgress = () => {
			// Only update if preloader still exists and hasn't been cleaned up
			if (cleanupHandledRef.current) return;
			
			const progressElement = document.querySelector('.progress-number');
			if (progressElement && progressElement.textContent) {
				const currentProgress = parseInt(progressElement.textContent) || 0;
				setProgress(currentProgress);
			}
		};
		
		const interval = setInterval(updateProgress, 100);
		return () => clearInterval(interval);
	}, []);
	
	// Handle component cleanup when GSAP removes the element
	useEffect(() => {
		const preloaderElement = preloaderRef.current;
		if (!preloaderElement) return;
		
		// Listen for when GSAP starts removing the element
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
					const target = mutation.target as HTMLElement;
					// Check if element is being animated out (transform Y)
					if (target.style.transform && target.style.transform.includes('translateY')) {
						cleanupHandledRef.current = true;
					}
				}
			});
		});
		
		observer.observe(preloaderElement, {
			attributes: true,
			attributeFilter: ['style']
		});
		
		return () => {
			observer.disconnect();
		};
	}, []);
	
	if (!isLoading) {
		return null;
	}
	
	return (
		<div className="preloader" id="preloader" ref={preloaderRef}>
			{/* Animated SVG Background */}
			<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<defs>
					<linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#000000"/>
						<stop offset="50%" stopColor="#1a1a1a"/>
						<stop offset="100%" stopColor="#000000"/>
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
						<feMerge>
							<feMergeNode in="coloredBlur"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>
				</defs>
				<path
					id="preloaderSvg"
					d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
					fill="url(#gradientFill)"
					filter="url(#glow)"
				/>
			</svg>
			
			{/* Animated Background Particles */}
			<div className="particles-bg">
				{[...Array(35)].map((_, i) => (
					<div
						key={i}
						className="particle"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 4}s`,
							animationDuration: `${3 + Math.random() * 6}s`
						}}
					/>
				))}
			</div>
			
			{/* Grid Overlay */}
			<div className="grid-overlay"></div>
			
			{/* Main Content */}
			<div className="preloader-heading">
				{/* Brand/Logo */}
				<div className="brand-text">
					<span>PORTFOLIO</span>
				</div>
				
				{/* Main Loading Text with Glitch */}
				<div className="load-text glitch-text">
					<span data-text="L">L</span>
					<span data-text="O">O</span>
					<span data-text="A">A</span>
					<span data-text="D">D</span>
					<span data-text="I">I</span>
					<span data-text="N">N</span>
					<span data-text="G">G</span>
				</div>
				
				{/* Progress Section - JavaScript will update this */}
				<div className="loading-progress">
					<div className="progress-container">
						<div className="progress-bar">
							<div
								className="progress-fill"
								style={{width: '0%'}} // Start at 0, JavaScript will animate this
							></div>
							<div className="progress-glow"></div>
						</div>
						<div className="progress-text">
							<span className="progress-number">0</span> {/* JavaScript will update this */}
							<span className="progress-percent">%</span>
						</div>
					</div>
				</div>
				
				{/* Loading Dots */}
				<div className="loading-dots">
					<div className="dot pulse"></div>
					<div className="dot pulse"></div>
					<div className="dot pulse"></div>
				</div>
				
				{/* Status Text - React will update this based on progress from DOM */}
				<div className="status-text">
          <span className="status-message">
            {progress < 25 ? 'Initializing System...' :
	            progress < 50 ? 'Loading Assets...' :
		            progress < 75 ? 'Preparing Interface...' :
			            progress < 95 ? 'Almost Ready...' : 'Complete!'}
          </span>
				</div>
			</div>
		</div>
	);
}