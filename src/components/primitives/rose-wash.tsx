import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RoseWashProps = {
  accent?: "band-right" | "band-left" | "corner" | "none";
  children: ReactNode;
  className?: string;
};

const accentMap = {
  "band-right":
    "before:absolute before:inset-y-0 before:right-0 before:w-[min(42%,16rem)] before:bg-primary-soft/90 before:content-[''] md:before:w-[min(38%,14rem)] md:before:bg-primary-soft/75",
  "band-left":
    "before:absolute before:inset-y-0 before:left-0 before:w-[min(38%,13rem)] before:bg-primary-soft/85 before:content-[''] md:before:w-[min(32%,11rem)] md:before:bg-primary-soft/60",
  corner:
    "before:absolute before:right-0 before:top-0 before:h-36 before:w-36 before:rotate-12 before:bg-primary/30 before:content-[''] after:absolute after:bottom-0 after:left-0 after:h-24 after:w-36 after:-rotate-6 after:bg-primary-soft/70 after:content-[''] md:before:-right-6 md:before:h-32 md:before:w-32 md:before:bg-primary/20 md:after:-left-6 md:after:h-24 md:after:w-40 md:after:bg-primary-soft/55",
  // Sin acento: heroes cuyo aside es una foto (pedido clienta 12/07/2026).
  none: "",
};

export function RoseWash({
  accent = "band-right",
  children,
  className,
}: RoseWashProps) {
  return (
    <div
      className={cn(
        "relative isolate max-w-full overflow-x-clip before:pointer-events-none after:pointer-events-none",
        accentMap[accent],
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
