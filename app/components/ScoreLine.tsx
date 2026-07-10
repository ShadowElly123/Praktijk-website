/**
 * Sectiekop als "partituurlijn": een fragment notenbalk, het deelnummer
 * (Romeins cijfer) + sectienaam, een doorlopende lijn over de resterende
 * breedte, en uiterst rechts de tempo-aanduiding in cursief. Verwijst naar
 * Lucas' muzikale identiteit (piano als bureau, hoorn, pupiter) zonder het
 * te benoemen. Server component — geen interactiviteit nodig.
 */
export function ScoreLine({
  movement,
  label,
  tempo,
}: {
  movement: string;
  label: string;
  tempo: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {/* fragment notenbalk: vijf haarlijnen */}
      <svg aria-hidden width="34" height="17" viewBox="0 0 34 17" fill="none" style={{ flexShrink: 0 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={0.5 + i * 4}
            x2="34"
            y2={0.5 + i * 4}
            stroke="var(--line-brass)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--brass)",
          whiteSpace: "nowrap",
        }}
      >
        {movement} · {label}
      </span>

      <span
        aria-hidden
        style={{
          height: 1,
          flex: 1,
          background: "linear-gradient(to right, var(--line-4), transparent)",
        }}
      />

      <span
        style={{
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize: 15,
          color: "var(--brass-deep)",
          whiteSpace: "nowrap",
        }}
      >
        {tempo}
      </span>
    </div>
  );
}
