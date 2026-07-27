"use client";

import { useEffect, useRef } from "react";
import { useEditMode } from "./EditMode";

/**
 * Wrapt één stukje zichtbare tekst. Buiten bewerk-modus (context.enabled
 * false — dus overal op de echte site) is dit een pure passthrough: enkel
 * `{children}`, geen extra DOM-node, geen stijl-impact.
 *
 * In bewerk-modus wordt het element zelf `contentEditable`, waardoor het
 * de typografie van zijn ouder-element erft (font/kleur/grootte) — geen
 * aparte styling nodig, het IS de echte site.
 */
export function Editable({
  path,
  children,
  as = "span",
  style,
  stopClickPropagation,
}: {
  path: string;
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  // Voor tekst binnen een klikbaar of native-interactief ouder-element (een
  // FAQ-<summary> die open/dicht toggelt, of een <label> die anders de focus
  // naar zijn input zou verplaatsen bij een klik): voorkomt zowel bubbling
  // naar de ouder-handler als het browser-eigen default-gedrag. Geen effect
  // buiten bewerk-modus — in productie wordt hier toch nooit een element
  // voor gerenderd.
  stopClickPropagation?: boolean;
}) {
  const ctx = useEditMode();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ctx.enabled) return;
    ctx.register(path, children);
    // Alleen bij het monten registreren; `children` mag daarna wijzigen
    // (bv. bij live edits elders) zonder de originele waarde te overschrijven.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.enabled]);

  const value = ctx.values[path] ?? children;
  const changed = ctx.original[path] !== undefined && value !== ctx.original[path];

  useEffect(() => {
    const el = ref.current;
    if (!ctx.enabled || !el) return;
    // Enkel de DOM overschrijven als dit element niet actief bewerkt wordt —
    // anders springt de cursor van de typende gebruiker naar het begin.
    if (document.activeElement !== el && el.textContent !== value) {
      el.textContent = value;
    }
  }, [value, ctx.enabled]);

  if (!ctx.enabled) return <>{children}</>;

  const Tag = as as "span";
  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement>}
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => ctx.setValue(path, e.currentTarget.textContent ?? "")}
      onClick={
        stopClickPropagation
          ? (e) => {
              e.stopPropagation();
              e.preventDefault();
            }
          : undefined
      }
      style={{
        outline: changed ? "1px dashed var(--brass)" : "1px dashed transparent",
        outlineOffset: 3,
        cursor: "text",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
