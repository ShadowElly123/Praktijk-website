"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../lib/LanguageProvider";

export function Hero() {
  const { t } = useLang();
  const keyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shaftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let sy = 0;
    let raf = 0;

    const apply = () => {
      raf = 0;
      if (keyRef.current) {
        keyRef.current.style.setProperty("--px", `${mx * 26}px`);
        keyRef.current.style.setProperty("--py", `${my * 20 + sy * 0.12}px`);
      }
      if (shaftRef.current) {
        shaftRef.current.style.setProperty("--sx", `${mx * -18}px`);
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${sy * -0.05}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - sy / 640)}`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Gelaagd cinematografisch licht */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* warm key light — ademt + volgt de muis */}
        <div
          ref={keyRef}
          className="hero-key absolute left-1/2 top-[58%] h-[130vh] w-[130vh]"
          style={{
            translate: "var(--px, 0) var(--py, 0)",
            background:
              "radial-gradient(circle at center, rgba(194,166,131,0.22) 0%, rgba(163,138,107,0.09) 30%, transparent 60%)",
          }}
        />
        {/* zachte lichtschacht die traag overstrijkt */}
        <div
          ref={shaftRef}
          className="hero-shaft absolute -top-[20%] left-[52%] h-[150%] w-[30vw]"
          style={{
            translate: "var(--sx, 0) 0",
            background:
              "linear-gradient(90deg, transparent, rgba(194,166,131,0.10) 45%, rgba(229,220,205,0.06) 50%, transparent)",
            filter: "blur(26px)",
          }}
        />
        {/* spectrumbreking: licht door oud glas, subtiel queer signaal */}
        <div
          className="hero-prism absolute -top-[15%] left-[40%] h-[140%] w-[36vw]"
        />
        {/* koele tegenschaduw links */}
        <div
          className="absolute -left-[22%] top-[8%] h-[75vh] w-[75vh]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(90,104,120,0.12) 0%, transparent 60%)",
          }}
        />
        {/* stof in het licht */}
        <div className="hero-dust absolute inset-0 opacity-70" />
        {/* vignet */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 42%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* discrete badge — herinnert dat hier een foto komt */}
      <div className="relative z-10 flex justify-center pt-28 text-center" aria-hidden>
        <span
          className="font-display text-[0.62rem] uppercase tracking-[0.32em]"
          style={{ color: "var(--text-faint)" }}
        >
          ◦ {t.hero.badge} ◦
        </span>
      </div>

      {/* hero-kern */}
      <div
        ref={contentRef}
        className="relative z-10 shell flex flex-1 flex-col items-center justify-center text-center"
        style={{ willChange: "transform, opacity" }}
      >
        <p
          className="hero-anim font-display text-[0.72rem] uppercase tracking-[0.34em]"
          style={{ color: "var(--brass)", animationDelay: "0.15s" }}
        >
          {t.hero.role}
        </p>

        <h1
          className="hero-anim mt-8 font-serif italic"
          style={{
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 6.4vw, 5.4rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            maxWidth: "16ch",
            animationDelay: "0.3s",
          }}
        >
          {t.hero.quote}
        </h1>

        <p
          className="hero-anim mt-10 font-display text-[0.98rem] tracking-[0.02em]"
          style={{ color: "var(--text-dim)", animationDelay: "0.5s" }}
        >
          {t.hero.name}
        </p>
      </div>

      {/* scroll-cue */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-12">
        <a
          href="#welkom"
          className="hero-anim group flex flex-col items-center gap-3"
          style={{ animationDelay: "0.8s" }}
          aria-label={t.hero.scrollCue}
        >
          <span
            className="font-display text-[0.68rem] uppercase tracking-[0.3em] transition-colors duration-300 group-hover:text-[var(--brass)]"
            style={{ color: "var(--text-faint)" }}
          >
            {t.hero.scrollCue}
          </span>
          <span className="scroll-line" aria-hidden />
        </a>
      </div>
    </section>
  );
}
