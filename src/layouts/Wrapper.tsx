"use client"

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation';
import { animationCreate } from '@/utils/utils';
import ScrollToTop from '@/components/common/ScrollToTop';
import { pageview, GTM_ID } from '@/lib/gtag';

import {
  ScrollSmoother,
  ScrollTrigger,
} from "@/plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger,);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function Wrapper({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const smootherRef = useRef<any | null>(null);
  const hasTrackedInitialRef = useRef(false);

  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Fire GA4 page_view on route change; avoid duplicate initial when GTM is present
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isInitial = !hasTrackedInitialRef.current;
    if (isInitial) {
      hasTrackedInitialRef.current = true;
      // If using GTM, rely on its initial page_view; we'll handle only subsequent navigations
      if (GTM_ID) return;
    }

    const url = window.location.pathname + window.location.search;
    pageview(url, document.title);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // kill previous instance to avoid duplicates on route changes
      smootherRef.current?.kill?.();
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
        smoothTouch: 0,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }

    return () => {
      smootherRef.current?.kill?.();
      smootherRef.current = null;
    };
  }, [pathname]);

  // round cursor
  const cursorBallRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorBall = cursorBallRef.current;

    if (!cursorBall) return;

    // Mouse move listener to update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorBall, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        ease: 'power2.out',
      });
    };

    // Event delegation so links rendered AFTER mount (route changes, lightbox,
    // menus) get the hover effect too. mouseover/mouseout bubble; mouseenter
    // does not — so we delegate and match the nearest <a>.
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('a')) {
        cursorBall.classList.add('hovered');
        gsap.to(cursorBall, { duration: 0.3, scale: 2, opacity: 0, ease: 'power2.out' });
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('a')) {
        cursorBall.classList.remove('hovered');
        gsap.to(cursorBall, { duration: 0.3, scale: 1, opacity: 1, ease: 'power2.out' });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div id="magic-cursor">
        <div id="ball" data-react-cursor ref={cursorBallRef}></div>
      </div>
      {children}
      <ScrollToTop />
    </>
  )
}
