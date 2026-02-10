'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function MissionVisionExact({ items }: any) {
  const [index, setIndex] = useState(0)
  const isAnimating = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (isAnimating.current) return

      if (e.deltaY > 0 && index < items.length - 1) {
        e.preventDefault()
        isAnimating.current = true
        setIndex(i => i + 1)
      }

      if (e.deltaY < 0 && index > 0) {
        e.preventDefault()
        isAnimating.current = true
        setIndex(i => i - 1)
      }

      setTimeout(() => {
        isAnimating.current = false
      }, 600)
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
    }
  }, [index, items.length])

  return (
    <section className="h-[200vh]">
      <div
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {items.map((item: any, i: number) => (
          <div
            key={i}
            className={`
              absolute inset-0 flex lg:flex-row flex-col-reverse
              transition-all duration-500 ease-out
              ${i === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'}
            `}
          >
            <Left item={item} />
            <Right item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Left({ item }: any) {
  return (
    <div className="lg:w-1/2 bg-[linear-gradient(31.04deg,#FFB000_4.37%,#FE007F_33.87%,#822DD1_61.59%,#00A7FF_88.52%)]">
      <div className="flex flex-col h-full justify-center lg:px-8 p-12">
        <h3 className="lg:text-5xl text-[32px] text-white font-monument font-extrabold">
          {item.title}
        </h3>
        <p className="lg:text-3xl text-xl text-white pt-8">
          {item.content}
        </p>
      </div>
    </div>
  )
}

function Right({ item }: any) {
  return (
    <div className="relative lg:w-1/2">
      <Image src={item.image.src} alt="" fill className="object-cover" />
    </div>
  )
}