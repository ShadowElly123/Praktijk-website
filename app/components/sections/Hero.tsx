import Image from "next/image";
import type { Content } from "../../lib/locale";

/**
 * Hero — full-bleed beeld met clair-obscur-behandeling, drie overlay-gradients,
 * de titel (Archivo) + accentregel (Spectral italic, brass) en een scroll-cue.
 * Exact overgenomen uit de goedgekeurde Claude Design.
 */
export function Hero({ c }: { c: Content }) {
  return (
    <section
      aria-label={`${c.hero.titel} ${c.hero.accent}`}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          filter: "saturate(0.82) contrast(1.05) brightness(0.72)",
          animation: "kenburns 24s ease-in-out infinite alternate",
        }}
      />
      {/* brass-gloed rechtsboven */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(194,166,131,0.20), transparent 46%)",
        }}
      />
      {/* horizontale verdonkering voor leesbaarheid van de tekst links */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(14,13,12,0.94) 0%, rgba(14,13,12,0.60) 40%, rgba(14,13,12,0.30) 68%, rgba(14,13,12,0.78) 100%)",
        }}
      />
      {/* onderrand-fade naar de basiskleur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, #0E0D0C 1%, rgba(14,13,12,0.15) 34%, transparent 60%)",
        }}
      />

      <div
        className="sec-x"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBottom: "8vh",
          maxWidth: 1080,
          animation: "heroRise 1.4s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-sans), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(52px,8vw,116px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: "var(--title)",
          }}
        >
          {c.hero.titel}
          <br />
          <span
            style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--brass)",
              letterSpacing: 0,
            }}
          >
            {c.hero.accent}
          </span>
        </h1>
        <p
          style={{
            margin: "34px 0 0",
            maxWidth: 440,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.7,
            color: "var(--muted)",
          }}
        >
          {c.hero.sub}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--mono-2)",
          }}
        >
          {c.hero.scroll}
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(var(--brass), transparent)",
            animation: "cueMove 2.2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
