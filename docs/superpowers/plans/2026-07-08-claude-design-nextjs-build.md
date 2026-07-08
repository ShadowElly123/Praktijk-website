# Lucas Borghys — Claude Design → Next.js build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De door Lucas goedgekeurde Claude Design-look ombouwen tot een echte,
deploybare, bilinguale Next.js-site met werkend contactformulier, SEO en privacy.

**Architecture:** App Router met `app/[lang]/` (locales `nl`/`en`), Server Components
by default, alle copy losgekoppeld in één `content.ts`, visuele laag 1:1 herbouwd naar
de gedecodeerde Claude Design (donker clair-obscur, brass-accent), self-hosted fonts,
scroll-gedreven motion. Bestaande contact-API en design-tokens worden hergebruikt.

**Tech Stack:** Next.js 16.2.10 (App Router, Turbopack), React 19.2.4, Tailwind v4,
TypeScript, `next/font/google` (Archivo, Spectral, JetBrains Mono), `next/image`.

**Spec:** `docs/superpowers/specs/2026-07-08-claude-design-to-nextjs-design.md`
**Design-bron (exacte stijlen):** de gedecodeerde bundle-markup — inline-styles per sectie
zijn de bron van waarheid voor kleuren, maten en layout.

## Global Constraints

- **Next.js 16 conventies (afwijkend van oudere versies!):** `params` is een `Promise`
  (`await params`); middleware heet `proxy.ts`; i18n via `app/[lang]/`; `PageProps<'/[lang]'>`
  / `LayoutProps<'/[lang]'>` zijn globale TS-helpers.
- **Kleuren (verbatim):** basis `#0E0D0C`, sectie-variant `#100E0C`, randen `#1c1915`/`#2a251e`/
  `#2f2a22`/`#3a352c`; brass `#C2A683`; tekst `#F1EDE5` (titel), `#E7E3DB` (body), `#cdc7bc`
  (gedempt), `#9a9186`/`#8b8377`/`#6b655c` (mono/secundair).
- **Fonts:** Archivo (sans/titels/UI), Spectral (serif/body/quotes), JetBrains Mono (labels).
  Self-hosted via `next/font/google`. Géén runtime-calls naar Google.
- **Letterlijke kernteksten** (Verwelkoming, Over mij, Praktisch, microcopy, officiële titels):
  exact overnemen uit `content.ts`/de bundle. Nooit vrij vertalen of herschrijven.
- **Officiële titels exact:** "Klinisch psycholoog (Erkend door de Psychologencommissie, met
  visum)." en "In opleiding tot psychoanalytisch therapeut."
- **Deontologie:** geen testimonials/reviews/vergelijkingen; geen tracking- of advertentiecookies.
- **Privacy:** contactformulier slaat niets op de server op; enkel doorsturen als e-mail.
- **A11y:** WCAG AA-contrast, echte `<label>`s, semantische HTML, zichtbare focus-ring,
  `prefers-reduced-motion` respecteren.
- **Copy losgekoppeld:** componenten bevatten geen hardcoded zichtbare tekst; alles uit `content.ts`.
- **Commit** na elke afgeronde taak.

---

## File Structure

```
app/
  proxy.ts                      NIEUW — locale-redirect (/ → /nl, ongeprefixt → locale)
  layout.tsx                    WIJZ — minimale root (html/body wrappers verhuizen naar [lang])
  globals.css                   HERSCHRIJF — design-tokens, base, motion, a11y
  [lang]/
    layout.tsx                  NIEUW — <html lang>, fonts, metadata, JSON-LD, chrome
    page.tsx                    NIEUW — assemblage van secties
    privacy/page.tsx            NIEUW — privacyverklaring (GDPR-template)
    opengraph-image.tsx         NIEUW — dynamische OG (of statisch .jpg)
  lib/
    content.ts                  HERSTRUCT — lean copy (nl/en) + compliance/betaal
    locale.ts                   NIEUW — Locale-type, getContent(lang), hasLocale
    LanguageProvider.tsx        VERWIJDER (vervangen door route-based) of leeg
  components/
    chrome/GrainOverlay.tsx     NIEUW
    chrome/SideRail.tsx         NIEUW
    chrome/TopChrome.tsx        NIEUW (naam + Gent·BE + NL/EN-linkpil)
    sections/Hero.tsx           NIEUW
    sections/Verwelkoming.tsx   NIEUW
    sections/Werkwijze.tsx      NIEUW
    sections/OverMij.tsx        NIEUW
    sections/PraktischContact.tsx NIEUW
    sections/LocatieKaart.tsx   NIEUW (SVG-slot + placeholder)
    sections/SiteFooter.tsx     NIEUW
    ContactForm.tsx             NIEUW (client component)
    Reveal.tsx                  NIEUW (scroll-reveal wrapper, reduced-motion-safe)
  api/contact/route.ts          BEHOUDEN (velden afstemmen)
  sitemap.ts                    NIEUW
  robots.ts                     NIEUW
public/
  images/hero.jpg               NIEUW (uit bundle)
  images/werkwijze.jpg          NIEUW (uit bundle)
  images/portret.jpg            NIEUW (uit bundle)
```

