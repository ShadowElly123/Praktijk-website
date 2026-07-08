"use client";

import { useLang } from "../lib/LanguageProvider";
import { Reveal } from "./Reveal";
import { PlaceholderImage } from "./PlaceholderImage";
import { ScoreLine } from "./ScoreLine";
import { GhostWord } from "./GhostWord";

export function OverMij() {
  const { t } = useLang();

  return (
    <section
      id="over-mij"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "var(--bg-deep)" }}
    >
      <GhostWord word={t.overMij.ghost} align="right" top="52%" />

      <div className="shell relative z-10">
        <Reveal>
          <ScoreLine
            movement={t.overMij.movement}
            label={t.overMij.kicker}
            tempo={t.overMij.tempo}
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-14 md:grid-cols-2 md:gap-20">
          {/* Beeld-placeholder: komt later, low-key foto van Lucas / de ruimte */}
          <Reveal soft className="md:sticky md:top-28">
            <PlaceholderImage className="aspect-[4/5] w-full" />
            <p
              className="mt-4 font-serif italic"
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: "var(--text-faint)",
              }}
            >
              {t.overMij.imageCaption}
            </p>
          </Reveal>

          {/* Tekst */}
          <div>
            <Reveal delay={100}>
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  color: "var(--text)",
                }}
              >
                {t.overMij.body}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p
                className="mt-6 font-serif"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.12rem)",
                  lineHeight: 1.75,
                  color: "var(--text-dim)",
                }}
              >
                {t.overMij.ervaring}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div
                className="mt-12 border-t pt-8"
                style={{ borderColor: "var(--line)" }}
              >
                <p
                  className="font-display text-[0.72rem] uppercase tracking-[0.24em]"
                  style={{ color: "var(--brass)" }}
                >
                  {t.overMij.titelsLabel}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {t.overMij.titels.map((titel, i) => (
                    <li
                      key={i}
                      className="font-serif"
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.55,
                        color: "var(--text)",
                      }}
                    >
                      {titel}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div
                className="mt-8 border-t pt-8"
                style={{ borderColor: "var(--line)" }}
              >
                <p
                  className="font-display text-[0.72rem] uppercase tracking-[0.24em]"
                  style={{ color: "var(--brass)" }}
                >
                  {t.overMij.registratieLabel}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {t.overMij.registratie.map((line, i) => (
                    <li
                      key={i}
                      className="font-serif"
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "var(--text-dim)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
