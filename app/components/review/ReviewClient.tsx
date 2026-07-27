"use client";

import { useMemo, useState } from "react";
import { content } from "../../lib/content";
import { SectionKicker } from "../SectionKicker";

/* ------------------------------------------------------------------
   Reviewtool voor Lucas: elk tekstblok uit content.ts, in de echte
   typografie/kleuren van de site, direct bewerkbaar. Geen aparte
   ontwerptool nodig — de site zelf ís de preview.

   Werkwijze:
   1. `walk()` loopt de content-boom (NL-vorm, structuur is identiek aan
      EN dankzij de DeepWiden-garantie in lib/locale.ts) en verzamelt elk
      tekst-blaadje als een FieldDef met een leesbaar pad.
   2. Bewerkingen leven in een platte `values`-map (locale:pad → tekst),
      vergeleken met een bevroren `originalValues`-kopie voor de diff.
   3. "Exporteer wijzigingen" downloadt enkel de gewijzigde velden als
      JSON — dat bestand kan Lucas terugsturen om te laten verwerken.
------------------------------------------------------------------- */

type Leaf = string | number;
type FieldDef = {
  path: Leaf[];
  key: string;
  displayPath: string;
  group: string;
  caption: string;
};

// Technische velden overslaan: telefoonlinks e.d. zijn geen proza dat
// Lucas hoeft na te kijken, en per ongeluk wijzigen breekt een link.
function isSkippable(propKey: string) {
  return propKey === "href" || /Href$/.test(propKey);
}

const KEY_LABELS: Record<string, string> = {
  titel: "Titel",
  title: "Titel",
  accent: "Accentregel",
  sub: "Subtekst",
  body: "Tekst",
  quote: "Citaat",
  label: "Label",
  name: "Naam",
  role: "Functie",
  rail: "Zijrail-tekst",
  scroll: "Scroll-hint",
  themesTitle: "Titel (thema's)",
  imageCaption: "Bijschrift foto",
  ervaring: "Ervaring",
  titelsLabel: "Label (titels)",
  titel1: "Titel 1",
  titel1sub: "Titel 1 — toelichting",
  titel2: "Titel 2",
  badge: "Badge",
  registratieLabel: "Label (registratie)",
  talenLabel: "Label (talen)",
  talenValue: "Talen",
  vormLabel: "Label (vorm)",
  vormValue: "Vorm",
  tariefLabel: "Label (tarief)",
  tariefValue: "Tarief",
  terugbetalingLabel: "Label (terugbetaling)",
  terugbetalingValue: "Terugbetaling",
  betalingLabel: "Label (betaling)",
  betalingValue: "Betaling",
  betalingNote: "Betaling — extra (IBAN)",
  microcopy: "Microcopy",
  gsmLabel: "Label (GSM)",
  gsm: "GSM-nummer",
  intro: "Inleiding",
  onderwerp: "Veldlabel — onderwerp",
  toelichting: "Veldlabel — toelichting",
  toelichtingHint: "Hint — toelichting",
  emailLabel: "Veldlabel — e-mail",
  telefoonLabel: "Veldlabel — telefoon",
  beschikbaarheid: "Veldlabel — beschikbaarheid",
  beschikbaarheidHint: "Hint — beschikbaarheid",
  verstuur: "Knoptekst — versturen",
  sending: "Knoptekst — bezig",
  success: "Berichttekst — gelukt",
  error: "Berichttekst — fout",
  requiredMsg: "Foutmelding — verplicht",
  emailMsg: "Foutmelding — e-mail",
  praktijkLabel: "Label (praktijk)",
  adres: "Adres",
  caption: "Bijschrift",
  mapAria: "Kaart — omschrijving (screenreader)",
  mapPin: "Kaart — pin-label",
  routeLabel: "Knoptekst — route",
  routeNote: "Toelichting — route",
  rights: "Rechten",
  legal: "Juridische regel",
  privacy: "Link — privacybeleid",
  draftNote: "Conceptvermelding",
  back: "Link — terug",
  description: "Omschrijving (SEO)",
};

const ITEM_NOUN: Record<string, string> = {
  "faq.items": "Vraag",
  "crisis.items": "Item",
  "privacy.sections": "Sectie",
  "werkwijze.themes": "Thema",
  "overMij.registratie": "Registratie",
};

