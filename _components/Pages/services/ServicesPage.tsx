'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getServerSideProps } from '../../api/general'
import TitleBackground from '@/_components/Common/TitleBackground'
import IconBgImage from '@/_components/SVGs/icon_bg_img'
import LetsTalk from '@/_components/Common/LetsTalk'
import ProjectCard from '@/_components/Common/ProjectCard'

interface PageData {
  title?: string
  content?: string
}

interface ServiceItem {
  id: number
  slug: string
  name: string
  color: string
  description: string
  tagline: string
  tagline_front_color: string
  tagline_back_color: string
  front_image: {
    src: string
    alt: string
  }
  service_icon: string
  service_arrow: string
  projects: any[]
}

interface Props {
  page?: PageData
}

export default function ServicesPage({ page }: Props) {
  const locale = useLocale()

  const [services, setServices] = useState<ServiceItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServerSideProps('services', locale)
      const data = res?.props?.data?.data ?? []
      setServices(data)
      setActiveIndex(0)
    }

    fetchServices()
  }, [locale])

  const activeService = services[activeIndex]

  return (
    <div className="bg-primary text-white">

      <TitleBackground
        data={page}
        textColor="#000"
        videoSrc="/videos/services-hero.mp4"
      />

      <div className="sticky top-[72px] lg:top-[90px] z-[999] bg-primary py-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
        <div
          className="
            flex gap-3
            overflow-x-auto
            whitespace-nowrap
            px-4
            scroll-smooth
            scrollbar-hide
            md:overflow-visible
            md:flex-wrap
            md:justify-center
          "
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveIndex(index)}
              style={{ ['--c' as any]: service.color }}
              className={`
                flex-shrink-0
                lg:px-4 px-2 lg:py-4 py-2
                rounded-full
                border
                font-monument font-extrabold
                lg:text-base text-sm
                transition-all duration-300
                border-[color:var(--c)]
                text-white
                hover:bg-[color:var(--c)]
                ${activeIndex === index ? 'bg-[color:var(--c)]' : ''}
              `}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4">
        <div className="lg:py-24 py-14 overflow-hidden">

          {activeService && (
            <div className="pb-20 animate-[fadeIn_0.4s_ease]">

              <div className={`
                grid grid-cols-1 lg:grid-cols-2 gap-16 items-center
                ${activeIndex % 2 === 1
                  ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
                  : ''
                }
              `}>

                <div className="relative w-full md:h-[600px] h-[420px]">

                  <Image
                    src={activeService.front_image.src}
                    alt={activeService.front_image.alt}
                    fill
                    className="object-cover relative z-[99]"
                  />

                  <div className={`absolute -top-6 z-[9] ${
                    activeIndex % 2 === 1 ? '-left-2' : '-right-2'
                  }`}>
                    <IconBgImage />
                  </div>

                  <div className={`
                    absolute -bottom-10 z-[99]
                    ${activeIndex % 2 === 1 ? 'md:-left-36' : 'md:-right-36'}
                  `}>
                    <div className={`
                      flex items-start
                      ${activeIndex % 2 === 1 ? 'flex-row-reverse justify-end' : ''}
                    `}>

                      <div className="relative">
                        <span
                          className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-10deg] z-0"
                          style={{ backgroundColor: activeService.tagline_back_color }}
                        />

                        <h5
                          className="
                            relative font-monument text-[14px] font-semibold
                            px-[12px] py-[6px] rounded-full
                            border-2 border-[#1A0044]
                            whitespace-nowrap rotate-[-10deg]
                          "
                          style={{
                            backgroundColor: activeService.tagline_front_color,
                          }}
                        >
                          {activeService.tagline}
                        </h5>
                      </div>

                      <div className=' relative md:w-[113px] md:h-[113px] w-[60px] h-[60px]'>
                        <Image
                          src={activeService.service_arrow}
                          alt="arrow"
                          fill
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="md:space-y-6 space-y-3 w-full">

                  <div>
                    <div className="relative md:w-28 md:h-28 w-16 h-16">
                      <Image
                        src={activeService.service_icon}
                        alt={activeService.name}
                        fill
                      />
                    </div>

                    <h2 className="lg:text-4xl text-2xl font-monument font-extrabold md:pt-8 pt-4">
                      {activeService.name}
                    </h2>
                  </div>

                  <div
                    className="text-white leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: activeService.description
                    }}
                  />
                </div>
              </div>

              {activeService.projects?.length > 0 && (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 pt-20">
                  {activeService.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      <LetsTalk />
    </div>
  )
}