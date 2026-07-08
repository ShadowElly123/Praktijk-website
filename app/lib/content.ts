/* ------------------------------------------------------------------
   CONTENT: dit is het "lichte CMS".
   Alle teksten van de site staan hier op één plek, per taal (nl / en).
   Pas hier tekst aan; de site werkt de rest automatisch bij.

   BELANGRIJK: de Nederlandse kernteksten die Lucas aanleverde staan
   LETTERLIJK bewaard (zie PRD). Niet vertalen/herschrijven zonder overleg.
   De officiële, deontologisch verplichte titels staan in beide talen
   bewust in het Nederlands.

   CONCEPT: de pagina is opgebouwd als een muziekstuk (Lucas is muzikant,
   zijn bureau is een omgebouwde piano). Secties zijn "delen" met een
   tempo-aanduiding; het citaat is een intermezzo met fermate.
------------------------------------------------------------------- */

export type Lang = "nl" | "en";

export const LANGS: Lang[] = ["nl", "en"];

// Deontologisch exact voorgeschreven. Nooit vrij vertalen.
const OFFICIELE_TITELS = [
  "Klinisch psycholoog (Erkend door de Psychologencommissie, met visum).",
  "In opleiding tot psychoanalytisch therapeut.",
];

// Officiële registratie (aangeleverd door Lucas).
const REGISTRATIE = {
  visum: "374462",
  erkenning: "991135455",
  ondernemingsnummer: "0790.741.228",
};

const TELEFOON = { display: "0493 02 05 43", href: "tel:+32493020543" };

