"use client";

import { useEffect, useState } from "react";
import { useLang } from "../lib/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";

export function SiteHeader() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#welkom", label: t.nav.welkom },
    { href: "#werkwijze", label: t.nav.werkwijze },
    { href: "#over-mij", label: t.nav.overMij },
    { href: "#praktisch", label: t.nav.praktisch },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(12,12,12,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="shell flex items-center justify-between py-5">
        <a
          href="#top"
          className="font-display text-[0.95rem] tracking-[0.02em] transition-colors duration-300 hover:text-[var(--brass)]"
          style={{ fontWeight: 500 }}
        >
          Lucas Borghys
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline font-display text-[0.82rem] tracking-[0.04em]"
              style={{ color: "var(--text-dim)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="#praktisch"
            className="hidden font-display text-[0.82rem] tracking-[0.04em] link-underline sm:inline"
          >
            {t.nav.contact}
          </a>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
