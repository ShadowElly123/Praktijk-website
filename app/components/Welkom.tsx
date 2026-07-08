"use client";

import { useLang } from "../lib/LanguageProvider";
import { Reveal } from "./Reveal";
import { ScoreLine } from "./ScoreLine";
import { GhostWord } from "./GhostWord";

export function Welkom() {
  const { t } = useLang();

  return (
    <section id="welkom" className="relative overflow-hidden py-28 md:py-40">
      <GhostWord word={t.welkom.ghost} align="right" top="4%" />

      <div className="shell relative z-10">
        <Reveal>
          <ScoreLine
            movement={t.welkom.movement}
            label={t.welkom.kicker}
            tempo={t.welkom.tempo}
          />
        </Reveal>

        <div className="max-w-3xl md:pl-[8%]">
          <Reveal soft delay={120}>
            <p
              className="mt-14 font-serif"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)",
                lineHeight: 1.62,
                fontWeight: 300,
                color: "var(--text)",
              }}
            >
              {t.welkom.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
