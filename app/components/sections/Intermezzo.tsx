import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Een rustpunt tussen Verwelkoming en Werkwijze: een gecentreerd citaat, groot
 * gezet in de serif. Er is geen scheidingslijn en de brass-gloed (spotlight,
 * zIndex -1) loopt bewust over de sectiegrenzen heen door — de aangrenzende
 * secties zijn transparant en delen één achtergrond-laag (zie page.tsx) — zodat
 * het intermezzo naadloos in de buren vervloeit i.p.v. als los blok op te vallen.
 */
export function Intermezzo({ c }: { c: Content }) {
  const i = c.intermezzo;
  return (
    <section
      aria-label={i.quote}
      data-section="intermezzo"
      style={{
        position: "relative",
        // Geen overflow:hidden en geen eigen achtergrond: de spotlight (zIndex -1)
        // mag zo over de sectiegrenzen heen doorlopen, tegen de gedeelde
        // achtergrond-laag van de wrapper in page.tsx.
        // Asymmetrisch (minder boven, meer onder, zelfde totaal): schuift het
        // citaat wat omhoog zodat het visueel in het midden valt tussen de
        // Verwelkoming-tekst erboven en de foto van Werkwijze eronder.
        paddingTop: "8vh",
        paddingBottom: "20vh",
        paddingLeft: 40,
        paddingRight: 40,
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
          // Verschuiving compenseert de asymmetrische padding hierboven, zodat de
          // gloed achter het citaat blijft meebewegen.
          top: "calc(50% - 6vh)",
          transform: "translate(-50%, -50%)",
          // Achter de content én achter de aangrenzende (transparante) secties,
          // zodat de gloed ongestoord over de sectiegrenzen heen doorloopt.
          zIndex: -1,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div
            aria-hidden
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: 64,
              lineHeight: 1,
              color: "var(--brass)",
              opacity: 0.7,
            }}
          >
            &ldquo;
          </div>
          <blockquote
            style={{
              margin: "8px 0 0",
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
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
