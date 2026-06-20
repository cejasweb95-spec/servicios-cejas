import type { ComponentPropsWithoutRef, ReactElement } from "react";

import type { MarketId } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

// NOTA: este es el único lugar del proyecto donde se permiten valores hex
// crudos. No forman parte de la paleta de UI (palo de rosa / blanco / negro):
// son los colores oficiales de cada bandera nacional, es decir, datos. La regla
// "sin hex crudo en componentes" aplica a tokens de marca, no a este dato.
const flags: Record<MarketId, ReactElement> = {
  colombia: (
    <svg viewBox="0 0 6 4" preserveAspectRatio="none" className="h-full w-full">
      <rect width="6" height="4" fill="#FCD116" />
      <rect y="2" width="6" height="1" fill="#003893" />
      <rect y="3" width="6" height="1" fill="#CE1126" />
    </svg>
  ),
  "espana-europa": (
    <svg viewBox="0 0 6 4" preserveAspectRatio="none" className="h-full w-full">
      <rect width="6" height="4" fill="#AA151B" />
      <rect y="1" width="6" height="2" fill="#F1BF00" />
    </svg>
  ),
  suiza: (
    <svg viewBox="0 0 6 4" preserveAspectRatio="none" className="h-full w-full">
      <rect width="6" height="4" fill="#D52B1E" />
      <rect x="2.5" y="1" width="1" height="2" fill="#fff" />
      <rect x="2" y="1.5" width="2" height="1" fill="#fff" />
    </svg>
  ),
};

type CountryFlagProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  market: MarketId;
  /**
   * Cuando la bandera va sola (sin texto de país al lado), pasa `label` para
   * exponerla como imagen accesible. Si va junto al nombre del país, omítelo:
   * el componente queda como decorativo (`aria-hidden`).
   */
  label?: string;
};

export function CountryFlag({
  className,
  label,
  market,
  ...props
}: CountryFlagProps) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true };

  return (
    <span
      className={cn(
        "inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-border/80 ring-inset",
        className,
      )}
      {...a11y}
      {...props}
    >
      {flags[market]}
    </span>
  );
}
