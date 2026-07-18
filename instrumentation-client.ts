import posthog from "posthog-js";

/* ------------------------------------------------------------------
   PostHog — anonieme, privacy-vriendelijke bezoekersanalyse (EU-region).

   Bewust terughoudend geconfigureerd voor een site over mentale gezondheid
   met een kwetsbaar publiek:
   - autocapture uit: geen klik-/interactietracking, enkel paginabezoeken.
   - session recordings uit.
   - respect_dnt: eerbiedigt de browser "Do Not Track"-instelling.
   - person_profiles "identified_only": omdat we nooit identify() aanroepen,
     blijft elke bezoeker anoniem en wordt er geen persoonsprofiel opgebouwd.
   - capture_pageview "history_change": volgt paginabezoeken correct mee bij
     client-side navigatie (taalwissel, privacy-link) in de App Router.

   Zonder NEXT_PUBLIC_POSTHOG_KEY (bv. lokaal in dev) initialiseert dit niets.
------------------------------------------------------------------- */

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

if (key) {
  posthog.init(key, {
    api_host: host,
    ui_host: "https://eu.posthog.com",
    autocapture: false,
    capture_pageview: "history_change",
    disable_session_recording: true,
    respect_dnt: true,
    person_profiles: "identified_only",
  });
}
