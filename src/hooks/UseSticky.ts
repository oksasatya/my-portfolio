'use client'
import { useEffect, useState } from "react";

interface StickyState {
  sticky: boolean;
}

const UseSticky = (): StickyState => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = (): void => {
      ticking = false;
      setSticky(window.scrollY > 200);
    };
    const onScroll = (): void => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return (): void => window.removeEventListener("scroll", onScroll);
  }, []);

  return { sticky };
};

export default UseSticky;