Oude partituur-componenten (`Welkom`, `Intermezzo`, `Werkwijze`, `OverMij`, `Praktisch`,
`SiteHeader`, `SiteFooter`, `GhostWord`, `ScoreLine`, `Hero`, `PlaceholderImage`, `useReveal`)
worden verwijderd zodra hun vervangers staan (Task 6.x).

**Verificatie-noot:** visuele componenten worden geverifieerd via `npm run dev` + de
preview-tools (screenshot vergelijken met de gedecodeerde Claude Design), niet via unit-tests.
Logica (proxy-locale, content-typing, form-API, JSON-LD) krijgt wél echte assertions.

---

## FASE 1 — Fundament: assets, i18n-routing, fonts, tokens

Leverbaar: site buildt en draait op `/nl` en `/en` met correcte fonts, tokens en een
placeholder-pagina. `/` verwijst door.

### Task 1.1: Beelden uit de bundle extraheren naar `public/images`

**Files:**
- Create: `scripts/extract-images.mjs`
- Create (output): `public/images/hero.jpg`, `public/images/werkwijze.jpg`, `public/images/portret.jpg`

**Interfaces:**
- Produces: drie JPEG-bestanden op vaste paden, geconsumeerd door Hero/Werkwijze/OverMij.

- [ ] **Step 1: Schrijf het extractie-script**

```js
// scripts/extract-images.mjs
// Haalt de 3 goedgekeurde beelden uit de Claude Design-bundle en schrijft ze naar public/images.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const SRC = "Claude design/Lucas Borghys - website (1).html";
const OUT = "public/images";
const MAP = {
  hero: "98f7df46-b0b8-4b78-96e5-b63766c9a357",
  werkwijze: "841f6898-f4cd-44c0-a5ba-aa14eb2620a7",
  portret: "f8440241-8fba-403e-94c3-b0891635a3d0",
};

const html = readFileSync(SRC, "utf8");
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
const blob = scripts.reduce((a, b) => (b.length > a.length ? b : a), "");
const assets = JSON.parse(blob.trim());

mkdirSync(OUT, { recursive: true });
for (const [name, uuid] of Object.entries(MAP)) {
  const a = assets[uuid];
  if (!a) throw new Error(`asset ${uuid} niet gevonden`);
  writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(a.data, "base64"));
  console.log(`${name}.jpg geschreven (${Math.round(a.data.length * 0.75 / 1024)} KB)`);
}
```

- [ ] **Step 2: Run en verifieer**

Run: `node scripts/extract-images.mjs`
Expected: 3 regels "…geschreven"; `ls public/images` toont hero.jpg, werkwijze.jpg, portret.jpg.

- [ ] **Step 3: Commit**

```bash
git add scripts/extract-images.mjs public/images
git commit -m "feat: extract approved design images to public/images"
```

### Task 1.2: Locale-fundament (`lib/locale.ts`) + content-skelet

**Files:**
- Create: `app/lib/locale.ts`
- Modify: `app/lib/content.ts` (herstructureren; behoud letterlijke teksten)

**Interfaces:**
- Produces:
  - `type Locale = "nl" | "en"`
  - `const LOCALES: Locale[]`, `const DEFAULT_LOCALE: Locale = "nl"`
  - `function hasLocale(x: string): x is Locale`
  - `function getContent(lang: Locale): Content` — retourneert het content-object voor die taal
  - `type Content` — de shape die álle secties consumeren (zie onder)

- [ ] **Step 1: Definieer het content-model en de accessor**

`content.ts` exporteert per taal een object met exact deze velden (shape = interface voor
alle secties). Vul beide talen; NL-kernteksten letterlijk (zie Global Constraints).

