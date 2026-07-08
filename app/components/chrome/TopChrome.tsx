"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "../../lib/locale";

/**
 * Sticky topbalk: links de naam, rechts regio + NL/EN-taalpil. De pil is een
 * paar `<Link>`s die de huidige subroute behouden en enkel de locale wisselen.
 * Stijl exact uit de goedgekeurde Claude Design (glazen pil, brass-fill actief).
 */
export function TopChrome({ name, region }: { name: string; region: string }) {
  const pathname = usePathname();
  // Strip de leidende locale zodat de subroute (bv. /privacy) behouden blijft.
  const rest = pathname.replace(/^\/(nl|en)(?=\/|$)/, "");
  const current = (pathname.match(/^\/(nl|en)(?=\/|$)/)?.[1] ?? "nl") as Locale;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        marginBottom: -84,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "26px 40px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--text)",
          pointerEvents: "auto",
          textShadow: "0 1px 8px rgba(0,0,0,0.7)",
        }}
      >
        {name}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, pointerEvents: "auto" }}>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--mono-1)",
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}
        >
          {region}
        </span>
        <nav
          aria-label="Taal / Language"
          style={{
            display: "flex",
            alignItems: "stretch",
            border: "1px solid var(--line-4)",
            borderRadius: 999,
            overflow: "hidden",
            background: "rgba(20,18,16,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          {LOCALES.map((l) => {
            const active = l === current;
            return (
              <Link
                key={l}
                href={`/${l}${rest}`}
                hrefLang={l}
                aria-current={active ? "true" : undefined}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  padding: "7px 14px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  background: active ? "var(--brass)" : "transparent",
                  color: active ? "var(--bg)" : "var(--mono-1)",
                  transition: "background .4s, color .4s",
                }}
              >
                {l}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
