"use client";

import { useState } from "react";
import { useLang } from "../lib/LanguageProvider";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full bg-transparent px-0 py-3 font-serif text-[1.02rem] text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] border-b transition-colors duration-300";

export function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="font-serif"
        style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "var(--brass)" }}
        role="status"
      >
        {t.form.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate={false}>
      {/* honeypot tegen spam — verborgen voor mensen */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <label className="flex flex-col gap-2">
        <span className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          {t.form.onderwerp}
        </span>
        <input
          name="onderwerp"
          required
          className={field}
          style={{ borderColor: "var(--line)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brass)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          {t.form.toelichting}
        </span>
        <textarea
          name="toelichting"
          required
          rows={4}
          className={`${field} resize-none`}
          style={{ borderColor: "var(--line)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brass)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
        />
        <span className="font-serif text-[0.82rem] italic text-[var(--text-faint)]">
          {t.form.toelichtingHint}
        </span>
      </label>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-dim)]">
            {t.form.emailLabel}
          </span>
          <input
            name="email"
            type="email"
            required
            className={field}
            style={{ borderColor: "var(--line)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brass)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-dim)]">
            {t.form.telefoonLabel}
          </span>
          <input
            name="telefoon"
            type="tel"
            className={field}
            style={{ borderColor: "var(--line)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brass)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          {t.form.beschikbaarheid}
        </span>
        <input
          name="beschikbaarheid"
          className={field}
          style={{ borderColor: "var(--line)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brass)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
        />
        <span className="font-serif text-[0.82rem] italic text-[var(--text-faint)]">
          {t.form.beschikbaarheidHint}
        </span>
      </label>

      <div className="flex flex-col gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-fit items-center gap-3 border px-8 py-4 font-display text-[0.82rem] uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-60"
          style={{
            borderColor: "var(--brass)",
            color: "var(--brass)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--brass)";
            e.currentTarget.style.color = "#14110d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--brass)";
          }}
        >
          {status === "sending" ? t.form.sending : t.form.submit}
          <span aria-hidden>→</span>
        </button>

        {status === "error" && (
          <p className="font-serif text-[0.95rem]" style={{ color: "#d98d76" }} role="alert">
            {t.form.error}{" "}
            <a
              href={t.praktisch.telefoon.href}
              className="link-underline"
              style={{ color: "var(--brass)" }}
            >
              {t.praktisch.telefoon.display}
            </a>
            .
          </p>
        )}

        <p className="font-serif text-[0.82rem] leading-relaxed text-[var(--text-faint)]">
          {t.form.privacyNote}{" "}
          <a href="#privacy" className="link-underline" style={{ color: "var(--text-dim)" }}>
            {t.form.privacy}
          </a>
        </p>
      </div>
    </form>
  );
}
