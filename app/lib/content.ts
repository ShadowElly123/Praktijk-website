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
      body: "Wees welkom, en vertel. Dat is het vertrekpunt. Vroeg\nof laat botsen we allemaal op een worsteling waardoor het leven niet meer\nbehapbaar voelt. Dit is vaak het moment om de stap naar gesprekstherapie te\nzetten.\n\nVia het spreken zoeken we samen naar woorden voor wat nu nog\nonduidelijk is. Ik nodig u uit om stil te staan bij uw verhaal en te ontdekken\nhoe deze moeilijkheden verweven zijn met uw leven. ",
      accent: "Elk verhaal, elke moeilijkheid is welkom.",
    },
    intermezzo: {
      quote: "We zijn allemaal vreemden voor onszelf, en pas wanneer we tot een ander spreken, wordt deze vreemdheid een thuis.",
    },
    werkwijze: {
      label: "Werkwijze",
      // Update 2026-07-27: titel/themesTitle/themes leeggemaakt door Lucas via preview-edit.
      title: "",
      body: "De gesprekken vertrekken vanuit een psychoanalytische houding: traag, associatief, aandachtig en zonder vooropgesteld protocol. Er is geen checklist die bepaalt wat belangrijk is. Dat ontdekken we samen, in het spreken zelf.",
      accent:
        "Binnen de therapie staat het vrij associëren\ncentraal: de uitnodiging om gedachten, gevoelens en fantasieën zonder censuur\nuit te spreken. Dit bijzondere spreken helpt om uw levensgeschiedenis\nbeter te begrijpen en patronen te ontrafelen die aan de basis liggen van uw\npsychisch lijden. Door woorden te geven aan wat er in u leeft, krijgt u dieper\ninzicht en verliest de problematiek haar dwingende greep. Dit proces opent de\nweg naar verwerking, nieuwe keuzes en een vrijere manier van leven. Deze\nmethodiek pas ik toe via psychotherapie of via psychoanalyse.",
      themesTitle: "",
      themes: ["", "", ""],
      imageCaption:
        "De praktijk: een historische stadswoning bij de Boekentoren, met hoge plafonds, een tot bureau omgebouwde piano, veel groen en zacht licht.",
    },
    overMij: {
      label: "Over mij",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg. Update 2026-07-27: herschreven door Lucas via preview-edit.
      body: "Na mijn afstuderen als Master in de klinische psychologie\n(UGent, 2022) ben ik mij blijven specialiseren in de psychoanalytische\npsychotherapie. Naast een postgraduaat aan de UGent volg ik continu seminaries\nen opleidingsdagen.\nMijn klinische vorming kreeg écht vorm in de praktijk: via mijn werk bij CGG\nAndante, groepspraktijken Tondel, Anker en de Huiskamer, en PVT De Wadi. Om de\nkwaliteit van mijn psychologische begeleiding te waarborgen, zet ik daarnaast\nsteevast in op supervisie, intervisie en een eigen leeranalyse.",
      // Update 2026-07-27: leeggemaakt door Lucas via preview-edit.
      ervaring: "",
      titelsLabel: "Titels & erkenning",
      titel1: "Klinisch psycholoog",
      titel1sub: "(Erkend door de Psychologencommissie, met visum).",
      titel2: "In opleiding tot psychoanalytisch therapeut.",
      badge: "Lucas Borghys · Gent",
      registratieLabel: "Registratie",
      registratie: [
        "Visumnummer 374462",
        "Erkenningsnummer 991135455",
        "Ondernemingsnummer 0790.741.228",
      ],
    },
    praktisch: {
      label: "Praktisch & contact",
      talenLabel: "Talen",
      talenValue: "Nederlands & Engels",
      vormLabel: "Vorm",
      vormValue: "Op gesprek, of via video en telefoon",
      tariefLabel: "Tarief",
      tariefValue:
        "Richtprijs en richtduur worden toegelicht tijdens het intakegesprek. Definitieve afspraken horen bij die eerste kennismaking.",
      terugbetalingLabel: "Terugbetaling",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      terugbetalingValue:
        "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk. U mag uw formulier meebrengen naar de sessie.",
      betalingLabel: "Betaling",
      betalingValue: "Bancontact app (Payconiq) of overschrijving",
      betalingNote: "IBAN BE53 3632 2546 8153",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      microcopy:
        "Een voicemail is aangeraden indien ik telefonisch niet bereikbaar ben. Ik probeer binnen de dag een antwoord te formuleren.",
      gsmLabel: "GSM",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
    },
    faq: {
      label: "Veelgestelde vragen",
      items: [
        {
          q: "Wordt een sessie terugbetaald door het ziekenfonds?",
          a: "Deze praktijk werkt niet binnen de RIZIV-conventie, daarom ligt er geen vast tarief per zitting vast. De meeste ziekenfondsen betalen desondanks een deel terug. Uw mutualiteit kan dat voor u nakijken, breng het formulier gerust mee.",
        },
        {
          q: "Wat kost een sessie?",
          a: "Een bedrag vindt u hier niet vermeld. Bij het eerste gesprek bekijken we samen wat haalbaar is, zowel qua tempo als budget.",
        },
        {
          q: "Wat is het verschil tussen een psycholoog en een psychotherapeut?",
          a: "Een psycholoog draagt een wettelijk beschermde titel, verkregen na een universitaire opleiding. Een psychotherapeut volgt daarnaast een langdurige, specifieke opleiding in een bepaalde gespreksmethode, bij mij de psychoanalyse. Het eerste is afgerond, het tweede nog in opleiding.",
        },
        {
          q: "Kan de eerste sessie via video of telefoon?",
          a: "Ja. Sommige mensen starten liever van thuis uit, dat kan hier net zo goed als een gesprek op de praktijk zelf.",
        },
        {
          q: "Hoeveel sessies heb ik nodig?",
          a: "Dat vooraf vastleggen zou ingaan tegen hoe deze gesprekken werken. De duur groeit mee met wat nodig blijkt, niet omgekeerd.",
        },
        {
          q: "Waar bevindt de praktijk zich?",
          a: "Centraal in Gent, op wandelafstand van het Zuid. Parkeren kan aan de achterkant van het gebouw, u rijdt gewoon de doorrit onder het gebouw door.",
        },
        {
          q: "Kan ik in het Engels terecht?",
          a: "Ja, sommige gesprekken lopen nu eenmaal makkelijker in het Engels, dat kan hier evengoed.",
        },
        {
          q: "Is dit een veilige plek voor vragen rond gender, geaardheid of identiteit?",
          a: "Ja. Wat u meebrengt hoeft niet eerst herkenbaar of behapbaar te zijn. Vragen over wie u bent, van wie u houdt, hoe uw lichaam aanvoelt, horen hier evengoed thuis, ook als het nog geen naam heeft.",
        },
        {
          q: "Werkt u ook met kunstenaars of mensen met een onconventionele levensstijl?",
          a: "Zeker. Een leven dat niet in de gewone mal past, een keuze waar u zich voor verantwoordt, iets waar u zich stilletjes voor schaamt, een gewoonte die u liever verzwijgt: voor dat alles is hier plaats.",
        },
      ],
    },
    contact: {
      title: "Neem contact op",
      intro:
        "Laat kort iets weten en ik neem contact met u op. Wat u hier deelt, blijft vertrouwelijk.",
    },
    form: {
      onderwerp: "Onderwerp",
      toelichting: "Toelichting",
      toelichtingHint: "Kort volstaat. U hoeft nu nog niets uit te leggen.",
      emailLabel: "E-mailadres",
      telefoonLabel: "Telefoonnummer",
      beschikbaarheid: "Weekbeschikbaarheden",
      beschikbaarheidHint: "Bijv. weekdagen na 17u, of woensdagvoormiddag.",
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
    crisis: {
      title: "In geval van crisis",
      intro:
        "Deze praktijk biedt geen crisisopvang. Heeft u nu dringend hulp nodig?",
      items: [
        { label: "Zelfmoordlijn 1813", value: "1813", href: "tel:1813" },
        { label: "Huisarts van wacht", value: "1733", href: "tel:1733" },
        { label: "Spoed / noodgeval", value: "112", href: "tel:112" },
      ],
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
    },
    hero: {
      titel: "Be welcome,",
      accent: "and speak.",
      sub: "Clinical psychologist in Ghent. A psychoanalytic talking practice, with room for otherness and for what does not yet have words.",
      scroll: "Scroll",
    },
    verwelkoming: {
      label: "Welcome",
      body: "Be welcome, and speak. That is the ground we set out from and keep returning to. Sooner or later every person meets a struggle; life no longer feels predictable or manageable, and for many this is the moment to take the step toward talking therapy. Through speaking we try to get a hold on that struggle, to find words for what has no clarity yet, no story. I invite you to come and speak together about what you are up against, and how far these difficulties are meaningful within your broader life story. ",
      accent: "Every story, every difficulty is welcome.",
    },
    intermezzo: {
      quote: "The place where I fit will not exist until I make it myself.",
    },
    werkwijze: {
      label: "Approach",
      title: "Time and room for your story.",
      body: "The conversations begin from a psychoanalytic stance: slow, associative, attentive and without a preset protocol. There is no checklist that decides what matters. We discover that together, in the speaking itself.",
      accent:
        "So room opens for what had no form yet: the other, and the ordered chaos of a story still to be written.",
      themesTitle: "Where I make particular room",
      themes: [
        "Questions of sexuality, desire, gender and identity.",
        "Artists and creative minds still finding their place.",
        "Those caught in their own thinking — intrusive thoughts, or a psychotic or bipolar vulnerability.",
      ],
      imageCaption:
        "The practice: a historic townhouse near the Boekentoren, with high ceilings, a piano turned into a desk, abundant greenery and soft light.",
    },
    overMij: {
      label: "About",
      body: "I am a clinical psychologist with a passion for and experience in talking therapy. I keep refining my work as a therapist by taking part in a psychoanalytic training programme and by attending lectures and study days.",
      ervaring:
        "Earlier experience at group practice Tondel, house for psychotherapy Anker and de Huiskamer, and volunteer work in PVT De Wadi at de Driesprong.",
      titelsLabel: "Titles & recognition",
      // Officiële titels bewust in het Nederlands — deontologisch exact.
      titel1: "Klinisch psycholoog",
      titel1sub: "(Erkend door de Psychologencommissie, met visum).",
      titel2: "In opleiding tot psychoanalytisch therapeut.",
      badge: "Lucas Borghys · Ghent",
      registratieLabel: "Registration",
      registratie: [
        "Visa number 374462",
        "Recognition number 991135455",
        "Company number 0790.741.228",
      ],
    },
    praktisch: {
      label: "Practical & contact",
      talenLabel: "Languages",
      talenValue: "Dutch & English",
      vormLabel: "Format",
      vormValue: "In person, or by video and phone",
      tariefLabel: "Fee",
      tariefValue:
        "Indicative rate and session length are explained during the intake conversation. Definitive arrangements belong to that first meeting.",
      terugbetalingLabel: "Reimbursement",
      terugbetalingValue:
        "Non-conventioned practice. Partial reimbursement from your health insurance fund may be possible; you may bring your form to the session.",
      betalingLabel: "Payment",
      betalingValue: "Bancontact app (Payconiq) or bank transfer",
      betalingNote: "IBAN BE53 3632 2546 8153",
      microcopy:
        "A voicemail is recommended if I am unreachable by phone. I aim to respond within the day.",
      gsmLabel: "Mobile",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
    },
    faq: {
      label: "Frequently asked questions",
      items: [
        {
          q: "Is a session reimbursed by health insurance?",
          a: "This practice does not work within the RIZIV convention system, so there is no fixed fee per session. Most health funds still reimburse a portion. Your mutuality can check this for you, feel free to bring the form.",
        },
        {
          q: "What does a session cost?",
          a: "No fixed amount is listed here. At the first conversation we look together at what fits, both in pace and in budget.",
        },
        {
          q: "What is the difference between a psychologist and a psychotherapist?",
          a: "A psychologist holds a legally protected title, earned through a university degree. A psychotherapist also completes a long, specific training in a particular method of conversation, in my case psychoanalysis. One is finished, the other still underway.",
        },
        {
          q: "Can the first session be by video or phone?",
          a: "Yes. Some people prefer to start from home, that works just as well as meeting in person.",
        },
        {
          q: "How many sessions will I need?",
          a: "Fixing that in advance would work against how these conversations unfold. Length follows what turns out to be needed, not the other way round.",
        },
        {
          q: "Where is the practice located?",
          a: "Central in Ghent, within walking distance of the Zuid area. Parking is available at the back of the building, you simply drive through the passage beneath it.",
        },
        {
          q: "Can I have sessions in English?",
          a: "Yes, some conversations simply flow more easily in English, that works just as well here.",
        },
        {
          q: "Is this a safe space for questions around gender, sexuality, or identity?",
          a: "Yes. What you bring doesn't need to be recognisable or manageable from the start. Questions about who you are, who you love, how your body feels, belong here just as much, even without a name for it yet.",
        },
        {
          q: "Do you also work with artists or people living unconventional lives?",
          a: "Certainly. A life that doesn't fit the usual mould, a choice you find yourself explaining, something you quietly feel ashamed of, a habit you'd rather keep to yourself: there's room for all of it here.",
        },
      ],
    },
    contact: {
      title: "Get in touch",
      intro:
        "Leave a short note and I will get back to you. What you share here stays confidential.",
    },
    form: {
      onderwerp: "Subject",
      toelichting: "Message",
      toelichtingHint: "A few lines are enough. No need to explain everything now.",
      emailLabel: "Email address",
      telefoonLabel: "Phone number",
      beschikbaarheid: "Weekly availability",
      beschikbaarheidHint: "E.g. weekdays after 5pm, or Wednesday mornings.",
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
    crisis: {
      title: "In case of crisis",
      intro:
        "This practice does not provide crisis care. Do you need urgent help right now?",
      items: [
        { label: "Suicide line 1813", value: "1813", href: "tel:1813" },
        { label: "GP on call", value: "1733", href: "tel:1733" },
        { label: "Emergency", value: "112", href: "tel:112" },
      ],
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
