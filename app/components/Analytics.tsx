"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

let initialized = false;

/**
 * Initialiseert PostHog in een `useEffect`, dus pas ná hydratatie — niet in
 * `instrumentation-client.ts`, dat vóór hydratatie draait. PostHog's init()
 * injecteert een lazy-loaded extensiescript vanaf hun CDN rechtstreeks in de
 * DOM; deed het dat vóór hydratatie, dan botste dat positioneel met de
 * server-gerenderde JSON-LD-<script> (het eerste kind van <body>), wat een
 * hydration-mismatch gaf. Na hydratatie is die race onmogelijk. Component
 * rendert zelf niets.
 *
 * Zonder NEXT_PUBLIC_POSTHOG_KEY gebeurt er niets — inert by design.
 *
 * `enable_heatmaps` en `capture_dead_clicks` staan los van `autocapture` en
 * volgen anders de PostHog-projectinstellingen (die standaard aan kunnen
 * staan). Beide vallen onder klik-/interactietracking en worden hier expliciet
 * uitgezet, in lijn met de privacyverklaring ("geen klik- of
 * interactietracking") — ongeacht wat er later in het PostHog-dashboard
 * ingesteld wordt. `disable_surveys` voorkomt het onnodig laden van de
 * surveys-bundel, die anders standaard wordt opgehaald.
 */
export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    initialized = true;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",
      autocapture: false,
      capture_pageview: "history_change",
      disable_session_recording: true,
      enable_heatmaps: false,
      capture_dead_clicks: false,
      disable_surveys: true,
      respect_dnt: true,
      person_profiles: "identified_only",
    });
  }, []);

  return null;
}
