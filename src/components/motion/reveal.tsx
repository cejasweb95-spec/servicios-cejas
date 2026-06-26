"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";

import { motionDurations, motionEasing } from "@/components/motion/motion-tokens";
import { useClientMotionReady } from "@/components/motion/use-client-motion-ready";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  direction?: "up" | "left" | "right";
};

export function Reveal({ delay = 0, direction = "up", ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const motionReady = useClientMotionReady();
  const offset = reduceMotion
    ? {}
    : direction === "left"
      ? { x: -16 }
      : direction === "right"
        ? { x: 16 }
        : { y: 14 };

  return (
    <motion.div
      initial={motionReady ? offset : false}
      transition={{ duration: motionDurations.reveal, ease: motionEasing, delay }}
      viewport={{ once: true, margin: "-10%" }}
      whileInView={{ x: 0, y: 0 }}
      {...props}
    />
  );
}
