"use client";

import { motion } from "framer-motion";
import { fadeInUp, revealTransition } from "@/lib/motion";

type FadeInViewProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header";
};

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
};

export function FadeInView({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInViewProps) {
  const Component = tags[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={fadeInUp}
      transition={revealTransition(delay)}
    >
      {children}
    </Component>
  );
}
