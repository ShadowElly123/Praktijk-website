/* ------------------------------------------------------------------
   CONTENT — het "lichte CMS".
   Alle zichtbare tekst staat hier op één plek, per taal (nl / en).
   Pas hier tekst aan; de componenten werken automatisch bij.

   BELANGRIJK
   - De Nederlandse kernteksten van Lucas staan LETTERLIJK bewaard
     (Verwelkoming, Over mij, Praktisch, microcopy). Niet vrij vertalen
     of herschrijven zonder overleg.
   - De officiële, deontologisch verplichte titels staan exact en in
     beide talen bewust in het Nederlands.
   - `werkwijze.themes` benoemt vragen rond geaardheid, gender en andersheid
     als thema's waar de praktijk ruimte voor maakt (PRD-conform: dit mag wél
     genoemd worden). Wat vermeden wordt is Lucas' eigen zelf-outing en
     klinische labels — DEFINITIEVE formulering te bevestigen met Lucas.
------------------------------------------------------------------- */

export const content = {
  nl: {
    meta: {
      title: "Klinisch psycholoog Gent · Gesprekstherapie · Lucas Borghys",
      description:
        "Klinisch psycholoog in Gent, bij de Boekentoren. Gesprekstherapie vanuit een psychoanalytische houding, met ruimte voor elk verhaal. Wees welkom, en vertel.",
    },
    site: {
      name: "Lucas Borghys",
      role: "Klinisch psycholoog · Gent",
      rail: "Klinisch psycholoog · psychoanalytische praktijk",
      contactCta: "Contact",
    },
    hero: {
      titel: "Wees welkom,",
      accent: "en vertel.",
      sub: "Een psychoanalytische gesprekspraktijk in Gent met ruimte voor uw eigenheid en voor dat wat nog geen woorden heeft. ",
      scroll: "Scroll",
    },
    verwelkoming: {
      label: "Verwelkoming",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg. Update 2026-07-27: herschreven door Lucas via preview-edit.
      body: "Wees welkom, en vertel. Dat is het vertrekpunt. Vroeg of laat botsen we allemaal op een worsteling waardoor het leven niet meer behapbaar voelt. Dit is vaak het moment om de stap naar gesprekstherapie te zetten.",
      body2:
        "Via het spreken zoeken we samen naar woorden voor wat nu nog onduidelijk is. Ik nodig u uit om stil te staan bij uw verhaal en te ontdekken hoe deze moeilijkheden verweven zijn met uw leven.",
      accent: "Elk verhaal, elke moeilijkheid is welkom.",
    },
    werkwijze: {
      label: "Werkwijze",
      // Update 2026-07-27: titel/body/themesTitle/themes leeggemaakt door Lucas.
      // Leeg i.p.v. verwijderd, zodat de velden via preview-edit weer te vullen
      // zijn; de componenten renderen ze enkel als er tekst in staat.
      title: "",
      body: "",
      accent:
        "Binnen de therapie staat het vrij associëren centraal: de uitnodiging om gedachten, gevoelens en fantasieën zonder censuur uit te spreken. Dit bijzondere spreken helpt om uw levensgeschiedenis beter te begrijpen en patronen te ontrafelen die aan de basis liggen van uw psychisch lijden. Door woorden te geven aan wat er in u leeft, krijgt u dieper inzicht en verliest de problematiek haar dwingende greep. Dit proces opent de weg naar verwerking, nieuwe keuzes en een vrijere manier van leven. Deze methodiek pas ik toe via psychotherapie of via psychoanalyse.",
      themesTitle: "",
      themes: ["", "", ""],
      imageCaption:
        "De praktijk: een historische stadswoning bij de Boekentoren, met hoge plafonds, een tot bureau omgebouwde piano, veel groen en zacht licht.",
    },
    overMij: {
      label: "Over mij",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg. Update 2026-07-27: herschreven door Lucas via preview-edit.
      body: "Na mijn afstuderen als Master in de klinische psychologie (UGent, 2022) ben ik mij blijven specialiseren in de psychoanalytische psychotherapie. Naast een postgraduaat aan de UGent volg ik continu seminaries en opleidingsdagen. Mijn klinische vorming kreeg écht vorm in de praktijk: via mijn werk bij CGG Andante, groepspraktijken Tondel, Anker en de Huiskamer, en PVT De Wadi. Om de kwaliteit van mijn psychologische begeleiding te waarborgen, zet ik daarnaast steevast in op supervisie, intervisie en een eigen leeranalyse.",
      // Update 2026-07-27: leeggemaakt door Lucas via preview-edit.
      ervaring: "",
      badge: "Lucas Borghys · Gent",
    },
    praktisch: {
      label: "Praktisch & contact",
      tariefLabel: "Tarief",
      tariefValue:
        "Een sessie duurt ongeveer 45 minuten en de richtprijs is 70 euro, dit kan variëren. Kan u niet naar een afspraak komen, verwittig mij dan minstens 24 uur op voorhand.",
      terugbetalingLabel: "Terugbetaling",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg. Update 2026-07-27: ingekort door Lucas.
      terugbetalingValue:
        "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk. U mag een formulier meebrengen.",
      terugbetalingLinkLabel: "Overzicht van terugbetalingsformulieren per ziekenfonds",
      terugbetalingLinkHref: "https://www.vind-een-psycholoog.be/info/terugbetaling-psychotherapie.html",
      betalingLabel: "Betaling",
      betalingValue: "Bancontact app (Payconiq) of overschrijving",
      betalingNote: "IBAN BE53 3632 2546 8153",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      microcopy:
        "Een voicemail is aangeraden indien ik telefonisch niet bereikbaar ben. Ik probeer binnen de dag een antwoord te formuleren.",
      gsmLabel: "GSM",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
      emailLabel: "E-mail",
      email: "lucas.borghys@hotmail.com",
      emailHref: "mailto:lucas.borghys@hotmail.com",
      parkerenLabel: "Parkeren",
      parkerenValue: "Sint-Pietersplein parking of de omliggende straten",
    },
    faq: {
      label: "Veelgestelde vragen",
      items: [
        {
          q: "Wordt een sessie terugbetaald door het ziekenfonds?",
          a: "Deze praktijk werkt niet binnen de RIZIV-conventie. De meeste ziekenfondsen betalen desondanks een deel terug. Uw mutualiteit kan dat voor u nakijken.",
          linkLabel: "Overzicht van terugbetalingsformulieren per ziekenfonds",
          linkHref: "https://www.vind-een-psycholoog.be/info/terugbetaling-psychotherapie.html",
          items: [],
        },
        {
          q: "Wat kost een sessie?",
          a: "Een sessie duurt ongeveer 45 minuten, aan een richtprijs van 70 euro; dit kan variëren. Kan u niet naar een afspraak komen, verwittig mij dan minstens 24 uur op voorhand.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Wat is het verschil tussen een psycholoog en een psychotherapeut?",
          a: "Een psycholoog draagt een wettelijk beschermde titel, verkregen na een universitaire opleiding. Een psychotherapeut volgt daarnaast een langdurige, specifieke opleiding in een bepaalde gespreksmethode, bij mij de psychoanalyse. Het eerste is afgerond, het tweede nog in opleiding.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Kan online begeleiding ook?",
          a: "Ja, sessies kunnen ook via video of telefonisch doorgaan. Voor het eerste, kennismakingsgesprek gaat de voorkeur uit naar een ontmoeting ter plaatse, maar dat is geen verplichting.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Hoeveel sessies heb ik nodig?",
          a: "Dat staat niet op voorhand vast. De duur groeit mee met wat nodig blijkt, niet omgekeerd.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Waar bevindt de praktijk zich?",
          a: "Centraal in Gent, op wandelafstand van het Zuid. Parkeren kan op de Sint-Pietersplein parking of in de omliggende straten.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Kan ik in het Engels ook therapie volgen?",
          a: "Ja, therapie is mogelijk in het Nederlands en het Engels. Sommige gesprekken lopen nu eenmaal makkelijker in het Engels, dat kan hier evengoed.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Kan ik hier terecht met vragen over geaardheid, gender of identiteit?",
          a: "Ja. Wat u meebrengt hoeft niet eerst herkenbaar of behapbaar te zijn. Vragen over wie u bent, van wie u houdt, hoe uw lichaam aanvoelt, horen hier evengoed thuis, ook als het nog geen naam heeft.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Kan ik hier ook terecht met vragen rond verslaving?",
          a: "Ja. Ook een worsteling met verslaving, of met een gewoonte die niet meer los te laten valt, mag hier besproken worden. De gesprekken vertrekken niet vanuit een vast verslavingsprotocol, maar vanuit wat dit voor u persoonlijk betekent.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Wat als ik in een crisis zit?",
          a: "Deze praktijk biedt geen crisisopvang. Heeft u nu dringend hulp nodig, neem dan rechtstreeks contact op met:",
          linkLabel: "",
          linkHref: "",
          items: [
            { label: "Zelfmoordlijn", value: "1813", href: "tel:1813" },
            { label: "Huisarts van wacht", value: "1733", href: "tel:1733" },
            { label: "Spoed / noodgeval", value: "112", href: "tel:112" },
          ],
        },
      ],
    },
    contact: {
      title: "Neem contact op",
      intro: "Laat iets weten en ik neem contact met u op. Wat u hier deelt, blijft vertrouwelijk.",
    },
    form: {
      onderwerp: "Onderwerp",
      toelichting: "Toelichting",
      toelichtingHint: "",
      emailLabel: "E-mailadres",
      telefoonLabel: "Telefoonnummer",
      beschikbaarheid: "Wanneer bent u in de week beschikbaar?",
      beschikbaarheidHint: "",
      verstuur: "Versturen",
      sending: "Versturen…",
      success:
        "Dank u dat u de stap zette om te schrijven. Ik lees dit met aandacht en laat binnen de dag iets weten. Hoort u niets, kijk dan gerust nog eens in uw spamfolder.",
      error:
        "Er ging iets mis bij het versturen. Belt u gerust, of probeer het later opnieuw:",
      requiredMsg: "Vul dit veld in.",
      emailMsg: "Controleer het e-mailadres.",
    },
    locatie: {
      label: "Locatie",
      praktijkLabel: "Praktijk",
      adres: "Sint-Pietersnieuwstraat 97, 9000 Gent",
      caption: "Naast de Boekentoren, in het hart van Gent.",
      mapAria:
        "Gestileerde kaart van de buurt rond de praktijk: Sint-Pietersnieuwstraat 97 in Gent, tussen de Boekentoren, de universiteitsgebouwen en de Muinkschelde.",
      mapPin: "Praktijk",
      routeLabel: "Route",
      routeNote: "Opent in uw eigen kaart-app.",
    },
    footer: {
      privacy: "Privacybeleid",
      rights: "Alle rechten voorbehouden.",
      legal: "Visum 374462 · Erkenning 991135455 · KBO 0790.741.228",
    },
    privacy: {
      title: "Privacybeleid",
      draftNote: "Concept — juridisch na te kijken vóór livegang.",
      intro:
        "Deze praktijk gaat zorgvuldig om met uw gegevens. Hieronder leest u welke gegevens worden verwerkt en waarom.",
      sections: [
        {
          h: "Welke gegevens",
          p: "Via het contactformulier: enkel wat u zelf invult (onderwerp, toelichting, e-mailadres en optioneel telefoonnummer en beschikbaarheden). Daarnaast verzamelt deze website geanonimiseerde bezoekstatistieken (zie 'Analytics' hieronder). Er worden geen andere persoonsgegevens verzameld.",
        },
        {
          h: "Doel",
          p: "Uw contactgegevens worden uitsluitend gebruikt om uw vraag te beantwoorden en om contact met u op te nemen. Ze worden niet gedeeld met derden en niet voor andere doeleinden gebruikt.",
        },
        {
          h: "Bewaring",
          p: "Het contactformulier bewaart niets op de server; uw bericht wordt enkel als e-mail doorgestuurd. Ontvangen e-mails worden niet langer bewaard dan nodig om uw vraag af te handelen.",
        },
        {
          h: "Analytics — zonder cookies",
          p: "Deze website gebruikt PostHog (EU-servers) om te zien hoe de site gebruikt wordt: welke pagina's en secties bekeken worden, hoe ver er gescrold wordt, waar geklikt wordt en of er technische fouten optreden. Hiervoor worden géén cookies geplaatst en wordt er niets op uw toestel opgeslagen — vandaar dat u geen cookiemelding ziet.",
        },
        {
          h: "U blijft anoniem",
          p: "Om bezoeken te kunnen tellen berekent PostHog op de server een onomkeerbare code uit uw IP-adres en browser, met een sleutel die dagelijks verandert en daarna gewist wordt. Uit die code valt niets over u te herleiden. Er wordt geen profiel opgebouwd, u wordt niet herkend bij een volgend bezoek, en er worden geen sessieopnames gemaakt. Wat u in het contactformulier typt, wordt nooit meegemeten; enkel dat er een bericht verzonden is. De browserinstelling 'Do Not Track' wordt gerespecteerd.",
        },
        {
          h: "Uw rechten",
          p: "U hebt het recht op inzage, correctie en verwijdering van uw gegevens. Neem daarvoor contact op via het contactformulier of telefonisch.",
        },
      ],
      back: "Terug naar de startpagina",
    },
  },

  en: {
    meta: {
      title: "English-speaking psychologist in Ghent · Lucas Borghys",
      description:
        "Clinical psychologist in Ghent, therapy in English. A psychoanalytic practice with room for every story, every difficulty. Be welcome, and speak.",
    },
    site: {
      name: "Lucas Borghys",
      role: "Clinical psychologist · Ghent",
      rail: "Clinical psychologist · psychoanalytic practice",
      contactCta: "Contact",
    },
    hero: {
      titel: "Be welcome,",
      accent: "and speak.",
      sub: "A psychoanalytic talking practice in Ghent, with room for who you are and for what does not yet have words.",
      scroll: "Scroll",
    },
    verwelkoming: {
      label: "Welcome",
      body: "Be welcome, and speak. That is where we begin. Sooner or later, all of us run into a struggle that makes life no longer feel manageable. That is often the moment to take the step towards talking therapy.",
      body2:
        "Through speaking, we search together for words for what is still unclear. I invite you to pause with your own story and to discover how these difficulties are interwoven with your life.",
      accent: "Every story, every difficulty is welcome.",
    },
    werkwijze: {
      label: "Approach",
      title: "",
      body: "",
      accent:
        "Free association is central to the therapy: the invitation to speak thoughts, feelings and fantasies without censorship. This particular way of speaking helps you understand your life story more deeply and unravel the patterns underlying your psychological suffering. By putting words to what lives inside you, you gain deeper insight and the difficulty loses its insistent grip. This process opens the way to working things through, to new choices and a freer way of living. I apply this method through psychotherapy or through psychoanalysis.",
      themesTitle: "",
      themes: ["", "", ""],
      imageCaption:
        "The practice: a historic townhouse near the Boekentoren, with high ceilings, a piano turned into a desk, abundant greenery and soft light.",
    },
    overMij: {
      label: "About",
      body: "Since graduating with a Master's degree in Clinical Psychology (Ghent University, 2022), I have kept specialising in psychoanalytic psychotherapy. Alongside a postgraduate programme at Ghent University, I continue to attend seminars and training days. My clinical training truly took shape in practice: through my work at CGG Andante, group practices Tondel, Anker and de Huiskamer, and PVT De Wadi. To safeguard the quality of my psychological guidance, I also consistently invest in supervision, peer consultation and my own training analysis.",
      ervaring: "",
      badge: "Lucas Borghys · Ghent",
    },
    praktisch: {
      label: "Practical & contact",
      tariefLabel: "Fee",
      tariefValue:
        "A session lasts around 45 minutes, at an indicative rate of 70 euros, which may vary. If you cannot make an appointment, please let me know at least 24 hours in advance.",
      terugbetalingLabel: "Reimbursement",
      terugbetalingValue:
        "This practice works outside the RIZIV convention system. Partial reimbursement from your health insurance fund may be possible. You may bring a form.",
      terugbetalingLinkLabel: "Overview of reimbursement forms by health fund",
      terugbetalingLinkHref: "https://www.vind-een-psycholoog.be/info/terugbetaling-psychotherapie.html",
      betalingLabel: "Payment",
      betalingValue: "Bancontact app (Payconiq) or bank transfer",
      betalingNote: "IBAN BE53 3632 2546 8153",
      microcopy:
        "A voicemail is recommended if I am unreachable by phone. I aim to respond within the day.",
      gsmLabel: "Mobile",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
      emailLabel: "Email",
      email: "lucas.borghys@hotmail.com",
      emailHref: "mailto:lucas.borghys@hotmail.com",
      parkerenLabel: "Parking",
      parkerenValue: "Sint-Pietersplein car park or the surrounding streets",
    },
    faq: {
      label: "Frequently asked questions",
      items: [
        {
          q: "Is a session reimbursed by health insurance?",
          a: "This practice does not work within the RIZIV convention system. Most health funds still reimburse a portion. Your health fund can check this for you.",
          linkLabel: "Overview of reimbursement forms by health fund",
          linkHref: "https://www.vind-een-psycholoog.be/info/terugbetaling-psychotherapie.html",
          items: [],
        },
        {
          q: "What does a session cost?",
          a: "A session lasts around 45 minutes, at an indicative rate of 70 euros, which may vary. If you cannot make an appointment, please let me know at least 24 hours in advance.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "What is the difference between a psychologist and a psychotherapist?",
          a: "A psychologist holds a legally protected title, earned through a university degree. A psychotherapist also completes a long, specialised training programme in a particular method of conversation, in my case psychoanalysis. The first is complete, the second still in progress.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Is online guidance also possible?",
          a: "Yes, sessions can also take place by video or phone. For the first, introductory conversation, meeting in person is preferred, though it isn't a requirement.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "How many sessions will I need?",
          a: "That isn't fixed in advance. The length follows what turns out to be needed, not the other way round.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Where is the practice located?",
          a: "Central in Ghent, within walking distance of the Zuid area. Parking is available at the Sint-Pietersplein car park or in the surrounding streets.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Can I have therapy in English?",
          a: "Yes, therapy is available in Dutch and English. Some conversations simply flow more easily in English, that works just as well here.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Can I come here with questions about sexual orientation, gender or identity?",
          a: "Yes. What you bring doesn't need to be recognisable or manageable from the start. Questions about who you are, who you love, how your body feels, belong here just as much, even without a name for it yet.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "Can I come here with questions about addiction?",
          a: "Yes. A struggle with addiction, or with a habit that has become hard to let go of, has a place here too. The conversations don't start from a fixed addiction protocol, but from what it personally means to you.",
          linkLabel: "",
          linkHref: "",
          items: [],
        },
        {
          q: "What if I'm in crisis?",
          a: "This practice does not provide crisis care. If you need urgent help right now, please contact:",
          linkLabel: "",
          linkHref: "",
          items: [
            { label: "Suicide line", value: "1813", href: "tel:1813" },
            { label: "GP on call", value: "1733", href: "tel:1733" },
            { label: "Emergency", value: "112", href: "tel:112" },
          ],
        },
      ],
    },
    contact: {
      title: "Get in touch",
      intro: "Leave a note and I will get back to you. What you share here stays confidential.",
    },
    form: {
      onderwerp: "Subject",
      toelichting: "Message",
      toelichtingHint: "",
      emailLabel: "Email address",
      telefoonLabel: "Phone number",
      beschikbaarheid: "When are you available during the week?",
      beschikbaarheidHint: "",
      verstuur: "Send",
      sending: "Sending…",
      success:
        "Thank you for taking that step to write. I read this with care and will get back to you within the day. If nothing arrives, do take a peek in your spam folder.",
      error: "Something went wrong sending this. Feel free to call, or try again later:",
      requiredMsg: "Please fill in this field.",
      emailMsg: "Please check the email address.",
    },
    locatie: {
      label: "Location",
      praktijkLabel: "Practice",
      adres: "Sint-Pietersnieuwstraat 97, 9000 Ghent",
      caption: "Beside the Boekentoren, in the heart of Ghent.",
      mapAria:
        "Stylised map of the neighbourhood around the practice: Sint-Pietersnieuwstraat 97 in Ghent, between the Boekentoren, the university buildings and the Muinkschelde.",
      mapPin: "Practice",
      routeLabel: "Directions",
      routeNote: "Opens in your own map app.",
    },
    footer: {
      privacy: "Privacy policy",
      rights: "All rights reserved.",
      legal: "Visa 374462 · Recognition 991135455 · Company no. 0790.741.228",
    },
    privacy: {
      title: "Privacy policy",
      draftNote: "Draft — to be reviewed legally before going live.",
      intro:
        "This practice handles your data with care. Below you can read which data is processed and why.",
      sections: [
        {
          h: "Which data",
          p: "Via the contact form: only what you enter yourself (subject, message, email address and optionally phone number and availability). This website also collects anonymised visit statistics (see 'Analytics' below). No other personal data is collected.",
        },
        {
          h: "Purpose",
          p: "Your contact details are used solely to answer your question and to get in touch with you. They are not shared with third parties and not used for any other purpose.",
        },
        {
          h: "Retention",
          p: "The contact form stores nothing on the server; your message is only forwarded as an email. Received emails are kept no longer than needed to handle your question.",
        },
        {
          h: "Analytics — without cookies",
          p: "This website uses PostHog (EU servers) to see how the site is used: which pages and sections are viewed, how far people scroll, where they click, and whether technical errors occur. No cookies are placed for this and nothing is stored on your device — which is why you see no cookie notice.",
        },
        {
          h: "You stay anonymous",
          p: "To count visits, PostHog computes an irreversible code on the server from your IP address and browser, using a key that changes daily and is then deleted. Nothing about you can be derived from that code. No profile is built, you are not recognised on a return visit, and no session recordings are made. What you type in the contact form is never measured; only the fact that a message was sent. The browser's 'Do Not Track' setting is respected.",
        },
        {
          h: "Your rights",
          p: "You have the right to access, correct and delete your data. To do so, get in touch via the contact form or by phone.",
        },
      ],
      back: "Back to the home page",
    },
  },
} as const;