```ts
// app/lib/content.ts  (fragment: de shape; vul nl én en volledig in)
export const content = {
  nl: {
    meta: { title: "Lucas Borghys · Klinisch psycholoog, Gent",
            description: "Gesprekstherapie in Gent. Wees welkom, en vertel." },
    site: { name: "Lucas Borghys", role: "Klinisch psycholoog · Gent",
            rail: "Klinisch psycholoog · psychoanalytische praktijk", region: "Gent · BE" },
    hero: { titel: "Wees welkom,", accent: "en vertel.",
            sub: "Klinisch psycholoog te Gent. Een psychoanalytische gesprekspraktijk, met ruimte voor andersheid en voor wat nog geen woorden heeft.",
            scroll: "Scroll" },
    verwelkoming: { label: "Verwelkoming",
      body: "Wees welkom, en vertel. Dat is de basis van waaruit we vertrekken en waarop we verder gaan. Ieder mens wordt vroeg of laat geconfronteerd met een worsteling, het leven voelt dan niet meer zo voorspelbaar of behapbaar aan en dit is voor velen een punt om de stap naar gesprekstherapie te zetten. Via het spreken proberen we vat te krijgen op die worsteling, proberen we woorden te vinden voor datgene dat voor onszelf nog geen duidelijkheid heeft, geen verhaal. Ik nodig je uit om samen te komen spreken over waar jij tegenaan botst en in hoeverre deze moeilijkheden betekenisvol zijn in jouw bredere levensverhaal. ",
      accent: "Elk verhaal, elke moeilijkheid is welkom." },
    werkwijze: { num: "03", label: "Werkwijze", title: "Tijd en ruimte voor jouw verhaal.",
      body: "De gesprekken vertrekken vanuit een psychoanalytische houding: traag, associatief, aandachtig en zonder vooropgesteld protocol. Er is geen checklist die bepaalt wat belangrijk is. Dat ontdekken we samen, in het spreken zelf.",
      accent: "Zo ontstaat ruimte voor wat nog geen vorm had: het andere, en de opgekuiste chaos van een verhaal dat nog geschreven moet worden.",
      // TE BEVESTIGEN MET LUCAS — impliciet, geen expliciete outing:
      aandacht: "Er is bijzondere aandacht en interesse voor vragen rond seksualiteit en gender." },
    overMij: { num: "04", label: "Over mij",
      body: "Ik ben klinisch psycholoog en ik heb een passie voor en ervaring met gesprekstherapie. Zelf probeer ik mijn werk als therapeut te verfijnen door deel te nemen aan een therapieopleiding in de psychoanalyse en deel te nemen aan lezingen en opleidingsdagen.",
      ervaring: "Eerdere ervaring bij groepspraktijk Tondel, huis voor psychotherapie Anker en de Huiskamer, en vrijwilligerswerk in PVT De Wadi bij de Driesprong.",
      titel1: "Klinisch psycholoog", titel1sub: "(Erkend door de Psychologencommissie, met visum).",
      titel2: "In opleiding tot psychoanalytisch therapeut.",
      badge: "Lucas Borghys · Gent" },
    praktisch: { num: "05", label: "Praktisch & contact",
      richtprijs: "Richtprijs en richtduur worden toegelicht tijdens het intakegesprek. Definitieve afspraken horen bij die eerste kennismaking.",
      terugbetaling: "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk; u mag uw formulier meebrengen naar de sessie.",
      betaling: "Betalen kan via Payconiq of overschrijving (IBAN BE53 3632 2546 8153).",
      microcopy: "Een voicemail is aangeraden indien ik telefonisch niet bereikbaar ben. Ik probeer binnen de dag een antwoord te formuleren. Houd zeker ook uw spamfolder in het oog wanneer u een antwoord verwacht.",
      gsmLabel: "GSM", gsm: "0493 02 05 43", gsmHref: "tel:+32493020543",
      registratie: ["Visumnummer 374462", "Erkenningsnummer 991135455", "Ondernemingsnummer 0790.741.228"] },
    form: { naam: "Naam", email: "E-mail", bericht: "Bericht", verstuur: "Verstuur",
      sending: "Versturen…",
      success: "Dank u. Uw bericht is verstuurd. Ik probeer binnen de dag te antwoorden.",
      error: "Er ging iets mis bij het versturen. Belt u gerust, of probeer het later opnieuw.",
      privacyLink: "Privacybeleid", requiredMsg: "Vul dit veld in.", emailMsg: "Controleer het e-mailadres." },
    locatie: { label: "Locatie", adres: "Sint-Pietersnieuwstraat 97, 9000 Gent",
      caption: "Naast de Boekentoren, in het hart van de studentenbuurt.",
      mapAria: "Kaart van de praktijk aan de Sint-Pietersnieuwstraat 97 in Gent, naast de Boekentoren." },
    crisis: "In crisis: bel de Zelfmoordlijn 1813, of contacteer de huisarts van wacht.",
    footer: { privacy: "Privacybeleid",
      legal: "Visum 374462 · Erkenning 991135455 · KBO 0790.741.228" },
  },
  en: { /* zelfde shape, Engelse vertaling; kernteksten uit de bundle (EN-varianten) */ },
} as const;
```

```ts
// app/lib/locale.ts
import { content } from "./content";

export type Locale = "nl" | "en";
export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";
export const hasLocale = (x: string): x is Locale => (LOCALES as string[]).includes(x);

export type Content = (typeof content)[Locale];
export const getContent = (lang: Locale): Content => content[lang];
```

- [ ] **Step 2: Schrijf een assertion-test voor de accessor**

```ts
// app/lib/locale.test.ts
import { getContent, hasLocale, LOCALES } from "./locale";

test("hasLocale narrows valid + rejects invalid", () => {
  expect(hasLocale("nl")).toBe(true);
  expect(hasLocale("fr")).toBe(false);
});
test("beide talen hebben dezelfde sleutels", () => {
  const keys = (o: object): string[] => Object.keys(o).sort();
  expect(keys(getContent("nl"))).toEqual(keys(getContent("en")));
});
test("officiële titel exact aanwezig (nl)", () => {
  expect(getContent("nl").overMij.titel1sub).toBe("(Erkend door de Psychologencommissie, met visum).");
});
```

