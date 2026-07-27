import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";

/**
 * Over mij — 2-koloms: links een sticky foto (aspect 4/5) van Lucas met een
 * zachte rechthoekige feather-rand (rechte zijden, afgeronde zachte hoeken) die
 * aan alle zijden in de donkere achtergrond oplost (die rand + toon-correctie
 * zitten in portret-v6.png gebakken; geen caption eronder — die zou door de
 * sticky positionering met scrollende inhoud overlappen); rechts de kop, body, ervaring
 * (gedempt), een blok "Titels & erkenning" en daaronder een apart blok
 * "Registratie" (visum/erkennings-/ondernemingsnummer, tabular-nums). De
 * prozatekst blijft bewust één serif-stem (geen italics) voor rust. Stapelt op mobiel.
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
              maxWidth: 560,
              // Naar de rechterrand van de kolom, dichter bij de tekst — anders
              // ontstaat een grote lege kloof tussen beeld en tekstkolom.
              marginLeft: "auto",
            }}
          >
            {/* Zelfde zachte overgang als de Werkwijze-foto: twee vermenigvuldigde
                lineaire gradiënten (mask-composite) laten alle vier de randen breed
                en gebogen in de achtergrond oplossen — geen rechte snijlijnen of
                scherpe hoeken. Het beeld zelf (portret-v8.jpg) is enkel crop + toon;
                het masker leeft in CSS en is dus makkelijk bij te stellen. */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 32%, #000 68%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 32%, #000 68%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 100%)",
                maskComposite: "intersect",
              }}
            >
              <Image
                src="/images/portret-v8.jpg"
                alt={o.badge}
                fill
                sizes="(max-width: 820px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="split__text split__text--about">
        <Reveal style={{ marginBottom: 28 }}>
          <SectionKicker as="h2" label={o.label} />
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
            <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span
                aria-hidden
                style={{ color: "var(--brass)", fontSize: 15, lineHeight: 1.6, flexShrink: 0 }}
              >
                —
              </span>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--title)",
                }}
              >
                {o.titel1}{" "}
                <span style={{ color: "var(--mono-1)" }}>{o.titel1sub}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span
                aria-hidden
                style={{ color: "var(--brass)", fontSize: 15, lineHeight: 1.6, flexShrink: 0 }}
              >
                —
              </span>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--title)",
                }}
              >
                {o.titel2}
              </div>
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
