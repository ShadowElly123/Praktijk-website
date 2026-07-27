"use client";

import { useEditMode } from "./EditMode";

/**
 * Vaste balk onderaan de bewerkbare preview: toont het aantal wijzigingen
 * en exporteert enkel de gewijzigde velden als JSON. `position: fixed` met
 * eigen padding — geen negatieve marges die de responsive rail-breedte van
 * `.sec-x` zouden moeten natrekken (dat gaf eerder een afgesneden teller op
 * mobiel).
 */
export function ExportBar({ locale }: { locale: string }) {
  const { values, original } = useEditMode();
  const changedPaths = Object.keys(values).filter((k) => values[k] !== original[k]);

  function handleExport() {
    const changes: Record<string, string> = {};
    for (const path of changedPaths) changes[path] = values[path];
    const payload = { locale, generatedAt: new Date().toISOString(), changes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lucas-website-wijzigingen-${locale}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        background: "rgba(14,13,12,0.94)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid var(--line-2)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
          color: "var(--mono-1)",
        }}
      >
        {changedPaths.length === 0
          ? "Klik op tekst om te bewerken — nog geen wijzigingen"
          : `${changedPaths.length} ${changedPaths.length === 1 ? "wijziging" : "wijzigingen"}`}
      </span>
      <button
        type="button"
        onClick={handleExport}
        disabled={changedPaths.length === 0}
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "14px 22px",
          border: "none",
          borderRadius: 0,
          cursor: changedPaths.length === 0 ? "default" : "pointer",
          background: changedPaths.length === 0 ? "var(--line-3)" : "var(--brass)",
          color: changedPaths.length === 0 ? "var(--mono-2)" : "var(--bg)",
          flexShrink: 0,
        }}
      >
        Exporteer wijzigingen
      </button>
    </div>
  );
}
