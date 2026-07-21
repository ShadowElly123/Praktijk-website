import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";

/**
 * Werkwijze — 2-koloms: links de tekst (kop, titel, body, brass-accent, en een
 * genummerde lijst van thema's waar bijzondere ruimte voor is), rechts een beeld
 * van de praktijkruimte met gradient-maskers dat naar de schermrand bloedt en een
 * gedempte caption linksonder. Een zachte brass-gloed ("oplichting") ligt achter
 * de tekstkolom. Stapelt op mobiel.
 */
export function Werkwijze({ c }: { c: Content }) {
  const w = c.werkwijze;
  return (
    <section
      aria-label={w.label}
      data-section="werkwijze"
      className="split split--werkwijze"
      style={{
        position: "relative",
        // Géén overflow:hidden: de brass-spotlight achter de kop steekt boven de
        // sectie uit en moet over de grens met het intermezzo kunnen doorvloeien —
        // een sectie-clip zou 'm daar hard afsnijden. Het beeld heeft geen harde
        // rand nodig: het feather-masker op .werkwijze-foto lost de randen op.
        // Transparant: de gedeelde achtergrond-wrapper (page.tsx) levert de kleur,
        // zodat de intermezzo-gloed hier ongestoord in kan doorlopen.
        background: "transparent",
      }}
    >
      <div className="split__text split__text--werkwijze" style={{ position: "relative", zIndex: 1 }}>
        {/* zachte brass-gloed achter de kop */}
        <div aria-hidden className="spotlight" style={{ width: 420, height: 420, left: -80, top: -120 }} />

        <Reveal style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
          <SectionKicker label={w.label} />
        </Reveal>
        <Reveal delay={0.1} style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              margin: "8px 0 28px",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 500,
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
              margin: 0,
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 19,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {w.accent}
          </p>
        </Reveal>

        <Reveal delay={0.2} style={{ marginTop: 40, position: "relative", zIndex: 1 }}>
          <p
            style={{
              margin: "0 0 18px",
              fontFamily: "var(--font-serif), serif",
              fontWeight: 400,
              fontSize: 19,
              color: "var(--brass)",
            }}
          >
            {w.themesTitle}
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 520 }}>
            {w.themes.map((theme, i) => (
              <li
                key={theme}
                style={{
                  borderTop: "1px solid var(--line-2)",
                  padding: "16px 0",
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--text)",
                }}
              >
                <span
                  style={{
                    marginRight: 14,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 13,
                    color: "var(--brass)",
                  }}
                >
                  0{i + 1}
                </span>
                {theme}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="split__media">
        {/* Bewust een verticale foto, in haar geheel getoond. De wrapper heeft exact
            de verhouding van de foto (3:4), zodat het feather-masker precies op de
            fotoranden valt en alle vier de randen breed en gebogen in de achtergrond
            oplossen — dezelfde perfecte blend als het portret in Over mij, geen rechte
            snijlijnen. Geen caption meer. */}
        <div className="werkwijze-foto">
          <Image
            src="/images/werkwijze.jpg"
            alt=""
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              filter: "saturate(0.82) contrast(1.03) brightness(0.9)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
