'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function HowWeWorkStep({ step }: any) {
    const [active, setActive] = useState(false)

  return (
    <div className="text-center mx-auto">
        <div className="w-[210px] h-[210px] mx-auto mb-8 flex items-center justify-center relative cursor-pointer"
            onMouseEnter={() => setActive(true)}
        >
            <span
                className={`
                absolute
                w-[180px]
                h-[180px]
                rounded-full
                bg-white
                transition-all
                duration-500
                ease-out
                ${active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                `}
            />

            <div className="relative z-10">
                <Image
                src={step.icon.src}
                alt={step.icon.alt}
                width={140}
                height={140}
                />
            </div>
        </div>



        <div className=" relative">
            <span className='h-[2px] w-full bg-white pointer-events-none block'></span>
            <span className="w-[20px] h-[20px] rounded-full bg-secondary absolute left-0 right-0 top-0 bottom-0 border-[4px] border-primary m-auto" />
        </div>

        <h4 className="text-xl text-white font-monument font-extrabold py-3">
            {step.title}
        </h4>

        <p className="text-base text-white leading-relaxed max-w-[350px] m-auto">
            {step.description}
        </p>
    </div>
  )
}