> Geen test-runner geïnstalleerd? Voeg er één toe als aparte micro-stap (`node --test`
> met een `.test.mjs`, of `vitest`), of verifieer via een tijdelijk `tsx`-scriptje. Kies de
> lichtste optie die in dit project werkt; documenteer de gekozen `test`-commando in package.json.

- [ ] **Step 3: Run de test — verwacht PASS.** (Als beide talen niet dezelfde sleutels hebben, vul EN aan.)

- [ ] **Step 4: Commit**

```bash
git add app/lib/content.ts app/lib/locale.ts app/lib/locale.test.ts
git commit -m "feat: lean bilingual content model + locale accessor"
```

### Task 1.3: `proxy.ts` — locale-redirect

**Files:**
- Create: `app/proxy.ts`

**Interfaces:**
- Consumes: `LOCALES`, `DEFAULT_LOCALE` uit `lib/locale.ts`.
- Produces: redirect van ongeprefixte paden naar `/{locale}{path}`.

- [ ] **Step 1: Schrijf de proxy**

```ts
// app/proxy.ts
import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/locale";

function pickLocale(req: Request): string {
  const header = req.headers.get("accept-language") ?? "";
  const preferred = header.split(",").map((p) => p.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((p) => (LOCALES as string[]).includes(p)) ?? DEFAULT_LOCALE;
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|images|favicon.ico|.*\\.).*)"] };
```

- [ ] **Step 2: Verifieer na Task 1.4** (proxy heeft de `[lang]`-routes nodig). Run: `npm run dev`,
open `http://localhost:3000/` → moet doorsturen naar `/nl`. `Accept-Language: en` → `/en`.

- [ ] **Step 3: Commit**

```bash
git add app/proxy.ts
git commit -m "feat: locale redirect via proxy"
```

### Task 1.4: `app/[lang]/layout.tsx` + minimale `page.tsx` + fonts + tokens

**Files:**
- Modify: `app/layout.tsx` (uitkleden tot pass-through)
- Create: `app/[lang]/layout.tsx`
- Create: `app/[lang]/page.tsx` (voorlopig placeholder)
- Rewrite: `app/globals.css`

**Interfaces:**
- Consumes: `getContent`, `hasLocale`, `LOCALES` uit `lib/locale.ts`.
- Produces: `generateStaticParams` (nl, en); fonts als CSS-variabelen `--font-sans`,
  `--font-serif`, `--font-mono`; design-tokens als CSS custom properties.

- [ ] **Step 1: Kleed root-layout uit**

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: `[lang]/layout.tsx` met fonts, tokens-klasse, metadata, statische params**

```tsx
// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Spectral, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getContent, hasLocale, LOCALES, type Locale } from "../lib/locale";

const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Spectral({ subsets: ["latin"], variable: "--font-serif",
  weight: ["300", "400", "500"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getContent(lang);
  const other = lang === "nl" ? "en" : "nl";
  return {
    metadataBase: new URL("https://lucasborghys-psycholoog.be"),
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: `/${lang}`, languages: { nl: "/nl", en: "/en", "x-default": "/nl" } },
    openGraph: { title: c.meta.title, description: c.meta.description,
      locale: lang === "nl" ? "nl_BE" : "en", type: "website" },
    robots: { index: true, follow: true },
    // 'other' als hint; hreflang-alternates komen uit alternates.languages
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: `globals.css` — tokens, base, motion, a11y**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --bg: #0E0D0C; --bg-alt: #100E0C;
  --line: #1c1915; --line-2: #2a251e; --line-3: #2f2a22; --line-4: #3a352c;
  --brass: #C2A683;
  --text: #E7E3DB; --title: #F1EDE5; --muted: #cdc7bc;
  --mono-1: #9a9186; --mono-2: #8b8377; --mono-3: #6b655c;
  --rail: 92px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text);
  font-family: var(--font-sans), sans-serif; -webkit-font-smoothing: antialiased; }
h1, h2 { text-wrap: balance; } p { text-wrap: pretty; }
:focus-visible { outline: 2px solid var(--brass); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
}
/* keyframes: kenburns, heroRise, cueMove — overgenomen uit de bundle */
@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }
@keyframes heroRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes cueMove { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
```

- [ ] **Step 4: Placeholder-pagina**

```tsx
// app/[lang]/page.tsx
import { getContent, hasLocale, type Locale } from "../lib/locale";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  return <main style={{ padding: "20vh 8vw", fontFamily: "var(--font-serif)" }}>
    <h1 style={{ fontFamily: "var(--font-sans)", color: "var(--title)" }}>{c.hero.titel}</h1>
    <p style={{ color: "var(--brass)" }}>{c.hero.accent}</p>
  </main>;
}
```

- [ ] **Step 5: Verwijder de oude `app/page.tsx`** (partituur-assemblage) zodat er geen dubbele
route `/` bestaat. Verwijder ook `app/lib/LanguageProvider.tsx`-gebruik uit de oude layout (al weg).

```bash
git rm app/page.tsx
```

- [ ] **Step 6: Build + run verifiëren**

