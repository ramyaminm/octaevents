'use client'

import { useState } from 'react'
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

  if (!images?.length) return null

  const prev = () => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative">
      <div className="relative mx-auto overflow-hiddens">

        <Image
          src={images[active].src}
          alt={alt}
          width={1400}
          height={750}
          className="w-full h-[600px] object-cover"
          priority
        />

        <button
          onClick={prev}
          className="
            absolute
            bottom-4
            right-20
            w-12 h-12
            bg-[#842BD0]
            text-white
              flex items-center justify-center
            transition
             rotate-180
          "
        >
          <SliderArrow />
        </button>

        <button
          onClick={next}
          className="
            absolute bottom-4
            right-6
            w-12 h-12
            bg-[#842BD0]
            text-white
            flex items-center justify-center
            transition
          "
        >
          <SliderArrow />
        </button>
      </div>

      {/* <div className="max-w-[1400px] mx-auto mt-6 flex gap-4 justify-center">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              w-20 h-14 overflow-hidden rounded-xl border
              ${i === active ? 'border-secondary' : 'border-transparent'}
            `}
          >
            <Image
              src={img.src}
              alt={alt}
              width={100}
              height={70}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div> */}
    </section>
  )
}
