import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Intermezzo — een ademmoment tussen Verwelkoming en Werkwijze. De fermate
 * (boog met stip) is het muziekteken voor "houd aan, zo lang als nodig":
 * stilte die mag duren. Toepasselijker teken voor gesprekstherapie bestaat
 * er niet. Een zachte brass-gloed licht het citaat vanachter op.
 */
export function Intermezzo({ c }: { c: Content }) {
  const i = c.intermezzo;
  return (
    <section
      aria-label={i.label}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "14vh 40px",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        aria-hidden
        className="spotlight"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 780,
          maxHeight: 780,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          {/* fermate */}
          <svg aria-hidden width="44" height="26" viewBox="0 0 44 26" fill="none" style={{ margin: "0 auto" }}>
            <path d="M3 23 A19 19 0 0 1 41 23" stroke="var(--brass)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="22" cy="19.5" r="2.1" fill="var(--brass)" />
          </svg>

          <p
            style={{
              margin: "12px 0 0",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--mono-2)",
            }}
          >
            {i.label}
          </p>

          <p
            style={{
              margin: "32px 0 0",
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(26px, 4vw, 46px)",
              lineHeight: 1.4,
              color: "var(--text)",
              textWrap: "balance",
            }}
          >
            {i.quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
