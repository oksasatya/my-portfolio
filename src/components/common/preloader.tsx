"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
	const [isLoading, setIsLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const preloaderRef = useRef<HTMLDivElement>(null);
	const svgPathRef = useRef<SVGPathElement>(null);
	const progressFillRef = useRef<HTMLDivElement>(null);
	const exitStartedRef = useRef(false);

	// Body scroll lock while preloader is on screen
	useEffect(() => {
		if (!isLoading) return;
		const prevBodyOverflow = document.body.style.overflow;
		const prevHtmlOverflow = document.documentElement.style.overflow;
		const prevBodyHeight = document.body.style.height;

		document.body.style.overflow = 'hidden';
		document.body.style.height = '100vh';
		document.documentElement.style.overflow = 'hidden';
		document.body.classList.add('loaded');

		return () => {
			document.body.style.overflow = prevBodyOverflow;
			document.body.style.height = prevBodyHeight;
			document.documentElement.style.overflow = prevHtmlOverflow;
			document.body.classList.remove('loaded');
		};
	}, [isLoading]);

	// Entrance animation
	useEffect(() => {
		if (!preloaderRef.current) return;
		gsap.set('.preloader .preloader-heading > *:not(.load-text)', { opacity: 0, y: 30 });
		gsap.set('.preloader .glitch-text span', { opacity: 0, y: 20 });

		const tl = gsap.timeline();
		tl.to('.preloader .brand-text', { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' })
			.to('.preloader .glitch-text span', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.4')
			.to('.preloader .loading-progress', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
			.to('.preloader .loading-dots', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
			.to('.preloader .status-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2');
	}, []);

	// Exit animation
	const runExitAnimation = () => {
		if (exitStartedRef.current) return;
		exitStartedRef.current = true;

		const svg = svgPathRef.current;
		const preloader = preloaderRef.current;
		if (!preloader) {
			setIsLoading(false);
			return;
		}

		const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
		const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

		const tl = gsap.timeline({
			onComplete: () => setIsLoading(false),
		});
		tl.to('.preloader .loading-dots .dot', { duration: 0.3, scale: 0, opacity: 0, stagger: 0.05, ease: 'back.in(1.7)' })
			.to('.preloader .progress-container', { duration: 0.4, scale: 0, opacity: 0, ease: 'back.in(1.7)' }, '-=0.2')
			.to('.preloader .brand-text', { duration: 0.3, y: -50, opacity: 0, ease: 'power2.in' }, '-=0.3')
			.to('.preloader .glitch-text span', { duration: 0.5, y: -100, opacity: 0, stagger: 0.03, ease: 'back.in(1.7)' }, '-=0.2')
			.to('.preloader .particles-bg, .preloader .grid-overlay', { duration: 0.4, opacity: 0, ease: 'power2.in' }, '-=0.4');

		if (svg) {
			tl.to(svg, { duration: 0.6, attr: { d: curve }, ease: 'power2.easeIn' })
				.to(svg, { duration: 0.6, attr: { d: flat }, ease: 'power2.easeOut' });
		}

		tl.to(preloader, { duration: 0.8, y: -1500, ease: 'power2.inOut' });
	};

	// Progress simulation with hard 6s safety timeout
	useEffect(() => {
		if (!isLoading) return;
		let current = 0;

		const progressInterval = setInterval(() => {
			const increment = Math.random() * 8 + 2;
			current = Math.min(current + increment, 100);
			setProgress(current);
			if (progressFillRef.current) {
				progressFillRef.current.style.width = `${current}%`;
			}
			if (current >= 100) {
				clearInterval(progressInterval);
				setTimeout(runExitAnimation, 200);
			}
		}, 150);

		const safety = setTimeout(() => {
			clearInterval(progressInterval);
			runExitAnimation();
		}, 6000);

		return () => {
			clearInterval(progressInterval);
			clearTimeout(safety);
		};
	}, [isLoading]);

	if (!isLoading) return null;

	const statusMessage =
		progress < 25 ? 'Initializing System...' :
		progress < 50 ? 'Loading Assets...' :
		progress < 75 ? 'Preparing Interface...' :
		progress < 95 ? 'Almost Ready...' : 'Complete!';

	return (
		<div className="preloader" id="preloader" ref={preloaderRef}>
			<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<defs>
					<linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#000000" />
						<stop offset="50%" stopColor="#1a1a1a" />
						<stop offset="100%" stopColor="#000000" />
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="3" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<path
					id="preloaderSvg"
					ref={svgPathRef}
					d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
					fill="url(#gradientFill)"
					filter="url(#glow)"
				/>
			</svg>

			<div className="particles-bg">
				{[...Array(35)].map((_, i) => (
					<div
						key={i}
						className="particle"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 4}s`,
							animationDuration: `${3 + Math.random() * 6}s`,
						}}
					/>
				))}
			</div>

			<div className="grid-overlay"></div>

			<div className="preloader-heading">
				<div className="brand-text">
					<span>PORTFOLIO</span>
				</div>

				<div className="load-text glitch-text">
					{['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((c) => (
						<span key={c} data-text={c}>{c}</span>
					))}
				</div>

				<div className="loading-progress">
					<div className="progress-container">
						<div className="progress-bar">
							<div className="progress-fill" ref={progressFillRef} style={{ width: '0%' }}></div>
							<div className="progress-glow"></div>
						</div>
						<div className="progress-text">
							<span className="progress-number">{Math.floor(progress)}</span>
							<span className="progress-percent">%</span>
						</div>
					</div>
				</div>

				<div className="loading-dots">
					<div className="dot pulse"></div>
					<div className="dot pulse"></div>
					<div className="dot pulse"></div>
				</div>

				<div className="status-text">
					<span className="status-message">{statusMessage}</span>
				</div>
			</div>
		</div>
	);
}
