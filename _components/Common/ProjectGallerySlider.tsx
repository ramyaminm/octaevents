'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SliderArrow from '../SVGs/slider_arrow'

interface GalleryItem {
  src: string
  original?: string
}

interface Props {
  images: GalleryItem[]
  alt: string
}

export default function ProjectGallerySlider({ images, alt }: Props) {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  if (!images?.length) return null

  const prev = () => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      next()
    }, 2800)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section className="relative max-w-[1400px] flex md:gap-x-3 gap-y-3 md:flex-row flex-col">

      <div className="relative mx-auto overflow-hidden md:w-[90%] md:h-[600px] w-full h-[300px]">

        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${active * 100}%)`
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative min-w-full h-full"
            >
              <Image
                src={img.src}
                alt={alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="
            absolute bottom-4
            md:right-20 right-16
            md:w-12 md:h-12 w-8 h-8
            bg-[#842BD0]
            flex items-center justify-center
            rotate-180
          "
        >
          <span className='block md:w-[11px] md:h-[19px]'>
            <SliderArrow />
          </span>
        </button>

        <button
          onClick={next}
          className="
            absolute bottom-4 right-6
            md:w-12 md:h-12 w-8 h-8
            bg-[#842BD0]
            flex items-center justify-center
          "
        >
          <span className='block md:w-[11px] md:h-[19px]'>
            <SliderArrow />
          </span>
        </button>
      </div>

      <div className="md:w-[10%] w-full">
        <div
          className="
            flex md:flex-wrap gap-3
            overflow-x-auto md:overflow-x-hidden
            md:overflow-y-auto
            md:max-h-[600px]
            whitespace-nowrap md:whitespace-normal
            scrollbar-hide
          "
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                md:w-full w-[80px]
                md:h-[100px] h-[80px]
                flex-shrink-0
                overflow-hidden
                rounded-md
                relative
                transition-opacity duration-300
                ${i === active ? 'opacity-100' : 'opacity-50'}
              `}
            >
              <Image
                src={img.src}
                alt={alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
