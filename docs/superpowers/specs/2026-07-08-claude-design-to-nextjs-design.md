# Ontwerp — Claude Design omzetten naar werkende Next.js-site

**Datum:** 2026-07-08
**Project:** Website Lucas Borghys (klinisch psycholoog, Gent)
**Doel:** De door Lucas goedgekeurde Claude Design-look omzetten naar een echte,
deploybare, onderhoudbare Next.js-site — met werkend contactformulier, self-hosted
fonts, privacyverklaring en de compliance-info die de losse HTML miste.

---

## 1. Uitgangspunt & beslissingen

**Bron van waarheid voor design:** de goedgekeurde Claude Design-bundle
(`Claude design/Lucas Borghys - website (1).html`). Lucas gaf hierop een go.

**Vehikel:** het bestaande Next.js-project in de projectroot. We hergebruiken de
werkende plumbing en vervangen de visuele laag ("de sessie als partituur") volledig
door de Claude Design-look.

**Bevestigde keuzes (uit brainstorm):**
- **Copy:** lean houden zoals Lucas goedkeurde; alleen wettelijk/praktisch verplichte
  aanvullingen erbij. Géén terugvouwen van de "partituur"-copy (intermezzo, tempo/
  movement/ghost-woorden, expliciete themalijst).
- **Beelden:** de 3 geëxtraheerde JPEG's nu gebruiken; echte foto's van Lucas +
  interieur volgen later.
- **Formulier:** volledig werkend bouwen; concrete EU-mailprovider later via env.
- **Privacy:** ik lever een GDPR-template (NL/EN) die Lucas/jurist nakijkt vóór livegang.
- **Taal & SEO:** echte routes (`/` NL, `/en` EN) + `hreflang` — nu in scope (zie §3.9).
- **Copy-onderhoud:** alle tekst losgekoppeld in `content.ts`; verandert nog vaak (zie §4).

**Nieuwe input van Lucas (chat, 2026-07-08):**
- GSM **0493/02.05.43**, e-mail via contactformulier.
- Visum **374462**, Erkenning **991135455**, Ondernemingsnummer **0790.741.228** —
  mag zichtbaar op de site.
- **Betalen:** via **Payconiq** of **overschrijving**. IBAN **BE53 3632 2546 8153**
  mag vermeld worden.
- **Queerness impliciet:** géén expliciete zelf-outing. Wél een aandachtsgebied
  "interesse in seksualiteit en genderproblemen" benoembaar. → Identiteitsgevoelig:
  finale formulering vereist Lucas' expliciete akkoord.

---

## 2. Twee expliciete verfijningen op de UX

### 2.1 Vloeiend scrollen (kernwens)
De bundle voelde "hakkelig". Oorzaak: elke sectie was exact `100vh` met
`scroll-snap-align:start` **en** `scroll-snap-stop:always` op de scroll-container.
Verplichte snap onderbreekt de natuurlijke scroll-momentum (zeker op trackpad) en
geeft juist dat schokkerige gevoel.

**Aanpak voor "vanzelf naar de volgende sectie vloeien":**
- **Geen mandatory scroll-snap.** Doorlopend, natuurlijk scrollen. (Optioneel later:
  zachte `scroll-snap-type: y proximity` zonder `stop:always` — maar default = uit,
  eerst zonder testen.)
- **Scroll-gedreven parallax (kern van het "vloeien"):** sectiebeelden bewegen ietsje
  trager mee dan de tekst tijdens het scrollen. Dit geeft het cinematische
  meevloei-gevoel sterker dan snap. Implementatie via CSS **`animation-timeline: view()`**
  (scroll-driven, GPU, geen JS-jank); fallback: statisch beeld waar niet ondersteund.
- **`scroll-behavior: smooth`** enkel voor anker-navigatie (indien nav-links).
- **Reveal-on-scroll verfijnd:** bij voorkeur **CSS scroll-driven** (`view()`) i.p.v. een
  IntersectionObserver per blok — minder main-thread-werk = minder hakkeligheid. Zachte
  easing, korte afstand (translateY ~16px), uniform over alle secties. Respecteer
  `prefers-reduced-motion` (dan géén transform/animatie).
