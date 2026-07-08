"use client";

import { useState } from "react";
import type { Content, Locale } from "../lib/locale";

type Status = "idle" | "sending" | "success" | "error";
type Field = "naam" | "email" | "bericht";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contactformulier (client). Echte, visueel verborgen labels (a11y), client-
 * validatie en submit-states. Post naar /api/contact met een honeypot-veld.
 * De server slaat niets op; hij stuurt enkel door als e-mail.
 */
export function ContactForm({ c, lang }: { c: Content; lang: Locale }) {
  const f = c.form;
  const [values, setValues] = useState({ naam: "", email: "", bericht: "", company: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!values.naam.trim()) next.naam = f.requiredMsg;
    if (!values.email.trim()) next.email = f.requiredMsg;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.emailMsg;
    if (!values.bericht.trim()) next.bericht = f.requiredMsg;
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
    } catch {
      setStatus("error");
    }
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const errStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono), monospace",
    fontSize: 12,
    color: "#c98b76",
    marginTop: -8,
  };

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
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div>
        <label htmlFor="cf-naam" className="visually-hidden">
          {f.naam}
        </label>
        <input
          id="cf-naam"
          name="naam"
          className="contact-field"
          placeholder={f.naam}
          value={values.naam}
          onChange={(e) => update("naam", e.target.value)}
          aria-invalid={errors.naam ? "true" : undefined}
          aria-describedby={errors.naam ? "cf-naam-err" : undefined}
          autoComplete="name"
        />
        {errors.naam && (
          <p id="cf-naam-err" style={errStyle}>
            {errors.naam}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className="visually-hidden">
          {f.email}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className="contact-field"
          placeholder={f.email}
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
        <label htmlFor="cf-bericht" className="visually-hidden">
          {f.bericht}
        </label>
        <textarea
          id="cf-bericht"
          name="bericht"
          rows={4}
          className="contact-field"
          placeholder={f.bericht}
          value={values.bericht}
          onChange={(e) => update("bericht", e.target.value)}
          aria-invalid={errors.bericht ? "true" : undefined}
          aria-describedby={errors.bericht ? "cf-bericht-err" : undefined}
          style={{ resize: "none" }}
        />
        {errors.bericht && (
          <p id="cf-bericht-err" style={errStyle}>
            {errors.bericht}
          </p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
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
          {f.error}
        </p>
      )}

      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          lineHeight: 1.7,
          color: "var(--mono-3)",
          marginTop: 4,
          maxWidth: 440,
        }}
      >
        {f.privacyNote}{" "}
        <a href={`/${lang}/privacy`} style={{ color: "var(--mono-1)" }}>
          {f.privacyLink}
        </a>
      </p>
    </form>
  );
}
