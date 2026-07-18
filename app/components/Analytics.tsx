"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

let initialized = false;

/* ------------------------------------------------------------------
   PostHog — cookieloze bezoekersanalyse (EU-region).

   COOKIELOOS, dus géén cookiebanner nodig. `cookieless_mode: "always"`
   zorgt dat er niets op het apparaat van de bezoeker wordt opgeslagen:
   geen cookies, geen localStorage, geen sessionStorage. PostHog berekent
   server-side een onomkeerbare hash (IP + user-agent + dagelijks wisselend
   salt dat daarna gewist wordt) om sessies te tellen. Die hash geldt niet
   als persoonsgegeven, want er valt niets uit te herleiden.

   ⚠️ Cookieless mode moet OOK aanstaan in de PostHog-projectinstellingen,
   anders worden alle events stilzwijgend genegeerd.

   Omdat er geen persistente identifier bestaat, is gedragsanalyse hier
   verdedigbaar: het levert anoniem, geaggregeerd gedrag op zonder profiel.
   Vandaar dat autocapture/heatmaps hier wél aan staan.

   Wat bewust uit blijft:
   - session replay & surveys: werken sowieso niet cookieloos (ze hebben
     opslag op het apparaat nodig), en een sessieopname van iemand die een
     hulpvraag typt is voor deze praktijk sowieso ongepast.
   - identify(): cookieloos onmogelijk, en niet gewenst — bezoekers blijven
     anoniem.

   Zonder NEXT_PUBLIC_POSTHOG_KEY gebeurt er niets — inert by design.
------------------------------------------------------------------- */

/** Secties die al gemeld zijn, per pad — voorkomt dubbele events. */
const seenSections = new Set<string>();

export function Analytics() {
  const pathname = usePathname();

  // Initialisatie: pas ná hydratatie (useEffect), zodat PostHog's dynamisch
  // geïnjecteerde scripts niet botsen met de server-gerenderde JSON-LD-<script>.
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    initialized = true;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",

      // Geen enkele opslag op het apparaat → geen cookiebanner nodig.
      cookieless_mode: "always",
      persistence: "memory",

      // Paginabezoeken + verlaten (levert bounce rate, tijd op pagina en
      // scroll-diepte op). 'history_change' vangt ook client-side navigatie.
      capture_pageview: "history_change",
      capture_pageleave: true,

      // Gedragsdata — anoniem en zonder profiel, dus verantwoord cookieloos.
      autocapture: true,
      enable_heatmaps: true,
      capture_dead_clicks: true,

      // Technische kwaliteit: JS-fouten en laadprestaties.
      capture_exceptions: true,
      capture_performance: true,

      // Eerbiedigt de browserinstelling "Do Not Track".
      respect_dnt: true,

      // Kan cookieloos toch niet; expliciet voor de duidelijkheid.
      person_profiles: "never",
    });
  }, []);

  // Sectie-funnel: meldt welke secties in beeld komen. Op een one-pager is dit
  // de enige manier om te zien waar bezoekers afhaken, want er zijn geen
  // aparte pagina's. Puur zichtbaarheid — geen muis- of kliktracking.
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const name = entry.target.getAttribute("data-section");
          if (!name) return;
          const seenKey = `${pathname}:${name}`;
          if (seenSections.has(seenKey)) return;
          seenSections.add(seenKey);
          posthog.capture("section_viewed", { section: name, pathname });
          observer.unobserve(entry.target);
        });
      },
      // Pas melden als de sectie echt gezien is, niet bij een flits in beeld.
      { threshold: 0.4 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
