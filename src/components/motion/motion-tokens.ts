import { type Variants } from "motion/react";

export const motionDurations = {
  micro: 0.16,
  reveal: 0.28,
  panel: 0.22,
} as const;

export const motionEasing = [0.22, 1, 0.36, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionDurations.reveal, ease: motionEasing },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    transition: { duration: motionDurations.reveal, ease: motionEasing },
    y: 0,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDurations.panel, ease: motionEasing },
    y: 0,
  },
};
