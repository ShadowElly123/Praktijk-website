import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { SectionKicker } from "../SectionKicker";
import { Editable } from "../review/Editable";

/**
 * Verwelkoming — de letterlijke kerntekst van Lucas, groot gezet in Spectral,
 * met een brass-accentregel als afsluiter. Rustige, brede maat.
 */
export function Verwelkoming({ c }: { c: Content }) {
  const v = c.verwelkoming;
  return (
    <section
      aria-label={v.label}
      data-section="verwelkoming"
      className="sec-x"
      style={{
        position: "relative",
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "16vh",
        paddingBottom: "16vh",
        // Transparant: de gedeelde achtergrond-wrapper (page.tsx) levert de kleur,
        // zodat de intermezzo-gloed hier ongestoord in kan doorlopen.
        background: "transparent",
      }}
    >
      <div style={{ position: "relative", maxWidth: 760 }}>
        <Reveal style={{ marginBottom: 40 }}>
          <SectionKicker as="h2" label={<Editable path="verwelkoming.label">{v.label}</Editable>} />
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(22px,2.5vw,30px)",
              lineHeight: 1.65,
              color: "var(--text)",
              textWrap: "pretty",
              whiteSpace: "pre-line",
            }}
          >
            <Editable path="verwelkoming.body">{v.body}</Editable>
            <span style={{ color: "var(--brass)" }}>
              <Editable path="verwelkoming.accent">{v.accent}</Editable>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
