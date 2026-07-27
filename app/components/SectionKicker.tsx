/**
 * Sectiekop — een rustige, neutrale eyebrow: het sectielabel in mono-brass met
 * een dunne doorlopende haarlijn ernaast voor structuur. Bewust géén muzikale
 * verwijzingen (geen notenbalk, deelnummer of tempo). Server component.
 *
 * `as="h2"`: voor secties die verder geen eigen heading-element hebben
 * (Verwelkoming, Over mij, Praktisch) is dit label het enige tekstuele
 * ankerpunt van de sectie — dan moet het semantisch een `<h2>` zijn, niet
 * enkel een gestylede `<span>`, anders ontbreekt de kop-hiërarchie voor SEO
 * en screenreaders. Visueel identiek: enkel margin:0 toegevoegd.
 */
export function SectionKicker({
  label,
  style,
  as = "span",
}: {
  label: React.ReactNode;
  style?: React.CSSProperties;
  as?: "span" | "h2";
}) {
  const Label = as;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, ...style }}>
      <Label
        style={{
          margin: 0,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--brass)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Label>
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
