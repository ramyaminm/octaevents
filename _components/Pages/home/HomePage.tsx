'use client'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Base from '@/_components/Common/Buttons/base'
import LetsTalk from '@/_components/Common/LetsTalk'
import FAQItem from '@/_components/Common/FAQItem'
import { getServerSideProps } from '@/_components/api/general'
import IconPlay from '@/_components/SVGs/icon_play'
import Link from 'next/link'
import ArrowRightHome from '@/_components/SVGs/arrow-right-home'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import HowWeWorkStep from '@/_components/Common/HowWeWorkStep'
import BrandArrow from '@/_components/SVGs/brand-arrow'
import ProjectCard from '@/_components/Common/ProjectCard'
import BlogsWidget, { BlogsWidgetProps } from '@/_components/Common/BlogsWidget'
import InfiniteVerticalKeywordSlider from '@/_components/Common/KeywordsStrip'

interface HomePageData {
  title: string
  extra_content: any
}



export default function HomePage({ page }: { page?: HomePageData }) {
  if (!page) return null

  const { extra_content } = page
  const locale = useLocale()
  const [faqs, setFaqs] = useState<any[]>([])
  const [openId, setOpenId] = useState<number | null>(null)
  const [scrolled300, setScrolled300] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  const [blogs, setBlogs] = useState<any[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await getServerSideProps('faqs', 'en')
      if (res?.props?.data?.success) {
        setFaqs(res.props.data.data.slice(0, 5))
      }
    }
    fetchFaqs()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY >= 4800) {
        setScrolled300(true)
        window.removeEventListener('scroll', handleScroll) 
        }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
    }, [])

    useEffect(() => {
      const fetchHomeProjects = async () => {
        setLoadingProjects(true)
    
        const res = await getServerSideProps('projects?per_page=6', 'en')
    
        if (res?.props?.data?.success) {
          setProjects(res.props.data.data)
        }
    
        setLoadingProjects(false)
      }
    
      fetchHomeProjects()
    }, [])


