"use client";

/**
 * Filmische beeld-placeholder — donkere ruimte met warm 'raamlicht' en korrel.
 * Vervang deze later door een echte <Image> zodra Lucas' foto's er zijn.
 */
export function PlaceholderImage({
  label = "Foto volgt",
  className = "",
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`placeholder-film ${className}`} style={style}>
      <div className="absolute inset-0 flex items-end p-6">
        <span
          className="font-display text-[0.6rem] uppercase tracking-[0.28em]"
          style={{ color: "var(--text-faint)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
