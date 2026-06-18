"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";

import { motionEasing } from "@/components/motion/motion-tokens";

type StaggerListProps = HTMLMotionProps<"div">;

export function StaggerList(props: StaggerListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.05,
          },
        },
      }}
      viewport={{ once: true, margin: "-10%" }}
      whileInView="show"
      {...props}
    />
  );
}

type StaggerListItemProps = HTMLMotionProps<"div">;

export function StaggerListItem(props: StaggerListItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { y: 10 },
        show: {
          transition: { duration: 0.24, ease: motionEasing },
          y: 0,
        },
      }}
      {...props}
    />
  );
}
