import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { PraktijkKaart } from "../map/PraktijkKaart";

/**
 * LocatieKaart — de zelfgetekende kaart in een omkaderd paneel, met daaronder
 * het adres en een korte caption. `role="img"` + `aria-label` beschrijven de
 * kaart voor screenreaders (de SVG zelf is aria-hidden).
 */
export function LocatieKaart({ c }: { c: Content }) {
  const l = c.locatie;
  return (
    <section
      aria-label={l.label}
      className="sec-x"
      style={{
        position: "relative",
        paddingTop: "14vh",
        paddingBottom: "14vh",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <Reveal>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--brass)",
            marginBottom: 28,
          }}
        >
          {l.label}
        </div>

        <div
          role="img"
          aria-label={l.mapAria}
          style={{
            position: "relative",
            border: "1px solid var(--line-4)",
            background: "var(--bg)",
            maxWidth: 1000,
            overflow: "hidden",
          }}
        >
          <PraktijkKaart pinLabel={l.mapPin} abbeyLabel={l.mapAbdij} />
          <span className="map-corner" style={{ top: 14, left: 14, borderWidth: "1px 0 0 1px" }} />
          <span className="map-corner" style={{ top: 14, right: 14, borderWidth: "1px 1px 0 0" }} />
          <span className="map-corner" style={{ bottom: 14, left: 14, borderWidth: "0 0 1px 1px" }} />
          <span className="map-corner" style={{ bottom: 14, right: 14, borderWidth: "0 1px 1px 0" }} />
        </div>

        <div style={{ marginTop: 24, maxWidth: 1000, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 16,
              color: "var(--title)",
            }}
          >
            {l.adres}
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--mono-1)",
            }}
          >
            {l.caption}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
