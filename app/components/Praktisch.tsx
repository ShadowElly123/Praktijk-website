"use client";

import { useLang } from "../lib/LanguageProvider";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { ScoreLine } from "./ScoreLine";
import { LocatieKaart } from "./LocatieKaart";

export function Praktisch() {
  const { t } = useLang();
  const p = t.praktisch;

  const rows = [
    { label: p.locatie.label, value: p.locatie.value, note: p.locatie.note },
    { label: p.talen.label, value: p.talen.value },
    { label: p.vorm.label, value: p.vorm.value },
    { label: p.tarief.label, value: p.tarief.value },
    { label: p.terugbetaling.label, value: p.terugbetaling.value },
  ];

  return (
    <section id="praktisch" className="relative py-28 md:py-36">
      <div className="shell">
        <Reveal>
          <ScoreLine movement={p.movement} label={p.kicker} tempo={p.tempo} />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-14 max-w-2xl"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}
          >
            {p.title}
          </h2>
        </Reveal>

        <Reveal soft className="mt-14">
          <LocatieKaart />
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Linkerkolom: praktische info + crisis */}
          <div>
            <Reveal>
              <dl className="flex flex-col">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-x-8 border-t py-6"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <dt
                      className="font-display text-[0.72rem] uppercase tracking-[0.2em]"
                      style={{ color: "var(--brass)", paddingTop: "0.3rem" }}
                    >
                      {row.label}
                    </dt>
                    <dd>
                      <span
                        className="font-serif"
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: 1.6,
                          color: "var(--text)",
                        }}
                      >
                        {row.value}
                      </span>
                      {"note" in row && row.note && (
                        <span
                          className="mt-1 block font-serif italic"
                          style={{ fontSize: "0.9rem", color: "var(--text-faint)" }}
                        >
                          {row.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}

                {/* GSM als aparte rij met tel-link */}
                <div
                  className="grid grid-cols-[auto_1fr] gap-x-8 border-t py-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt
                    className="font-display text-[0.72rem] uppercase tracking-[0.2em]"
                    style={{ color: "var(--brass)", paddingTop: "0.3rem" }}
                  >
                    {p.telefoonLabel}
                  </dt>
                  <dd>
                    <a
                      href={p.telefoon.href}
                      className="link-underline font-serif"
                      style={{
                        fontSize: "1.15rem",
                        color: "var(--text)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {p.telefoon.display}
                    </a>
                    <span
                      className="mt-1 block font-serif italic"
                      style={{ fontSize: "0.9rem", color: "var(--text-faint)" }}
                    >
                      {p.emailNote}
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <p
                className="font-serif italic"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--text-dim)",
                  maxWidth: "42ch",
                }}
              >
                {p.contactMicrocopy}
              </p>
            </Reveal>

            {/* Crisis */}
            <Reveal delay={200} className="mt-12">
              <div
                className="border p-7"
                style={{ borderColor: "var(--line)", background: "var(--panel)" }}
              >
                <p
                  className="font-display text-[0.72rem] uppercase tracking-[0.22em]"
                  style={{ color: "var(--brass)" }}
                >
                  {t.crisis.title}
                </p>
                <p
                  className="mt-3 font-serif"
                  style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-dim)" }}
                >
                  {t.crisis.intro}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {t.crisis.items.map((c, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4">
                      <span className="font-serif" style={{ color: "var(--text)" }}>
                        {c.label}
                      </span>
                      <a
                        href={c.href}
                        className="link-underline font-display text-[0.95rem] tracking-[0.05em]"
                        style={{ color: "var(--brass)" }}
                      >
                        {c.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Rechterkolom: formulier */}
          <div>
            <Reveal>
              <h3
                className="font-serif"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", fontWeight: 300 }}
              >
                {t.form.title}
              </h3>
              <p
                className="mt-4 font-serif"
                style={{
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  color: "var(--text-dim)",
                  maxWidth: "44ch",
                }}
              >
                {t.form.intro}
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
