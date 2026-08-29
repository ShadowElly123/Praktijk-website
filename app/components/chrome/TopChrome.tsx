"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "../../lib/locale";
import { Editable } from "../review/Editable";

/**
 * Sticky topbalk: links de naam, rechts een contactknop en de NL/EN-taalpil.
 * De pil is een paar `<Link>`s die de huidige subroute behouden en enkel de
 * locale wisselen. Stijl exact uit de goedgekeurde Claude Design (glazen pil,
 * brass-fill actief); de contactknop is diens broertje in omtreklijn, zodat
 * twee brass-vlakken niet naast elkaar om aandacht vechten.
 */
export function TopChrome({ name, contactLabel }: { name: string; contactLabel: string }) {
  const pathname = usePathname();
  // Strip de leidende locale zodat de subroute (bv. /privacy) behouden blijft.
  const rest = pathname.replace(/^\/(nl|en)(?=\/|$)/, "");
  const current = (pathname.match(/^\/(nl|en)(?=\/|$)/)?.[1] ?? "nl") as Locale;

  // Op de homepage volstaat een fragment-link: het scrollen zelf komt van
  // `scroll-behavior: smooth` op <html>, dat bij reduced-motion automatisch
  // uitvalt. Elders (bv. /privacy) bestaat #contact niet, dus verwijst de knop
  // naar de homepage mét fragment i.p.v. niets te doen.
  const contactHref = rest === "" ? "#contact" : `/${current}#contact`;

  return (
    <div
      className="top-chrome"
      style={{
        position: "sticky",
        top: 0,
        marginBottom: -84,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* De naam is een link naar de eigen homepage. Bezoekers klikken erop
          (terug te zien in de metingen als een dead click op dit element) —
          een sitenaam linksboven leest nu eenmaal als "terug naar start".
          Vanaf /privacy navigeert de link echt.

          Op de homepage zelf is een link naar de route waar je al bent een
          no-op: Next navigeert dan niet en scrollt ook niet. Daar dus zelf
          naar boven scrollen. Het scrollen komt van `scroll-behavior: smooth`
          op <html> (valt bij reduced-motion automatisch weg) — zelfde
          werkwijze als de contactknop hiernaast. */}
      <Link
        href={`/${current}`}
        className="top-chrome__name"
        onClick={(e) => {
          if (rest !== "") return;
          e.preventDefault();
          window.scrollTo({ top: 0 });
        }}
      >
        <Editable path="site.name" stopClickPropagation>
          {name}
        </Editable>
      </Link>

      <div className="top-chrome__actions">
        <a href={contactHref} className="contact-cta">
          <Editable path="site.contactCta" stopClickPropagation>
            {contactLabel}
          </Editable>
        </a>

        <nav
          aria-label="Taal / Language"
          style={{
            display: "flex",
            alignItems: "stretch",
            border: "1px solid var(--line-4)",
            borderRadius: 999,
            overflow: "hidden",
            background: "rgba(20,18,16,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          {LOCALES.map((l) => {
            const active = l === current;
            return (
              <Link
                key={l}
                href={`/${l}${rest}`}
                hrefLang={l}
                aria-current={active ? "true" : undefined}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  padding: "7px 14px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  background: active ? "var(--brass)" : "transparent",
                  color: active ? "var(--bg)" : "var(--mono-1)",
                  transition: "background .4s, color .4s",
                }}
              >
                {l}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
