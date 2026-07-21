/**
 * Filmische grain over de hele pagina. "Sticky pin"-truc (sticky + negatieve
 * margin) zodat het laagje over elke sectie ligt zonder de scroll te beïnvloeden.
 * Exact overgenomen uit de goedgekeurde Claude Design. Server component.
 */
const GRAIN =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        marginBottom: "-100vh",
        zIndex: 60,
        pointerEvents: "none",
        mixBlendMode: "soft-light",
        opacity: 0.5,
        backgroundImage: `url("${GRAIN}")`,
      }}
    />
  );
}
