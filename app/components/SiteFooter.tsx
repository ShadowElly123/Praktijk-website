"use client";

import { useLang } from "../lib/LanguageProvider";

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer
      id="privacy"
      className="relative border-t py-16"
      style={{ borderColor: "var(--line)", background: "var(--bg-deep)" }}
    >
      <div className="shell">
        <p
          className="font-serif italic"
          style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", fontWeight: 300, color: "var(--text)", maxWidth: "20ch" }}
        >
          {t.footer.tagline}
        </p>

        <div className="mt-12 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between" style={{ borderColor: "var(--line)" }}>
          <div className="flex flex-col gap-1">
            <span className="font-display text-[0.9rem] tracking-[0.02em]" style={{ color: "var(--text)" }}>
              Lucas Borghys
            </span>
            <span className="font-serif text-[0.9rem]" style={{ color: "var(--text-dim)" }}>
              {t.praktisch.locatie.value}
            </span>
            <a
              href={t.praktisch.telefoon.href}
              className="link-underline font-serif text-[0.9rem]"
              style={{ color: "var(--text-dim)", fontVariantNumeric: "tabular-nums" }}
            >
              {t.praktisch.telefoon.display}
            </a>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <a href="#privacy" className="link-underline font-display text-[0.8rem] tracking-[0.04em]" style={{ color: "var(--text-dim)" }}>
              {t.footer.privacy}
            </a>
            <span className="font-serif text-[0.8rem]" style={{ color: "var(--text-faint)" }}>
              © {year} · {t.footer.rights}
            </span>
            <span
              className="font-serif text-[0.78rem]"
              style={{ color: "var(--text-faint)", fontVariantNumeric: "tabular-nums" }}
            >
              {t.footer.legal}
            </span>
          </div>
        </div>

        <p className="mt-8 font-serif italic text-[0.78rem]" style={{ color: "var(--text-faint)" }}>
          {t.footer.colophon}
        </p>
      </div>
    </footer>
  );
}
