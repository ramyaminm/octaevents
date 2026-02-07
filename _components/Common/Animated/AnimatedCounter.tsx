'use client'
import { useEffect, useState } from "react"

interface Props {
  value: number
  suffix?: string
  duration?: number
  delay?: number
  start: boolean
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
  delay = 500,
  start
}: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    const timeout = setTimeout(() => {
      let startTime: number | null = null

      const animate = (time: number) => {
        if (!startTime) startTime = time
        const progress = Math.min((time - startTime) / duration, 1)
        setCount(Math.floor(progress * value))

        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [start, value, duration, delay])

  return (
    <h3 className="lg:pt-6 pt-3 lg:text-[44px] text-[26px] text-white font-monument font-extrabold">
      {count.toLocaleString()}
      {suffix}
    </h3>
  )
}