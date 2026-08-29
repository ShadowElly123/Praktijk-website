"use client";

import { useEffect, useRef } from "react";
import { Editable } from "./review/Editable";

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
export function FaqItem({
  q,
  a,
  qPath,
  aPath,
  linkLabel,
  linkHref,
  linkPath,
  items,
  itemsPath,
}: {
  q: string;
  a: string;
  qPath?: string;
  aPath?: string;
  linkLabel?: string;
  linkHref?: string;
  linkPath?: string;
  items?: readonly { label: string; value: string; href: string }[];
  itemsPath?: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // De allereerste keer dat een item wordt geopend (vlak na page load)
  // sprong de transitie meteen naar de eindstaat i.p.v. te animeren, terwijl
  // elke volgende keer wél vloeiend liep — een bekend "cold render"-effect:
  // de browser heeft dit element nog nooit echt hoeven te layouten. Eén
  // read-only reflow-forcering bij mount (offsetHeight lezen) is genoeg om
  // de eerste échte open-transitie er hetzelfde uit te laten zien als de rest.
  //
  // Daarnaast wordt hier de JS-modus pas áángezet. Zolang die uit staat stuurt
  // het native `open`-attribuut de weergave (zie globals.css), zodat een klik
  // die vóór de hydratatie binnenkomt gewoon werkt.
  //
  // Voorheen hing de zichtbare staat volledig aan de `.is-open`-klasse die
  // enkel deze component zet. Een klik vóór hydratatie zette daardoor wél het
  // native `open`-attribuut, maar liet het antwoord dichtgeklapt staan — er
  // gebeurde zichtbaar niets, en een tweede klik sloot het weer. Dat is de
  // meest waarschijnlijke verklaring voor wat de metingen tonen: dead clicks
  // op de FAQ-vragen in élke browser (Chrome op desktop net zo goed als op
  // iOS) plus rageclicks op twee ervan. Het treft trage toestellen het hardst,
  // want daar duurt het hydratatievenster het langst — en het is onzichtbaar
  // bij eigen tests op een snelle machine.
  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    void wrapRef.current?.offsetHeight;
    // Al opengeklikt vóór de hydratatie? Klasse bijtrekken, anders raken het
    // attribuut en de zichtbare staat meteen uit sync.
    if (details.open) details.classList.add("is-open");
    details.classList.add("js-faq");
  }, []);

  function handleSummaryClick(e: React.MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const wrap = wrapRef.current;
    if (!details || !wrap) return;
    e.preventDefault();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ook openen wanneer `open` al aanstaat maar de klasse ontbreekt: dan is
    // het item wel technisch open, maar staat het antwoord dichtgeklapt. Zo'n
    // desync ontstaat als iets buiten deze handler het attribuut zet — de
    // zoeken-op-pagina-functie klapt een <details> vanzelf open. Zonder deze
    // zelfcorrectie zou de klik in de sluit-tak belanden en 700 ms lang niets
    // zichtbaars doen.
    if (!details.open || !details.classList.contains("is-open")) {
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
        <span>
          {qPath ? (
            <Editable path={qPath} stopClickPropagation>
              {q}
            </Editable>
          ) : (
            q
          )}
        </span>
        <span aria-hidden className="faq-toggle" />
      </summary>
      <div ref={wrapRef} className="faq-answer-wrap">
        {/* Eén kind in de grid-wrapper (nodig voor de 0fr/1fr-collapse-truc
            hierboven) — tekst én eventuele link zitten daarom samen in deze
            ene div i.p.v. als losse siblings. */}
        <div className="faq-answer">
          <p style={{ margin: 0 }}>
            {aPath ? (
              <Editable path={aPath} stopClickPropagation>
                {a}
              </Editable>
            ) : (
              a
            )}
          </p>
          {linkLabel && linkHref && (
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-answer-link"
              onClick={(e) => e.stopPropagation()}
            >
              {linkPath ? (
                <Editable path={linkPath} stopClickPropagation>
                  {linkLabel}
                </Editable>
              ) : (
                linkLabel
              )}
            </a>
          )}
          {items && items.length > 0 && (
            <ul className="faq-answer-items">
              {items.map((item, i) => (
                <li key={item.label}>
                  <span>
                    {itemsPath ? (
                      <Editable path={`${itemsPath}[${i}].label`} stopClickPropagation>
                        {item.label}
                      </Editable>
                    ) : (
                      item.label
                    )}
                  </span>
                  <a href={item.href} onClick={(e) => e.stopPropagation()}>
                    {itemsPath ? (
                      <Editable path={`${itemsPath}[${i}].value`} stopClickPropagation>
                        {item.value}
                      </Editable>
                    ) : (
                      item.value
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </details>
  );
}