useEffect(() => {
  const fetchHomeBlogs = async () => {
    setLoadingBlogs(true)

    try {
      const res = await getServerSideProps('blogs?limit=3', locale)

      if (res?.props?.data?.success) {
        setBlogs(res.props.data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingBlogs(false)
    }
  }

  fetchHomeBlogs()
}, [locale])
    


  return (
    <div className="overflow-hidden">

      <section className="relative h-screen flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={extra_content.hero.video}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-[#12063BCC]" />

          <div className="relative z-10 max-w-[900px] px-6">
                <h1 className="font-monument text-white lg:text-5xl text-[44px] lg:leading-[60px] font-extrabold max-w-[400px]">
                  {extra_content.hero.title}
                </h1>

                <p className="mt-6 text-lg max-w-[600px] text-[#CFCBE4]">
                  {extra_content.hero.subtitle}
                </p>

                <div className="mt-8 w-[260px]">
                  <Base
                    text={extra_content.hero.button.text}
                    href={extra_content.hero.button.link}
                    className="justify-center w-[300px]"
                  />
                </div>
          </div>

          <div className=' absolute bottom-10 left-4 right-4 flex justify-between'>
              <div className=" relative w-[120px] h-[120px] flex items-center justify-center">
                  <div className="absolute inset-0 w-[120px] h-[120px]">
                      <svg
                          viewBox="0 0 120 120"
                          className="w-full h-full overflow-visible animate-spin-slow"
                      >
                          <defs>
                          <path
                              id="circlePath"
                              d="
                              M 60,60
                              m -45,0
                              a 45,45 0 1,1 90,0
                              a 45,45 0 1,1 -90,0
                              "
                          />
                          </defs>

                          <text
                          fill="white"
                          fontSize="14"
                          fontWeight="900"
                          letterSpacing="2"
                          fontFamily="var(--font-monument), sans-serif"
                          dy="4"
                          >
                          <textPath href="#circlePath">
                          • PLAY VIDEO • PLAY VIDEO
                          </textPath>
                          </text>
                      </svg>
                  </div>
                  <button
                      // onClick={handlePlay}
                      className="
                      relative z-10
                      h-14 w-14
                      rounded-full
                      bg-white
                      flex items-center justify-center
                      transition
                      "
                  >
                      <IconPlay />
                  </button>
              </div>
              {/* customers */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-3">
                  {extra_content.hero.customers.items.map((item: any, i: number) => (
                    <Image
                      key={i}
                      src={item.image.src}
                      alt={item.image.alt}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#0B0225]"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold font-monument text-2xl text-secondary">
                    {extra_content.hero.customers.count}
                  </p>
                  <p className="text-white">
                    {extra_content.hero.customers.title}
                  </p>
                </div>
              </div>
          </div>
      </section>

      <section className="">
            <div className="lg:h-[100vh] mx-auto">
                <div className="relative overflow-hidden h-full">
                    <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0"  style={{
                    backgroundImage: `
                        url('/images/home_slider_bg.jpg')
                    `,
                    }} />
                    <div className='relative z-[9] h-full flex flex-col justify-center items-center py-20'>
                      <h3 className="font-monument font-extrabold lg;mb-8 lg:text-[77px] text-[44px] text-white">{extra_content.service_keywords_strip.before}</h3>
                        
                        <InfiniteVerticalKeywordSlider words={extra_content.service_keywords_strip.keywords} />

                      <h3 className=" lg:mt-8 lg:text-[90px] text-[40px] font-thin text-white">{extra_content.service_keywords_strip.after}</h3>
                    </div>
                </div>
            </div>
      </section>


      <section className='bg-primary'>
          <section className="md:pt-36 pt-20">
            <h2 className="text-center lg:text-5xl text-[32px] font-monument font-extrabold text-white mb-16">
              {extra_content.impact.title}
            </h2>

            <div className="flex justify-center flex-wrap items-center px-6">
              {extra_content.impact.items.map((item: any, i: number) => (
                <div key={i} className="text-center md:w-1/3 w-1/2 pb-14">
                  <div className='w-28 h-28 m-auto flex'>
                    <Image className='m-auto' src={item.icon.src} alt={item.icon.alt} width={100} height={100} />
                  </div>
                  <h3 className="pt-6 lg:text-[44px] text-[32px] text-white font-monument font-extrabold">{item.counter}</h3>
                  <p className="text-white lg:text-lg">{item.title}</p>
                </div>
              ))}
              <Base 
                text={'More About Octa'}
                href={'./about-us'}
                className="justify-center w-[300px]"
              />
            </div>
          </section>


          <div className="relative w-full pt-32">
            <div className=' rotate-[-3deg] relative z-[9]'>
              <div className="marquee-text-track">
                <span className="marquee-text">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>

                {/* duplicate for seamless loop */}
                <span className="marquee-text">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>
              </div>
            </div>
            <div className=' rotate-[2deg] absolute bottom-0'>
              <div className="marquee-text-track pink">
                <span className="marquee-text pink">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>

                {/* duplicate for seamless loop */}
                <span className="marquee-text pink">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>
              </div>
             </div> 
          </div>

          <section className="md:pt-36 pt-20">
            <h2 className="text-center lg:text-5xl text-[32px] font-monument font-extrabold text-white mb-16">
              {extra_content.services.title}
            </h2>

            <div className="md:flex justify-center flex-wrap px-6">
              {extra_content.services.items.map((item: any, i: number) => (
                <div key={i} className="p-6 lg:w-1/2">
                  <div className='bg-[linear-gradient(31.04deg,#FFB000,#FE007F,#822DD1,#00A7FF)] rounded-[40px] p-[2px] h-full'>
                    <div className=' relative p-8 bg-[linear-gradient(55.12deg,#12063B,#4B3219)] rounded-[40px] h-full'>
                        <div className='relative w-36 h-36'>
                          <Image src={item.icon.src} alt={item.icon.alt} fill/>
                        </div>
                        <h3 className="font-monument font-extrabold text-2xl text-white pt-8 pb-4">
                          {item.title}
                        </h3>
                        <p className=" text-white text-lg max-w-[450px]">
                          {item.description}
                        </p>
                        <Link
                            href={'./about-us'}
                            className={`
                              group
                              inline-flex
                              items-center
                              gap-2
                              bg-[#FDBA3B]
                              text-primary
                              px-8
                              py-3
                              text-sm
                              font-semibold
                              transition-all
                              duration-300
                              hover:bg-pink
                              hover:text-white
                              justify-center w-[100px] h-[100px] rounded-full absolute -right-8 -bottom-6 border-[10px] border-primary

                            `}
                          >
                            <span
                              className="
                                w-10
                                h-10
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-300
                                group-hover:rotate-45
                                group-hover:translate-x-1
                                group-hover:text-white
                                "
                            >
                              <ArrowRightHome />
                            </span>
                        </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="md:py-40 py-20">
           <div className='text-center'>
              <h2 className="text-center lg:text-5xl text-[32px] font-monument font-extrabold text-white">
                  {extra_content.how_we_work.title}
                </h2>
                <p className="text-center text-white py-6">
                  {extra_content.how_we_work.subtitle}
                </p>
                <Base 
                  text={'Let’s Talk'}
                  href={'./contact-us'}
                  className="m-auto"
                />
           </div>

            <div className="relative max-w-[1440px] mx-auto px-4 pt-20 overflow-hidden">
              <Swiper
                modules={[FreeMode, Mousewheel]}
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumBounce: false,
                }}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
                grabCursor={false}
                spaceBetween={40}
                className="!overflow-visible"
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                  },
                  640: {
                    slidesPerView: 2.2,
                  },
                  1024: {
                    slidesPerView: 3.5,
                  },
                }}
              >
                {extra_content.how_we_work.steps.map((step: any, i: number) => (
                  <SwiperSlide key={i} className="select-none !mr-[-2px]">
                    <HowWeWorkStep step={step} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
      </section>

      <section className="py-24">
        <h2 className="text-center lg:text-5xl text-[32px] lg:leading-[58px] leading-[40px] font-monument font-extrabold text-primary max-w-[800px] mx-auto mb-16">
          {extra_content.features.title}
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-[1200px] mx-auto px-6">
          {extra_content.features.items.map((item: any, i: number) => (
            <div
              key={i}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: item.card_color,
                color: item.text_color,
              }}
            >
              <h3 className="font-monument font-bold text-xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className='relative bg-[#E7E6EB]  overflow-hidden'>
            <div className={`
                pointer-events-none
                absolute
                top-0 left-0 right-0                    
                m-auto
                bg-primary
                 w-full h-full
                origin-top
                duration-[2500ms] transition-opacity
                ease-[cubic-bezier(.22,1,.36,1)]
                z-[9]
                ${scrolled300 ? 'opacity-0' : ' opacity-100   '}`}
            />
            <div className='max-w-[1440px] mx-auto px-4'>
                <div className={`py-20 relative text-center max-w-[1200px] m-auto ${scrolled300 ? ' opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-center font-monument font-extrabold lg:text-[44px] text-[32px] mb-4 text-primary">
                      {extra_content.brands.title}
                    </h2>
                    <div className='w-fit m-auto'>
                      <BrandArrow  />
                    </div>
                </div>
            </div>

            <div className="overflow-hidden pb-24">

                <div className="relative w-full overflow-hidden">
                  <div className="marquee-track marquee-left">
                    {[...extra_content.brands.first_row, ...extra_content.brands.first_row].map(
                      (item: any, i: number) => (
                        <div
                          key={`row1-${i}`}
                          className="flex items-center justify-center min-w-[220px]"
                        >
                          <div className="relative w-full h-[80px] flex items-center justify-center">
                            <Image
                              src={item.logo.src}
                              alt={item.logo.alt || 'brand'}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="relative w-full overflow-hidden mt-12">
                  <div className="marquee-track marquee-right">
                    {[...extra_content.brands.second_row, ...extra_content.brands.second_row].map(
                      (item: any, i: number) => (
                        <div
                          key={`row2-${i}`}
                          className="flex items-center justify-center min-w-[220px]"
                        >
                          <div className="relative w-full h-[80px] flex items-center justify-center">
                            <Image
                              src={item.logo.src}
                              alt={item.logo.alt || 'brand'}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

            </div>



                {/* {[...extra_content.brands.first_row, ...extra_content.brands.second_row].map(
                  (item: any, i: number) => (
                    <Image
                      key={i}
                      src={item.logo.src}
                      alt={item.logo.alt || 'brand'}
                      width={120}
                      height={60}
                      className="inline-block mx-6 my-4"
                    />
                  )
                )} */}
        </div>  
      </section>

      <section className="bg-primary md:py-32 py-20">
           <div className='text-center'>
              <h2 className="text-center lg:text-5xl text-[32px] leading-[56px] font-monument font-extrabold text-white">
                  {extra_content.projects.title}
                </h2>
                <p className="text-center text-white py-6 max-w-[500px] m-auto">
                  {extra_content.projects.subtitle}
                </p>
           </div>
           <div className='max-w-[1440px] px-4 pt-20'>
            <Swiper
                modules={[FreeMode, Mousewheel]}
                freeMode
                mousewheel={{
                  forceToAxis: true,
                  releaseOnEdges: true,
                }}
                grabCursor={false}
                spaceBetween={24}
                className="!overflow-visible touch-pan-x"
                breakpoints={{
                0: {
                  slidesPerView: 1.1,
                },
                640: {
                  slidesPerView: 2.2,
                },           
                1280: {
                  slidesPerView: 3.2,
                },
              }}
            >
              {projects.map((project: any) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='flex justify-center mt-8'>
              <Base 
                text={'View Full Work'}
                href={'./portfolio'}
                className="justify-center w-[230px] mx-auto mt-16"
              />
            </div>
           </div>
      </section>

      <section className="py-24">
        <h2 className="lg:text-5xl text-[32px] lg:leading-[60px] leading-[40px] font-monument font-extrabold text-primary text-center mb-20 max-w-[600px] m-auto">
            {extra_content.faqs.title}
        </h2>

        <div className="max-w-[900px] mx-auto space-y-4 px-6">
          {faqs.map(faq => (
            <FAQItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() =>
                setOpenId(openId === faq.id ? null : faq.id)
              }
            />
          ))}
        </div>
        <div className='flex justify-center'>
          <Base
              text={"View All"}
              href={"./faqs"}
              className="justify-center mt-12 "
          />
        </div>
      </section>

      <section className='pt-20 bg-[#E7E6EB]'>
        <div className='pb-14'>
          <h2 className="lg:text-5xl text-[32px] lg:leading-[60px] leading-[40px] font-monument font-extrabold text-primary text-center mb-20 max-w-[900px] m-auto">
              {extra_content.blogs.title}
          </h2>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
            {blogs.map(blog => (
              <BlogsWidget
                key={blog.id}
                data={blog as unknown as BlogsWidgetProps}
              />
            ))}
          </div>
          <div className='flex justify-center'>
            <Base
                text={"Read More"}
                href={"./media-center"}
                className="justify-center mt-12 "
            />
          </div>
        </div>
        <LetsTalk />
      </section>

    </div>
  )
}
