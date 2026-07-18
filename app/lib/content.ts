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
      title: "Lucas Borghys · Klinisch psycholoog, Gent",
      description:
        "Gesprekstherapie in Gent. Wees welkom, en vertel. Een psychoanalytische praktijk met ruimte voor elk verhaal, elke moeilijkheid.",
    },
    site: {
      name: "Lucas Borghys",
      role: "Klinisch psycholoog · Gent",
      rail: "Klinisch psycholoog · psychoanalytische praktijk",
      region: "Gent · BE",
    },
    hero: {
      titel: "Wees welkom,",
      accent: "en vertel.",
      sub: "Klinisch psycholoog te Gent. Een psychoanalytische gesprekspraktijk, met ruimte voor andersheid en voor wat nog geen woorden heeft.",
      scroll: "Scroll",
    },
    verwelkoming: {
      label: "Verwelkoming",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      body: "Wees welkom, en vertel. Dat is de basis van waaruit we vertrekken en waarop we verder gaan. Ieder mens wordt vroeg of laat geconfronteerd met een worsteling, het leven voelt dan niet meer zo voorspelbaar of behapbaar aan en dit is voor velen een punt om de stap naar gesprekstherapie te zetten. Via het spreken proberen we vat te krijgen op die worsteling, proberen we woorden te vinden voor datgene dat voor onszelf nog geen duidelijkheid heeft, geen verhaal. Ik nodig je uit om samen te komen spreken over waar jij tegenaan botst en in hoeverre deze moeilijkheden betekenisvol zijn in jouw bredere levensverhaal. ",
      accent: "Elk verhaal, elke moeilijkheid is welkom.",
    },
    intermezzo: {
      quote:
        "Ruimte voor het unieke, voor warme andersheid, en om serieus genomen te worden in wat weegt.",
    },
    werkwijze: {
      label: "Werkwijze",
      title: "Tijd en ruimte voor jouw verhaal.",
      body: "De gesprekken vertrekken vanuit een psychoanalytische houding: traag, associatief, aandachtig en zonder vooropgesteld protocol. Er is geen checklist die bepaalt wat belangrijk is. Dat ontdekken we samen, in het spreken zelf.",
      accent:
        "Zo ontstaat ruimte voor wat nog geen vorm had: het andere, en de opgekuiste chaos van een verhaal dat nog geschreven moet worden.",
      themesTitle: "Waar ik in het bijzonder ruimte voor maak",
      // TE BEVESTIGEN MET LUCAS.
      themes: [
        "Het unieke en het bijzondere, ook waar dat nog geen naam heeft.",
        "Vragen rond verlangen, lichaam, geaardheid en identiteit.",
        "Kunstenaars en creatieve geesten die hun plek nog zoeken.",
      ],
    },
    overMij: {
      label: "Over mij",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      body: "Ik ben klinisch psycholoog en ik heb een passie voor en ervaring met gesprekstherapie. Zelf probeer ik mijn werk als therapeut te verfijnen door deel te nemen aan een therapieopleiding in de psychoanalyse en deel te nemen aan lezingen en opleidingsdagen.",
      ervaring:
        "Eerdere ervaring bij groepspraktijk Tondel, huis voor psychotherapie Anker en de Huiskamer, en vrijwilligerswerk in PVT De Wadi bij de Driesprong.",
      imageCaption:
        "De praktijk: een historische stadswoning bij de Boekentoren, met hoge plafonds, een tot bureau omgebouwde piano, veel groen en zacht licht.",
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
        "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk; u mag uw formulier meebrengen naar de sessie.",
      betalingLabel: "Betaling",
      betalingValue: "Payconiq of overschrijving",
      betalingNote: "IBAN BE53 3632 2546 8153",
      // LETTERLIJKE KERNTEKST — niet wijzigen zonder overleg.
      microcopy:
        "Een voicemail is aangeraden indien ik telefonisch niet bereikbaar ben. Ik probeer binnen de dag een antwoord te formuleren. Houd zeker ook uw spamfolder in het oog wanneer u een antwoord verwacht.",
      gsmLabel: "GSM",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
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
        "Dank u. Uw bericht is verstuurd. Ik probeer binnen de dag te antwoorden.",
      error:
        "Er ging iets mis bij het versturen. Belt u gerust, of probeer het later opnieuw:",
      privacyLink: "Privacybeleid",
      privacyNote:
        "Uw formuliergegevens worden enkel gebruikt om uw vraag te beantwoorden, niet bewaard op de server, en niet gedeeld. Geen advertentiecookies.",
      requiredMsg: "Vul dit veld in.",
      emailMsg: "Controleer het e-mailadres.",
    },
    locatie: {
      label: "Locatie",
      praktijkLabel: "Praktijk",
      adres: "Sint-Pietersnieuwstraat 97, 9000 Gent",
      caption: "Naast de Boekentoren, in het hart van de studentenbuurt.",
      mapAria:
        "Gestileerde kaart van de omgeving van de praktijk: Sint-Pietersnieuwstraat 97 in Gent, naast de Boekentoren en het Sint-Pietersplein.",
      mapPin: "De praktijk",
      mapAbdij: "& abdij",
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
          h: "Analytics",
          p: "Deze website gebruikt PostHog (EU-servers) om te zien welke pagina's bezocht worden. Er is geen klik- of interactietracking, geen sessieopname, en geen advertentiecookies. Bezoekers blijven anoniem: er wordt geen profiel van u opgebouwd, en de browserinstelling 'Do Not Track' wordt gerespecteerd.",
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
      title: "Lucas Borghys · Clinical psychologist, Ghent",
      description:
        "Talking therapy in Ghent. Be welcome, and speak. A psychoanalytic practice with room for every story, every difficulty.",
    },
    site: {
      name: "Lucas Borghys",
      role: "Clinical psychologist · Ghent",
      rail: "Clinical psychologist · psychoanalytic practice",
      region: "Ghent · BE",
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
      quote:
        "Room for the singular, for a warm otherness, and to be taken seriously in what weighs.",
    },
    werkwijze: {
      label: "Approach",
      title: "Time and room for your story.",
      body: "The conversations begin from a psychoanalytic stance: slow, associative, attentive and without a preset protocol. There is no checklist that decides what matters. We discover that together, in the speaking itself.",
      accent:
        "So room opens for what had no form yet: the other, and the ordered chaos of a story still to be written.",
      themesTitle: "Where I make particular room",
      themes: [
        "The singular and the particular, even where it has no name yet.",
        "Questions of desire, the body, orientation and identity.",
        "Artists and creative minds still finding their place.",
      ],
    },
    overMij: {
      label: "About",
      body: "I am a clinical psychologist with a passion for and experience in talking therapy. I keep refining my work as a therapist by taking part in a psychoanalytic training programme and by attending lectures and study days.",
      ervaring:
        "Earlier experience at group practice Tondel, house for psychotherapy Anker and de Huiskamer, and volunteer work in PVT De Wadi at de Driesprong.",
      imageCaption:
        "The practice: a historic townhouse near the Boekentoren, with high ceilings, a piano turned into a desk, abundant greenery and soft light.",
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
      betalingValue: "Payconiq or bank transfer",
      betalingNote: "IBAN BE53 3632 2546 8153",
      microcopy:
        "A voicemail is recommended if I am unreachable by phone. I aim to respond within the day. Please also keep an eye on your spam folder when expecting an answer.",
      gsmLabel: "Mobile",
      gsm: "0493 02 05 43",
      gsmHref: "tel:+32493020543",
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
      success: "Thank you. Your message has been sent. I try to reply within the day.",
      error: "Something went wrong sending this. Feel free to call, or try again later:",
      privacyLink: "Privacy policy",
      privacyNote:
        "Your form details are used only to answer your question, not stored on the server, and not shared. No advertising cookies.",
      requiredMsg: "Please fill in this field.",
      emailMsg: "Please check the email address.",
    },
    locatie: {
      label: "Location",
      praktijkLabel: "Practice",
      adres: "Sint-Pietersnieuwstraat 97, 9000 Ghent",
      caption: "Beside the Boekentoren, in the heart of the student quarter.",
      mapAria:
        "Stylised map of the practice surroundings: Sint-Pietersnieuwstraat 97 in Ghent, beside the Boekentoren and Sint-Pietersplein.",
      mapPin: "The practice",
      mapAbdij: "& abbey",
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
          h: "Analytics",
          p: "This website uses PostHog (EU servers) to see which pages are visited. There is no click or interaction tracking, no session recording, and no advertising cookies. Visitors remain anonymous: no profile is built about you, and the browser's 'Do Not Track' setting is respected.",
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
