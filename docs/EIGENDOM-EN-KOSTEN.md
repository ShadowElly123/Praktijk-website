# Wie bezit wat, en wat kost het

Overzicht om in één gesprek met Lucas door te nemen. Uitgangspunt: **Lucas is
eigenaar van alles, Lieven beheert alles.** Hij moet nergens zelf in klikken, maar
als de samenwerking ooit stopt of Lieven wegvalt, blijft de site van hem en kan
iemand anders het overnemen.

Peildatum: 27 juli 2026.

---

## Het overzicht

| Wat | Op wiens naam | Kost | Als je het verliest |
|---|---|---|---|
| Domeinnaam (Combell) | Lucas | 15-25 euro / jaar | **Onherstelbaar.** Iemand anders kan de naam nemen. |
| Code (GitHub) | Lucas | gratis | **Onherstelbaar.** Site niet meer te wijzigen of te verhuizen. |
| Hosting (Netlify) | Lucas | gratis | Lastig maar oplosbaar: opnieuw deployen vanaf GitHub, halve dag. |
| Mailverzending (Resend) | Lucas | gratis | Twintig minuten: nieuw account, domein opnieuw verifiëren, sleutel vervangen. |
| Google Business Profile | Lucas | gratis | Zwaar: dit is je grootste bron van vindbaarheid. Terugclaimen kan weken duren. |
| Bezoekersstatistieken (PostHog) | Lucas of Lieven | gratis | Niks. Alleen historische cijfers weg. |

**Totale vaste kost: 15 tot 25 euro per jaar.** Dat is de domeinnaam en niets anders.

De twee regels in het vet zijn de enige waar echt iets op het spel staat. Die twee
moeten zonder discussie op zijn naam en met zijn mailadres. De rest is comfort.

---

## Het praktische probleem, en de oplossing

Alle gratis plannen geven één gebruiker. Netlify Free is "individual", Resend rekent
voor een tweede gebruiker het Pro-tarief. Wil je een tweede persoon met eigen login,
dan betaal je overal 20 dollar per maand per dienst. Voor deze site is dat
weggegooid geld.

De oplossing is dus niet "twee accounts" maar **één account met gedeelde sleutels**:

Zet alle accounts op Lucas' naam en mailadres, en steek de inloggegevens in een
gratis gedeelde wachtwoordkluis. **Bitwarden** laat twee mensen gratis één kluis
delen. Lucas is eigenaar, Lieven heeft toegang, niemand betaalt.

Dat lost het in één keer op voor Combell, Netlify, Resend en Google. En het is
tegelijk het antwoord op de vraag "wat als Lieven wegvalt": de kluis is de
overdracht.

Eén uitzondering, ten goede: **GitHub geeft wél gratis onbeperkt medewerkers**, ook
op privérepo's. Daar kan je het dus netjes doen, met een eigen account per persoon
en Lucas als eigenaar.

---

## Wat er moet gebeuren, in volgorde

Vier stappen. De eerste drie doe je samen in één sessie van drie kwartier, de vierde
doet Lieven alleen.

### 1. Wachtwoordkluis opzetten (10 min, samen)
Bitwarden-account voor Lucas, gratis organisatie aanmaken, Lieven uitnodigen. Alles
wat hierna volgt gaat er meteen in.

### 2. Domeinnaam kopen (15 min, Lucas typt)
Zie [DOMEINNAAM-AANVRAGEN.md](DOMEINNAAM-AANVRAGEN.md). Zijn naam, zijn adres, zijn
kaart, automatische verlenging aan. Login in de kluis.

### 3. Accounts aanmaken (20 min, Lucas typt, Lieven kijkt mee)
- Netlify, op zijn mailadres
- Resend, op zijn mailadres, zie [RESEND-OVERDRACHT.md](RESEND-OVERDRACHT.md)
- GitHub, op zijn mailadres, en Lieven als medewerker toevoegen

Alle logins in de kluis. Daarna hoeft hij hier nooit meer te zijn.

### 4. Overzetten en live zetten (Lieven alleen)
- repo overzetten naar Lucas' GitHub
- site deployen op Netlify
- DNS bij Combell naar Netlify
- domein verifiëren in Resend, sleutel en env vars zetten
- testen met een echte inzending

---

## Twee dingen die je moet weten over Netlify Free

Commercieel gebruik mag, dat staat expliciet in hun voorwaarden. Alleen hosting
doorverkopen mag niet, en dat doen we niet. Dit is het verschil met Vercel, waar het
gratis plan commercieel gebruik verbiedt en een praktijksite dus formeel niet mag.
Dat was de reden om te verhuizen.

**Ga je over de gratis limieten, dan wordt de site geschorst tot de eerste van de
volgende maand.** Geen waarschuwing met respijt, gewoon plat. De limieten zijn voor
deze site onbereikbaar: 100 GB verkeer per maand, terwijl een praktijksite met wat
foto's aan enkele honderden megabytes zit. Maar het is wel het scenario om te kennen,
want het gevolg is onevenredig zwaar. Zet daarom de verbruiksmails van Netlify niet
op een adres dat niemand leest.

**Netlify draait Next.js via een tussenlaag (de OpenNext-adapter), niet native.**
Next.js 16 is officieel ondersteund, dus vandaag is er niks aan de hand. Maar bij
een toekomstige grote Next-upgrade kan de adapter een paar weken achterlopen. Dat is
geen probleem zolang je niet haastig moet upgraden, en dat hoeft nooit voor deze
site.

---

## Wat Lucas hierna nog moet doen

Eén keer per jaar een factuur van 15 tot 25 euro voor de domeinnaam betalen, en zijn
bankkaart geldig houden bij Combell. Dat is alles.

En één blad in zijn dossierkast met daarop: het domein staat bij Combell, de site op
Netlify, de code op GitHub, de mail loopt via Resend, en de wachtwoorden staan in
Bitwarden. Geen wachtwoorden op dat blad, enkel de vindplaatsen. Dat is het verschil
tussen "we zoeken het uit" en "de site is weg".

---

Bronnen voor de Netlify-uitspraken:
[commercieel gebruik toegestaan](https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545/2),
[Next.js 16 ondersteund](https://www.netlify.com/changelog/next-js-16-deploy-on-netlify/),
[prijzen en teamleden](https://www.netlify.com/pricing/).
