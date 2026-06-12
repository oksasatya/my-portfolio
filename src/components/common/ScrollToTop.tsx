"use client";
import React, { useState, useEffect, useRef } from "react";

const ScrollToTop = () => {
  const [isActive, setIsActive] = useState(false);
  const progressRef = useRef<SVGPathElement | null>(null);
  const offset = 150;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const progressPath = progressRef.current;
    if (!progressPath) return;

    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = "stroke-dashoffset 10ms linear";

    // Single rAF-throttled scroll handler (drives both the progress ring and
    // the visibility toggle) instead of two unthrottled listeners.
    let ticking = false;
    const update = () => {
      ticking = false;
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;
      progressPath.style.strokeDashoffset = `${progress}`;
      setIsActive(scroll > offset);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`progress-wrap cursor-pointer ${isActive ? "active-progress" : ""}`}
      onClick={scrollTop}
      aria-label="Kembali ke atas"
      style={{ border: "none", background: "transparent", padding: 0 }}
    >
      <i className="ri-arrow-up-s-line"></i>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path ref={progressRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
