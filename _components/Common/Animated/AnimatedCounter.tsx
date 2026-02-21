'use client'
import { useEffect, useMemo, useState } from "react"

interface Props {
  value: string | number
  start: boolean
  duration?: number
  delay?: number
}

export default function AnimatedCounter({
  value,
  start,
  duration = 1800,
  delay = 500,
}: Props) {

  // ✅ Parse Dynamic Prefix + Number + Suffix
  const { prefix, numericValue, suffix } = useMemo(() => {

    if (typeof value === "number") {
      return { prefix: "", numericValue: value, suffix: "" }
    }

    const prefixMatch = value.match(/^[^\d]+/)
    const prefix = prefixMatch ? prefixMatch[0] : ""

    const numberMatch = value.match(/[\d.]+/)
    const numericValue = numberMatch ? parseFloat(numberMatch[0]) : 0

    const suffixMatch = value.match(/[^\d.]+$/)
    const suffix = suffixMatch ? suffixMatch[0] : ""

    return { prefix, numericValue, suffix }

  }, [value])

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    const timeout = setTimeout(() => {
      let startTime: number | null = null

      const animate = (time: number) => {
        if (!startTime) startTime = time
        const progress = Math.min((time - startTime) / duration, 1)
        setCount(progress * numericValue)

        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [start, numericValue, duration, delay])

  return (
    <h3 className="lg:text-[44px] text-[26px] text-white font-monument font-extrabold">
      {prefix}
      {Math.floor(count).toLocaleString()}
      {suffix}
    </h3>
  )
}