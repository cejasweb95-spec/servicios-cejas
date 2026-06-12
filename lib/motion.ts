/** Tokens y variants de animación — Framer Motion */
export const easeOut = [0.4, 0, 0.2, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const revealTransition = (delay = 0) => ({
  duration: 0.45,
  delay,
  ease: easeOut,
});

export const hoverLift = {
  scale: 1.02,
  y: -2,
};

export const tapPress = {
  scale: 0.98,
};
