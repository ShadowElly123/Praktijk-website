---
version: alpha
name: Lucas Borghys — Clair-obscur
description: >-
  Visuele identiteit voor de praktijkwebsite van Lucas Borghys, klinisch
  psycholoog te Gent. Cinematisch clair-obscur: een diep donkere, warme basis
  met één messing accent, architecturale sans-titels en een literaire serif
  voor lopende tekst.
colors:
  primary: "#c2a683"
  surface: "#0e0d0c"
  surface-alt: "#100e0c"
  on-surface-strong: "#f1ede5"
  on-surface: "#e7e3db"
  on-surface-muted: "#cdc7bc"
  on-surface-subtle: "#9a9186"
  on-surface-faint: "#8b8377"
  on-surface-min: "#857d71"
  outline: "#1c1915"
  outline-2: "#2a251e"
  outline-3: "#2f2a22"
  outline-4: "#3a352c"
  error: "#c98b76"
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 116px
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 58px
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -0.02em
  quote-lg:
    fontFamily: Spectral
    fontSize: 46px
    fontWeight: 300
    lineHeight: 1.4
  body-lead:
    fontFamily: Spectral
    fontSize: 30px
    fontWeight: 300
    lineHeight: 1.65
  body-lg:
    fontFamily: Spectral
    fontSize: 19px
    fontWeight: 300
    lineHeight: 1.8
  body-md:
    fontFamily: Spectral
    fontSize: 17px
    fontWeight: 300
    lineHeight: 1.6
  body-sm:
    fontFamily: Spectral
    fontSize: 15px
    fontWeight: 300
    lineHeight: 1.7
  brand-mark:
    fontFamily: Bricolage Grotesque
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.16em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.3em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.2em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.34em
rounded:
  none: 0px
  sm: 2px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 32px
  rail: 92px
  measure: 520px
  content-max: 1100px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 14px
  button-ghost:
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 10px
  button-ghost-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  input-field:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 14px
  input-field-focus:
    textColor: "{colors.on-surface-strong}"
  card-outlined:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 28px
  language-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  section-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  section-surface-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
  text-body:
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
  text-muted:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-md}"
  caption:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.body-sm}"
  label-mono:
    textColor: "{colors.on-surface-faint}"
    typography: "{typography.label-md}"
  legal-note:
    textColor: "{colors.on-surface-min}"
    typography: "{typography.label-md}"
  form-error:
    textColor: "{colors.error}"
    typography: "{typography.label-md}"
  divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.outline-2}"
    height: 1px
  input-underline:
    backgroundColor: "{colors.outline-3}"
    height: 1px
  frame-outline:
    backgroundColor: "{colors.outline-4}"
    height: 1px
---

# DESIGN.md — Lucas Borghys

## Overview

Een praktijkwebsite voor een klinisch psycholoog in Gent, gericht op de queer
community, jonge volwassenen, studenten en kunstenaars, plus verwijzers.

De toon is **cinematisch clair-obscur**: licht dat uit het donker opduikt, zoals
in een historisch herenhuis met hoge plafonds. Architecturaal en warm, nooit
klinisch. De site is één doorlopende scroll die kalm van sectie naar sectie
vloeit; er is geen harde scroll-snap en geen navigatiemenu.

Emotioneel doel: serieus genomen worden in wat weegt. Ruimte voor andersheid.
De interface mag nooit druk, betuttelend of "medisch" aanvoelen. Rust en
royale leegte zijn belangrijker dan dichtheid. Beweging is traag en zacht;
alles respecteert `prefers-reduced-motion`.

Vermijd expliciet: felle of verzadigde medische blauwen en groenen, stockfoto's
van handen, diepe submenu's, en elke vorm van testimonials of reviews (dat is
deontologisch verboden voor deze praktijk).

## Colors

Het palet is bijna monochroom: een diep, warm donker als fundament met één
enkel messing accent dat alle aandacht stuurt.