const GROUP_LABELS: Record<string, string> = {
  meta: "SEO-tekst (niet zichtbaar op de site)",
  site: "Site-basis",
  hero: "Hero",
  verwelkoming: "Verwelkoming",
  intermezzo: "Tussenzin (citaat)",
  werkwijze: "Werkwijze",
  overMij: "Over mij",
  praktisch: "Praktisch & contact",
  faq: "Veelgestelde vragen",
  contact: "Contactsectie",
  form: "Contactformulier (labels)",
  locatie: "Locatie",
  crisis: "Crisis-kader",
  footer: "Footer",
  privacy: "Privacybeleid",
};

function humanize(key: string): string {
  if (KEY_LABELS[key]) return KEY_LABELS[key];
  const spaced = key.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatDisplayPath(path: Leaf[]): string {
  let out = "";
  path.forEach((seg, i) => {
    if (typeof seg === "number") out += `[${seg}]`;
    else out += i === 0 ? seg : `.${seg}`;
  });
  return out;
}

function captionFor(path: Leaf[], group: string): string {
  const last = path[path.length - 1];
  const prev = path[path.length - 2];

  // Element binnen een array van objecten, bv. faq.items[3].q
  if (typeof last === "string" && typeof prev === "number") {
    const arrayKey = String(path[path.length - 3]);
    const noun = ITEM_NOUN[`${group}.${arrayKey}`] ?? "Item";
    return `${noun} ${prev + 1} — ${humanize(last)}`;
  }
  // Element binnen een array van strings, bv. werkwijze.themes[2]
  if (typeof last === "number") {
    const arrayKey = String(prev);
    const noun = ITEM_NOUN[`${group}.${arrayKey}`] ?? humanize(arrayKey);
    return `${noun} ${last + 1}`;
  }
  return humanize(String(last));
}

function walk(node: unknown, path: Leaf[], out: FieldDef[]) {
  if (typeof node === "string") {
    const group = String(path[0]);
    out.push({
      path,
      key: path.join("."),
      displayPath: formatDisplayPath(path),
      group,
      caption: captionFor(path, group),
    });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, [...path, i], out));
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (isSkippable(k)) continue;
      walk(v, [...path, k], out);
    }
  }
}

function getAt(obj: unknown, path: Leaf[]): string {
  let acc: unknown = obj;
  for (const seg of path) {
    if (acc == null) return "";
    acc = (acc as Record<Leaf, unknown>)[seg];
  }
  return typeof acc === "string" ? acc : "";
}

type Locale = "nl" | "en";

