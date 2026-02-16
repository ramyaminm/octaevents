'use client'
import { useEffect, useState } from 'react'
import { getServerSideProps } from '@/_components/api/general'
import ProjectCard from '@/_components/Common/ProjectCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import Map from '@/_components/SVGs/map-alt'
import Calender from '@/_components/SVGs/calender-alt'
import ProjectGallerySlider from '@/_components/Common/ProjectGallerySlider'
import Base from '@/_components/Common/Buttons/base'
import VideoPlayer from '../../Common/VideoPlayer'



interface Props {
    project: any
  }

  export default function ProjectSinglePage({ project }: Props) {

    const [relatedProjects, setRelatedProjects] = useState<any[]>([])

useEffect(() => {
  const fetchRelatedProjects = async () => {
    if (!project?.services?.length) return

    const serviceId = project.services[0].id

    const res = await getServerSideProps(
      `projects?filter[service_id]=${serviceId}&limit=6`,
      'en'
    )

    if (res?.props?.data?.success) {
      const filtered = res.props.data.data.filter(
        (p: any) => p.id !== project.id
      )
      setRelatedProjects(filtered.slice(0, 6))
    }
  }

  fetchRelatedProjects()
}, [project])

  return (
    <div className="overflow-hidden">
      <section className="bg-primary md:pt-[160px] pt-[80px] md:pb-20 pb-10 px-4">
        <div className='max-w-[1400px] m-auto'>
          
          <div className="text-center pb-6">
            {project.brand?.logo && (
              <Image
                src={project.brand.logo}
                alt={project.brand.name}
                width={130}
                height={55}
                className='m-auto'
              />
            )}
            <span className='block w-fit mx-auto md:text-xl font-medium bg-white/80 text-primary rounded px-2 py-1 md:my-5 my-3'>
                {project.services[0].name}
            </span>

            <h1 className="md:text-5xl text-[24px] text-white font-monument font-extrabold">
              {project.name}
            </h1>

            

            {/* <p className="text-secondary text-lg">
              {project.tagline}
            </p> */}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 md:text-base text-sm text-white">
                <div className='flex items-center gap-2'>
                    <Map />
                    <p>{new Date(project.project_date).toLocaleDateString('en-US', {month: 'long',day: 'numeric',year: 'numeric',})}</p>
                </div>
                <span className='bg-[#00A7FF] w-2 h-2 rounded-full'/>
                <div className='flex items-center gap-2'>
                     <Calender />
                     <p>{project.address}</p>
                </div>
            </div>
          </div>

          <div className='relative'>
            <h2 className='absolute top-4 left-4 p-3 z-[9] md:max-w-[400px] max-w-[280px] font-monument font-extrabold md:text-3xl text-sm bg-white/80 text-primary'>{project.tagline}</h2>
            {project.gallery?.length > 0 && (
            <ProjectGallerySlider
                images={project.gallery}
                alt={project.name}
            />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-[1400px] mx-auto md:py-28 py-10 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] md:gap-16 gap-4 items-start">
    
                <h2 className="md:text-4xl text-[22px] font-monument text-primary font-extrabold leading-tight">
                Project <br /> Overview
                </h2>

                <div className="space-y-6 max-w-[876px]">
                    <div
                        className="text-primary leading-relaxed md:text-base text-sm"
                        dangerouslySetInnerHTML={{ __html: project.overview }}
                    />
                    <Base
                        text={'Request Quote'}
                        href={"#"}
                    />
                </div>

            </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="max-w-[1400px] md:pt-20 pt-10 mx-auto grid md:grid-cols-2 gap-8 px-4">
            <div className="relative overflow-hidden px-7 md:py-[60px] py-[30px] rounded-[32px] bg-[linear-gradient(180deg,#F9AB25_0%,#FFB000_100%)]">
                <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                backgroundImage: `
                    url('/images/bg_brief.jpg')
                `,
                }} />
               <div className='relative z-[9]'>
                <h3 className="font-monument font-extrabold md:mb-8 mb-3 md:text-4xl text-[22px] text-white">The <br /> Brief</h3>
                    <div
                        className="text-white md:text-lg text-base"
                        dangerouslySetInnerHTML={{ __html: project.brief }}
                    />
               </div>
            </div>

            <div className="relative overflow-hidden px-7  md:py-[60px] py-[30px] rounded-[32px] bg-[linear-gradient(180deg,#300B50_0%,#842BD0_100%)]">
                <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                    backgroundImage: `
                    url('/images/bg_letstalk.jpg')
                `,
                }} />
                <div className=' relative z-[9]'>
                    <h3 className="font-monument font-extrabold md:mb-8 mb-3 md:text-4xl text-[22px] text-white">The <br /> Concept</h3>
                    <div
                        className="text-white md:text-lg text-base"
                        dangerouslySetInnerHTML={{ __html: project.concept }}
                    />
                </div>
            </div>
        </div>
        <div className="pt-20">
          {project.video?.src && (
              <div className="w-full mx-auto">
                <VideoPlayer
                  src={project.video.src}
                  poster={project.video.cover}
                />
              </div>
          )}
        </div>
      </section>

      <section>
        <div className="md:py-20 py-10 px-4">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] md:gap-16 gap-4 items-start">
    
                <h2 className="md:text-4xl text-[22px] font-monument text-primary font-extrabold leading-tight">
                Execution
                </h2>

                <div className="space-y-6 max-w-[876px]">
                    <div
                        className="text-primary leading-relaxed text-base text-sm"
                        dangerouslySetInnerHTML={{ __html: project.execution }}
                    />
                </div>

            </div>
        </div>
      </section>

      <section>
          {relatedProjects.length > 0 && (
            <div className="bg-primary md:py-32 py-12">
              <div className="max-w-[1440px] mx-auto px-4">

                <h2 className="text-center text-white md:text-4xl text-lg font-monument font-extrabold md:mb-16 mb-6">
                  More Like This
                </h2>

                <Swiper
                   modules={[FreeMode, Mousewheel]}
                   freeMode
                   mousewheel={{
                     forceToAxis: true,
                     releaseOnEdges: true,
                   }}
                   spaceBetween={24}
                   className="!overflow-visible opacity-100 touch-pan-x"
                   breakpoints={{
                     0: { slidesPerView: 1.1 },
                     640: { slidesPerView: 2.2 },
                     1280: { slidesPerView: 3.2 },
                   }}
                >
                  {relatedProjects.map((item: any) => (
                    <SwiperSlide key={item.id}>
                      <ProjectCard project={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex justify-center mt-16">
                  <Base
                    text="View Full Work"
                    href="/portfolio"
                  />
                </div>
              </div>
            </div>
          )}
      </section>
      {/* <section>
          <div className='relative'>
              <Image
                src="/images/404.jpg"
                alt="404 Background"
                fill
                priority
                className="object-cover"
              />
              <div className=' relative z-[9] py-[120px]'>
               <InquiryForm />
              </div>
          </div>
      </section> */}

    </div>
  )
}
