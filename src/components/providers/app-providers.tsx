"use client";

import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delayDuration={250}>{children}</TooltipProvider>
    </MotionConfig>
  );
}