Run: `npm run build` → Expected: slaagt (statische `/nl` en `/en`).
Run: `npm run dev`, open `/` → redirect naar `/nl`; `/en` toont Engelse hero-woorden; fonts laden
(Archivo/Spectral zichtbaar). Geen console-errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: [lang] routing, self-hosted fonts, design tokens, base css"
```

---

## FASE 2 — Chrome (grain, rail, top) + Reveal-primitief

Leverbaar: de vaste "chrome" rond de pagina + herbruikbare reveal-wrapper.

### Task 2.1: `Reveal` — scroll-reveal wrapper (reduced-motion-safe)

**Files:**
- Create: `app/components/Reveal.tsx`

**Interfaces:**
- Produces: `<Reveal delay?={number}>children</Reveal>` — client component; toont children,
  animeert opacity/translateY bij in-view; niets bij `prefers-reduced-motion`.

- [ ] **Step 1: Implementeer**

```tsx
// app/components/Reveal.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{
    opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(16px)",
    transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}s`,
  }}>{children}</div>;
}
```

- [ ] **Step 2: Verifieer** later in-context (Fase 3). Commit nu.

```bash
git add app/components/Reveal.tsx
git commit -m "feat: reduced-motion-safe reveal wrapper"
```

### Task 2.2: GrainOverlay + SideRail + TopChrome

**Files:**
- Create: `app/components/chrome/GrainOverlay.tsx`
- Create: `app/components/chrome/SideRail.tsx`
- Create: `app/components/chrome/TopChrome.tsx`

**Interfaces:**
- Consumes: `Content` (rail-tekst, naam, region), `lang` (voor de NL/EN-linkpil → andere route).
- Produces: `<GrainOverlay/>`, `<SideRail text={string}/>`, `<TopChrome c={Content} lang={Locale}/>`.

- [ ] **Step 1: GrainOverlay** — sticky grain (exacte stijl uit bundle: SVG-noise data-URI,
`mix-blend-mode: soft-light; opacity:0.5; z-index:60; pointer-events:none`). Server component.

- [ ] **Step 2: SideRail** — sticky verticale rail (`writing-mode: vertical-rl`, JetBrains Mono
10px, `letter-spacing:0.34em`, kleur `--mono-3`), tekst uit `content.site.rail`. Server component.

- [ ] **Step 3: TopChrome** — sticky bar: links `content.site.name` (Archivo 600, uppercase,
`letter-spacing:0.16em`), rechts `content.site.region` (mono) + **NL/EN-pil als `<Link>`** naar
`/nl`⇄`/en` (actieve taal brass-fill, inactieve transparant; exacte pil-stijl uit bundle,
border `--line-4`, `backdrop-filter: blur(6px)` — spaarzaam). Client component (gebruikt `usePathname`).

```tsx
// kern van de pil in TopChrome.tsx
import Link from "next/link";
// NL actief: background var(--brass); color var(--bg). EN link → "/en", NL link → "/nl".
```

- [ ] **Step 4: Verifieer** in Fase 3 (na assemblage). Commit.

```bash
git add app/components/chrome
git commit -m "feat: grain overlay, side rail, top chrome with locale link"
```

---

## FASE 3 — Secties (visuele herbouw, 1:1 naar de bundle)

Leverbaar: volledige pagina zichtbaar, identiek aan de goedgekeurde Claude Design, met ruime
spacing en werkende taalwissel. Elke sectie-taak: bouw component → assembleer in `page.tsx` →
**visuele verificatie via preview-screenshot t.o.v. de gedecodeerde bundle**.

**Gedeelde bouwregels voor alle secties (DRY):**
- Kleuren/maten/gradients **exact** uit de gedecodeerde bundle-inline-styles overnemen, maar:
  vaste `height:100vh` → **`min-height:100vh`**; royale padding behouden (`16vh`/`18vh` blokken).
- Tekst **uitsluitend** uit `content` props (geen hardcoded copy).
- Reveal-blokken in `<Reveal>` wikkelen (stagger via `delay`).
- Labels met JetBrains Mono; **sectienummers consistent 01–05** (Hero telt niet mee als sectie-nummer,
  maar Verwelkoming=02 … Praktisch=05; Werkwijze fix van "03" behouden of hernummeren — kies één
  consistente reeks en pas `content.*.num` overal aan).
- `<img>` → `next/image` met `fill`, `sizes`, en `priority` enkel op de hero.
- Semantiek: elke sectie is een `<section aria-label=…>`.

### Task 3.1: Hero

**Files:** Create `app/components/sections/Hero.tsx`; Modify `app/[lang]/page.tsx`.
**Interfaces:** Consumes `Content.hero`, `public/images/hero.jpg`. Produces `<Hero c={Content}/>`.

