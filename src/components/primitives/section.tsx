import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "compact" | "default" | "loose";
  tone?: "default" | "muted" | "ink";
};

const spacingMap = {
  compact: "py-10 sm:py-12",
  default: "py-14 sm:py-18",
  loose: "py-18 sm:py-24",
};

const toneMap = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  ink: "bg-secondary text-secondary-foreground",
};

export function Section({
  className,
  spacing = "default",
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingMap[spacing], toneMap[tone], className)}
      {...props}
    />
  );
}
