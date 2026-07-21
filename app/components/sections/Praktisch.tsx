import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";
import { PraktijkKaart } from "../map/PraktijkKaart";

/**
 * Praktisch & contact — rustig opgebouwd: kop, dan de kaart (volle breedte) met
 * een "Route"-knop, daaronder de praktische info als nette dl-lijst, en
 * daaronder het crisis-kader (gestapeld, niet ernaast — dat oogde te veel als
 * een gelijke keuze naast de rest). Het contactformulier staat in een aparte
 * sectie (Contact.tsx).
 */
export function Praktisch({ c }: { c: Content }) {
  const p = c.praktisch;
  const l = c.locatie;
  const crisis = c.crisis;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.adres)}`;

  const rows: { label: string; value: string; note?: string; tabular?: boolean }[] = [
    { label: l.praktijkLabel, value: l.adres, note: l.caption },
    { label: p.talenLabel, value: p.talenValue },
    { label: p.vormLabel, value: p.vormValue },
    { label: p.tariefLabel, value: p.tariefValue },
    { label: p.terugbetalingLabel, value: p.terugbetalingValue },
    { label: p.betalingLabel, value: p.betalingValue, note: p.betalingNote, tabular: true },
  ];

  return (
    <section
      aria-label={p.label}
      data-section="praktisch"
      className="sec-x"
      style={{
        position: "relative",
        paddingTop: "16vh",
        paddingBottom: "12vh",
        // Geen harde kleursprong t.o.v. Over mij (--bg) en Contact (--bg):
        // de alt-tint vloeit er aan beide randen organisch in en uit.
        background:
          "linear-gradient(to bottom, var(--bg) 0%, var(--bg-alt) 26%, var(--bg-alt) 78%, var(--bg) 100%)",
      }}
    >
      {/* Zachte brass-gloed die boven de sectiegrens uitsteekt en zo de
          overgang vanuit Over mij verzacht — zelfde taal als de spotlights
          in Werkwijze en Intermezzo. Geen overflow:hidden op de sectie,
          dus de gloed bloedt over de grens heen. */}
      <div
        aria-hidden
        className="spotlight"
        style={{ width: 560, height: 560, right: "6vw", top: -220 }}
      />

      <Reveal style={{ marginBottom: 48, position: "relative", zIndex: 1 }}>
        <SectionKicker as="h2" label={p.label} />
      </Reveal>

      {/* Kaart — volle breedte, bovenaan, gecentreerd */}
      <Reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          role="img"
          aria-label={l.mapAria}
          style={{
            position: "relative",
            border: "1px solid var(--line-4)",
            background: "var(--bg)",
            overflow: "hidden",
          }}
        >
          <PraktijkKaart pinLabel={l.mapPin} />
          <span className="map-corner" style={{ top: 14, left: 14, borderWidth: "1px 0 0 1px" }} />
          <span className="map-corner" style={{ top: 14, right: 14, borderWidth: "1px 1px 0 0" }} />
          <span className="map-corner" style={{ bottom: 14, left: 14, borderWidth: "0 0 1px 1px" }} />
          <span className="map-corner" style={{ bottom: 14, right: 14, borderWidth: "0 1px 1px 0" }} />
        </div>

        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 24px" }}>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="route-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid var(--brass)",
              color: "var(--brass)",
              padding: "10px 22px",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {l.routeLabel}
            {/* U+FE0E dwingt tekst-weergave af — iOS rendert ↗ anders als emoji */}
            <span aria-hidden>{"↗︎"}</span>
          </a>
          <span
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--mono-1)",
            }}
          >
            {l.routeNote}
          </span>
        </div>
      </Reveal>

      {/* Praktische info, daaronder crisis — gestapeld, kalm */}
      <div style={{ marginTop: "8vh", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
        <Reveal>
          <dl style={{ display: "flex", flexDirection: "column", margin: 0 }}>
            {/* GSM als eerste rij met tel-link + microcopy als note */}
            <div className="info-row">
              <dt className="info-label">{p.gsmLabel}</dt>
              <dd style={{ margin: 0 }}>
                <a
                  href={p.gsmHref}
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "var(--text)",
                    textDecoration: "none",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.gsm}
                </a>
                <span
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontFamily: "var(--font-serif), serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--mono-1)",
                  }}
                >
                  {p.microcopy}
                </span>
              </dd>
            </div>

            {rows.map((row) => (
              <div key={row.label} className="info-row">
                <dt className="info-label">{row.label}</dt>
                <dd style={{ margin: 0 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "var(--text)",
                    }}
                  >
                    {row.value}
                  </span>
                  {row.note && (
                    <span
                      style={{
                        display: "block",
                        marginTop: 4,
                        fontFamily: "var(--font-serif), serif",
                        fontStyle: "italic",
                        fontSize: 14,
                        color: "var(--mono-1)",
                        fontVariantNumeric: row.tabular ? "tabular-nums" : undefined,
                      }}
                    >
                      {row.note}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Crisis */}
        <Reveal delay={0.1} style={{ marginTop: 40 }}>
          <div style={{ border: "1px solid var(--line-3)", padding: 28 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brass)",
              }}
            >
              {crisis.title}
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontFamily: "var(--font-serif), serif",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {crisis.intro}
            </p>
            <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {crisis.items.map((item) => (
                <li key={item.label} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 15, color: "var(--text)" }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 15,
                      letterSpacing: "0.04em",
                      color: "var(--brass)",
                      textDecoration: "none",
                    }}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
