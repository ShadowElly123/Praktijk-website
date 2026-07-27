import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";
import { Editable } from "../review/Editable";

/**
 * Over mij — 2-koloms: links een sticky foto (aspect 4/5) van Lucas, rechte
 * rand zonder fade (geen caption eronder — die zou door de sticky positionering
 * met scrollende inhoud overlappen); rechts de kop, body en ervaring
 * (gedempt). Titels & erkenning en de registratienummers staan enkel nog in
 * de footer, om dubbele vermelding te vermijden. De prozatekst blijft bewust
 * één serif-stem (geen italics) voor rust. Stapelt op mobiel.
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
              maxWidth: 400,
              // Naar de rechterrand van de kolom, dichter bij de tekst — anders
              // ontstaat een grote lege kloof tussen beeld en tekstkolom.
              marginLeft: "auto",
            }}
          >
            {/* Geen fade/vignet meer: op deze foto (lichtgrijze studio-achtergrond
                tegen de bijna-zwarte site) las elke uitdoof-poging als een silhouet
                — ovaal (doodsprentje) of rechthoekig kadertje. Gewoon de foto,
                rechte rand. */}
            <Image
              src="/images/portret-v8.jpg"
              alt={o.badge}
              fill
              sizes="(max-width: 820px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Reveal>
      </div>

      <div className="split__text split__text--about">
        <Reveal style={{ marginBottom: 28 }}>
          <SectionKicker as="h2" label={<Editable path="overMij.label">{o.label}</Editable>} />
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
              whiteSpace: "pre-line",
            }}
          >
            <Editable path="overMij.body">{o.body}</Editable>
          </p>
          {o.ervaring && (
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
              <Editable path="overMij.ervaring">{o.ervaring}</Editable>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
