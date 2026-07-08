import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Verwelkoming — de letterlijke kerntekst van Lucas, groot gezet in Spectral,
 * met een brass-accentregel als afsluiter. Rustige, brede maat.
 */
export function Verwelkoming({ c }: { c: Content }) {
  const v = c.verwelkoming;
  return (
    <section
      aria-label={v.label}
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
        background: "var(--bg)",
      }}
    >
      <div style={{ position: "relative", maxWidth: 760 }}>
        <Reveal>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: 40,
            }}
          >
            {v.num}&nbsp;·&nbsp;{v.label}
          </div>
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
            }}
          >
            {v.body}
            <span style={{ color: "var(--brass)" }}>{v.accent}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
