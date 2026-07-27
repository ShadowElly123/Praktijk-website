# E-mail van het contactformulier · overdracht naar Lucas

Doel van dit document: samen met Lucas het versturen van de contactformulier-mails
op zijn eigen account zetten. Volg dit van boven naar beneden. Reken op 30 minuten,
plus wachttijd voor DNS.

Status vandaag: de code werkt en is getest via een tijdelijk Resend-account op
Lievens persoonlijke mail. Die tijdelijke sleutel moet aan het einde weg.

---

## 1. Wat we gaan doen, in mensentaal

Als iemand het formulier op de website invult, moet die tekst bij Lucas in zijn
gewone inbox belanden. Daarvoor moet de website één mailtje versturen. Resend is
de postbode die dat doet.

Twee dingen die vaak door elkaar lopen, en die je Lucas het best meteen uitlegt:

**Waar de mail aankomt.** Zijn eigen persoonlijke mailadres. Hij moet niks nieuws
leren, nergens inloggen, geen tweede mailbox checken. Aanvragen komen gewoon binnen
waar al zijn andere mail binnenkomt.

**Van wie de mail lijkt te komen.** Dat wordt `no-reply@send.lucasborghys.be`.
Dat is géén nieuw mailadres dat hij moet gebruiken of opvolgen. Er komt daar nooit
iets binnen. Het is puur een verzendlabel, zoals de afzenderstempel op een envelop.

Waarom niet zijn eigen adres als afzender? Omdat je alleen mag versturen vanaf een
domein dat je zelf bezit. Zijn hotmail is van Microsoft, niet van hem. Zou de website
doen alsof ze zijn hotmail is, dan ziet elke spamfilter dat als vervalsing en
verdwijnt de aanvraag.

**En antwoorden?** Werkt normaal. In de mail zit het adres van de bezoeker als
antwoordadres. Lucas klikt in zijn gewone mailprogramma op "Antwoorden" en zijn
bericht gaat rechtstreeks naar die persoon, vanaf zijn eigen adres. Vanaf dat moment
is het een normaal mailgesprek en komt er geen website meer aan te pas.

Dat is de hele uitleg. Als Lucas dit begrijpt, hoeft hij de rest niet te begrijpen.

---

## 2. Voor je begint: drie dingen nodig

- [ ] **Lucas' e-mailadres** waarop hij de aanvragen wil krijgen.
- [ ] **Login bij Combell**, waar `lucasborghys.be` gekocht is. Nodig om de
      nameservers eenmalig naar Netlify te zetten.
- [ ] **Login bij Netlify**, waar de site draait. Daar komen de DNS-records en de
      env vars.

Aanbevolen aanpak: zet bij Combell de nameservers naar Netlify. Dan beheer je alle
DNS-records op één plek, in Netlify, en hoeft niemand daarna nog bij Combell te zijn
behalve om de jaarlijkse factuur te betalen.

---

## 3. Resend-account aanmaken (Lucas doet dit zelf)

