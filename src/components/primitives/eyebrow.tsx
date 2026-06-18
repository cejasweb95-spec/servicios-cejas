import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm font-bold text-primary-text", className)}
      {...props}
    />
  );
}