- **Primary (#c2a683):** Messing/pianohout. Het enige accent, en de enige
  kleurdrager voor labels, links, de praktijk-pin op de kaart en de primaire
  knop. Spaarzaam gebruiken — zodra brass overal staat, stuurt het niets meer.
- **Surface (#0e0d0c):** De donkere basis, warm gebroken zwart (geen puur
  zwart). **Surface-alt (#100e0c)** wisselt secties subtiel af zodat er ritme
  ontstaat zonder harde scheiding.
- **On-surface (#e7e3db):** Zachte off-white voor lopende tekst; nooit fel wit,
  om glare op een donkere achtergrond te vermijden.
  **On-surface-strong (#f1ede5)** is voor titels.
- **On-surface-muted → -min (#cdc7bc, #9a9186, #8b8377, #857d71):** Een trap van
  gedempte grijzen voor secundaire tekst, captions en mono-labels. `-min` is
  bewust opgetild uit de oorspronkelijke ontwerpbron om WCAG AA te halen voor
  kleine tekst.
- **Outline (#1c1915 → #3a352c):** Haarlijnen en kaders. Structuur wordt met
  lijnen gemaakt, niet met vlakken of schaduwen.
- **Error (#c98b76):** Een gedempt terracotta voor validatiefouten — warm
  genoeg om niet te alarmeren op een zorgsite.

## Typography

Drie schriften met elk een duidelijke rol:

- **Bricolage Grotesque** draagt de titels. Strak en architecturaal, met
  negatieve letterspatiëring op grote maten; verwijst naar de hoge, rechte
  lijnen van het pand.
- **Spectral** draagt alle lopende tekst en citaten. Een literaire serif met
  ruime regelafstand (1.6–1.8) die de psychoanalytische traagheid draagt.
  Citaten en secundaire noten staan **cursief**.
- **JetBrains Mono** draagt uitsluitend labels: sectiekoppen, veldlabels,
  kaartlabels en de verticale zijrail. Altijd uppercase met royale
  letterspatiëring (0.2em–0.34em), wat de precisie van een plattegrond evoceert.

De hero zet een sans-titel en een cursieve serif-regel in brass tegen elkaar
(`display-hero` + `quote-lg` in italic). Die combinatie is de signatuur van het
merk en keert terug als slotzin per sectie.

Alle groottes in de tokens zijn de bovengrens; in code zijn het `clamp()`-waarden
die vloeiend meeschalen (bv. hero: `clamp(52px, 8vw, 116px)`).

## Layout

Eén doorlopende verticale scroll, zonder navigatiemenu. De pagina gebruikt een
**asymmetrische rail**: tekst springt links in op `rail` (92px), waar ook een
verticale mono-rail met de beroepsomschrijving staat. Beelden bloeden juist
door tot de schermrand. "Eén rand lijnt, één rand bloedt" is de leidende regel
voor de tweekoloms-secties.

Secties hebben een `min-height` van 100vh maar mogen meegroeien met hun inhoud;
verticale ruimte is royaal (12–18vh per sectie). Tekstblokken zijn begrensd op
`measure` (520px) voor leesbaarheid; de brede blokken op `content-max` (1100px).

Onder 900px stapelen alle tweekolommen naar één kolom, verdwijnt de zijrail en
krimpt de horizontale inspringing naar 40px (28px onder 480px).

## Elevation & Depth

Diepte komt **niet** van schaduwen. Er zijn geen box-shadows in dit systeem.

In plaats daarvan:

- **Licht uit het donker.** Radiale brass-gloeden ("spotlights") liggen achter
  kopteksten en beelden en suggereren een lichtbron buiten beeld.
- **Gradient-maskers.** Beelden vervagen naar de achtergrondkleur toe. Het
  portret vervaagt aan alle vier de zijden naar transparant, zodat het in de
  achtergrond opgaat in plaats van als kader te staan.
- **Filmkorrel.** Een fijne ruis-laag ligt over de hele pagina in
  `soft-light`, wat de vlakken analoog en filmisch maakt.
- **Parallax.** Sectiebeelden bewegen bij het scrollen trager dan de tekst,
  wat lagen suggereert zonder de layout te verstoren.

## Shapes

**Architecturale scherpte.** Vlakken, kaders, invoervelden en de primaire knop
hebben rechte hoeken (`rounded.none`). Kaders zijn 1px haarlijnen in de
`outline`-trap.

De enige uitzondering is de taalwissel-pil, die volledig rond is
(`rounded.full`) omdat hij als schakelaar moet lezen, niet als vlak. De
kaartomlijsting gebruikt losse hoekmarkeringen in plaats van een doorlopend
kader, wat het geheel als technische tekening laat lezen.

## Components

- **Buttons.** De primaire knop is een massief brass vlak met donkere tekst,
  rechte hoeken, geen icoon. De ghost-knop (bv. "Route") is een brass omlijning
  met brass tekst die bij hover/focus **omkeert** naar een gevuld brass vlak.
- **Input fields.** Volledig transparant met enkel een onderlijn
  (`outline-3`), die bij focus naar brass kleurt. Labels staan **zichtbaar**
  boven het veld in `label-md` — nooit alleen een placeholder. Foutmeldingen
  verschijnen eronder in `error`, gekoppeld via `aria-describedby`.
- **Section kicker.** Elke sectie opent met een `label-lg` in brass, gevolgd
  door een dunne lijn die naar transparant verloopt.
- **Info list.** Praktische gegevens staan als definitielijst: mono-label links
  (vaste kolom van 140px), serif-waarde rechts, met een haarlijn boven elke rij.
  Getallen (telefoon, IBAN, registratienummers) gebruiken `tabular-nums`.
- **Card (outlined).** Een 1px kader met royale binnenruimte, gebruikt voor het
  crisis-kader. Geen vulkleur, geen schaduw.
- **Language pill.** Twee segmenten in een ronde omlijning; het actieve segment
  is gevuld brass met donkere tekst.
- **Map.** Een zelfgetekende SVG in dezelfde taal: straten als dunne
  brass-lijnen, water als donker lint, labels in mono, en de praktijk als
  pulserende brass-pin.

## Do's and Don'ts

- Do gebruik brass als enige accent en houd het schaars — het moet aandacht
  kunnen sturen.
- Don't gebruik puur zwart (#000) of puur wit (#fff); het palet is warm gebroken.
- Do maak structuur met haarlijnen en ruimte, niet met schaduwen of vlakken.
- Don't voeg box-shadows of afgeronde hoeken toe aan vlakken; alleen de
  taalwissel-pil is rond.
- Do zet labels altijd zichtbaar boven invoervelden; een placeholder is geen label.
- Don't laat kleine tekst onder WCAG AA zakken op de donkere achtergrond;
  `on-surface-min` is de ondergrens voor kleine tekst.
- Do laat beelden via maskers in de achtergrond vervagen in plaats van ze in een
  kader te zetten.
- Don't gebruik meer dan één sans- en één serif-schrift; mono is uitsluitend
  voor labels.
- Do respecteer `prefers-reduced-motion` bij elke animatie (parallax, ken-burns,
  reveals).
- Don't voeg testimonials, reviews of vergelijkende uitspraken toe — dat is
  deontologisch verboden voor deze praktijk.
