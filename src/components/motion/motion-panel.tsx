"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { motionDurations, motionEasing } from "@/components/motion/motion-tokens";

type MotionPanelProps = HTMLMotionProps<"div">;

export function MotionPanel(props: MotionPanelProps) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 8 }}
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      transition={{ duration: motionDurations.panel, ease: motionEasing }}
      {...props}
    />
  );
}
