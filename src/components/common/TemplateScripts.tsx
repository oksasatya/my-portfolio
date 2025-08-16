"use client";
import { useEffect } from "react";

export default function TemplateScripts() {
	useEffect(() => {
		const interval = setInterval(() => {
			if (typeof window !== "undefined" && (window as any).Swiper) {
				require("/public/assets/js/script.js");
				clearInterval(interval);
			}
		}, 100);
		
		return () => clearInterval(interval);
	}, []);
	
	return null;
}