export function ReviewClient() {
  const fields = useMemo(() => {
    const out: FieldDef[] = [];
    walk(content.nl, [], out);
    return out;
  }, []);

  const originalValues = useMemo(() => {
    const map: Record<string, string> = {};
    for (const f of fields) {
      map[`nl:${f.key}`] = getAt(content.nl, f.path);
      map[`en:${f.key}`] = getAt(content.en, f.path);
    }
    return map;
  }, [fields]);

  const [values, setValues] = useState(originalValues);
  const [locale, setLocale] = useState<Locale>("nl");

  const groupedFields = useMemo(() => {
    const map = new Map<string, FieldDef[]>();
    for (const f of fields) {
      if (!map.has(f.group)) map.set(f.group, []);
      map.get(f.group)!.push(f);
    }
    return map;
  }, [fields]);

  const changedKeys = Object.keys(values).filter((k) => values[k] !== originalValues[k]);

  function handleChange(k: string, next: string) {
    setValues((prev) => ({ ...prev, [k]: next }));
  }

  function handleExport() {
    const changes: Record<Locale, Record<string, string>> = { nl: {}, en: {} };
    for (const f of fields) {
      for (const loc of ["nl", "en"] as const) {
        const k = `${loc}:${f.key}`;
        if (values[k] !== originalValues[k]) {
          changes[loc][f.displayPath] = values[k];
        }
      }
    }
    const payload = { generatedAt: new Date().toISOString(), changes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lucas-website-wijzigingen-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main
      className="sec-x"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "18vh",
        // Extra vaste marge bovenop de gebruikelijke 18vh: de exportbalk
        // onderaan is `position: fixed`, dus die moet zelf ruimte krijgen.
        paddingBottom: "calc(18vh + 90px)",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--brass)",
            marginBottom: 20,
          }}
        >
          Intern — niet indexeren
        </div>

        <h1
          style={{
            margin: "0 0 20px",
            fontFamily: "var(--font-sans), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(34px,5vw,58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "var(--title)",
          }}
        >
          Tekst nakijken
        </h1>

        <p
          style={{
            margin: "0 0 40px",
            maxWidth: 560,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.7,
            color: "var(--muted)",
          }}
        >
          Hieronder staat alle tekst van de website, per taal, in hetzelfde
          lettertype en dezelfde kleuren als op de echte site. Pas aan wat je
          wil wijzigen. Klaar? Klik onderaan op &ldquo;Exporteer
          wijzigingen&rdquo; — dat downloadt een bestand dat je gewoon kan
          terugsturen; de wijzigingen worden dan overgenomen op de site.
        </p>

        <nav
          aria-label="Taal"
          style={{
            display: "inline-flex",
            alignItems: "stretch",
            border: "1px solid var(--line-4)",
            borderRadius: 999,
            overflow: "hidden",
            marginBottom: 56,
          }}
        >
          {(["nl", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                padding: "8px 18px",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                background: locale === l ? "var(--brass)" : "transparent",
                color: locale === l ? "var(--bg)" : "var(--mono-1)",
                transition: "background .3s, color .3s",
              }}
            >
              {l}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {[...groupedFields.entries()].map(([group, groupFields]) => (
            <section key={group}>
              <SectionKicker
                as="h2"
                label={GROUP_LABELS[group] ?? humanize(group)}
                style={{ marginBottom: 28 }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {groupFields.map((f) => {
                  const k = `${locale}:${f.key}`;
                  const value = values[k] ?? "";
                  const original = originalValues[k] ?? "";
                  const changed = value !== original;
                  const rows = Math.min(10, Math.max(1, Math.ceil(value.length / 70)));
                  return (
                    <div
                      key={k}
                      style={{
                        borderLeft: `2px solid ${changed ? "var(--brass)" : "transparent"}`,
                        paddingLeft: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 12,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: changed ? "var(--brass)" : "var(--mono-2)",
                          }}
                        >
                          {f.caption}
                          {changed ? " · gewijzigd" : ""}
                        </span>
                        {changed && (
                          <button
                            type="button"
                            onClick={() => handleChange(k, original)}
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: 10,
                              letterSpacing: "0.1em",
                              textDecoration: "underline",
                              color: "var(--mono-1)",
                            }}
                          >
                            herstel
                          </button>
                        )}
                      </div>
                      <textarea
                        className="contact-field"
                        value={value}
                        onChange={(e) => handleChange(k, e.target.value)}
                        rows={rows}
                        style={{
                          fontFamily: "var(--font-serif), serif",
                          fontWeight: 300,
                          fontSize: 17,
                          lineHeight: 1.6,
                          resize: "vertical",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Vaste, niet-scrollende exportbalk. Bewust `position: fixed` i.p.v.
          `sticky` + negatieve marges: die laatste moeten dan de responsive
          padding van `.sec-x` per breakpoint natrekken (92px desktop, 40px/
          28px op mobiel) — een `fixed` balk met eigen padding heeft dat
          probleem niet en blijft correct op elke breedte. */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          background: "rgba(14,13,12,0.92)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid var(--line-2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "var(--mono-1)",
          }}
        >
          {changedKeys.length === 0
            ? "Nog geen wijzigingen"
            : `${changedKeys.length} ${changedKeys.length === 1 ? "wijziging" : "wijzigingen"}`}
        </span>
        <button
          type="button"
          onClick={handleExport}
          disabled={changedKeys.length === 0}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "14px 22px",
            border: "none",
            borderRadius: 0,
            cursor: changedKeys.length === 0 ? "default" : "pointer",
            background: changedKeys.length === 0 ? "var(--line-3)" : "var(--brass)",
            color: changedKeys.length === 0 ? "var(--mono-2)" : "var(--bg)",
          }}
        >
          Exporteer wijzigingen
        </button>
      </div>
    </main>
  );
}
