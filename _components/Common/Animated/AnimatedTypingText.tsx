'use client'
import { motion, Variants, cubicBezier } from "framer-motion"

const EASE = cubicBezier(0.22, 1, 0.36, 1)

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04
    }
  }
}

const letter: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASE
    }
  }
}

interface Props {
  text: string
  inView: boolean
  className?: string
  onComplete?: () => void;
}

export default function AnimatedTypingText({
  text,
  inView,
  className = ""
}: Props) {
  return (
    <motion.h2
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  )
}