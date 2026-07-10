/**
 * Sectiekop — een rustige, neutrale eyebrow: het sectielabel in mono-brass met
 * een dunne doorlopende haarlijn ernaast voor structuur. Bewust géén muzikale
 * verwijzingen (geen notenbalk, deelnummer of tempo). Server component.
 */
export function SectionKicker({
  label,
  style,
}: {
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, ...style }}>
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
        {label}
      </span>
      <span
        aria-hidden
        style={{
          height: 1,
          flex: 1,
          background: "linear-gradient(to right, var(--line-4), transparent)",
        }}
      />
    </div>
  );
}
