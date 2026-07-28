# Lucas Borghys · website · overdracht & status

One-page website voor klinisch psycholoog Lucas Borghys (Gent), gebouwd op basis
van de PRD. Clair-obscur / cinematografisch, donker met warme brass-tinten.

## Concept: de sessie als partituur
Lucas is muzikant (piano als bureau, hoorn, pupiter). De pagina is opgebouwd
als een muziekstuk: hero = *ouverture*, secties zijn delen (I t/m IV) met
tempo-aanduidingen (cantabile, adagio, tenuto, coda), sectiekoppen zijn
"partituurlijnen" met een fragment notenbalk, en het citaat is een *intermezzo*
met een fermate (het teken voor "houd aan zolang nodig"). Grote geghoste
woorden (vertel, spreken, verhaal) zweven achter de secties: de taal als decor.
In het herolicht zit een zeer subtiele warme spectrumbreking ("licht door oud
glas"): een impliciet queer-signaal, bewust niet benoemd. In Werkwijze staat
een nieuwe alinea over verlangen, lichaam, geaardheid en identiteit, zonder
labels (te bevestigen met Lucas).

## Stack
- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind v4**
- Fonts zelf-gehost via `next/font`: **Bricolage Grotesque** (titels) + **Newsreader** (serif/quotes) — geen runtime-calls naar Google's servers
- Hosting: **Netlify** (zie `netlify.toml`). Was aanvankelijk Vercel, maar Vercel's
  gratis plan verbiedt commercieel gebruik; Netlify's gratis plan laat dat
  expliciet toe.

## Lokaal draaien
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productie-build (type-check)
```

## Structuur
```
app/
  layout.tsx              fonts, metadata, LanguageProvider
  page.tsx                assemblage van de secties
  globals.css             design-systeem (kleuren, grain, animaties)
  lib/
    content.ts            ⭐ ALLE TEKST staat hier (nl / en) — "lichte CMS"
    LanguageProvider.tsx  NL/EN instant-toggle (onthoudt keuze)
    useReveal.ts          scroll-reveal hook
  components/             Hero, Welkom, Werkwijze, OverMij, Praktisch,
                          ContactForm, SiteHeader, SiteFooter, ...
  api/contact/route.ts    formulier → e-mail (geen opslag op server)
```

`research/` (visuele research, screenshots van referentiesites, concurrentie-
analyse) is bewust **niet** in de repo: de repo staat publiek en dat materiaal
hoort niet publiek. Lokale kopie staat in `archief/` (gitignored) op Lievens
machine.

**Tekst aanpassen?** Alles staat in [`app/lib/content.ts`](app/lib/content.ts),
per taal. De Nederlandse kernteksten van Lucas staan daar **letterlijk** bewaard
(gemarkeerd met comments) — niet vertalen/herschrijven zonder overleg.

## Status — live sinds 28 juli 2026

Alle placeholders uit de vorige versie van dit document zijn ingevuld: hero-quote,
foto's, domein, e-mailverzending en privacybeleid staan er. Zie
[EIGENDOM-EN-KOSTEN.md](EIGENDOM-EN-KOSTEN.md) voor wie wat beheert en
[RESEND-OVERDRACHT.md](RESEND-OVERDRACHT.md) voor de mailopzet in detail.

Nog open, geen van alle dringend:
- website-adres invullen in Lucas' Google Business Profile, zie
  [GOOGLE-BUSINESS-PROFIEL.md](GOOGLE-BUSINESS-PROFIEL.md)
- site aanmelden bij Google Search Console
- automatische verlenging + geldige betaalkaart bij Combell bevestigen

### Uptime-monitoring
Er staat een gratis monitor op [UptimeRobot](https://uptimerobot.com) (account
via Lucas' GitHub-login) die `https://lucasborghys.be` elke 5 minuten pingt en
mailt bij downtime — bv. bij een Netlify-schorsing, zodat je het meteen weet in
plaats van dat Lucas zich afvraagt waarom het stil is.

Zelf een monitor toevoegen of nakijken:
1. Inloggen op uptimerobot.com (via Lucas' GitHub-account).
2. **+ Add New Monitor** → Type **HTTP(s)** → URL `https://lucasborghys.be` →
   interval 5 min.
3. Onder **Alert Contacts** het e-mailadres instellen waar meldingen naartoe
   moeten (typisch hetzelfde als `CONTACT_TO` hieronder).

Status vlak na aanmaken toont kort "Preparing" — dat is normaal, na de eerste
check springt hij om naar "Up".

## Formulier & e-mail (privacy)
De API-route slaat **niets** op; ze stuurt de inzending enkel door als e-mail.
Verzending is provider-agnostisch via env-variabelen:

```
CONTACT_TO=naam@voorbeeld.be
RESEND_API_KEY=...        # indien via Resend
CONTACT_FROM="Website <no-reply@send.lucasborghys.be>"
```

Zonder provider werkt de UI (toont succes) maar wordt de mail **niet** verzonden
— daarom staat het e-mailadres altijd zichtbaar als betrouwbare terugvalweg.

> **EU-compliance let op:** Resend is een US-dienst. Voor strikte EU-verwerking
> (PRD-eis) kan de verzendfunctie in `app/api/contact/route.ts` later naar een
> Europese SMTP/provider (bv. Mailjet/Mailgun EU-region of een Belgische SMTP).
> De structuur blijft gelijk; enkel de verzendaanroep wisselt.

## Deontologie (Psychologencommissie) — reeds ingebouwd
- Geen testimonials/reviews/vergelijkingen.
- Officiële titels staan exact: *"Klinisch psycholoog (Erkend door de
  Psychologencommissie, met visum)."* en *"In opleiding tot psychoanalytisch
  therapeut."*
- Crisisnummers (Zelfmoordlijn 1813, Huisarts van wacht 1733, Spoed 112) staan
  discreet onder de contactzone.
- **Analytics: cookieloos, dus géén cookiebanner.** PostHog (EU-region) staat in
  `app/components/Analytics.tsx` met `cookieless_mode: "always"` +
  `persistence: "memory"`: er wordt niets op het toestel van de bezoeker
  opgeslagen (geen cookies/localStorage/sessionStorage). PostHog telt sessies
  via een server-side hash met dagelijks wisselend salt — geen persoonsgegeven.

  ⚠️ **Cookieless mode moet óók aanstaan in de PostHog-projectinstellingen**,
  anders worden alle events stilzwijgend genegeerd.

  Aan: paginabezoeken + pageleave (bounce/tijd/scrolldiepte), autocapture,
  heatmaps, dead clicks, exception- en performance-tracking, plus eigen
  `section_viewed`-events (sectie-funnel op de one-pager) en
  `contact_form_submitted` (conversie, zonder inhoud).

  Uit/onmogelijk: session replay en surveys (werken niet cookieloos én
  ongepast voor deze praktijk), `identify()`/persoonsprofielen. `respect_dnt`
  staat aan. Het contactformulier draagt `data-ph-no-autocapture`, zodat er
  niets uit die gevoelige velden wordt vastgelegd.

  Zie `.env.example` voor `NEXT_PUBLIC_POSTHOG_KEY`/`_HOST`; zonder key
  initialiseert er niets. De privacyverklaring (`content.privacy`) beschrijft
  dit onder "Analytics — zonder cookies" en "U blijft anoniem".

## Referentie-research
Concurrentieanalyse (bressers.be, ritcs.be, twee anti-patterns) en preview-
screenshots staan lokaal in `archief/research/` op Lievens machine, niet in de
repo — zie hierboven waarom.
