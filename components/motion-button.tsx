"use client";

import { motion } from "framer-motion";
import { hoverLift, tapPress } from "@/lib/motion";

type MotionButtonProps = React.ComponentProps<typeof motion.a>;

export function MotionButton({ className, children, ...props }: MotionButtonProps) {
  return (
    <motion.a
      className={className}
      whileHover={hoverLift}
      whileTap={tapPress}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
