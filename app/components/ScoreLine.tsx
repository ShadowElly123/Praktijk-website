"use client";

/**
 * Sectiekop als "partituurlijn": een fragment notenbalk, het deelnummer,
 * de sectienaam, een doorlopende lijn over de breedte, en rechts de
 * tempo-aanduiding in cursief. Verwijst naar Lucas' muzikale identiteit
 * (piano als bureau, hoorn, pupiter) zonder het te benoemen.
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
    <div className="flex items-center gap-5">
      {/* fragment notenbalk: vijf haarlijnen */}
      <svg
        aria-hidden
        width="34"
        height="17"
        viewBox="0 0 34 17"
        fill="none"
        className="shrink-0"
      >
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

      <span className="kicker whitespace-nowrap">
        {movement} · {label}
      </span>

      <span
        aria-hidden
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(to right, var(--line), transparent)",
        }}
      />

      <span
        className="font-serif italic whitespace-nowrap"
        style={{ fontSize: "0.95rem", color: "var(--brass-deep)" }}
      >
        {tempo}
      </span>
    </div>
  );
}
