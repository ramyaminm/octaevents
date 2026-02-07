import { motion } from "framer-motion"
import Image from "next/image"

export function AnimatedIcon({ icon }: { icon: { src: string; alt: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 m-auto flex"
    >
      <Image
        className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 m-auto"
        src={icon.src}
        alt={icon.alt}
        width={100}
        height={100}
      />
    </motion.div>
  )
}