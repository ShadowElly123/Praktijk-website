import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Werkwijze — 2-koloms: links de tekst (label, titel, body, brass-accent en een
 * subtiele extra regel over aandacht voor seksualiteit & gender), rechts een
 * beeld met gradient-maskers dat naar de schermrand bloedt. Stapelt op mobiel.
 */
export function Werkwijze({ c }: { c: Content }) {
  const w = c.werkwijze;
  return (
    <section
      aria-label={w.label}
      className="split split--werkwijze"
      style={{
        position: "relative",
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="split__text split__text--werkwijze">
        <Reveal>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: 20,
            }}
          >
            {w.num}&nbsp;·&nbsp;{w.label}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              margin: "0 0 28px",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(34px,4vw,58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--title)",
            }}
          >
            {w.title}
          </h2>
          <p
            style={{
              margin: "0 0 22px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 19,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {w.body}
          </p>
          <p
            style={{
              margin: "0 0 22px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.8,
              color: "var(--brass)",
            }}
          >
            {w.accent}
          </p>
          <p
            style={{
              margin: 0,
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--mono-1)",
            }}
          >
            {w.aandacht}
          </p>
        </Reveal>
      </div>

      <div className="split__media">
        <Image
          src="/images/werkwijze.jpg"
          alt=""
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            filter: "saturate(0.78) contrast(1.05) brightness(0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #100E0C 0%, rgba(16,14,12,0.25) 22%, transparent 55%), linear-gradient(180deg, #100E0C 0%, transparent 16%, transparent 84%, #100E0C 100%), radial-gradient(90% 70% at 70% 40%, rgba(194,166,131,0.14), transparent 60%)",
          }}
        />
      </div>
    </section>
  );
}
