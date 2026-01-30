'use client'

import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getServerSideProps } from '../../api/general'
import TitleBackground from '@/_components/Common/TitleBackground'
import IconBgImage from '@/_components/SVGs/icon_bg_img'
import LetsTalk from '@/_components/Common/LetsTalk'
import ProjectCard from '@/_components/Common/ProjectCard'


interface PageData {
  title?: string
  content?: string
  extra_content?: {
    tagline?: string
    tagline_front_color?: string
    tagline_back_color?: string
    title?: string
    subtitle?: string | null
  }
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
  projects: ProjectItem[]
}

interface ProjectItem {
  service: any
  id: number
  name: string
  slug: string
  front_image: {
    src: string
    alt: string
  }
  brand: {
    name: string | null
    logo: string
  }
}

interface Props {
  page?: PageData
}


export default function ServicesPage({ page }: Props) {
  const locale = useLocale()

  const [services, setServices] = useState<ServiceItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const isManualScroll = useRef(false)


  const sectionRefs = useRef<HTMLDivElement[]>([])
  const tabsTriggerRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)


  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServerSideProps('services', locale)
      setServices(res?.props?.data?.data ?? [])
    }
    fetchServices()
  }, [locale])

  useEffect(() => {
    if (!services.length) return
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return
  
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            if (!isNaN(index)) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0.2,
      }
    )
  
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })
  
    return () => observer.disconnect()
  }, [services])
  
  

  const scrollToService = (index: number) => {
    isManualScroll.current = true
    setActiveIndex(index)
  
    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  
    setTimeout(() => {
      isManualScroll.current = false
    }, 1200)    
  }

  useEffect(() => {
    if (!tabsTriggerRef.current) return
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        threshold: 0,
      }
    )
  
    observer.observe(tabsTriggerRef.current)
  
    return () => observer.disconnect()
  }, [])
  

  return (
    <div className="bg-primary text-white">

      <TitleBackground
        data={page}
        textColor="#000"
        videoSrc="/videos/services-hero.mp4"
      />

      

      <div ref={tabsTriggerRef} />

        {/* <div
         className={`
          z-[999]
          bg-primary/90
          backdrop-blur-md
          py-6
          transition-all duration-500 ease-out
          ${isSticky
            ? `
              sticky top-[90px]
              shadow-[0_12px_40px_rgba(0,0,0,0.25)]
              animate-[slideDownFade_0.45s_ease-out]
            `
            : 'relative'}
        `}
        >
          <div className="flex md:flex-nowrap flex-wrap justify-center gap-4 ">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => scrollToService(index)}
                style={{ ['--c' as any]: service.color }}
                className={`
                  px-4 py-4 rounded-full border w-1/4
                  font-monument font-extrabold text-lg
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
        </div> */}
        <div
            className={`
              z-[999]
              bg-primary
              backdrop-blur-md
              py-4
              transition-all duration-500 ease-out
              ${isSticky
                ? `
                  sticky lg:top-[90px] top-[72px]
                  shadow-[0_12px_40px_rgba(0,0,0,0.25)]
                  animate-[slideDownFade_0.45s_ease-out]
                `
                : 'relative'}
            `}
          >
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
                  onClick={() => scrollToService(index)}
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
                    ${
                      activeIndex === index
                        ? 'bg-[color:var(--c)]'
                        : ''
                    }
                  `}
                >
                  {service.name}
                </button>
              ))}
            </div>
        </div>

      <div className='max-w-[1440px] mx-auto px-4'>
        <div className="lg:py-24 py-14 overflow-hidden">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) sectionRefs.current[index] = el
              }}
              data-index={index}
              className="
                scroll-mt-[180px] pb-20
              "
            >
                <div className={`
                    grid grid-cols-1 lg:grid-cols-2 gap-16 items-center
                    ${index % 2 === 1   ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}
                `}>
                <div className="relative w-full">
                  <Image
                    src={service.front_image.src}
                    alt={service.front_image.alt}
                    width={710}
                    height={710}
                    className="object-cover relative z-[99]"
                  />
                  <div className={`absolute -top-6 z-[9] ${index % 2 === 1   ? '-left-2' : '-right-2'}`}>
                      <IconBgImage />
                  </div>

                    <div 
                    className={`
                      absolute -right-36 -bottom-10 z-[99]
                      ${index % 2 === 1   ? '-left-36' : '-right-36'}
                  `}
                    >
                      <div
                      className={`
                        flex items-start
                        ${index % 2 === 1   ? 'flex-row-reverse justify-end' : ''}
                    `}
                      >
                        <div className='relative'>
                          <span
                            className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-10deg] z-0"
                            style={{ backgroundColor: service.tagline_back_color }}
                          />

                          <h5
                            className="
                              relative
                              font-monument
                              text-[14px]
                              font-semibold
                              px-[12px]
                              py-[6px]
                              rounded-full
                              border-2
                              border-[#1A0044]
                              whitespace-nowrap
                              rotate-[-10deg]
                            "
                            style={{
                              backgroundColor: service.tagline_front_color,
                              // color: textColor,
                            }}
                          >
                            {service.tagline}
                          </h5>
                        </div>
                        <div >
                            <Image
                              src={service.service_arrow}
                              alt="arrow"
                              width={113}
                              height={113}
                              className="object-cover"
                            />
                        </div>
                      </div>
                    </div>
                </div>

                <div className="space-y-6 w-full">
                  <div>
                    <Image
                      src={service.service_icon}
                      alt={service.name}
                      width={120}
                      height={120}
                    />
                    <h2 className="lg:text-4xl text-2xl font-monument font-extrabold pt-8">{service.name}</h2>
                  </div>

                  <div
                    className="text-white leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>
              </div>
              

              {service.projects?.length > 0 && (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 pt-20">
                  {service.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      <LetsTalk />
    </div>
  )
}
