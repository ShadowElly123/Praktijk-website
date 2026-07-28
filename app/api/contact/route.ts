import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";

/* ------------------------------------------------------------------
   Contactformulier-verwerking.

   Privacy (PRD): er wordt NIETS opgeslagen op de server. De inzending
   wordt enkel doorgestuurd als e-mail naar Lucas en daarna vergeten.

   E-mailverzending is provider-agnostisch via env-variabelen.
   - CONTACT_TO       : bestemmeling (verplicht, geen default)
   - RESEND_API_KEY   : indien gezet, wordt via de Resend-API verstuurd
   - CONTACT_FROM     : geverifieerd afzenderadres bij de provider

   LET OP (EU-compliance): Resend is een US-dienst. Voor strikte
   EU-verwerking kan hier later een Europese SMTP/provider komen
   (bv. Mailjet/Mailgun EU-region of een Belgische SMTP). De structuur
   hieronder blijft dan gelijk; enkel de verzendfunctie wisselt.
------------------------------------------------------------------- */

type Payload = {
  onderwerp?: string;
  toelichting?: string;
  email?: string;
  telefoon?: string;
  beschikbaarheid?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ------------------------------------------------------------------
   Rate limiting via Netlify Blobs.

   Het endpoint is publiek bereikbaar buiten het formulier om (bv. rechtstreeks
   met curl), en de honeypot houdt enkel domme bots tegen die het onzichtbare
   veld invullen. Zonder limiet kan iemand Lucas' inbox vullen en het gratis
   Resend-quotum (100 mails/dag) opsouperen, waardoor echte aanmeldingen die
   dag niet meer doorkomen.

   Max 3 inzendingen per uur per bezoeker. Er wordt een SHA-256-hash van het
   IP-adres bewaard, nooit het ruwe adres — consistent met de cookieloze,
   anonieme aanpak elders op de site (zie Analytics.tsx). De hash dient enkel
   om te tellen, niet om iemand te herkennen.

   Faalt de Blobs-opslag (bv. lokale dev zonder Netlify-link, of een storing),
   dan wordt NIET geblokkeerd: een gemist ratelimiet is minder erg dan een
   contactformulier dat voor een echte bezoeker onterecht dichtklapt.
------------------------------------------------------------------- */

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

async function isRateLimited(req: Request): Promise<boolean> {
  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!ip) return false;

  try {
    const store = getStore("contact-rate-limit");
    const key = createHash("sha256").update(ip).digest("hex");
    const now = Date.now();

    const record = (await store.get(key, { type: "json" })) as {
      count: number;
      windowStart: number;
    } | null;

    if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
      await store.setJSON(key, { count: 1, windowStart: now });
      return false;
    }

    if (record.count >= RATE_LIMIT_MAX) return true;

    await store.setJSON(key, { count: record.count + 1, windowStart: record.windowStart });
    return false;
  } catch (err) {
    console.error("[contact] rate-limit check mislukt, niet geblokkeerd:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots vullen dit onzichtbare veld in → stilzwijgend "ok".
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (await isRateLimited(req)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const onderwerp = (data.onderwerp ?? "").trim();
  const toelichting = (data.toelichting ?? "").trim();
  const email = (data.email ?? "").trim();
  const telefoon = (data.telefoon ?? "").trim();
  const beschikbaarheid = (data.beschikbaarheid ?? "").trim();

  if (!onderwerp || !toelichting || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  // Geen hardcoded bestemmeling: de repo is publiek en een adres in de broncode
  // is voer voor spambots. Ontbreekt de variabele, dan is dit een configuratie-
  // fout die de bezoeker moet zien, zodat die het GSM-nummer onder het formulier
  // gebruikt in plaats van te denken dat zijn bericht aankwam.
  const to = process.env.CONTACT_TO;
  if (!to) {
    console.error("[contact] CONTACT_TO ontbreekt — inzending niet verstuurd.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const subject = `Website · nieuwe aanvraag: ${onderwerp}`;
  const lines = [
    `Onderwerp: ${onderwerp}`,
    `E-mailadres: ${email}`,
    `Telefoonnummer: ${telefoon || "(niet opgegeven)"}`,
    `Weekbeschikbaarheden: ${beschikbaarheid || "(niet opgegeven)"}`,
    "",
    "Toelichting:",
    toelichting,
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:Georgia,serif;line-height:1.6">${lines
    .map((l) => (l === "" ? "<br>" : `<p style="margin:0 0 6px">${escapeHtml(l)}</p>`))
    .join("")}</div>`;

  // Een ontbrekende mailprovider is een configuratiefout, geen aanvaardbare
  // toestand. Eerder antwoordde de route hier `ok: true` en zag de bezoeker de
  // succesboodschap ("Ik lees dit met aandacht en laat binnen de dag iets
  // weten") terwijl het bericht nergens naartoe ging. Iemand die net de moed
  // vond om te schrijven mag niet in die stilte achterblijven: een 500 laat het
  // formulier de foutboodschap met het GSM-nummer zien, en dat is de eerlijke
  // terugvalweg.
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[contact] RESEND_API_KEY ontbreekt — inzending NIET verstuurd:", text);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] provider-fout:", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] onverwachte fout:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
