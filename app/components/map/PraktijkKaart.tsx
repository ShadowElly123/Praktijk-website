/**
 * PraktijkKaart — een zelfgetekende, gestileerde kaart van de buurt rond de
 * praktijk, exact naar het door Lucas' opdrachtgever aangeleverde ontwerp
 * ("kaartje v2"): dunne brass-straten op donker, de Boekentoren-plattegrond,
 * de Muinkschelde als donker lint met de Muinkkaai, campuslabels met
 * vierpuntige sterretjes, en het brandpunt: het praktijkpand in amber naast
 * zijn grijze buur, met een salmon looproute-pijl naar de ingang.
 *
 * Dynamisch t.o.v. het statische ontwerp:
 * - de warme gloed rond de praktijk "ademt" traag (mapGlowBreathe);
 * - de pijl tekent zichzelf in een cyclus, houdt vast en vervaagt weer
 *   (mapRouteDraw/mapArrowHead) — zelfde ritme-idee als de scroll-streep.
 *
 * Geen externe tiles, geen tracking: puur SVG. Kleuren komen waar mogelijk
 * uit de CSS-tokens; alles komt uit de CSS-tokens: brass als enige accent
 * (pand, labels, sterren), token-grijs voor het buurpand en off-white (--title)
 * voor de looproute-pijl, zodat die helder leesbaar blijft op donker.
 */
