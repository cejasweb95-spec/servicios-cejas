import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RoseWashProps = {
  accent?: "band-right" | "band-left" | "corner";
  children: ReactNode;
  className?: string;
};

const accentMap = {
  "band-right":
    "before:absolute before:inset-y-0 before:right-0 before:w-[min(38%,14rem)] before:bg-primary-soft/75 before:content-['']",
  "band-left":
    "before:absolute before:inset-y-0 before:left-0 before:w-[min(32%,11rem)] before:bg-primary-soft/60 before:content-['']",
  corner:
    "before:absolute before:-right-10 before:top-0 before:h-32 before:w-32 before:rotate-12 before:bg-primary/20 before:content-[''] after:absolute after:-left-6 after:bottom-0 after:h-24 after:w-40 after:-rotate-6 after:bg-primary-soft/55 after:content-['']",
};

export function RoseWash({
  accent = "band-right",
  children,
  className,
}: RoseWashProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        accentMap[accent],
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
