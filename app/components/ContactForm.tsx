"use client";

import { useState } from "react";
import posthog from "posthog-js";
import type { Content } from "../lib/locale";

type Status = "idle" | "sending" | "success" | "error";
type Field = "onderwerp" | "toelichting" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--mono-2)",
  marginBottom: 8,
  display: "block",
};

const hintStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif), serif",
  fontStyle: "italic",
  fontSize: 13,
  color: "var(--mono-1)",
  marginTop: 8,
};

const errStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 12,
  color: "#c98b76",
  marginTop: 8,
};

/**
 * Contactformulier (client). Vijf velden (onderwerp, toelichting, e-mail,
 * telefoon, beschikbaarheid) met echte, zichtbare labels, client-validatie op de
 * verplichte velden, submit-states en een honeypot-veld. De server slaat niets
 * op; hij stuurt de inzending enkel door als e-mail.
 */
export function ContactForm({ c }: { c: Content }) {
  const f = c.form;
  const [values, setValues] = useState({
    onderwerp: "",
    toelichting: "",
    email: "",
    telefoon: "",
    beschikbaarheid: "",
    company: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!values.onderwerp.trim()) next.onderwerp = f.requiredMsg;
    if (!values.toelichting.trim()) next.toelichting = f.requiredMsg;
    if (!values.email.trim()) next.email = f.requiredMsg;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.emailMsg;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        // Enkel het feit dát er verzonden is — nooit de ingevulde inhoud.
        posthog.capture("contact_form_submitted");
      }
    } catch {
      setStatus("error");
    }
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (status === "success") {
    return (
      <p
        role="status"
        style={{
          fontFamily: "var(--font-serif), serif",
          fontWeight: 300,
          fontSize: 19,
          lineHeight: 1.7,
          color: "var(--brass)",
        }}
      >
        {f.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      // Schermt het hele formulier af van PostHog's autocapture: hier typen
      // mensen hun hulpvraag, dus er mag niets uit deze velden worden
      // vastgelegd — ook niet de labels of aangeklikte elementen. Enkel het
      // expliciete `contact_form_submitted`-event (zonder inhoud) wordt gestuurd.
      data-ph-no-autocapture
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      {/* Honeypot: verborgen voor mensen, verleidelijk voor bots. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(e) => update("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div>
        <label htmlFor="cf-onderwerp" style={labelStyle}>
          {f.onderwerp}
        </label>
        <input
          id="cf-onderwerp"
          name="onderwerp"
          className="contact-field"
          value={values.onderwerp}
          onChange={(e) => update("onderwerp", e.target.value)}
          aria-invalid={errors.onderwerp ? "true" : undefined}
          aria-describedby={errors.onderwerp ? "cf-onderwerp-err" : undefined}
        />
        {errors.onderwerp && (
          <p id="cf-onderwerp-err" style={errStyle}>
            {errors.onderwerp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-toelichting" style={labelStyle}>
          {f.toelichting}
        </label>
        <textarea
          id="cf-toelichting"
          name="toelichting"
          rows={4}
          className="contact-field"
          value={values.toelichting}
          onChange={(e) => update("toelichting", e.target.value)}
          aria-invalid={errors.toelichting ? "true" : undefined}
          aria-describedby={errors.toelichting ? "cf-toelichting-err" : "cf-toelichting-hint"}
          style={{ resize: "none" }}
        />
        {errors.toelichting ? (
          <p id="cf-toelichting-err" style={errStyle}>
            {errors.toelichting}
          </p>
        ) : (
          <p id="cf-toelichting-hint" style={hintStyle}>
            {f.toelichtingHint}
          </p>
        )}
      </div>

      <div className="field-2col">
        <div>
          <label htmlFor="cf-email" style={labelStyle}>
            {f.emailLabel}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            className="contact-field"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="cf-email-err" style={errStyle}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-telefoon" style={labelStyle}>
            {f.telefoonLabel}
          </label>
          <input
            id="cf-telefoon"
            name="telefoon"
            type="tel"
            className="contact-field"
            value={values.telefoon}
            onChange={(e) => update("telefoon", e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-beschikbaarheid" style={labelStyle}>
          {f.beschikbaarheid}
        </label>
        <input
          id="cf-beschikbaarheid"
          name="beschikbaarheid"
          className="contact-field"
          value={values.beschikbaarheid}
          onChange={(e) => update("beschikbaarheid", e.target.value)}
          aria-describedby="cf-beschikbaarheid-hint"
        />
        <p id="cf-beschikbaarheid-hint" style={hintStyle}>
          {f.beschikbaarheidHint}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          alignSelf: "flex-start",
          marginTop: 4,
          background: "var(--brass)",
          color: "var(--bg)",
          border: "none",
          padding: "14px 30px",
          fontFamily: "var(--font-sans), sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "0.04em",
          cursor: status === "sending" ? "default" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? f.sending : f.verstuur}
      </button>

      {status === "error" && (
        <p role="alert" style={{ ...errStyle, marginTop: 0 }}>
          {f.error}{" "}
          <a href={c.praktisch.gsmHref} style={{ color: "var(--brass)" }}>
            {c.praktisch.gsm}
          </a>
          .
        </p>
      )}
    </form>
  );
}
