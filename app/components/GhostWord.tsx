"use client";

/**
 * Groot, amper zichtbaar woord achter een sectie. De taal zelf als decor:
 * het spreken is bij Lucas het materiaal, dus de woorden dragen de ruimte.
 * Puur decoratief (aria-hidden), zeer lage opacity.
 */
export function GhostWord({
  word,
  align = "right",
  top = "8%",
}: {
  word: string;
  align?: "left" | "right";
  top?: string;
}) {
  return (
    <span
      aria-hidden
      className="ghost-word pointer-events-none absolute select-none font-serif italic"
      style={{
        top,
        [align]: "-2%",
        fontSize: "clamp(7rem, 20vw, 17rem)",
        lineHeight: 1,
        color: "var(--brass)",
        opacity: 0.05,
        whiteSpace: "nowrap",
        zIndex: 0,
      }}
    >
      {word}
    </span>
  );
}