export const content = {
  nl: {
    htmlLang: "nl",
    langLabel: "NL",
    otherLangLabel: "EN",

    nav: {
      welkom: "Welkom",
      werkwijze: "Werkwijze",
      overMij: "Over mij",
      praktisch: "Praktisch",
      contact: "Contact",
    },

    hero: {
      // OPEN VRAAG (PRD): Lucas kiest nog de definitieve quote.
      // Dit is een voorlopige keuze in zijn eigen woorden.
      quote: "Wees welkom, en vertel.",
      quoteIsPlaceholder: true,
      badge: "ouverture",
      name: "Lucas Borghys",
      role: "Klinisch psycholoog · Gent",
      scrollCue: "Kom binnen",
    },

    welkom: {
      movement: "I",
      kicker: "Verwelkoming",
      tempo: "cantabile",
      ghost: "vertel",
      // LETTERLIJKE KERNTEKST. Niet wijzigen zonder overleg.
      body: "Wees welkom, en vertel. Dat is de basis van waaruit we vertrekken en waarop we verder gaan. Ieder mens wordt vroeg of laat geconfronteerd met een worsteling, het leven voelt dan niet meer zo voorspelbaar of behapbaar aan en dit is voor velen een punt om de stap naar gesprekstherapie te zetten. Via het spreken proberen we vat te krijgen op die worsteling, proberen we woorden te vinden voor datgene dat voor onszelf nog geen duidelijkheid heeft, geen verhaal. Ik nodig je uit om samen te komen spreken over waar jij tegenaan botst en in hoeverre deze moeilijkheden betekenisvol zijn in jouw bredere levensverhaal. Elk verhaal, elke moeilijkheid is welkom.",
    },

    // NIEUWE COPY (op basis van tone-of-voice uit de PRD): te bevestigen met Lucas.
    intermezzo: {
      label: "intermezzo",
      quote:
        "Ruimte voor het unieke, voor warme andersheid, en om serieus genomen te worden in wat weegt.",
    },

    werkwijze: {
      movement: "II",
      kicker: "Werkwijze",
      tempo: "adagio",
      ghost: "spreken",
      title: "Traag, talig, en met ruimte voor je verhaal.",
      paragraphs: [
        "Ik werk psychoanalytisch georiënteerd. Dat betekent: geen snelle technieken of afvinklijstjes, maar tijd en ruimte om te spreken. We vertrekken van wat zich aandient en volgen de draad van je eigen woorden.",
        // NIEUWE COPY: impliciet queer-welkom, zonder labels of outing. Te bevestigen met Lucas.
        "Sommige dingen laten zich moeilijker uitspreken. Vragen rond verlangen, lichaam, geaardheid of identiteit, of het gevoel anders te zijn dan wat de omgeving verwacht. Net die verhalen krijgen hier alle ruimte, zonder dat er iets uitgelegd of verantwoord hoeft te worden.",
        "Via het spreken proberen we vat te krijgen op wat nog geen vorm heeft gevonden. Niet elke moeilijkheid heeft meteen een verklaring; soms is het zoeken naar taal voor iets dat er nog geen had, al een deel van de weg.",
      ],
      themesTitle: "Waar ik in het bijzonder ruimte voor maak",
      themes: [
        "Seksualiteit en genderproblemen",
        "Kunstenaars die hun plekje onder de zon nog moeten vinden",
        "Mensen die last hebben van hun denken: dwanggedachten, psychotische of bipolaire kwetsbaarheden",
      ],
    },

    overMij: {
      movement: "III",
      kicker: "Over mij",
      tempo: "tenuto",
      ghost: "verhaal",
      // LETTERLIJKE KERNTEKST. Niet wijzigen zonder overleg.
      body: "Ik ben klinisch psycholoog en ik heb een passie voor en ervaring met gesprekstherapie. Zelf probeer ik mijn werk als therapeut te verfijnen door deel te nemen aan een therapieopleiding in de psychoanalyse en deel te nemen aan lezingen en opleidingsdagen.",
      // Subtiel verweven werkervaring (PRD).
      ervaring:
        "Eerder werkte en leerde ik onder meer bij groepspraktijk Tondel, huis voor psychotherapie, Anker en de huiskamer, en deed ik vrijwilligerswerk in PVT De Wadi bij de Driesprong.",
      titelsLabel: "Titels & erkenning",
      titels: OFFICIELE_TITELS,
      registratieLabel: "Registratie",
      registratie: [
        `Visumnummer ${REGISTRATIE.visum}`,
        `Erkenningsnummer ${REGISTRATIE.erkenning}`,
        `Ondernemingsnummer ${REGISTRATIE.ondernemingsnummer}`,
      ],
      imageCaption:
        "De praktijk: een historische stadswoning bij de Boekentoren, met hoge plafonds, een tot bureau omgebouwde piano, veel groen en zacht licht.",
    },

    praktisch: {
      movement: "IV",
      kicker: "Praktisch",
      tempo: "coda",
      title: "Praktisch & contact",
      locatie: {
        label: "Praktijk",
        value: "Sint-Pietersnieuwstraat 97, 9000 Gent",
        note: "Naast de Boekentoren, in het hart van de studentenbuurt.",
      },
      talen: { label: "Talen", value: "Nederlands & Engels" },
      vorm: {
        label: "Vorm",
        value: "Op gesprek, of via video en telefoon",
      },
      tarief: {
        label: "Tarief",
        // Bewust een richtprijs/richtduur, geen strikte bedragen (PRD).
        value:
          "Een richtprijs en richtduur bespreken we bij de intake; de concrete afspraken stemmen we daar samen af.",
      },
      terugbetaling: {
        label: "Terugbetaling",
        // LETTERLIJKE KERNTEKST. Niet wijzigen zonder overleg.
        value:
          "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk; u mag uw formulier meebrengen naar de sessie.",
      },
      telefoonLabel: "GSM",
      telefoon: TELEFOON,
      emailNote: "E-mail: via het contactformulier hieronder.",
      kaart: {
        title: "Vind de weg",
        pin: "Praktijk",
        pinAddress: "Sint-Pietersnieuwstraat 97",
        landmark: "Boekentoren",
        water: "Schelde",
        streets: {
          main: "Sint-Pietersnieuwstraat",
          overpoort: "Overpoortstraat",
          rozier: "Rozier",
        },
        routeLabel: "Route",
        routeHref:
          "https://www.google.com/maps/search/?api=1&query=Sint-Pietersnieuwstraat+97+9000+Gent",
        routeNote: "Opent in uw eigen kaart-app.",
      },
      // LETTERLIJKE KERNTEKST. Niet wijzigen zonder overleg.
      contactMicrocopy:
        "Een voicemail is aangeraden indien ik telefonisch niet bereikbaar ben. Ik probeer binnen de dag een antwoord te formuleren. Houd zeker ook uw spamfolder in het oog wanneer u een antwoord verwacht.",
      email: "praktijkadres-staat-in-env",
    },

    form: {
      title: "Neem contact op",
      intro:
        "Laat kort iets weten en ik neem contact met u op. Wat u hier deelt, blijft vertrouwelijk.",
      onderwerp: "Onderwerp",
      toelichting: "Toelichting",
      toelichtingHint: "Kort volstaat. U hoeft nu nog niets uit te leggen.",
      emailLabel: "E-mailadres",
      telefoonLabel: "Telefoonnummer",
      beschikbaarheid: "Weekbeschikbaarheden",
      beschikbaarheidHint: "Bijv. weekdagen na 17u, of woensdagvoormiddag.",
      submit: "Versturen",
      sending: "Versturen…",
      success:
        "Dank u. Uw bericht is verstuurd. Ik probeer binnen de dag te antwoorden.",
      error:
        "Er ging iets mis bij het versturen. Belt u gerust, of probeer het later opnieuw:",
      privacy: "Privacybeleid",
      privacyNote:
        "Uw gegevens worden enkel gebruikt om uw vraag te beantwoorden en worden niet gedeeld. Geen tracking, geen advertentiecookies.",
      required: "Vul dit veld in.",
      invalidEmail: "Controleer het e-mailadres.",
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
      tagline: "Elk verhaal, elke moeilijkheid is welkom.",
      rights: "Alle rechten voorbehouden.",
      privacy: "Privacybeleid",
      legal: `Visum ${REGISTRATIE.visum} · Erkenning ${REGISTRATIE.erkenning} · KBO ${REGISTRATIE.ondernemingsnummer}`,
      colophon: "Ontworpen met zorg. Beelden en quote nog te vervangen.",
    },
  },

  en: {
    htmlLang: "en",
    langLabel: "EN",
    otherLangLabel: "NL",

    nav: {
      welkom: "Welcome",
      werkwijze: "Approach",
      overMij: "About",
      praktisch: "Practical",
      contact: "Contact",
    },

    hero: {
      quote: "Be welcome, and speak.",
      quoteIsPlaceholder: true,
      badge: "ouverture",
      name: "Lucas Borghys",
      role: "Clinical psychologist · Ghent",
      scrollCue: "Come in",
    },

    welkom: {
      movement: "I",
      kicker: "Welcome",
      tempo: "cantabile",
      ghost: "speak",
      body: "Be welcome, and speak. That is the ground we set out from and keep returning to. Sooner or later, everyone meets a struggle; life no longer feels predictable or manageable, and for many this is the point where they take the step toward talking therapy. Through speaking we try to get a hold on that struggle, to find words for what has, for ourselves, no clarity yet, no story. I invite you to come and speak together about what you run up against, and how far these difficulties are meaningful within your broader life story. Every story, every difficulty is welcome.",
    },

    intermezzo: {
      label: "intermezzo",
      quote:
        "Room for the singular, for a warm otherness, and to be taken seriously in what weighs on you.",
    },

    werkwijze: {
      movement: "II",
      kicker: "Approach",
      tempo: "adagio",
      ghost: "speaking",
      title: "Slow, spoken, and with room for your story.",
      paragraphs: [
        "I work from a psychoanalytic orientation. That means: no quick techniques or checklists, but time and space to speak. We start from whatever presents itself and follow the thread of your own words.",
        "Some things are harder to say out loud. Questions of desire, the body, orientation or identity, or the sense of being other than what your surroundings expect. Precisely those stories are given full room here, without anything needing to be explained or justified.",
        "Through speaking we try to grasp what has not yet found a shape. Not every difficulty has an immediate explanation; sometimes the search for language for something that had none is already part of the way.",
      ],
      themesTitle: "Where I make particular room",
      themes: [
        "Sexuality and gender questions",
        "Artists still finding their place in the sun",
        "People troubled by their own thinking: intrusive thoughts, psychotic or bipolar vulnerabilities",
      ],
    },

    overMij: {
      movement: "III",
      kicker: "About",
      tempo: "tenuto",
      ghost: "story",
      body: "I am a clinical psychologist with a passion for, and experience in, talking therapy. I try to refine my work as a therapist by taking part in a training in psychoanalysis and by attending lectures and study days.",
      ervaring:
        "I previously worked and trained at group practice Tondel, huis voor psychotherapie, Anker and de huiskamer, and volunteered at PVT De Wadi at de Driesprong.",
      titelsLabel: "Titles & recognition",
      titels: OFFICIELE_TITELS,
      registratieLabel: "Registration",
      registratie: [
        `Visa number ${REGISTRATIE.visum}`,
        `Recognition number ${REGISTRATIE.erkenning}`,
        `Company number ${REGISTRATIE.ondernemingsnummer}`,
      ],
      imageCaption:
        "The practice: a historic townhouse near the Boekentoren, with high ceilings, a piano turned into a desk, abundant greenery and soft light.",
    },

    praktisch: {
      movement: "IV",
      kicker: "Practical",
      tempo: "coda",
      title: "Practical & contact",
      locatie: {
        label: "Practice",
        value: "Sint-Pietersnieuwstraat 97, 9000 Ghent",
        note: "Beside the Boekentoren, in the heart of the student quarter.",
      },
      talen: { label: "Languages", value: "Dutch & English" },
      vorm: {
        label: "Format",
        value: "In person, or by video and phone",
      },
      tarief: {
        label: "Fee",
        value:
          "A guide price and guide duration are discussed at intake; we settle the concrete arrangements together there.",
      },
      terugbetaling: {
        label: "Reimbursement",
        value:
          "Niet-geconventioneerd. Gedeeltelijke terugbetaling van het ziekenfonds is mogelijk; u mag uw formulier meebrengen naar de sessie.",
      },
      telefoonLabel: "Mobile",
      telefoon: TELEFOON,
      emailNote: "Email: through the contact form below.",
      kaart: {
        title: "Find your way",
        pin: "Practice",
        pinAddress: "Sint-Pietersnieuwstraat 97",
        landmark: "Boekentoren",
        water: "Schelde",
        streets: {
          main: "Sint-Pietersnieuwstraat",
          overpoort: "Overpoortstraat",
          rozier: "Rozier",
        },
        routeLabel: "Directions",
        routeHref:
          "https://www.google.com/maps/search/?api=1&query=Sint-Pietersnieuwstraat+97+9000+Gent",
        routeNote: "Opens in your own map app.",
      },
      contactMicrocopy:
        "A voicemail is advised if I cannot be reached by phone. I try to reply within the day. Do keep an eye on your spam folder when expecting an answer.",
      email: "praktijkadres-staat-in-env",
    },

    form: {
      title: "Get in touch",
      intro:
        "Leave a short note and I will get back to you. What you share here stays confidential.",
      onderwerp: "Subject",
      toelichting: "Message",
      toelichtingHint: "A few lines are enough. No need to explain everything now.",
      emailLabel: "Email address",
      telefoonLabel: "Phone number",
      beschikbaarheid: "Weekly availability",
      beschikbaarheidHint: "E.g. weekdays after 5pm, or Wednesday mornings.",
      submit: "Send",
      sending: "Sending…",
      success: "Thank you. Your message has been sent. I try to reply within the day.",
      error: "Something went wrong sending this. Feel free to call, or try again later:",
      privacy: "Privacy policy",
      privacyNote:
        "Your details are used only to answer your question and are not shared. No tracking, no advertising cookies.",
      required: "Please fill in this field.",
      invalidEmail: "Please check the email address.",
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
      tagline: "Every story, every difficulty is welcome.",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      legal: `Visa ${REGISTRATIE.visum} · Recognition ${REGISTRATIE.erkenning} · Company no. ${REGISTRATIE.ondernemingsnummer}`,
      colophon: "Designed with care. Imagery and quote still to be replaced.",
    },
  },
} as const;

export type Content = (typeof content)[Lang];
