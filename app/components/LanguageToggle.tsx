"use client";

import { useLang } from "../lib/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center gap-2 font-display text-[0.78rem] tracking-[0.15em] ${className}`}
      role="group"
      aria-label="Taal / Language"
    >
      <button
        type="button"
        onClick={() => setLang("nl")}
        aria-pressed={lang === "nl"}
        className="transition-colors duration-300"
        style={{ color: lang === "nl" ? "var(--brass)" : "var(--text-faint)" }}
      >
        NL
      </button>
      <span aria-hidden style={{ color: "var(--text-faint)" }}>
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className="transition-colors duration-300"
        style={{ color: lang === "en" ? "var(--brass)" : "var(--text-faint)" }}
      >
        EN
      </button>
    </div>
  );
}
