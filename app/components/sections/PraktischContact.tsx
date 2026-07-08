import type { Content, Locale } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { ContactForm } from "../ContactForm";

/**
 * Praktisch & contact — links de praktische info (richtprijs, terugbetaling,
 * betaling, microcopy) + GSM en registratienummers, rechts het formulier.
 * Stapelt op mobiel.
 */
export function PraktischContact({ c, lang }: { c: Content; lang: Locale }) {
  const p = c.praktisch;
  return (
    <section
      aria-label={p.label}
      className="sec-x"
      style={{
        position: "relative",
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "18vh",
        paddingBottom: "8vh",
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="contact-grid">
        <Reveal>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: 28,
            }}
          >
            {p.num}&nbsp;·&nbsp;{p.label}
          </div>

          <p
            style={{
              margin: "0 0 18px",
              maxWidth: 440,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 19,
              lineHeight: 1.8,
              color: "var(--text)",
            }}
          >
            {p.richtprijs}
          </p>
          <p
            style={{
              margin: "0 0 18px",
              maxWidth: 440,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {p.terugbetaling}
          </p>
          <p
            style={{
              margin: "0 0 18px",
              maxWidth: 440,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {p.betaling}
          </p>
          <p
            style={{
              margin: "0 0 32px",
              maxWidth: 440,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
              color: "var(--mono-1)",
            }}
          >
            {p.microcopy}
          </p>

          {/* GSM */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--mono-2)",
                marginBottom: 6,
              }}
            >
              {p.gsmLabel}
            </div>
            <a
              href={p.gsmHref}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 22,
                letterSpacing: "0.02em",
                color: "var(--brass)",
                textDecoration: "none",
              }}
            >
              {p.gsm}
            </a>
          </div>

          {/* Registratie */}
          <div
            style={{
              borderTop: "1px solid var(--line-2)",
              paddingTop: 20,
              maxWidth: 440,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--mono-2)",
                marginBottom: 10,
              }}
            >
              {p.registratieLabel}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {p.registratie.map((r) => (
                <li
                  key={r}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    lineHeight: 1.9,
                    color: "var(--mono-3)",
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm c={c} lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}
