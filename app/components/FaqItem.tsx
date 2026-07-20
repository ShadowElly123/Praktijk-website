"use client";

import { useEffect, useRef } from "react";

/**
 * Eén FAQ-accordion-item.
 *
 * CSS-transities die rechtstreeks op het `[open]`-attribuut van een native
 * <details> inhaken, blijken niet betrouwbaar te animeren: de browser lijkt
 * de attribuut- en stijlwijziging van zijn eigen toggle intern samen te
 * voegen, waardoor de transitie meteen naar de eindstaat springt in plaats
 * van te lopen (bevestigd door te testen: exact dezelfde CSS, maar via een
 * gewone klasse aangestuurd, animeert wél vloeiend in beide richtingen).
 *
 * Daarom sturen we de visuele open/dicht-staat volledig via een eigen
 * `.is-open`-klasse i.p.v. de `[open]`-attribuutselector, en houden we bij
 * het sluiten het `open`-attribuut zelf nog even aan tot de transitie is
 * afgelopen — anders verdwijnt de inhoud meteen uit de toegankelijkheidsboom
 * (native <details>-gedrag), nog vóór de animatie kan spelen.
 */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // De allereerste keer dat een item wordt geopend (vlak na page load)
  // sprong de transitie meteen naar de eindstaat i.p.v. te animeren, terwijl
  // elke volgende keer wél vloeiend liep — een bekend "cold render"-effect:
  // de browser heeft dit element nog nooit echt hoeven te layouten. Eén
  // read-only reflow-forcering bij mount (offsetHeight lezen) is genoeg om
  // de eerste échte open-transitie er hetzelfde uit te laten zien als de rest.
  useEffect(() => {
    void wrapRef.current?.offsetHeight;
  }, []);

  function handleSummaryClick(e: React.MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const wrap = wrapRef.current;
    if (!details || !wrap) return;
    e.preventDefault();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!details.open) {
      // Openen: attribuut meteen zetten (toegankelijkheid, crawlers), de
      // klasse stuurt de zichtbare animatie aan.
      details.open = true;
      details.classList.add("is-open");
      return;
    }

    if (reduced) {
      details.classList.remove("is-open");
      details.open = false;
      return;
    }

    // Sluiten: eerst de animatie terugspelen, `open` pas verwijderen als de
    // transitie echt is afgelopen.
    details.classList.remove("is-open");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      details.open = false;
      wrap.removeEventListener("transitionend", onEnd);
      clearTimeout(fallback);
    };
    const onEnd = (ev: TransitionEvent) => {
      if (ev.target === wrap) finish();
    };
    // Veiligheidsnet: mocht transitionend om welke reden dan ook niet
    // vuren, blijft het item anders voorgoed "open" hangen.
    const fallback = window.setTimeout(finish, 700);
    wrap.addEventListener("transitionend", onEnd);
  }

  return (
    <details ref={detailsRef} className="faq-item">
      <summary className="faq-question" onClick={handleSummaryClick}>
        <span>{q}</span>
        <span aria-hidden className="faq-toggle" />
      </summary>
      <div ref={wrapRef} className="faq-answer-wrap">
        <p className="faq-answer">{a}</p>
      </div>
    </details>
  );
}
