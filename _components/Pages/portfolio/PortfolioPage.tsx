'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useRef } from 'react'
import { getServerSideProps } from '@/_components/api/general'
import ProjectCard from '@/_components/Common/ProjectCard'
import TitleBackground from '@/_components/Common/TitleBackground'
import LetsTalk from '@/_components/Common/LetsTalk'

interface ApiTagline {
  text?: string
  front_color?: string
  back_color?: string
}

interface PageData {
  title?: string
  content?: string
  extra_content?: {
    video?: string
    tagline?: ApiTagline
    title?: string
    subtitle?: string | null
  }
}

interface MappedPageData {
  title?: string
  content?: string
  extra_content?: {
    video?: string
    tagline?: string
    tagline_front_color?: string
    tagline_back_color?: string
    title?: string
    subtitle?: string | null
  }
}


interface Service {
  id: number
  name: string
  slug: string
  color: string
}

interface Project {
  id: number
  name: string
  slug: string
  front_image: {
    src: string
    alt: string
  }
  brand: {
    name: string
    logo: string
  }
  service: Service[]
}

interface Pagination {
  current_page: number
  last_page: number
}

interface Props {
  page?: PageData
}

export default function ProjectsPage({ page }: Props) {
  const locale = useLocale()

  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activeService, setActiveService] = useState<number | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)

  const tabsRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [scrolled300, setScrolled300] = useState(false)
  const [pageData, setPageData] = useState<PageData | undefined>(undefined)

  const mappedPage: MappedPageData | undefined = pageData
  ? {
      ...pageData,
      extra_content: {
        video: pageData.extra_content?.video,
        tagline: pageData.extra_content?.tagline?.text,
        tagline_front_color: pageData.extra_content?.tagline?.front_color,
        tagline_back_color: pageData.extra_content?.tagline?.back_color,
        title: pageData.extra_content?.title,
        subtitle: pageData.extra_content?.subtitle,
      },
    }
  : undefined


    useEffect(() => {
      const fetchPage = async () => {
        const res = await getServerSideProps('pages/portfolio', locale)
        setPageData(res?.props?.data?.data)
      }
    
      fetchPage()
    }, [locale])
    
  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServerSideProps('services', locale)
      setServices(res?.props?.data?.data ?? [])
    }
    fetchServices()
  }, [locale])


  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)

      const query = activeService
        ? `projects?filter[service_id]=${activeService}&page=${pageNum}`
        : `projects?page=${pageNum}`

      const res = await getServerSideProps(query, locale)

      if (res?.props?.data?.success) {
        setProjects(res.props.data.data)
        setPagination(res.props.data.pagination)
      }

      setLoading(false)
    }

    fetchProjects()
  }, [activeService, pageNum, locale])

  const handleTabClick = (serviceId: number | null) => {
    setActiveService(serviceId)
    setPageNum(1)
  }
  
  useEffect(() => {
    if (!tabsRef.current) return
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        threshold: 0,
      }
    )
  
    observer.observe(tabsRef.current)
  
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setScrolled300(true)
        window.removeEventListener('scroll', handleScroll) 
      }
    }
  
    window.addEventListener('scroll', handleScroll)
  
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  

  return (
    <div>

        <TitleBackground data={mappedPage} textColor="#000" />

        <div className=' '>
        
            <div ref={tabsRef} />
            <div
                className={`
                    2xl:max-w-none max-w-[1440px] mx-auto
                z-[999]
                bg-primary
                py-6
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
                <div  className="
                flex gap-3
                overflow-x-auto
                whitespace-nowrap
                px-4
                scroll-smooth
                scrollbar-hide
                md:overflow-visible
                md:flex-wrap
                md:justify-center
              ">
                    <button
                        onClick={() => handleTabClick(null)}
                        className={`
                        lg:px-4 px-2 lg:py-4 py-2 rounded-full border
                        font-monument font-extrabold lg:text-base text-sm
                        transition
                        
                        ${activeService === null
                            ? 'bg-white text-primary'
                            : 'border-white text-white hover:bg-white hover:text-primary'}
                        `}
                    >
                        All Projects
                    </button>
                    {services.map((service, index) => (
                        <button
                            key={service.id}
                            onClick={() => handleTabClick(service.id)}
                            style={{ ['--c' as any]: service.color }}
                            className={`
                            lg:px-4 px-2 lg:py-4 py-2 rounded-full border
                            font-monument font-extrabold lg:text-base text-sm
                            transition-all duration-300
                            border-[color:var(--c)]
                            ${activeService === service.id
                                ? 'bg-white text-primary border-white'
                                : 'text-white hover:bg-white hover:text-primary hover:border-white'}
                            `}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>

            

            <div className='relative bg-primary overflow-hidden'>
                    <div
                        className={`
                        pointer-events-none
                        absolute
                        top-0 left-0 right-0                    
                        -translate-x-1/2
                        m-auto
                        bg-white
                        w-[54px] h-[27px]
                        origin-top
                        transition-transform duration-[3200ms]
                        ease-[cubic-bezier(.22,1,.36,1)]
                        ${scrolled300 ? 'scale-[30] rounded-none' : 'scale-100  rounded-b-full'}
                        `}
                    />



                    <div className='max-w-[1440px] mx-auto px-4'>
                        <div className="py-20">

                            {loading ? (
                            <p className="text-center text-white/70">Loading...</p>
                            ) : projects.length ? (
                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                                {projects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                                ))}
                            </div>
                            ) : (
                            <p className="text-center text-white/70">
                                No projects found.
                            </p>
                            )}
                        </div>
                    </div>
            </div>  
        </div> 

        <div className='bg-primary'>

          <LetsTalk />
        </div>


    </div>
  )
}
