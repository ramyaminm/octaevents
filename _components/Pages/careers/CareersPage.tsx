'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getServerSideProps } from '@/_components/api/general'
import ClockAlt from '@/_components/SVGs/clock-alt'
import MapMarker from '@/_components/SVGs/map-marker'
import VacanciesIcon from '@/_components/SVGs/vacancies_icon'


interface Heading {
  tagline?: {
    text: string
    front_color: string
    back_color: string
  }
  title?: string
  subtitle?: string | null
}

interface Hero {
  title: string
  content: string
  image: {
    src: string
    alt?: string | null
  }
}

interface Vacancies {
  tagline?: {
    text: string
    front_color: string
    back_color: string
  }
  title?: string
}

interface Career {
  id: number
  slug: string
  title: string
  description: string
  job_type: string
  location: string
  icon_url: string
}

interface CareersPageProps {
  page?: {
    extra_content?: {
      heading?: Heading
      hero?: Hero
      vacancies?: Vacancies
    }
  }
}

export default function CareersPage({ page }: CareersPageProps) {
  const locale = useLocale()

  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true)
      try {
        const res = await getServerSideProps('careers', locale)
        if (res.props.data?.success) {
          setCareers(res.props.data.data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCareers()
  }, [locale])

  const heading = page?.extra_content?.heading
  const hero = page?.extra_content?.hero
  const vacancies = page?.extra_content?.vacancies

  return (
    <div className='bg-primary'>
      <div className='max-w-[1440px] mx-auto'>
          <div className="text-center pb-14 pt-28  ">
            {heading?.tagline && (
              <div className="relative inline-block">
                <span
                  className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0"
                  style={{ background: heading.tagline.back_color }}
                />

                <h1
                  className="
                    relative
                    font-monument
                    text-[14px]
                    md:text-base
                    font-semibold
                    px-[18px]
                    py-[7px]
                    rounded-full
                    border-2
                    border-[#1A0044]
                    whitespace-nowrap
                    rotate-[-5deg]
                    text-white
                  "
                  style={{
                    backgroundColor: heading.tagline.front_color,
                  }}
                >
                  {heading.tagline.text}
                </h1>
              </div>
            )}

            {heading?.title && (
              <div className="max-w-[750px] mt-[30px] mx-auto text-white">
                  <h2 className="font-monument font-semibold text-5xl leading-[65px]">
                    {heading.title}
                  </h2>
              </div>
            )}
          </div>

          {hero && (
            <section className="px-6 py-20">
              <div className="px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className='max-w-[550px]'>
                  <h2 className="text-white font-monument text-4xl font-extrabold mb-6">
                    {hero.title}
                  </h2>

                  <div
                    className="text-white leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: hero.content }}
                  />
                </div>

                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt || ''}
                    width={700}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
          )}

          <section className="py-24 px-4">
            <div className="">
              <div className="text-center mb-12">
              
                {vacancies?.tagline && (                  
                  <div className={`pl-36 pb-14`} >
                    <div className={`flex items-start gap-8`} >
                      <div className='relative'>
                        <span className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-10deg] z-0"
                          style={{ backgroundColor:vacancies.tagline.back_color}}
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
                            text-black
                          "
                          style={{
                            backgroundColor: vacancies.tagline.front_color,
                          }}
                        >
                          {vacancies.tagline.text}
                        </h5>
                      </div>
                      <div>
                        <VacanciesIcon />
                          {/* <Image
                            src={service.service_arrow}
                            alt="arrow"
                            width={113}
                            height={113}
                            className="object-cover"
                          /> */}
                      </div>
                    </div>
                  </div>
                )}



                {vacancies?.title && (
                  <h2 className="text-white font-monument text-5xl font-extrabold mt-6">
                    {vacancies.title}
                  </h2>
                )}
              </div>

              {loading ? (
                <p className="text-center text-gray-400">
                  Loading careers...
                </p>
              ) : careers.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {careers.map((job, index) => {
                  const isLastOdd =
                    careers.length % 2 !== 0 && index === careers.length - 1
              
                  return (
                    <Link
                    href={`/careers/${job.slug}`}
                    className={`
                      block
                      bg-white
                      rounded-[24px]
                      p-6
                      transition
                      hover:shadow-md
                      group
                      ${isLastOdd ? 'xl:col-span-2 xl:max-w-[600px] xl:mx-auto' : ''}
                    `}
                  >
                    <div>
                      <Image
                        src={job.icon_url}
                        alt={job.title}
                        width={50}
                        height={50}
                      />
                    </div>
                  
                    <h3 className="text-xl font-bold text-primary py-3">
                      {job.title}
                    </h3>
                  
                    <div
                      className="text-[#413862] text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  
                    <div className="h-px bg-[#D0CDD8] my-3" />
                  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-[#6B6B7A]">
                        <span className="flex items-center gap-2">
                          <MapMarker />
                          {job.location}
                        </span>
                  
                        <span className="flex items-center gap-2">
                          <ClockAlt />
                          {job.job_type}
                        </span>
                      </div>
                  
                      <span
                        className="
                          bg-secondary
                          text-base
                          text-primary
                          font-semibold
                          w-28
                          px-8
                          py-2
                          rounded-full
                          text-center
                          transition
                          group-hover:text-white
                        "
                      >
                        Apply
                      </span>
                    </div>
                  </Link>
                  
                  )
                })}
              </div>
              
              ) : (
                <p className="text-center text-gray-400">
                  No vacancies found.
                </p>
              )}
            </div>
          </section>
      </div>
    </div>
  )
}
