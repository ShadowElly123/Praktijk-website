import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Een rustpunt tussen Verwelkoming en Werkwijze: een gecentreerd citaat, groot
 * gezet in de serif, met een zachte brass-gloed erachter en een kort brass-
 * streepje als accent. Bewust neutraal — geen muzikale verwijzingen.
 */
export function Intermezzo({ c }: { c: Content }) {
  const i = c.intermezzo;
  return (
    <section
      aria-label={i.quote}
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
          <div
            aria-hidden
            style={{ width: 40, height: 1, background: "var(--brass)", opacity: 0.7, margin: "0 auto" }}
          />
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
