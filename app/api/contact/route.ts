import { NextResponse } from "next/server";

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
