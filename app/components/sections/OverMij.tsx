import Image from "next/image";
import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";

/**
 * Over mij — 2-koloms: links het portret (met gradient-maskers en een hoek-badge),
 * rechts label, body, eerdere ervaring (italic, gedempt) en het titelblok met de
 * exacte, deontologisch verplichte officiële titels. Stapelt op mobiel (beeld boven).
 */
export function OverMij({ c }: { c: Content }) {
  const o = c.overMij;
  return (
    <section
      aria-label={o.label}
      className="split split--about"
      style={{
        position: "relative",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="split__media">
        <Image
          src="/images/portret.jpg"
          alt={o.badge}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 26%",
            filter: "grayscale(0.15) contrast(1.02) brightness(1.0)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(90% 70% at 42% 32%, rgba(194,166,131,0.08), transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(270deg, #0E0D0C 0%, rgba(14,13,12,0.18) 22%, transparent 52%), linear-gradient(180deg, #0E0D0C 0%, transparent 16%, transparent 84%, #0E0D0C 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            bottom: 22,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "#c9c0b2",
            background: "rgba(14,13,12,0.5)",
            border: "1px solid var(--line-4)",
            padding: "6px 9px",
            backdropFilter: "blur(4px)",
          }}
        >
          {o.badge}
        </div>
      </div>

      <div className="split__text split__text--about">
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
            {o.num}&nbsp;·&nbsp;{o.label}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              margin: "0 0 22px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(19px,1.9vw,23px)",
              lineHeight: 1.75,
              color: "var(--text)",
            }}
          >
            {o.body}
          </p>
          <p
            style={{
              margin: "0 0 36px",
              maxWidth: 520,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--mono-1)",
            }}
          >
            {o.ervaring}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderTop: "1px solid var(--line-2)",
              paddingTop: 24,
              maxWidth: 520,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--brass)",
              }}
            >
              {o.titel1}{" "}
              <span style={{ color: "var(--mono-2)", fontWeight: 400 }}>
                {o.titel1sub}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--brass)",
              }}
            >
              {o.titel2}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
