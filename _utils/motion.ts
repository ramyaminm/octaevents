import { Variants, cubicBezier } from "framer-motion";

export const EASE = cubicBezier(0.22, 1, 0.36, 1);

export const titleVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: EASE
    }
  }
};

export const staggerContainer = (
    stagger = 0.3,
    delayChildren = 0.9
  ): Variants => ({
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren: stagger
      }
    }
  });

export const fadeUpItem = (y = 40, duration = 0.9): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: EASE
    }
  }
});

export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: EASE
    }
  }
};