- [ ] **Step 1:** Bouw Hero exact naar de bundle: full-bleed `next/image` (priority, `object-fit:cover`,
filter `saturate(.82) contrast(1.05) brightness(.72)`, `animation: kenburns 24s ... alternate`),
drie overlay-gradients (radial brass-gloed + twee lineaire), tekstblok (`padding:0 40px 8vh var(--rail)`)
met `h1` Archivo 600 `clamp(52px,8vw,116px)` `line-height:.98` + accentregel Spectral 300 italic brass,
subtitel Spectral, scroll-cue onderaan (`content.hero.scroll` + `cueMove`-lijn). Hero-intro via
`heroRise`/staggered.
- [ ] **Step 2:** Assembleer `<Hero c={c}/>` in `page.tsx`.
- [ ] **Step 3: Visuele verificatie** — `npm run dev`, preview `/nl`, screenshot; vergelijk met
bundle-hero (compositie, brass-gloed, typografie). Check `/en` toont "and speak.".
- [ ] **Step 4: Commit** `feat: hero section`.

### Task 3.2: Verwelkoming
**Files:** Create `sections/Verwelkoming.tsx`; Modify `page.tsx`.
- [ ] Bouw: `min-height:100vh`, `padding:16vh 40px 16vh var(--rail)`, `max-width:760px`; mono-label
(`content.verwelkoming.label`) brass; grote Spectral 300 `clamp(22px,2.5vw,30px)` body + brass-accent-tail
(`content.verwelkoming.accent`). Alles in `<Reveal>`. **Signatuur-moment:** subtiele spectrum-gloed bij
de bovenrand (zeer laag opacity, impliciet). Assembleer, visueel verifiëren, commit `feat: verwelkoming`.

### Task 3.3: Werkwijze
**Files:** Create `sections/Werkwijze.tsx`; Modify `page.tsx`.
- [ ] Bouw: 2-koloms grid `1.05fr 1fr` (`min-height:100vh`, `background:var(--bg-alt)`, `border-top`),
links tekst (`num · label`, `h2` Archivo `clamp(34px,4vw,58px)`, body Spectral, accent Spectral-italic brass,
+ **`content.werkwijze.aandacht`** als subtiele extra regel — impliciete queer-aandacht), rechts
`next/image` werkwijze.jpg met gradient-masks. **Beeld-bleed** naar schermrand. Mobiel: kolommen stapelen
(beeld boven/onder tekst). Assembleer, visueel verifiëren, commit `feat: werkwijze`.

### Task 3.4: OverMij
**Files:** Create `sections/OverMij.tsx`; Modify `page.tsx`.
- [ ] Bouw: 2-koloms `1fr 1.05fr`, links portret.jpg (`object-position:center 26%`, subtiele grayscale)
met gradient-masks + hoek-badge (`content.overMij.badge`), rechts `num · label`, body + ervaring (Spectral,
ervaring italic gedempt), en titel-blok met exacte officiële titels (`titel1`+`titel1sub`, `titel2`) boven
een `border-top`. Beeld-bleed links. Mobiel stapelen. Assembleer, visueel verifiëren, commit `feat: over mij`.

### Task 3.5: SiteFooter (crisis + registratie + privacy)
**Files:** Create `sections/SiteFooter.tsx`; Modify `page.tsx`.
- [ ] Bouw: footerblok (border-top), links naam + role, rechts `content.crisis` (mono, gedempt).
Onder: **privacy-link** (`<Link href="/{lang}/privacy">`) + `content.footer.legal` (registratie). Assembleer
onderaan page, visueel verifiëren, commit `feat: footer with crisis + registration + privacy link`.

### Task 3.6: Oude partituur-componenten opruimen
- [ ] Verwijder `Welkom, Intermezzo, Werkwijze(oud), OverMij(oud), Praktisch(oud), SiteHeader,
SiteFooter(oud), GhostWord, ScoreLine, Hero(oud), PlaceholderImage, useReveal` voor zover vervangen en
niet meer geïmporteerd. Run `npm run build` → geen dode imports. Commit `chore: remove old partituur components`.

---

## FASE 4 — Praktisch & Contact + werkend formulier

Leverbaar: praktische zone met werkend, gevalideerd formulier dat naar de API post.

### Task 4.1: ContactForm (client) + API-veldafstemming

**Files:** Create `app/components/ContactForm.tsx`; Modify `app/api/contact/route.ts`.
**Interfaces:**
- Consumes: `Content.form`. Produceert POST naar `/api/contact` met `{ naam, email, bericht, company }`.
- API verwacht die velden (afstemmen): verplicht `naam`, `email`, `bericht`; honeypot `company`.

- [ ] **Step 1:** Pas `route.ts` aan: payload `{ naam, bericht, email, company }`; validatie
(verplicht naam/email/bericht + e-mailregex); mailtekst met die velden; behoud "niets opgeslagen",
honeypot, en provider-agnostische verzending (Resend via env; zonder key → `delivered:false`).
- [ ] **Step 2:** Bouw `ContactForm` (client): velden Naam/E-mail/Bericht met **echte `<label>`s**
(visueel of visually-hidden, niet placeholder-only), stijl uit bundle (transparant, `border-bottom var(--line-3)`),
client-validatie (`content.form.requiredMsg`/`emailMsg`), submit-states (`sending`/`success`/`error`),
brass verstuur-knop. Honeypot-veld verborgen.
- [ ] **Step 3: Verifieer:** dev; lege submit → validatiemeldingen; geldige submit → succesmelding;
server-log toont inzending (zonder provider). `npm run build` slaagt.
- [ ] **Step 4: Commit** `feat: working contact form + API field alignment`.

