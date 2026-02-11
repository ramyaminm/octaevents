'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function MissionVisionExact({ items }: any) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isMobile, setIsMobile] = useState(false)
  const isAnimating = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /* Detect mobile */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  /* Wheel only on desktop */
  useEffect(() => {
    if (isMobile) return

    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (isAnimating.current) return

      if (e.deltaY > 0 && index < items.length - 1) {
        e.preventDefault()
        setDirection('down')
        isAnimating.current = true
        setIndex((i) => i + 1)
      }

      if (e.deltaY < 0 && index > 0) {
        e.preventDefault()
        setDirection('up')
        isAnimating.current = true
        setIndex((i) => i - 1)
      }

      setTimeout(() => {
        isAnimating.current = false
      }, 1000)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [index, items.length, isMobile])

  /* ================= MOBILE VERSION ================= */

  if (isMobile) {
    return (
      <section className="w-full">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex flex-col">
            {/* Image First */}
            <div className="relative w-full h-[300px]">
              <Image
                src={item.image.src}
                alt={item.image.alt || ''}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="bg-[linear-gradient(31deg,#FFB000,#FE007F,#822DD1,#00A7FF)] px-6 py-12">
                <div className='flex items-center gap-6'>
                    <Image
                        src={item.icon.src}
                        alt={item.icon.alt}
                        width={32}
                        height={32}
                        />
                <h3 className="lg:text-5xl text-[26px] text-white font-monument font-extrabold">
                  {item.title}
                </h3>
              </div>
              <p className="lg:text-2xl text-[16px] text-white font-normal md:pt-8 pt-4">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </section>
    )
  }

  /* ================= DESKTOP VERSION ================= */

  return (
    <section className="h-[200vh]">
      <div
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden bg-white"
      >
        {items.map((item: any, i: number) => {
          const isActive = i === index
          const isReversed = i % 2 !== 0

          return (
            <div key={i} className="absolute inset-0 flex">
              {/* TEXT */}
              <div
                className={`
                  w-1/2 h-full flex flex-col justify-center px-20
                  bg-[linear-gradient(31deg,#FFB000,#FE007F,#822DD1,#00A7FF)]
                  transition-transform duration-[1000ms]
                  ease-[cubic-bezier(0.77,0,0.18,1)]
                  ${
                    isActive
                      ? 'translate-y-0'
                      : direction === 'down'
                      ? 'translate-y-full'
                      : '-translate-y-full'
                  }
                  ${isReversed ? 'order-2' : 'order-1'}
                `}
              >
                <div className='flex items-center gap-6'>
                    <Image
                        src={item.icon.src}
                        alt={item.icon.alt}
                        width={64}
                        height={64}
                        />
                    <h3 className="lg:text-5xl text-[32px] text-white font-monument font-extrabold">
                      {item.title}
                    </h3>
                  </div>
                <p className="lg:text-2xl text-[18px] text-white font-normal pt-8">
                  {item.content}
                </p>
              </div>

              {/* IMAGE */}
              <div
                className={`
                  relative w-1/2 h-full
                  transition-transform duration-[1000ms]
                  ease-[cubic-bezier(0.77,0,0.18,1)]
                  ${
                    isActive
                      ? 'translate-y-0'
                      : direction === 'down'
                      ? '-translate-y-full'
                      : 'translate-y-full'
                  }
                  ${isReversed ? 'order-1' : 'order-2'}
                `}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt || ''}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}