export function PraktijkKaart({
  className,
  pinLabel,
}: {
  className?: string;
  pinLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 1663 944"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="kaart-glow-lg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,166,131,0.11)" />
          <stop offset="55%" stopColor="rgba(194,166,131,0.05)" />
          <stop offset="100%" stopColor="rgba(194,166,131,0)" />
        </radialGradient>
        <radialGradient id="kaart-glow-md" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,166,131,0.16)" />
          <stop offset="100%" stopColor="rgba(194,166,131,0)" />
        </radialGradient>
        <radialGradient id="kaart-glow-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,166,131,0.24)" />
          <stop offset="100%" stopColor="rgba(194,166,131,0)" />
        </radialGradient>
        <linearGradient id="kaart-water" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="rgba(120,140,160,0.10)" />
          <stop offset="100%" stopColor="rgba(120,140,160,0.04)" />
        </linearGradient>
        <radialGradient id="kaart-vignette" cx="49%" cy="50%" r="72%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="62%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.42)" />
        </radialGradient>
      </defs>

      {/* basis */}
      <rect x="0" y="0" width="1663" height="944" fill="var(--bg)" />

      {/* de Muinkschelde: donker lint rechts, met heel zachte oeverlijnen */}
      <path
        d="M1447 0 C 1360 260, 1255 560, 1082 944 L 1268 944 C 1420 600, 1520 280, 1617 0 Z"
        fill="url(#kaart-water)"
      />
      <g stroke="rgba(150,168,190,0.14)" strokeWidth="1.4" fill="none">
        <path d="M1447 0 C 1360 260, 1255 560, 1082 944" />
        <path d="M1617 0 C 1520 280, 1420 600, 1268 944" />
      </g>

      {/* warme gloed rond de praktijk — ademt traag */}
      <g
        style={{
          transformOrigin: "812px 470px",
          animation: "mapGlowBreathe 7s ease-in-out infinite",
        }}
      >
        <ellipse cx="812" cy="470" rx="560" ry="430" fill="url(#kaart-glow-lg)" />
        <ellipse cx="815" cy="470" rx="235" ry="195" fill="url(#kaart-glow-md)" />
        <ellipse cx="815" cy="468" rx="100" ry="84" fill="url(#kaart-glow-core)" />
      </g>

      {/* straten: dunne brass-haarlijnen */}
      <g stroke="var(--brass)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Hoveniersberg (west) met knik naar de bovenrand */}
        <path d="M0 302 L 573 158 L 597 0" strokeWidth="1.8" strokeOpacity="0.5" />
        {/* Sint-Pietersnieuwstraat — de hoofdader */}
        <path d="M758 0 C 752 240, 742 430, 703 944" strokeWidth="2.2" strokeOpacity="0.62" />
        {/* Hoveniersberg (oost), met knik richting de kaai */}
        <path d="M752 296 L 1032 320 L 1258 372" strokeWidth="1.8" strokeOpacity="0.5" />
        {/* aanloop vanuit de bovenrand naar de Hoveniersberg-knik */}
        <path d="M1105 0 L 1032 320" strokeWidth="1.4" strokeOpacity="0.22" />
        {/* Rozier, met knik en zijstraat naar linksonder */}
        <path d="M0 588 L 295 640 L 722 708" strokeWidth="1.8" strokeOpacity="0.5" />
        <path d="M295 640 L 135 944" strokeWidth="1.4" strokeOpacity="0.32" />
        {/* Blandijnberg — steekt als brug de Muinkschelde over en loopt door
            tot de rechterrand; het faculteitssterretje ligt er net onder */}
        <path d="M718 726 L 1046 820 L 1235 812 L 1663 786" strokeWidth="1.8" strokeOpacity="0.5" />
        {/* Muinkkaai, mee met de rivier */}
        <path d="M1262 372 C 1210 540, 1140 750, 1058 944" strokeWidth="1.8" strokeOpacity="0.5" />
      </g>

      {/* straatlabels */}
      <g fill="var(--mono-1)">
        <text
          x="350"
          y="205"
          textAnchor="middle"
          transform="rotate(-13.5 350 205)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Hoveniersberg
        </text>
        <text
          x="922"
          y="298"
          textAnchor="middle"
          transform="rotate(4.5 922 298)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Hoveniersberg
        </text>
        <text
          x="716"
          y="460"
          textAnchor="middle"
          transform="rotate(-90 716 460)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Sint-Pietersnieuwstraat
        </text>
        <text
          x="465"
          y="648"
          textAnchor="middle"
          transform="rotate(9 465 648)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Rozier
        </text>
        <text
          x="882"
          y="766"
          textAnchor="middle"
          transform="rotate(16 882 766)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Blandijnberg
        </text>
        <text
          x="1168"
          y="578"
          textAnchor="middle"
          transform="rotate(-71 1168 578)"
          className="map-street"
          style={{ fontSize: 15, letterSpacing: "0.22em" }}
        >
          Muinkkaai
        </text>
      </g>

      {/* Boekentoren — plattegrond als haarlijn-contour */}
      <g>
        <path
          d="M597 228 L 658 228 L 658 258 L 663 258 L 663 283 L 610 283 L 610 398 L 657 398 L 657 425 L 515 425 L 515 398 L 577 398 L 577 283 L 520 283 L 520 258 L 597 258 Z"
          fill="rgba(194,166,131,0.05)"
          stroke="var(--brass)"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <text
          x="505"
          y="352"
          textAnchor="end"
          className="map-street"
          fill="var(--mono-1)"
          style={{ fontSize: 16, letterSpacing: "0.22em" }}
        >
          Boekentoren
        </text>
      </g>

      {/* plaatslabels met sterretjes */}
      <g fill="var(--mono-1)">
        <text
          x="1120"
          y="98"
          textAnchor="middle"
          className="map-street"
          style={{ fontSize: 16, letterSpacing: "0.22em" }}
        >
          Universiteit Gent
        </text>
        <path
          d="M0 -7 Q 1.6 -1.6 7 0 Q 1.6 1.6 0 7 Q -1.6 1.6 -7 0 Q -1.6 -1.6 0 -7 Z"
          transform="translate(1120 127)"
          fill="var(--brass)"
          fillOpacity="0.75"
        />
        <text
          x="868"
          y="860"
          textAnchor="middle"
          className="map-street"
          style={{ fontSize: 16, letterSpacing: "0.22em" }}
        >
          Campus Tweekerken
        </text>
        <path
          d="M0 -6 Q 1.4 -1.4 6 0 Q 1.4 1.4 0 6 Q -1.4 1.4 -6 0 Q -1.4 -1.4 0 -6 Z"
          transform="translate(868 888)"
          fill="var(--brass)"
          fillOpacity="0.75"
        />
        <text
          x="1502"
          y="728"
          textAnchor="middle"
          className="map-street"
          style={{ fontSize: 16, letterSpacing: "0.22em" }}
        >
          Faculteit Economie
        </text>
        <text
          x="1502"
          y="752"
          textAnchor="middle"
          className="map-street"
          style={{ fontSize: 16, letterSpacing: "0.22em" }}
        >
          en Bedrijfskunde
        </text>
        <path
          d="M0 -13 Q 2.6 -2.6 13 0 Q 2.6 2.6 0 13 Q -2.6 2.6 -13 0 Q -2.6 -2.6 0 -13 Z"
          transform="translate(1504 822)"
          fill="var(--brass)"
          fillOpacity="0.9"
        />
      </g>

      {/* het brandpunt: praktijkpand (brass) + buurpand in dezelfde donkere
          haarlijn-stijl als de Boekentoren-plattegrond */}
      <g>
        <path
          d="M772 428 L 818 428 L 818 437 L 825 437 L 825 505 L 772 505 Z"
          fill="var(--brass)"
          fillOpacity="0.95"
        />
        <path
          d="M825 437 L 852 437 L 852 425 L 888 425 L 888 447 L 880 447 L 880 515 L 838 515 L 838 505 L 825 505 Z"
          fill="rgba(194,166,131,0.05)"
          stroke="var(--brass)"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />

        {/* looproute naar de ingang: tekent zichzelf in een cyclus */}
        <g stroke="var(--title)" fill="none">
          <path
            d="M742 523 L 806 523 Q 816 523 816 513 L 816 498"
            strokeWidth="4.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ animation: "mapRouteDraw 4.2s cubic-bezier(.4,0,.2,1) infinite" }}
          />
          <path
            d="M816 484 L 825 500 L 807 500 Z"
            fill="var(--title)"
            stroke="none"
            style={{ animation: "mapArrowHead 4.2s cubic-bezier(.4,0,.2,1) infinite" }}
          />
        </g>

        {/* adres + praktijklabel */}
        <text
          x="908"
          y="470"
          className="map-street"
          fill="var(--text)"
          style={{ fontSize: 20, letterSpacing: "0.12em" }}
        >
          Sint-Pietersnieuwstraat 97
        </text>
        <text
          x="908"
          y="500"
          className="map-street"
          fill="var(--brass)"
          style={{ fontSize: 18, letterSpacing: "0.18em" }}
        >
          {pinLabel}
        </text>
      </g>

      {/* rand-vignette voor diepte */}
      <rect x="0" y="0" width="1663" height="944" fill="url(#kaart-vignette)" pointerEvents="none" />
    </svg>
  );
}
