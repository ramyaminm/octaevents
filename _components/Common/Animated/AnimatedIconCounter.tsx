'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fadeUpItem } from "@/_utils/motion"
import { AnimatedIcon } from "./AnimatedIcon"
import AnimatedCounter from "./AnimatedCounter"

interface Props {
  icon: {
    src: string
    alt: string
  }
  value: number
  suffix?: string
  title: string
  start: boolean
}

export default function AnimatedIconCounter({
  icon,
  value,
  suffix = "",
  title,
  start
}: Props) {
  return (
    <motion.div
      variants={fadeUpItem(40, 0.9)}
      className="text-center md:w-1/3 w-1/2 lg:pb-14 pb-8"
    >
      <AnimatedIcon icon={icon} />
      <AnimatedCounter value={value} suffix={suffix} start={start} delay={1500}
 />
      <p className="text-white lg:text-lg">{title}</p>
    </motion.div>
  )
}