"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Toont children en animeert opacity/translateY zodra
 * het blok in beeld komt. Respecteert `prefers-reduced-motion`: dan meteen zichtbaar,
 * zonder animatie.
 */
export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Bewust setState in het effect: matchMedia bestaat niet tijdens SSR, dus
    // de initiële state kan dit niet afleiden zonder hydration-mismatch. Bij
    // reduced-motion tonen we meteen, zonder animatie of observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
