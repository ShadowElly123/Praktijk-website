import Link from "next/link";
import type { Content, Locale } from "../../lib/locale";

/**
 * Footer — naam + rol, en daaronder een rij met de privacy-link en de
 * wettelijke registratienummers.
 */
export function SiteFooter({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <footer
      className="sec-x"
      style={{
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--line)",
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: 8,
            }}
          >
            {c.site.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--mono-3)",
            }}
          >
            {c.site.role}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href={`/${lang}/privacy`}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--brass)",
            textDecoration: "none",
          }}
        >
          {c.footer.privacy}
        </Link>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--mono-3)",
          }}
        >
          {c.footer.legal}
        </span>
      </div>
    </footer>
  );
}