1. Ga naar [resend.com](https://resend.com) en klik op Sign up.
2. Lucas registreert met **zijn eigen mailadres**. Hij is dan eigenaar. Belangrijk:
   het account moet op zijn naam staan, niet op die van Lieven, want het hoort bij
   zijn praktijk.
3. Hij bevestigt de mail die hij krijgt.
4. Zet de inloggegevens in de gedeelde wachtwoordkluis. Een tweede gebruiker
   toevoegen kan bij Resend enkel op het betaalde plan, dus die kluis is de manier
   waarop Lieven later bij het account kan zonder dat Lucas eigenaar ophoudt te
   zijn. Zie [EIGENDOM-EN-KOSTEN.md](EIGENDOM-EN-KOSTEN.md).

Kosten: het gratis plan volstaat ruim. Dat is 3.000 mails per maand en 100 per dag.
Een praktijk haalt dat nooit.

---

## 4. Domein toevoegen

In Resend: **Domains** in het linkermenu, dan **Add Domain**.

Vul in: `send.lucasborghys.be`

Let op dat `send.` ervoor. Dat is bewust. Zo blijft het versturen door de website
volledig gescheiden van Lucas' gewone mail. Gaat er ooit iets mis met de reputatie
van de website-mails, dan raakt dat zijn persoonlijke mail niet. En je verandert
niets aan de instellingen die zijn bestaande mail laten werken, wat het risico op
een kapotte mailbox tot nul brengt.

Kies bij de regio **EU (Ireland)** als die keuze er staat. Lucas is psycholoog, dus
Europese verwerking is te verkiezen. Staat de keuze er niet, dan zit die achter een
betaald plan en is dat voor later.

Resend toont nu een lijstje van drie records: één MX en twee TXT. Dat scherm laat
je openstaan.

---

## 5. De DNS-records zetten

Deze records zet je in **Netlify** (Domain management → DNS records), niet bij
Combell. Voorwaarde is dat de nameservers bij Combell al naar Netlify staan, zie
stap 2. Staat dat nog niet, doe dat eerst en wacht tot Netlify het domein als actief
toont.

Je gaat de drie records uit Resend één voor één overtypen of kopiëren.

Dit is het lastigste onderdeel, dus twee valkuilen vooraf:

**Valkuil 1: de domeinnaam dubbel.** Netlify vult zelf het domein aan. Vraagt Resend
een record op `send.lucasborghys.be`, dan typ je in het naamveld enkel `send`. Zie je
na het opslaan `send.lucasborghys.be.lucasborghys.be` staan, dan is dit wat er misging.

**Valkuil 2: de waarde afkappen.** De DKIM-TXT-waarde is een heel lange sliert
tekens. Kopieer die volledig, met de kopieerknop in Resend, niet met de muis
selecteren. Eén ontbrekend teken en het werkt niet.

Voeg daarna nog een vierde record toe dat Resend je niet geeft, maar dat je wel wil
hebben voor bezorging bij Outlook en Gmail:

| Type | Naam | Waarde |
|------|------|--------|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:<Lucas' mailadres>` |

Bestaat er al een `_dmarc`-record, laat het dan staan en verander niks. Dan is het
al geregeld.

Terug in Resend: klik **Verify DNS Records**. Vaak staat het binnen enkele minuten
op groen. Soms duurt het tot 24 uur voor het overal doorgedrongen is. Staat het na
een uur nog op "pending", vergelijk dan letter per letter met wat Resend vraagt.

---

## 6. API-sleutel aanmaken

In Resend: **API Keys**, dan **Create API Key**.

- Naam: `website-contactformulier`
- Permission: **Sending access** (niet Full access, die heeft de website niet nodig)
- Domain: `send.lucasborghys.be`

De sleutel wordt één keer getoond en daarna nooit meer. Kopieer hem meteen.

Deel hem niet via WhatsApp of gewone mail. Iemand die de sleutel heeft, kan mail
versturen namens het domein. Zet hem rechtstreeks in Netlify, zie de volgende stap,
en bewaar hem in de gedeelde wachtwoordkluis.

---

## 7. In Netlify zetten (Lieven doet dit)

Drie waarden moeten in Netlify onder **Site configuration → Environment variables**:

| Naam | Waarde |
|------|--------|
| `RESEND_API_KEY` | de sleutel uit stap 6 |
| `CONTACT_TO` | Lucas' eigen mailadres |
| `CONTACT_FROM` | `Website Lucas Borghys <no-reply@send.lucasborghys.be>` |

Laat de scope op alle deploy-contexten staan, zodat het formulier ook op
preview-deploys werkt.

Daarna **opnieuw deployen**. Environment variables slaan pas aan bij een nieuwe
build, niet meteen. Zonder redeploy lijkt het alsof niks werkt.

---

## 8. Echt testen, samen met Lucas

1. Ga naar de live site en vul het formulier in zoals een bezoeker zou doen. Gebruik
   een echt mailadres van jou bij "e-mailadres", niet dat van Lucas.
2. Lucas checkt zijn inbox. **Ook de spammap**, en bij Outlook ook "Overige" of
   "Ongewenst".
3. Zit hij in de spammap: laat Lucas hem markeren als "Geen ongewenste e-mail" en
   de afzender toevoegen aan zijn contacten. Dat leert zijn mailbox dat deze mails
   gewenst zijn. Doe dit één keer goed, dan blijft het daarna goed.
4. Laat Lucas op **Antwoorden** klikken en controleer dat jouw adres automatisch
   in het "Aan"-veld staat, niet `no-reply@...`. Dat is het bewijs dat de
   antwoordfunctie klopt.
5. In Resend onder **Logs** moet de verzending staan met status `Delivered`.

Werkt dit alles, dan is het klaar.

---

## 9. Opruimen (niet vergeten)

- [ ] De tijdelijke testsleutel intrekken in Lievens Resend-account. Die sleutel
      heeft in een chat gestaan, dus dit is geen formaliteit.
- [ ] In `.env.local` de testwaarden vervangen door Lucas' echte gegevens, of de
      `RESEND_API_KEY`-regel leegmaken. Dit bestand staat niet in git, dus het
      blijft lokaal.
- [ ] `.env.example` bijwerken als het afzenderadres afwijkt van wat er nu staat.

---

## 10. Wat Lucas moet weten voor daarna

- Aanvragen komen binnen in zijn gewone inbox, met als afzender "Website Lucas
  Borghys". Antwoorden gaat rechtstreeks naar de persoon.
- Er wordt **niets bewaard**. Geen database, geen kopie op de server. De inzending
  wordt doorgestuurd en daarna vergeten. Dat is bewust zo gebouwd omwille van
  privacy: mensen typen soms gevoelige dingen in dat tekstveld.
- Precies daarom: **de mail in zijn inbox is het enige exemplaar.** Verwijdert hij
  die per ongeluk, dan is de aanvraag weg. Waarschuw hem daarvoor.
- Onder het formulier staat zijn telefoonnummer als terugvalweg. Mocht er ooit iets
  misgaan met de mail, dan kunnen mensen nog altijd bellen.
- Hij hoeft nooit in Resend te gaan kijken. Enkel als hij vermoedt dat er aanvragen
  verdwijnen: Resend → Logs laat zien wat er verstuurd is.

---

## Als het misgaat

| Wat je ziet | Wat het is |
|---|---|
| Formulier zegt "verzonden", geen mail | Redeploy vergeten na het zetten van de env vars. |
| Fout 403 van Resend | Domein nog niet verified, of je stuurt vanaf een adres dat niet bij het geverifieerde domein hoort. |
| Domein blijft "pending" | Typfout in de DNS-records, of de domeinnaam dubbel geplakt. Zie de valkuilen in stap 5. |
| Mail komt in spam | DMARC-record ontbreekt, of de mailbox moet hem nog één keer als gewenst leren kennen. |
| Niks werkt lokaal | `.env.local` gewijzigd? Herstart `npm run dev`. |

Technische details staan in [`app/api/contact/route.ts`](../app/api/contact/route.ts).
