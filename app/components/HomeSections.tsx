import type { Content, Locale } from "../lib/locale";
import { Hero } from "./sections/Hero";
import { Verwelkoming } from "./sections/Verwelkoming";
import { Intermezzo } from "./sections/Intermezzo";
import { Werkwijze } from "./sections/Werkwijze";
import { OverMij } from "./sections/OverMij";
import { Praktisch } from "./sections/Praktisch";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";
import { SiteFooter } from "./sections/SiteFooter";

/**
 * De volledige sectie-opbouw van de homepage, op één plek gedeeld tussen de
 * echte site (app/[lang]/page.tsx) en de bewerkbare preview
 * (app/[lang]/preview-edit/page.tsx) — zodat die twee nooit uit elkaar
 * kunnen groeien als de sectievolgorde ooit verandert.
 */
export function HomeSections({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <>
      <Hero c={c} />
      {/* Gedeelde achtergrond-laag: zie toelichting in de oorspronkelijke
          page.tsx voor waarom Verwelkoming/Intermezzo/Werkwijze samen in
          één transparante wrapper zitten (intermezzo-spotlight loopt over
          sectiegrenzen heen). */}
      <div style={{ position: "relative", zIndex: 0, background: "var(--bg)" }}>
        <Verwelkoming c={c} />
        <Intermezzo c={c} />
        <Werkwijze c={c} />
      </div>
      <OverMij c={c} />
      <Praktisch c={c} />
      <FAQ c={c} />
      <Contact c={c} />
      <SiteFooter c={c} lang={lang} />
    </>
  );
}