### Task 4.2: PraktischContact-sectie

**Files:** Create `app/components/sections/PraktischContact.tsx`; Modify `page.tsx`.
- [ ] Bouw: sectie (`padding:18vh 40px 8vh var(--rail)`, `background:var(--bg-alt)`), 2-koloms
`1fr 1fr gap:8vw max-width:1200px`: links `num · label` + praktische alinea's (richtprijs, terugbetaling,
**betaling**, microcopy) + **GSM** (`tel:`-link) + **registratie**; rechts `<ContactForm c={c}/>`.
Mobiel stapelen. Assembleer, visueel verifiëren, commit `feat: praktisch & contact section`.

---

## FASE 5 — Locatiekaart (zelf-gemaakte SVG in sitestijl)

De kaart wordt **zelf ontworpen** als een gestileerde, cinematische SVG in exact de
sitestijl — géén Google Maps-embed (dus geen third-party tracking). Gebruik de
**frontend-design-skill** als ondersteuning bij de compositie.

**Design-brief voor de kaart:**
- **Stijl:** donker (`--bg`), lijnen/straten als dunne brass/`--line`-strokes, water als
  een iets donkerder lint, labels in **JetBrains Mono** (mono-kleuren), brass-accenten
  spaarzaam. Architecturaal-minimaal, in dezelfde clair-obscur-toon als de site. Subtiele
  grain/gloed mag, mits leesbaar. Géén felle kleuren, geen realistische kaart.
- **Herkenningspunten (label + eenvoudig icoon/markering):**
  - **Boekentoren** (torenmarkering — het ijkpunt naast de praktijk)
  - **Sint-Pietersplein** + **Sint-Pietersabdij**
  - de **rivier** (Muinkschelde/Schelde) als donker lint
  - **studentenbuurt / Overpoort**, **Blandijnberg** (subtiel, secundair)
  - **Sint-Pietersnieuwstraat** als straat waaraan de praktijk ligt
- **De praktijk zelf:** een duidelijke **brass-pin/markering** op Sint-Pietersnieuwstraat 97,
  visueel het brandpunt.
- **Oriëntatie:** noordpijl of subtiele schaal in mono, optioneel.

### Task 5.1: SVG-kaartcomponent ontwerpen (`PraktijkKaart`)

**Files:** Create `app/components/map/PraktijkKaart.tsx` (React-component die inline `<svg>` retourneert).
**Interfaces:** Produces `<PraktijkKaart className?/>` — schaalbare SVG (`viewBox`, geen vaste px),
gebruikt de CSS-tokens (`currentColor`/`var(--brass)` etc.), `preserveAspectRatio`.

- [ ] **Step 1:** Ontwerp de SVG met de design-brief hierboven: straten-grid rond het
Sint-Pietersplein, de Muinkschelde als donker lint, gemarkeerde punten (Boekentoren,
abdij/plein, Overpoort/Blandijn), en de brass-praktijk-pin op Sint-Pietersnieuwstraat.
Labels in mono. Alles met CSS-variabelen zodat het exact met de site meekleurt.
`viewBox` + `max-width:100%` zodat het responsive schaalt.
- [ ] **Step 2: Visuele verificatie:** render los in dev, screenshot; check dat het in de
sitestijl leest (donker/brass/mono), de herkenningspunten herkenbaar zijn en de praktijk-pin
opvalt. Itereren tot het klopt met de esthetiek van de secties.
- [ ] **Step 3: Commit** `feat: hand-crafted stylised SVG map of the practice surroundings`.

### Task 5.2: LocatieKaart-sectie (kaart integreren)

