"use client";

import { useLang } from "../lib/LanguageProvider";
import { Reveal } from "./Reveal";

/**
 * Ademmoment tussen de delen. De fermate (boog met punt) is het muziekteken
 * voor "houd aan, zo lang als nodig": stilte die mag duren. Toepasselijker
 * teken voor gesprekstherapie bestaat er niet.
 */
export function Intermezzo() {
  const { t } = useLang();

  return (
    <section
      className="relative overflow-hidden py-32 md:py-48"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* zacht licht achter het citaat */}
      <div
        aria-hidden
        className="spotlight"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          maxHeight: 900,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal soft>
            {/* fermate */}
            <svg
              aria-hidden
              width="44"
              height="26"
              viewBox="0 0 44 26"
              fill="none"
              className="mx-auto"
            >
              <path
                d="M3 23 A19 19 0 0 1 41 23"
                stroke="var(--brass)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="22" cy="19.5" r="2.1" fill="var(--brass)" />
            </svg>

            <p
              className="mt-3 font-display text-[0.62rem] uppercase tracking-[0.32em]"
              style={{ color: "var(--text-faint)" }}
            >
              {t.intermezzo.label}
            </p>

            <p
              className="intermezzo-quote mt-8"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3rem)",
                color: "var(--text)",
              }}
            >
              {t.intermezzo.quote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
