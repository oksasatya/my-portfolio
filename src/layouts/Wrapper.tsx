"use client"

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation';
import { animationCreate } from '@/utils/utils';
import ScrollToTop from '@/components/common/ScrollToTop';

import {
  ScrollSmoother,
  ScrollTrigger,
} from "@/plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger,);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function Wrapper({ children }: any) {

  const pathname = usePathname();
  const smootherRef = useRef<any | null>(null);

  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
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

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new Event('preloader:start'));
      console.log(document.getElementById('preloader'));
    }
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

    // Hover effects for links
    const handleMouseEnter = () => {
      cursorBall.classList.add('hovered');
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 2,
        opacity: 0,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      cursorBall.classList.remove('hovered');
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      });
    };

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove);
    const hoverElements = document.querySelectorAll('a');
    hoverElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
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