**Files:** Create `app/components/sections/LocatieKaart.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `Content.locatie` + `<PraktijkKaart/>`.

- [ ] **Step 1:** Bouw `LocatieKaart`: kaart-container (`border:1px solid var(--line-4)`,
`background:var(--bg)`, `max-width:100%`, `role="img"` + `aria-label={content.locatie.mapAria}`)
met daarin `<PraktijkKaart/>`, en daaronder `content.locatie.adres` + `caption`. In de
praktisch/contact-zone of als eigen sectie vóór de footer.
- [ ] **Step 2:** Assembleer in `page.tsx`. Visueel verifiëren (responsive, geen overflow,
consistent met de secties eromheen).
- [ ] **Step 3: Commit** `feat: location map section`.

---

## FASE 6 — SEO, privacy, motion-finish & verificatie

### Task 6.1: JSON-LD (LocalBusiness/Person)
**Files:** Modify `app/[lang]/layout.tsx` (of aparte `components/Jsonld.tsx`).
- [ ] Voeg een `<script type="application/ld+json">` toe met `@type` `Person` + `LocalBusiness`
(naam, beroep "Klinisch psycholoog", adres Sint-Pietersnieuwstraat 97 Gent, `areaServed` Gent,
`telephone`, `availableLanguage` nl/en). Verifieer via bron-HTML dat de JSON-LD aanwezig en valide is.
Commit `feat: structured data`.

### Task 6.2: OG-beeld + sitemap + robots
**Files:** Create `app/[lang]/opengraph-image.tsx` (of statische `opengraph-image.jpg`),
`app/sitemap.ts`, `app/robots.ts`.
- [ ] **Step 1:** OG-beeld: donker, cinematisch, naam + rol (via `ImageResponse`, `size 1200×630`,
flexbox — géén grid). 
- [ ] **Step 2:** `sitemap.ts` retourneert `/nl` en `/en` (+ `/nl/privacy`, `/en/privacy`) met
`alternates.languages`. `robots.ts`: `allow: "/"`, `sitemap`-URL.
- [ ] **Step 3:** Verifieer `/sitemap.xml`, `/robots.txt`, en OG via `?` route. Commit `feat: OG image, sitemap, robots`.

### Task 6.3: Privacy-pagina (GDPR-template)
**Files:** Create `app/[lang]/privacy/page.tsx`; add `content.privacy` (NL/EN) in `content.ts`.
- [ ] Bouw een leesbare privacy-pagina in sitestijl met secties: welke gegevens (contactformulier),
doel (enkel je vraag beantwoorden), geen tracking/advertentiecookies, geen serveropslag, bewaartermijn,
rechten (inzage/verwijdering), contact. Kop **"Concept — juridisch na te kijken"**. `generateMetadata`
met `robots:{index:false}` tot definitief. Commit `feat: privacy policy (draft template)`.

### Task 6.4: Motion-finish (scroll-parallax) + a11y-pass
**Files:** Modify sectie-componenten / `globals.css`.
- [ ] **Step 1:** Voeg subtiele **scroll-parallax** toe op de sectiebeelden via CSS
`animation-timeline: view()` (beeld beweegt trager dan tekst); fallback = statisch. Reduced-motion uit.
- [ ] **Step 2:** A11y-pass: contrast-audit van `--mono-3`/`--mono-2` op `--bg` (waar < AA: lichter
zetten of enkel voor grote/decoratieve tekst gebruiken); alle `next/image` zinvolle `alt`/decoratief `alt=""`;
tab-volgorde + focus-ring check; `aria-label`s op secties/nav.
- [ ] **Step 3:** Verifieer scroll "vloeit" (muis + trackpad, geen harde schokken); reduced-motion
schakelt alles uit. Commit `feat: scroll parallax + accessibility pass`.

### Task 6.5: Eindverificatie (definition of done — spec §7)
- [ ] `npm run build` slaagt (type-check + productie-build).
- [ ] Preview per sectie op mobiel/tablet/desktop: identiek aan bundle, geen horizontale overflow,
2-koloms stapelt op mobiel, ruimte blijft royaal.
- [ ] NL⇄EN via de pil wisselt route + alle teksten; `hreflang` in bron-HTML.
- [ ] Formulier: validatie + success/error; zonder provider blijft UI werken.
- [ ] A11y: contrast AA, labels, focus-ring, reduced-motion.
- [ ] Perf: hero = geoptimaliseerde LCP; geen merkbare mobiele jank.
- [ ] SEO: JSON-LD valide, sitemap/robots/OG aanwezig.
- [ ] Compliance-info: GSM, registratie, betaalinfo, crisis, privacy-link, locatie(-placeholder).
- [ ] Commit/afronding via `superpowers:finishing-a-development-branch`.

---

## Self-Review (spec-dekking)

- Secties Hero/Verwelkoming/Werkwijze/OverMij/Praktisch+Contact/Footer → Fase 3–4 ✓
- Lean copy + compliance (GSM, registratie, betaling, crisis) → Task 1.2, 4.2, 3.5 ✓
- Beelden uit bundle → Task 1.1 ✓ · self-hosted fonts → 1.4 ✓ · tokens → 1.4 ✓
- Werkend formulier + API + privacy-garanties → Fase 4 ✓
- Bilinguale routes + hreflang + proxy → 1.3, 1.4, 6.2 ✓
- Vloeiend scrollen (geen snap) + parallax + reveal + reduced-motion → 2.1, 6.4 ✓
- A11y (labels, contrast, focus, semantiek) → 4.1, 6.4 ✓
- SEO (JSON-LD, OG, sitemap, robots) → Fase 6 ✓
- Privacy-pagina GDPR-template → 6.3 ✓
- Locatiekaart SVG-slot → Fase 5 ✓
- Queerness impliciet (te bevestigen) → `content.werkwijze.aandacht` (Task 1.2/3.3) ✓
- Copy losgekoppeld in content.ts → Task 1.2 + gedeelde bouwregels ✓

**Open (buiten build, bij Lucas):** definitieve hero-quote, echte foto's (portret-identiteit
bevestigen), EU-mailprovider via env, juridisch nazicht privacytekst, definitieve queer-formulering,
de SVG-kaart, domein + git/deploy.
```