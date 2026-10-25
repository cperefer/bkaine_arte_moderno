import type { ReactNode } from "react";

interface ViewHeadingProps {
  children: ReactNode;
  accent?: boolean;
}

export function ViewHeading({ children, accent = false }: ViewHeadingProps) {
  return (
    <h2 className={`mb-1.5 text-lcd-base font-bold ${accent ? "text-lcd-accent" : ""}`}>[ {children} ]</h2>
  );
}
