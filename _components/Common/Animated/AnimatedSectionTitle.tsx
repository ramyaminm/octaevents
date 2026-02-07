import { motion } from "framer-motion";
import { titleVariant } from "@/_utils/motion";

interface Props {
  text: string;
  inView: boolean;
  className?: string;
}

export default function AnimatedSectionTitle({
  text,
  inView,
  className = ""
}: Props) {
  return (
    <motion.h2
      variants={titleVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`
        text-center
        lg:text-5xl
        text-[28px]
        font-monument
        font-extrabold
        ${className}
      `}
    >
      {text}
    </motion.h2>
  );
}