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
- Bedoeld voor **Vercel** (EU-region)

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
research/                 visuele research + screenshots van referentiesites
```

**Tekst aanpassen?** Alles staat in [`app/lib/content.ts`](app/lib/content.ts),
per taal. De Nederlandse kernteksten van Lucas staan daar **letterlijk** bewaard
(gemarkeerd met comments) — niet vertalen/herschrijven zonder overleg.

## ⚠️ Nog te doen / te vervangen (placeholders)

1. **Hero-quote** — nu staat er voorlopig *"Wees welkom, en vertel."* (Lucas' eigen
   woorden). PRD-open vraag: Lucas kiest nog de definitieve poëtische/muzikale/
   psychoanalytische quote. Aanpassen in `content.ts` → `hero.quote`.
2. **Foto's** — alle beelden zijn nu donkere CSS-placeholders ("Foto volgt").
   Nodig: low-key (donkere) foto's van Lucas én de praktijkruimte (piano-bureau,
   hoge plafonds, groen, zacht licht). Daarna in Hero + OverMij plaatsen.
3. ~~Telefoonnummer~~ — GSM 0493 02 05 43 staat erop (Praktisch + footer).
   E-mailadres wordt bewust niet getoond (op vraag van Lucas: "zie
   contactformulier"); het dient enkel als bestemming van het formulier.
   Registratie staat in Over mij + footer: visum 374462, erkenning
   991135455, KBO 0790.741.228.
4. **E-mailverzending formulier** — zie hieronder.
5. **Domein** — bv. `lucasborghys.be` (aankopen + koppelen).
6. **Privacybeleid** — de footer/formulier linken naar `#privacy`; er moet nog
   een echte privacyverklaring-tekst komen (verplicht i.v.m. gezondheidsdata).

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
Zie [`research/analyse.md`](research/analyse.md) — analyse van bressers.be,
ritcs.be en de twee anti-patterns, met screenshots in `research/screenshots/`.
Preview-screenshots van de gebouwde site: `research/screenshots/preview/`.
