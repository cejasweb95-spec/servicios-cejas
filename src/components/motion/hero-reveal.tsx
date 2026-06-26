"use client";

import { useRef } from "react";
import {
  motion,
  type HTMLMotionProps,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { motionEasing } from "@/components/motion/motion-tokens";
import { useClientMotionReady } from "@/components/motion/use-client-motion-ready";

/**
 * Entrada premium en carga para el hero. Sólo anima transform (y/scale),
 * nunca opacity, para que el contenido sea siempre visible en SSR y sin JS
 * (coherente con Reveal/StaggerList del proyecto). Respeta reduced-motion.
 */
export function HeroStage(props: HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion();
  const motionReady = useClientMotionReady();

  return (
    <motion.div
      animate="show"
      initial={motionReady ? "hidden" : false}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: reduceMotion ? 0 : 0.04,
            staggerChildren: reduceMotion ? 0 : 0.07,
          },
        },
      }}
      {...props}
    />
  );
}

export function HeroItem(props: HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { y: 22 },
        show: {
          transition: { duration: 0.42, ease: motionEasing },
          y: 0,
        },
      }}
      {...props}
    />
  );
}

export function HeroMedia(props: HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { scale: 1.025, y: 18 },
        show: {
          scale: 1,
          transition: { duration: 0.52, ease: motionEasing },
          y: 0,
        },
      }}
      {...props}
    />
  );
}

export function HeroParallax(props: HTMLMotionProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
    target: ref,
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <motion.div
      ref={ref}
      style={{ y: reduceMotion ? 0 : y }}
      {...props}
    />
  );
}
