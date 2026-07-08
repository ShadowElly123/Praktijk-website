"use client";

import { useReveal } from "../lib/useReveal";

export function Reveal({
  children,
  className = "",
  delay = 0,
  soft = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  soft?: boolean;
  as?: React.ElementType;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`${soft ? "reveal-soft" : "reveal"} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
