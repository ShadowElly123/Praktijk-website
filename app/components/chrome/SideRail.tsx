"use client";

import { useEditMode } from "../review/EditMode";
import { Editable } from "../review/Editable";

/**
 * Verticale zijrail met de praktijk-omschrijving. Sticky over de hele hoogte,
 * verticaal gezet (writing-mode). Decoratief-informatief; klikt niet op de
 * echte site (`aria-hidden` + `pointerEvents: none`).
 *
 * In bewerk-modus (`useEditMode().enabled`) wordt de rail wél klikbaar/
 * focusbaar zodat de tekst te bewerken is — buiten bewerk-modus (dus overal
 * op de echte site, waar nooit een EditModeProvider gemonteerd wordt) blijft
 * het gedrag exact zoals voorheen.
 */
export function SideRail({ text }: { text: string }) {
  const { enabled } = useEditMode();
  return (
    <div
      aria-hidden={!enabled}
      className="side-rail"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        marginBottom: "-100vh",
        zIndex: 90,
        pointerEvents: enabled ? "auto" : "none",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginLeft: 22,
          writingMode: "vertical-rl",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "var(--mono-3)",
          textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          whiteSpace: "nowrap",
        }}
      >
        <Editable path="site.rail">{text}</Editable>
      </div>
    </div>
  );
}
