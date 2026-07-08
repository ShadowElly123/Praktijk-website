/**
 * PraktijkKaart — een zelfgetekende, gestileerde kaart van de buurt rond de
 * praktijk, in exact de clair-obscur-taal van de site. Geen externe tiles,
 * geen tracking: puur SVG met brass-op-donker. Evoceert de omgeving
 * (Boekentoren, Sint-Pietersplein, de Schelde, Overpoort) zonder GPS-precisie
 * te claimen. Alle kleuren komen uit de CSS-tokens zodat de kaart meekleurt.
 *
 * Schaalt responsief via `viewBox` + `width:100%`; labels in JetBrains Mono.
 */
export function PraktijkKaart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="pk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,166,131,0.30)" />
          <stop offset="55%" stopColor="rgba(194,166,131,0.06)" />
          <stop offset="100%" stopColor="rgba(194,166,131,0)" />
        </radialGradient>
        <linearGradient id="pk-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(120,140,165,0.12)" />
          <stop offset="100%" stopColor="rgba(120,140,165,0.03)" />
        </linearGradient>
        <linearGradient id="pk-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,13,12,0)" />
          <stop offset="100%" stopColor="rgba(14,13,12,0.55)" />
        </linearGradient>
      </defs>

      {/* basis */}
      <rect x="0" y="0" width="1200" height="600" fill="var(--bg)" />

      {/* warm licht rond de praktijk */}
      <rect x="360" y="80" width="520" height="440" fill="url(#pk-glow)" />

      {/* de Schelde als donker lint langs de rechterkant */}
      <path
        d="M1040 -20 C 1010 150, 1110 300, 1030 620 L 1220 620 L 1220 -20 Z"
        fill="url(#pk-water)"
      />
      <text
        x="1105"
        y="300"
        transform="rotate(90 1105 300)"
        textAnchor="middle"
        className="map-street"
        fill="rgba(150,168,190,0.55)"
      >
        Muinkschelde
      </text>

      {/* bouwblokken: heel zacht, als vulling tussen de straten */}
      <g fill="rgba(194,166,131,0.045)">
        <path d="M150 140 L 430 170 L 410 330 L 175 305 Z" />
        <path d="M700 110 L 960 140 L 940 280 L 690 255 Z" />
        <path d="M210 360 L 470 385 L 450 520 L 205 495 Z" />
        <path d="M690 330 L 930 355 L 1000 510 L 720 520 Z" />
      </g>

      {/* straten: dunne brass-haarlijnen */}
      <g stroke="var(--brass)" fill="none" strokeLinecap="round">
        {/* Sint-Pietersnieuwstraat — de hoofdader door de pin */}
        <path d="M600 -20 C 580 130, 640 320, 600 620" strokeWidth="2.6" strokeOpacity="0.6" />
        {/* Overpoortstraat, aftakking naar de studentenbuurt */}
        <path d="M622 360 C 730 400, 840 450, 1000 560" strokeWidth="2" strokeOpacity="0.42" />
        {/* Rozier, richting Boekentoren */}
        <path d="M205 230 C 320 265, 420 268, 545 300" strokeWidth="2" strokeOpacity="0.42" />
        {/* secundaire straten, textuur */}
        <path d="M40 160 C 280 190, 520 168, 800 120" strokeWidth="1.3" strokeOpacity="0.2" />
        <path d="M40 330 C 250 345, 430 348, 590 330" strokeWidth="1.3" strokeOpacity="0.2" />
        <path d="M820 -20 C 840 170, 800 360, 900 620" strokeWidth="1.3" strokeOpacity="0.2" />
      </g>

      {/* straatlabels */}
      <text x="352" y="286" transform="rotate(11 352 286)" className="map-street" fill="var(--mono-2)">
        Rozier
      </text>
      <text x="800" y="470" transform="rotate(26 800 470)" className="map-street" fill="var(--mono-2)">
        Overpoort
      </text>
      <text x="628" y="120" transform="rotate(82 628 120)" className="map-street" fill="var(--mono-2)">
        Sint-Pietersnieuwstraat
      </text>

      {/* Boekentoren — het ijkpunt, vlak naast de praktijk */}
      <g>
        <rect x="454" y="150" width="24" height="120" fill="rgba(194,166,131,0.16)" stroke="var(--brass)" strokeOpacity="0.55" strokeWidth="1.3" />
        <rect x="448" y="140" width="36" height="12" fill="var(--brass)" fillOpacity="0.55" />
        <text x="466" y="296" textAnchor="middle" className="map-label" fill="var(--muted)">
          Boekentoren
        </text>
      </g>

      {/* Sint-Pietersplein + abdij, ten zuiden */}
      <g>
        <rect x="520" y="420" width="90" height="54" fill="none" stroke="var(--brass)" strokeOpacity="0.3" strokeWidth="1.2" />
        <text x="565" y="500" textAnchor="middle" className="map-street" fill="var(--mono-2)">
          Sint-Pietersplein
        </text>
        <text x="565" y="518" textAnchor="middle" className="map-street" fill="var(--mono-3)">
          &amp; abdij
        </text>
      </g>

      {/* Blandijnberg, subtiel, ten westen */}
      <text x="245" y="430" textAnchor="middle" className="map-street" fill="var(--mono-3)">
        Blandijnberg
      </text>

      {/* kompas */}
      <g transform="translate(1120 70)" fill="var(--mono-2)">
        <path d="M0 -14 L 5 4 L 0 -1 L -5 4 Z" fill="var(--brass)" fillOpacity="0.7" />
        <text x="0" y="24" textAnchor="middle" className="map-street" fill="var(--mono-2)">
          N
        </text>
      </g>

      {/* de pin: de praktijk, het brandpunt */}
      <g>
        <circle cx="600" cy="250" r="30" fill="none" stroke="var(--brass)" strokeWidth="1" style={{ transformOrigin: "600px 250px", animation: "mapPulse 3.2s ease-in-out infinite" }} />
        <circle cx="600" cy="250" r="15" fill="none" stroke="var(--brass)" strokeWidth="1.6" />
        <circle cx="600" cy="250" r="7" fill="var(--brass)" />
        <text x="600" y="312" textAnchor="middle" className="map-pin-kicker" fill="var(--brass)">
          De praktijk
        </text>
        <text x="600" y="338" textAnchor="middle" className="map-pin-addr" fill="var(--text)">
          Sint-Pietersnieuwstraat 97
        </text>
      </g>

      {/* onderrand-vignette voor diepte */}
      <rect x="0" y="0" width="1200" height="600" fill="url(#pk-vignette)" pointerEvents="none" />
    </svg>
  );
}
