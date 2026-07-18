import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";

/**
 * Over mij — 2-koloms: links een sticky foto (aspect 4/5) van Lucas die met een
 * feather-masker aan alle zijden zacht in de donkere achtergrond opgaat (geen
 * harde rand), met italic caption eronder; rechts de kop, body, ervaring
 * (italic, gedempt), een blok "Titels & erkenning" en daaronder een apart blok
 * "Registratie" (visum/erkennings-/ondernemingsnummer, tabular-nums).
 * Stapelt op mobiel.
 */
export function OverMij({ c }: { c: Content }) {
  const o = c.overMij;
  return (
    <section
      aria-label={o.label}
      data-section="over-mij"
      className="split split--about"
      style={{
        position: "relative",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="split__text split__text--about">
        <Reveal>
          <div
            style={{
              position: "sticky",
              top: "14vh",
              aspectRatio: "4 / 5",
              width: "100%",
              maxWidth: 440,
              // Feather-masker: het beeld vervaagt aan alle vier de zijden naar
              // transparant, zodat het naadloos in de donkere achtergrond opgaat
              // in plaats van een hoekig kader te vormen.
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              maskComposite: "intersect",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/images/portret.jpg"
                alt={o.badge}
                fill
                sizes="(max-width: 820px) 100vw, 40vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 26%",
                  filter: "grayscale(0.15) contrast(1.02) brightness(1.0)",
                }}
              />
            </div>
          </div>
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: 440,
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--mono-1)",
            }}
          >
            {o.imageCaption}
          </p>
        </Reveal>
      </div>

      <div className="split__text split__text--about">
        <Reveal style={{ marginBottom: 28 }}>
          <SectionKicker label={o.label} />
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              margin: "0 0 22px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(19px,1.9vw,23px)",
              lineHeight: 1.75,
              color: "var(--text)",
            }}
          >
            {o.body}
          </p>
          <p
            style={{
              margin: "0 0 36px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--mono-1)",
            }}
          >
            {o.ervaring}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderTop: "1px solid var(--line-2)",
              paddingTop: 24,
              maxWidth: 520,
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--mono-2)",
              }}
            >
              {o.titelsLabel}
            </p>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--brass)",
              }}
            >
              {o.titel1}{" "}
              <span style={{ color: "var(--mono-2)", fontWeight: 400 }}>{o.titel1sub}</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--brass)",
              }}
            >
              {o.titel2}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div
            style={{
              borderTop: "1px solid var(--line-2)",
              paddingTop: 20,
              marginTop: 20,
              maxWidth: 520,
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--mono-2)",
              }}
            >
              {o.registratieLabel}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {o.registratie.map((r) => (
                <li
                  key={r}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    lineHeight: 1.9,
                    color: "var(--mono-3)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
