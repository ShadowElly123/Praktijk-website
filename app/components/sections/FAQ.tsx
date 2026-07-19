import type { Content } from "../../lib/locale";
import { safeJsonLd } from "../../lib/jsonld";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";

/**
 * Veelgestelde vragen — een rustige, gestapelde lijst van native `<details>`-
 * elementen: uitklapbaar zonder JavaScript, en de tekst blijft in de DOM
 * aanwezig (goed voor crawlers en `Ctrl+F`) ook als het dichtgeklapt is.
 * Zelfde haarlijn-dividers als de Praktisch-sectie, brass-plus/min als
 * open/dicht-indicator i.p.v. een los icoon-lettertype.
 */
export function FAQ({ c }: { c: Content }) {
  const f = c.faq;

  // FAQPage-schema: dezelfde vraag/antwoord-content als hierboven, zodat
  // Google een rich snippet kan tonen. Geen extra feiten, puur een
  // machineleesbare spiegel van de zichtbare tekst.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      aria-label={f.label}
      data-section="faq"
      className="sec-x"
      style={{
        position: "relative",
        paddingTop: "14vh",
        paddingBottom: "14vh",
        background: "var(--bg)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />
      {/* Zachte brass-gloed links die boven de sectiegrens uitsteekt en de
          overgang vanuit Praktisch verzacht — spiegelbeeld van de spotlight
          rechts bovenaan Praktisch. Geen overflow:hidden op de sectie, dus
          de gloed bloedt over de grens heen. */}
      <div
        aria-hidden
        className="spotlight"
        style={{ width: 560, height: 560, left: "4vw", top: -220 }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 48 }}>
          <SectionKicker as="h2" label={f.label} />
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            {f.items.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">
                  <span>{item.q}</span>
                  <span aria-hidden className="faq-toggle" />
                </summary>
                {/* faq-answer-wrap is de grid-track die van 0fr naar 1fr animeert
                    bij open/dicht; faq-answer zelf clipt (overflow:hidden) en
                    faded lichtjes mee, voor een zachte in plaats van abrupte
                    uitklap — puur CSS, geen JavaScript nodig. */}
                <div className="faq-answer-wrap">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
