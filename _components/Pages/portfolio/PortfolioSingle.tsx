'use client'
import { useEffect, useState } from 'react'
import { getServerSideProps } from '@/_components/api/general'
import ProjectCard from '@/_components/Common/ProjectCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import Map from '@/_components/SVGs/map-alt'
import Calender from '@/_components/SVGs/calender-alt'
import ProjectGallerySlider from '@/_components/Common/ProjectGallerySlider'
import Base from '@/_components/Common/Buttons/base'
import VideoPlayer from '../../Common/VideoPlayer'
import InquiryForm from '@/_components/Common/ServiceInquiryForm'



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
      // استبعاد المشروع الحالي
      const filtered = res.props.data.data.filter(
        (p: any) => p.id !== project.id
      )
      setRelatedProjects(filtered.slice(0, 6))
    }
  }

  fetchRelatedProjects()
}, [project])

  return (
    <div>
      <section className="bg-primary pt-[160px] pb-20 px-4">
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
            <span className='block w-fit mx-auto text-xl font-medium bg-[#842BD0] rounded px-2 py-1 my-5 text-white'>
                {project.services[0].name}
            </span>

            <h1 className="text-5xl text-white font-monument font-extrabold">
              {project.name}
            </h1>

            

            {/* <p className="text-secondary text-lg">
              {project.tagline}
            </p> */}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-base text-white">
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
            <h2 className='absolute top-4 left-4 p-3 z-[9] max-w-[400px] font-monument font-extrabold text-3xl text-white bg-[#842BD0]'>{project.tagline}</h2>
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
        <div className="max-w-[1400px] mx-auto py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
    
                <h2 className="text-4xl font-monument text-primary font-extrabold leading-tight">
                Project <br /> Overview
                </h2>

                <div className="space-y-6 max-w-[876px]">
                    <div
                        className="text-primary leading-relaxed text-base"
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
        <div className="max-w-[1400px] pt-20 mx-auto grid md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden px-7 py-[60px] rounded-[32px] bg-[linear-gradient(180deg,#F9AB25_0%,#FFB000_100%)]">
                <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                backgroundImage: `
                    url('/images/bg_brief.jpg')
                `,
                }} />
               <div className='relative z-[9]'>
                <h3 className="font-monument font-extrabold mb-8 text-4xl text-white">The <br /> Brief</h3>
                    <div
                        className="text-white text-lg leading-7"
                        dangerouslySetInnerHTML={{ __html: project.brief }}
                    />
               </div>
            </div>

            <div className="relative overflow-hidden px-7 py-[60px] rounded-[32px] bg-[linear-gradient(180deg,#300B50_0%,#842BD0_100%)]">
                <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                    backgroundImage: `
                    url('/images/bg_letstalk.jpg')
                `,
                }} />
                <div className=' relative z-[9]'>
                    <h3 className="font-monument font-extrabold mb-8 text-4xl text-white">The <br /> Concept</h3>
                    <div
                        className="text-white text-lg"
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
        <div className="py-20">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
    
                <h2 className="text-4xl font-monument text-primary font-extrabold leading-tight">
                Execution
                </h2>

                <div className="space-y-6 max-w-[876px]">
                    <div
                        className="text-primary leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: project.execution }}
                    />
                </div>

            </div>
        </div>
      </section>

      <section>
          {relatedProjects.length > 0 && (
            <div className="bg-primary py-32">
              <div className="max-w-[1440px] mx-auto px-4">

                <h2 className="text-center text-white text-4xl font-monument font-extrabold mb-16">
                  More Like This
                </h2>

                <Swiper
                  modules={[FreeMode]}
                  freeMode
                  grabCursor
                  spaceBetween={24}
                  slidesPerView={1.2}
                  breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2 },
                    1280: { slidesPerView: 3.2 },
                  }}
                  className="!overflow-visible"
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
      <section>
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
      </section>

    </div>
  )
}
