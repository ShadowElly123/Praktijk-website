import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";
import { Editable } from "../review/Editable";

/**
 * Over mij — 2-koloms: links de foto van Lucas, rechts de kop en de tekst.
 *
 * De drie blokken zijn losse grid-items i.p.v. twee kolom-divs, en dat is de
 * hele truc: de sectiekop staat alleen in rij 1, de alinea en de foto delen
 * rij 2. Een grid-rij is zo hoog als zijn hoogste item, en de foto zit
 * absoluut gepositioneerd in zijn cel (dus zonder eigen hoogte) — daardoor
 * bepaalt de alinea de rijhoogte en begint de foto op de eerste tekstregel,
 * zonder de kop mee te rekenen. De foto houdt wel zijn eigen 4/5-verhouding
 * (niet uitgerekt tot onderaan, want dat sneed de zijkanten weg) en is zo breed
 * als de kolom toelaat, zodat de onderlijn dicht bij het einde van de alinea
 * valt. Zie `.about__*` in globals.css.
 *
 * De foto heeft bewust geen fade of vignet: op een lichte foto (warme, lichte
 * muur) tegen de bijna-zwarte site las elke uitdoof-poging als een silhouet —
 * ovaal (doodsprentje) of rechthoekig kadertje. Gewoon de foto, rechte rand.
 * De prozatekst blijft één serif-stem (geen italics) voor rust.
 * Stapelt op mobiel, waar de foto zijn eigen 4/5-verhouding terugkrijgt.
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
      <Reveal className="about__media">
        <div className="about__photo">
          <Image
            src="/images/portret-v10.jpg"
            alt={o.badge}
            fill
            sizes="(max-width: 820px) 100vw, 40vw"
            // Kader en bestand hebben dezelfde 4/5-verhouding, dus `cover`
            // snijdt hier niets weg: de foto is volledig te zien.
            style={{ objectFit: "cover" }}
          />
        </div>
      </Reveal>

      <Reveal className="about__kicker">
        <SectionKicker as="h2" label={<Editable path="overMij.label">{o.label}</Editable>} />
      </Reveal>

      <Reveal delay={0.08} className="about__body">
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            // Zelfde maat als de alinea in Werkwijze — die twee secties staan
            // naast elkaar in de leesbeleving en moeten dus gelijk wegen.
            fontSize: "clamp(22px,2.3vw,28px)",
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
              margin: "22px 0 0",
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
    </section>
  );
}
