"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { motionDurations, motionEasing } from "@/components/motion/motion-tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ y: 14 }}
      transition={{ duration: motionDurations.reveal, ease: motionEasing, delay }}
      viewport={{ once: true, margin: "-10%" }}
      whileInView={{ y: 0 }}
      {...props}
    />
  );
}
