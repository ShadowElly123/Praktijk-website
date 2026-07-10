/**
 * Groot, amper zichtbaar woord achter een sectie. De taal zelf als decor:
 * het spreken is bij Lucas het materiaal, dus de woorden dragen de ruimte.
 * Puur decoratief (aria-hidden), zeer lage opacity. Server component.
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
      style={{
        position: "absolute",
        top,
        [align]: "-2%",
        fontFamily: "var(--font-serif), serif",
        fontStyle: "italic",
        fontSize: "clamp(6rem, 18vw, 15rem)",
        lineHeight: 1,
        color: "var(--brass)",
        opacity: 0.05,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
    >
      {word}
    </span>
  );
}
