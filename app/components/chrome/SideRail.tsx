/**
 * Verticale zijrail met de praktijk-omschrijving. Sticky over de hele hoogte,
 * verticaal gezet (writing-mode). Decoratief-informatief; klikt niet.
 * Exact uit de goedgekeurde Claude Design. Server component.
 */
export function SideRail({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="side-rail"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        marginBottom: "-100vh",
        zIndex: 90,
        pointerEvents: "none",
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
        {text}
      </div>
    </div>
  );
}
