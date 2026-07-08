"use client";

import { useLang } from "../lib/LanguageProvider";
import { Reveal } from "./Reveal";
import { ScoreLine } from "./ScoreLine";
import { GhostWord } from "./GhostWord";

export function Werkwijze() {
  const { t } = useLang();

  return (
    <section id="werkwijze" className="relative overflow-hidden py-28 md:py-36">
      <GhostWord word={t.werkwijze.ghost} align="left" top="30%" />

      {/* zachte brass-gloed rechts */}
      <div
        aria-hidden
        className="spotlight"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 780,
          maxHeight: 780,
          right: "-14vw",
          top: "10%",
        }}
      />

      <div className="shell relative z-10">
        <Reveal>
          <ScoreLine
            movement={t.werkwijze.movement}
            label={t.werkwijze.kicker}
            tempo={t.werkwijze.tempo}
          />
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div>
            <Reveal delay={100}>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}>
                {t.werkwijze.title}
              </h2>
            </Reveal>
          </div>

          <div className="max-w-2xl">
            {t.werkwijze.paragraphs.map((p, i) => (
              <Reveal key={i} delay={140 + i * 120}>
                <p
                  className="mb-6 font-serif"
                  style={{
                    fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
                    lineHeight: 1.78,
                    color: "var(--text-dim)",
                  }}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={420} className="mt-12">
              <p
                className="font-display text-[0.82rem] uppercase tracking-[0.2em]"
                style={{ color: "var(--brass)" }}
              >
                {t.werkwijze.themesTitle}
              </p>
              <ul className="mt-6 flex flex-col">
                {t.werkwijze.themes.map((theme, i) => (
                  <li
                    key={i}
                    className="theme-row border-t py-5 font-serif"
                    style={{
                      borderColor: "var(--line)",
                      fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                      lineHeight: 1.5,
                      color: "var(--text)",
                    }}
                  >
                    <span
                      className="mr-4 font-display text-[0.8rem]"
                      style={{ color: "var(--brass)" }}
                    >
                      0{i + 1}
                    </span>
                    {theme}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
