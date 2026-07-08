"use client";

import { useLang } from "../lib/LanguageProvider";

/**
 * Zelfgetekende, gestileerde kaart in de clair-obscur stijl.
 * Geen externe tiles, geen tracking: puur SVG met de brass-op-donker taal.
 * Evoceert de buurt rond Sint-Pietersnieuwstraat (Boekentoren, Schelde,
 * studentenbuurt) zonder GPS-precisie te claimen. De 'Route'-knop reikt
 * door naar de kaart-app van de bezoeker (uitgaande link, laadt niets zelf).
 *
 * Compositie is gecentreerd rond de pin (x=600), zodat een portret-crop op
 * mobiel de pin + adres centraal houdt. Kaderhoeken en kompas staan als
 * HTML-overlay, zodat ze altijd op de panelhoeken zitten (ook bij crop).
 */
export function LocatieKaart() {
  const { t } = useLang();
  const k = t.praktisch.kaart;

  return (
    <div>
      <div
        className="placeholder-film relative aspect-[4/5] w-full overflow-hidden sm:aspect-[12/5]"
        style={{ borderRadius: 2 }}
      >
        <svg
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`${k.pin}: ${k.pinAddress}, Gent — ${k.landmark}`}
        >
          <defs>
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(194,166,131,0.34)" />
              <stop offset="60%" stopColor="rgba(194,166,131,0.06)" />
              <stop offset="100%" stopColor="rgba(194,166,131,0)" />
            </radialGradient>
            <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(120,140,165,0.10)" />
              <stop offset="100%" stopColor="rgba(120,140,165,0.03)" />
            </linearGradient>
          </defs>

          {/* warm licht dat de locatie 'oplicht' */}
          <rect x="440" y="40" width="440" height="440" fill="url(#pinGlow)" />

          {/* water: de Schelde langs de rechterkant */}
          <path
            d="M1060 -10 C 1030 130, 1120 260, 1050 510 L 1210 510 L 1210 -10 Z"
            fill="url(#water)"
          />
          <text
            x="1120"
            y="250"
            transform="rotate(90 1120 250)"
            textAnchor="middle"
            className="map-label"
            fill="rgba(150,168,190,0.5)"
          >
            {k.water}
          </text>

          {/* bouwblokken: heel zacht, als vulling tussen de straten */}
          <g fill="rgba(194,166,131,0.045)">
            <path d="M200 120 L 460 150 L 440 300 L 230 280 Z" />
            <path d="M680 90 L 940 120 L 920 250 L 670 230 Z" />
            <path d="M240 320 L 480 340 L 460 470 L 230 450 Z" />
            <path d="M680 300 L 920 320 L 980 460 L 690 460 Z" />
          </g>

          {/* straten: dunne brass-haarlijnen */}
          <g stroke="var(--brass)" fill="none" strokeLinecap="round">
            {/* Sint-Pietersnieuwstraat, hoofdader (door de pin) */}
            <path
              d="M600 -10 C 580 150, 640 320, 600 510"
              strokeWidth="2.4"
              strokeOpacity="0.55"
            />
            {/* Overpoortstraat, aftakking */}
            <path
              d="M625 350 C 740 380, 860 420, 1010 500"
              strokeWidth="1.8"
              strokeOpacity="0.4"
            />
            {/* Rozier, richting Boekentoren */}
            <path
              d="M230 210 C 330 250, 430 255, 550 300"
              strokeWidth="1.8"
              strokeOpacity="0.4"
            />
            {/* secundaire straten, textuur */}
            <path d="M70 140 C 280 170, 500 150, 780 110" strokeWidth="1.2" strokeOpacity="0.2" />
            <path d="M70 300 C 260 315, 440 320, 600 300" strokeWidth="1.2" strokeOpacity="0.2" />
            <path d="M840 -10 C 860 160, 820 340, 920 510" strokeWidth="1.2" strokeOpacity="0.2" />
          </g>

          {/* straatlabels (de hoofdstraat staat al in het pin-adres) */}
          <text x="780" y="405" transform="rotate(24 780 405)" className="map-street" fill="var(--brass-deep)">
            {k.streets.overpoort}
          </text>
          <text x="330" y="238" transform="rotate(11 330 238)" className="map-street" fill="var(--brass-deep)">
            {k.streets.rozier}
          </text>

          {/* Boekentoren: het herkenningspunt */}
          <g>
            <rect x="369" y="150" width="22" height="150" fill="rgba(194,166,131,0.16)" stroke="var(--brass)" strokeOpacity="0.5" strokeWidth="1.2" />
            <rect x="364" y="142" width="32" height="10" fill="var(--brass)" fillOpacity="0.5" />
            <line x1="380" y1="150" x2="380" y2="300" stroke="var(--brass)" strokeOpacity="0.3" strokeWidth="1" />
            <text x="380" y="325" textAnchor="middle" className="map-landmark" fill="var(--text-dim)">
              {k.landmark}
            </text>
          </g>

          {/* de pin: praktijk, met label eronder (gecentreerd) */}
          <g>
            <circle cx="600" cy="235" r="26" fill="none" stroke="var(--brass)" strokeWidth="1" className="map-pin-ring" />
            <circle cx="600" cy="235" r="7" fill="var(--brass)" />
            <circle cx="600" cy="235" r="13" fill="none" stroke="var(--brass)" strokeWidth="1.4" />
            <text x="600" y="290" textAnchor="middle" className="map-pin-kicker" fill="var(--brass)">
              {k.pin.toUpperCase()}
            </text>
            <text x="600" y="314" textAnchor="middle" className="map-pin-addr" fill="var(--text)">
              {k.pinAddress}
            </text>
          </g>
        </svg>

        {/* kaderhoeken (overlay, altijd op de panelhoeken) */}
        <span aria-hidden className="map-corner" style={{ top: 14, left: 14, borderWidth: "1px 0 0 1px" }} />
        <span aria-hidden className="map-corner" style={{ top: 14, right: 14, borderWidth: "1px 1px 0 0" }} />
        <span aria-hidden className="map-corner" style={{ bottom: 14, left: 14, borderWidth: "0 0 1px 1px" }} />
        <span aria-hidden className="map-corner" style={{ bottom: 14, right: 14, borderWidth: "0 1px 1px 0" }} />

        {/* kompas (overlay, rechtsboven) */}
        <div aria-hidden className="absolute right-5 top-4 flex flex-col items-center gap-1">
          <span
            className="block"
            style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: "8px solid var(--brass)" }}
          />
          <span className="block h-4 w-px" style={{ background: "var(--text-faint)" }} />
          <span className="font-display" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--text-faint)" }}>
            N
          </span>
        </div>
      </div>

      {/* Route-knop + note */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href={k.routeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border px-6 py-3 font-display text-[0.78rem] uppercase tracking-[0.2em] transition-all duration-500"
          style={{ borderColor: "var(--brass)", color: "var(--brass)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--brass)";
            e.currentTarget.style.color = "#14110d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--brass)";
          }}
        >
          {k.routeLabel}
          <span aria-hidden>↗</span>
        </a>
        <span className="font-serif italic text-[0.85rem]" style={{ color: "var(--text-faint)" }}>
          {k.routeNote}
        </span>
      </div>
    </div>
  );
}