- **GPU-vriendelijk:** uitsluitend `opacity` en `transform` animeren (nooit `top`/`height`);
  `will-change` spaarzaam.
- **Ken-burns & scroll-cue** behouden maar subtiel; uit bij `prefers-reduced-motion`.

### 2.2 Genoeg ruimte
- Secties krijgen **`min-height`** (niet vaste `height:100vh`) zodat inhoud kan
  meegroeien en nooit klemt; royale verticale padding (ruime `clamp()`-waarden).
- Consistente horizontale marges met de linker-rail-inspringing (~92px desktop,
  schaalt af op mobiel).
- Comfortabele leesmaten en regelafstand behouden uit de Claude Design (Spectral
  body ~1.7–1.8 line-height, `max-width` op tekstblokken).

### 2.3 Design-aanscherpingen (frontend-design walkthrough)
Richting blijft ongewijzigd (cinematisch clair-obscur, verfijnd-minimaal); dit zijn
scherpere executies binnen die richting:

- **Signatuur-moment:** subtiele "licht door oud glas"-spectrumbreking bij de overgang
  hero → Verwelkoming — impliciet queer-signaal, nooit benoemd (past bij Lucas' "impliciet").
  Het ene onvergetelijke detail; spaarzaam en kalm.
- **Hero-intro georkestreerd:** één gestaggerde entree (titel → brass-accentregel →
  subtitel → scroll-cue) i.p.v. losse effectjes. Rust = vertrouwen.
- **Typografie:** `text-wrap: balance` op koppen, `text-wrap: pretty` op body. De
  Spectral-italic-brass accentregel wordt de terugkerende signatuur (o.a. slotzin per sectie).
- **Sectienummering consistent 01–05** in JetBrains-Mono-labels (Hero = 01). De bundle
  sprong inconsistent naar 03/04/05; dat rechttrekken versterkt het editorial-systeem.
- **Beeld-bleed:** bij de 2-koloms-secties bloedt het beeld tot de schermrand, terwijl de
  tekst op de rail-inspringing (~92px) blijft. "Eén rand bloedt, één rand lijnt."
- **Verwelkoming verankeren:** het zwevende tekstblok krijgt een subtiel architecturaal
  ankerelement (haarlijn of gedempte brass-index), zonder clutter.
- **Hover/focus:** zachte brass-transities op knoppen, links en taal-pil; zichtbare
  brass focus-ring voor toetsenbordgebruik.

### 2.4 Toegankelijkheid (UX-basis op een donker design)
- **Contrast:** gedempte grijzen (`#9a9186`, `#8b8377`, `#6b655c`) tegen `#0E0D0C`
  controleren op WCAG AA (4.5:1 body / 3:1 large); waar nodig lichter zetten. Grain-laag
  mag tekstcontrast niet verder aantasten.
- **Semantiek:** echte `<section>`, `<h1>`–`<h2>`, `<nav>`, `<form>` i.p.v. enkel `<div>`
  (de bundle was volledig div-gebaseerd).
- **Formuliervelden:** echte, zichtbare `<label>`s (geen placeholder-only, zoals de bundle).
- **Beelden:** betekenisvolle `alt`; puur decoratieve beelden `alt=""`.
- **Motion:** `prefers-reduced-motion` schakelt parallax, ken-burns, reveals en cue uit.

---

## 3. Architectuur

### 3.1 Hergebruikt (blijft, met aanpassing)
| Bestand | Rol | Aanpassing |
|---|---|---|
| `app/lib/content.ts` | "lichte CMS", NL/EN | Terugsnoeien naar lean copy + compliance/betaalinfo; partituur-velden weg |
| `app/lib/LanguageProvider.tsx` | NL/EN | Aanpassen naar **route-gebaseerde** locale (`/` NL, `/en` EN); pil wordt link naar andere route (zie §3.9) |
| `app/api/contact/route.ts` | formulier → e-mail, niets opgeslagen | Behouden; velden afstemmen op nieuw formulier |
| `app/layout.tsx` | fonts, metadata, provider | Fonts vervangen (zie 3.4); metadata behouden/bijwerken |
| `app/globals.css` | design-systeem | Herschrijven naar Claude Design-tokens |

### 3.2 Weg (partituur-componenten)
`Hero`, `Welkom`, `Intermezzo`, `Werkwijze`, `OverMij`, `Praktisch`, `SiteHeader`,
`SiteFooter`, `GhostWord`, `ScoreLine`, `Reveal`, `useReveal` — worden vervangen door
de nieuwe componenten hieronder (namen mogen hergebruikt worden waar logisch).

### 3.3 Nieuwe componenten (1:1 naar de Claude Design)
| Component | Inhoud / bron in bundle |
|---|---|
| `GrainOverlay` | sticky grain-laag (SVG-noise, `mix-blend-mode: soft-light`) |
| `SideRail` | verticale "Klinisch psycholoog · psychoanalytische praktijk"-rail |
| `TopChrome` | naam links; "Gent · BE" + NL/EN-pil rechts (via LanguageProvider) |
| `Hero` | full-bleed hero-foto, ken-burns, brass radial-gloed, titel Archivo + *"en vertel."* Spectral-italic, subtitel, scroll-cue |
| `Verwelkoming` | gecentreerde Spectral-tekst, brass-slotzin |
| `Werkwijze` | 2-koloms: tekst + werkwijze-foto met gradient-masks |
| `OverMij` | 2-koloms: portret + tekst + exacte officiële titels |
| `PraktischContact` | 2-koloms: praktische tekst + **werkend** formulier; **uitgebreid** met GSM, registratienummers, betaalinfo |
| `LocatieKaart` | locatieblok met **SVG-kaartje** van de praktijk (Sint-Pietersnieuwstraat 97, bij de Boekentoren) + adres/caption |
| `SiteFooter` | naam + crisis-regel + **privacy-link + registratie** |
| `ContactForm` | client-component; velden + submit → `/api/contact`; success/error-states |
| `Reveal` | wrapper met IntersectionObserver-reveal (reduced-motion-safe) |

### 3.4 Fonts
Claude Design gebruikt **Archivo** (sans, titels/UI), **Spectral** (serif, body/quotes),
**JetBrains Mono** (mono labels). Alle drie beschikbaar via `next/font/google` →
**self-hosted** (geen runtime-calls naar Google's servers; GDPR voor een zorgsite).
Vervangt de huidige Bricolage Grotesque + Newsreader in `layout.tsx`.

### 3.5 Design-tokens (uit de bundle)
- Achtergronden: `#0E0D0C` (basis), `#100E0C` (sectie-variant), randen `#1c1915`.
- Brass-accent: `#C2A683`; secundair `#9a9186`, `#8b8377`, `#6b655c`.
- Tekst: `#F1EDE5` (titels), `#E7E3DB` (body-licht), `#cdc7bc` (body-gedempt).
- Als CSS-custom-properties in `globals.css`; inline-styles uit de bundle worden nette
  CSS/Tailwind-utilities.

### 3.6 Beelden & performance
De 3 JPEG's (hero 405 KB, werkwijze 689 KB, portret 149 KB) → `public/images/`,
geserveerd via `next/image`. Elk met een codecommentaar "tijdelijk — vervang door
echte foto van Lucas/interieur". **Actiepunt Lucas:** bevestig dat het portret
daadwerkelijk Lucas is vóór livegang.

- **Hero = LCP:** `priority`, AVIF/WebP, responsive `sizes`. De andere beelden lazy.
- **Vaste beeldverhoudingen** reserveren (geen CLS-sprong bij laden).
- **Jank-bronnen temmen:** `backdrop-filter: blur` (taal-pil) en gestapelde gradients +
  grain zijn de klassieke mobiele jank-oorzaken → blur spaarzaam of vervangen door
  halftransparante fill; effecten testen op mobiel.

### 3.7 Nieuwe route
`app/privacy/page.tsx` — privacyverklaring (NL/EN via LanguageProvider), GDPR-template:
welke gegevens (contactformulier), doel, geen tracking/advertentiecookies, bewaartermijn,
rechten betrokkene, contact. Gemarkeerd als "concept — juridisch na te kijken".

### 3.8 Rendering-strategie (soepelheid via architectuur)
- **Server Components by default.** Alleen client waar nodig: `ContactForm`,
  `LanguageProvider`, en de (minimale) scroll-/reveal-logica. Kleinere JS-bundle =
  snellere, gladdere interactie.
- **Fonts** via `next/font` met `size-adjust` om fontswap-sprong (CLS) te vermijden;
  latin-subset om payload te beperken.

### 3.9 SEO & structured data
- **`LocalBusiness` / `Person` JSON-LD** (naam, beroep, Gent, adres/NAP, taal). Cruciaal
  voor vindbaarheid van een one-pager op "psycholoog Gent".
- **Meta + Open Graph:** een donker, cinematisch **OG-beeld** ontwerpen (nu ontbreekt dit —
  gedeelde links tonen niets). Titel/omschrijving NL/EN.
- **Bilinguale SEO — beslist: routes + `hreflang`, nu in scope.** Idiomatische Next 16
  i18n: `app/[lang]/` met locales **`/nl`** (default) en **`/en`**; `proxy.ts` verwijst
  `/` (en ongeprefixte paden) door naar de juiste locale. Taal wordt server-side uit de
  route bepaald, zodat beide talen volledig crawlbaar zijn. `hreflang`-tags + per-taal
  meta/OG. De NL/EN-pil wordt een link naar de andere locale-route (Next.js
  client-navigatie houdt het instant-gevoel). Content-locale komt van de server; geen
  puur client-side state meer als bron van waarheid.

### 3.10 Locatiekaart (SVG, extern aangeleverd)
Een locatieblok in de praktisch/contact-zone toont een **SVG-kaartje** van de praktijk,
door Lucas/gebruiker apart gemaakt in de sitestijl.
- **Slot-aanpak:** `LocatieKaart` importeert de SVG als component (bv.
  `app/components/map/PraktijkKaart.svg` of een `.tsx` die de SVG rendert). Tot de SVG er
  is: een **placeholder in dezelfde stijl** (donker vlak, brass-hairline kader, "kaart volgt").
- **Styling:** past in het design-systeem (brass-accent, `#0E0D0C`-basis); responsive
  (`max-width:100%`, schaalt mee), geen horizontale overflow.
- **Toegankelijkheid:** de SVG krijgt `role="img"` + `aria-label` (adres), of een tekstueel
  adres ernaast; niet enkel visueel.
- **Adres eronder:** Sint-Pietersnieuwstraat 97, 9000 Gent — naast de Boekentoren
  (staat al in `content.ts`).
- **Geen externe kaart-embed** (geen Google Maps-iframe) → geen third-party tracking, GDPR-vriendelijk.

---

## 4. Contentwijzigingen in `content.ts` (lean + compliance)

> **Ontwerpprincipe (belangrijk): copy is volledig losgekoppeld van layout.**
> Lucas' teksten veranderen naar verwachting nog vaak. Álle zichtbare tekst (NL + EN)
> leeft uitsluitend in `content.ts`; componenten bevatten geen hardcoded copy. Een
> tekstwijziging = één plek aanpassen, nooit een component aanraken, geen risico op breuk.
> Structuur blijft plat en leesbaar (per taal, met commentaar bij de letterlijke kernteksten).

**Behouden (letterlijke kernteksten, ongewijzigd):** Verwelkoming, Over mij +
werkervaring, Praktisch (richtprijs/richtduur, "Niet-geconventioneerd…"),
contact-microcopy (voicemail), officiële titels exact.

**Toevoegen / aanpassen:**
- **GSM** 0493/02.05.43 zichtbaar (Praktisch + footer), `tel:`-link.
- **Registratie:** Visum 374462 · Erkenning 991135455 · Ondernemingsnummer 0790.741.228
  (Over mij + footer).
- **Betaalinfo (nieuw):** "Betalen kan via Payconiq of overschrijving." + IBAN
  BE53 3632 2546 8153.
- **Crisis:** Zelfmoordlijn 1813 + huisarts van wacht (zoals in de goedgekeurde design;
  discreet onder de contactzone).
- **Queerness (impliciet, te bevestigen):** één subtiele zin dat er bijzondere ruimte/
  interesse is voor vragen rond seksualiteit en gender — zónder eerste-persoons-outing.
  Bijv. als aandachtsgebied in Werkwijze/Over mij. **Definitieve formulering: Lucas' akkoord.**

**Verwijderen (partituur):** intermezzo-quote, tempo/movement/ghost-velden, expliciete
themalijst met psychotisch/bipolair (tenzij Lucas dit alsnog wil — nu niet in lean scope).

---

## 5. Formulier & privacy

- **Velden:** conform de goedgekeurde design (Naam, E-mail, Bericht), plus optioneel
  telefoon (kort). Honeypot-veld tegen bots (bestaat al in de API).
- **Gedrag:** client-side validatie (verplicht + e-mailformaat), submit → `/api/contact`,
  duidelijke success/error-copy. Bij ontbrekende mailprovider blijft de UI werken; het
  zichtbare contactkanaal (telefoon) is de betrouwbare terugval.
- **Privacy:** niets op de server opgeslagen (bestaande API-garantie); geen tracking,
  geen advertentiecookies. Formulier verwijst naar `/privacy`.

---

## 6. Bouwvolgorde (globaal — detail komt in implementatieplan)

1. **Lees `node_modules/next/dist/docs/`** (AGENTS.md: dit is een gewijzigde Next.js) —
   fonts, `next/image`, App Router-conventies verifiëren vóór code.
2. Extractie-script: 3 JPEG's → `public/images/` (herhaalbaar gedocumenteerd).
3. Design-tokens + fonts in `globals.css` en `layout.tsx`.
4. `content.ts` herstructureren (lean + compliance/betaal/queer-veld).
5. Componenten bouwen in leesvolgorde (GrainOverlay/SideRail/TopChrome → Hero →
   Verwelkoming → Werkwijze → OverMij → PraktischContact + ContactForm → LocatieKaart
   → SiteFooter).
6. Scroll-parallax + reveal-gedrag (CSS scroll-driven, reduced-motion-safe) + a11y-pass
   (labels, contrast, focus, semantiek).
7. `/privacy`-pagina + GDPR-template.
8. Bilinguale routes (`/`, `/en`) + `hreflang`; SEO-laag: `LocalBusiness`/`Person`
   JSON-LD, meta + OG-beeld (zie §3.9).
9. `LocatieKaart` met SVG-slot + placeholder (zie §3.10).
10. Verificatie (zie §7).

---

## 7. Verificatie (definition of done)

- `npm run build` slaagt (type-check + productie-build).
- Site lokaal (`npm run dev`) — visueel per sectie gecontroleerd tegen de Claude Design.
- **Scrollen voelt vloeiend** (geen harde snap-schokken); getest op muis + trackpad.
- NL/EN-toggle wisselt alle teksten correct.
- Formulier: validatie werkt; submit geeft juiste success/error; zonder provider blijft
  UI werken.
- `prefers-reduced-motion` schakelt animaties (parallax, ken-burns, reveals, cue) uit.
- Responsive: mobiel/tablet/desktop — geen horizontale overflow; ruimte blijft royaal;
  2-koloms-secties stapelen sterk op mobiel.
- **Toegankelijkheid:** tekstcontrast haalt WCAG AA; formuliervelden hebben echte labels;
  zichtbare brass focus-ring; semantische HTML.
- **Performance:** hero laadt als geoptimaliseerde LCP (AVIF/WebP, `priority`); geen
  merkbare jank op mobiel (blur/grain getest).
- **SEO:** `LocalBusiness`/`Person` JSON-LD aanwezig en valide; OG-beeld + meta NL/EN gezet.
- Alle compliance-info aanwezig: GSM, registratie, betaalinfo, crisis, privacy-link.
- `LocatieKaart` toont de SVG (of nette placeholder) + adres, responsive, met `aria-label`.

---

## 8. Bewust NIET (scope-grenzen)

- Geen echte fotografie (placeholders/tijdelijke foto's tot Lucas' beelden er zijn).
- Geen definitieve hero-quote (PRD-open; huidige tekst blijft tot Lucas kiest).
- Geen live mailprovider-config (env-stap later); geen domeinaankoop/-koppeling.
- Geen juridisch gevalideerde privacytekst (template ter nazicht).
- Geen terugkeer van de partituur-copy of extra secties buiten bovenstaande.
