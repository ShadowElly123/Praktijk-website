import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* ------------------------------------------------------------------
   Contactformulier-verwerking.

   Privacy (PRD): er wordt NIETS opgeslagen op de server. De inzending
   wordt enkel doorgestuurd als e-mail naar Lucas en daarna vergeten.

   E-mailverzending is provider-agnostisch via env-variabelen.
   - CONTACT_TO       : bestemmeling (default praktijkadres-staat-in-env)
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
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots vullen dit onzichtbare veld in → stilzwijgend negeren.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
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

  const to = process.env.CONTACT_TO ?? "praktijkadres-staat-in-env";
  const subject = `Website · nieuwe aanvraag: ${onderwerp}`;
  const lines = [
    `Onderwerp: ${onderwerp}`,
    `Toelichting: ${toelichting}`,
    `E-mailadres: ${email}`,
    `Telefoonnummer: ${telefoon || "(niet opgegeven)"}`,
    `Weekbeschikbaarheden: ${beschikbaarheid || "(niet opgegeven)"}`,
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:Georgia,serif;line-height:1.6">${lines
    .map((l) => `<p style="margin:0 0 6px">${escapeHtml(l)}</p>`)
    .join("")}</div>`;

  const resendKey = process.env.RESEND_API_KEY;

  // Geen provider geconfigureerd → log server-side (dev/demo) en meld succes,
  // zodat de UI werkt. In productie MOET een provider ingesteld zijn; anders
  // is het mailto-adres onder het formulier de betrouwbare terugvalweg.
  if (!resendKey) {
    console.info("[contact] (geen mailprovider geconfigureerd) inzending:", text);
    return NextResponse.json({ ok: true, delivered: false });
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
