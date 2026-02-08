'use client'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Base from '@/_components/Common/Buttons/base'
import LetsTalk from '@/_components/Common/LetsTalk'
import FAQItem from '@/_components/Common/FAQItem'
import { getServerSideProps } from '@/_components/api/general'
import IconPlay from '@/_components/SVGs/icon_play'
import Link from 'next/link'
import ArrowRightHome from '@/_components/SVGs/arrow-right-home'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from "swiper";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import 'swiper/css'
import HowWeWorkStep from '@/_components/Common/HowWeWorkStep'
import BrandArrow from '@/_components/SVGs/brand-arrow'
import ProjectCard from '@/_components/Common/ProjectCard'
import BlogsWidget, { BlogsWidgetProps } from '@/_components/Common/BlogsWidget'
import InfiniteVerticalKeywordSlider from '@/_components/Common/KeywordsStrip'

import { motion } from "framer-motion";
import AnimatedSectionTitle from '@/_components/Common/Animated/AnimatedSectionTitle'
import { cardVariant, fadeUpItem, staggerContainer } from '@/_utils/motion'
import { useScrollAnimation } from '@/_hooks/useScrollAnimation'
import AnimatedIconCounter from '@/_components/Common/Animated/AnimatedIconCounter'
import AnimatedTypingText from '@/_components/Common/Animated/AnimatedTypingText'
import { useInView } from "react-intersection-observer";

interface HomePageData {
  title: string
  extra_content: any
}

function repeatUntilFilled<T>(items: T[], min = 20): T[] {
  if (!items || items.length === 0) return []

  const result = [...items]
  while (result.length < min) {
    result.push(...items)
  }
  return result
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const firstRow = repeatUntilFilled(extra_content.brands.first_row, 24)
  const secondRow = repeatUntilFilled(extra_content.brands.second_row, 24)


  const [ref, inView] = useScrollAnimation();
  const [servicesRef, servicesInView] = useScrollAnimation();
  const [workRef, workInView] = useScrollAnimation();


  const [brandRef,brandInView] = useScrollAnimation();
  const [faqsRef, faqsInView] = useScrollAnimation();
  const [blogRef, blogInView] = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false)


const [projectsRef, projectsInView] = useInView({
  triggerOnce: true,
  threshold: 0.3
});
useEffect(() => {
  if (projectsInView) {
    setProjectsSectionInView(true);
  }
}, [projectsInView]);
const [titleDone, setTitleDone] = useState(false);
const [projectsSectionInView, setProjectsSectionInView] = useState(false);
useEffect(() => {
  if (projectsSectionInView) {
    const fallbackTimer = setTimeout(() => {
      setTitleDone(true);
    }, 1200); // نفس مدة الـ typing تقريبًا

    return () => clearTimeout(fallbackTimer);
  }
}, [projectsSectionInView]);

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const [hovered, setHovered] = useState<number | null>(null)



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
      if (workInView && swiperInstance) {
        swiperInstance.autoplay.start();
      }
    }, [workInView, swiperInstance]);


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
    

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024)
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)

  return () => window.removeEventListener('resize', checkMobile)
}, [])
const getTransform = (index: number) => {
  if (isMobile) {
    return "translateX(0px) rotate(0deg)"
  }

  if (hovered === null) {
    if (index === 0) return "translateX(60px) rotate(6deg)"
    if (index === 1) return "rotate(-6deg)"
    if (index === 2) return "translateX(-60px) rotate(6deg)"
    if (index === 3) return "translateX(-120px) rotate(-6deg)"
  }

  if (hovered === 0) {
    if (index === 0) return "translateX(60px) rotate(0deg)"
    if (index === 1) return "translateX(180px) rotate(-6deg)"
    if (index === 2) return "translateX(100px) rotate(6deg)"
    if (index === 3) return "translateX(0px) rotate(-6deg)"
  }

  if (hovered === 1) {
    if (index === 0) return "translateX(-60px) rotate(6deg)"
    if (index === 1) return "rotate(0deg)"
    if (index === 2) return "translateX(60px) rotate(6deg)"
    if (index === 3) return "translateX(0px) rotate(-6deg)"
  }

  if (hovered === 2) {
    if (index === 0) return "translateX(-100px) rotate(6deg)"
    if (index === 1) return "translateX(-150px) rotate(-6deg)"
    if (index === 2) return "translateX(-60px) rotate(0deg)"
    if (index === 3) return "translateX(0px) rotate(-6deg)"
  }

  if (hovered === 3) {
    if (index === 0) return "translateX(-100px) rotate(6deg)"
    if (index === 1) return "translateX(-150px) rotate(-6deg)"
    if (index === 2) return "translateX(-180px) rotate(6deg)"
    if (index === 3) return "translateX(0px) rotate(0deg)"  }

  return "translateX(0px) rotate(0deg)"
}
const containerRef = useRef<HTMLDivElement>(null)

const handleMouseMove = (e: React.MouseEvent) => {
  if (window.innerWidth < 1024) return
  if (!containerRef.current) return

  const cards = Array.from(
    containerRef.current.querySelectorAll('[data-card]')
  ) as HTMLElement[]

  const mouseX = e.clientX

  let closestIndex = null
  let minDistance = Infinity

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const distance = Math.abs(mouseX - centerX)

    if (distance < minDistance) {
      minDistance = distance
      closestIndex = index
    }
  })

  setHovered(closestIndex)
}

const handleMouseLeave = () => {
  setHovered(null)
}


  return (
    <div className="overflow-hidden">

      <section className="relative lg:h-screen h-[80vh] lg:py-0 py-28 flex lg:items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={extra_content.hero.video}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-[#12063BCC]" />

          <div className="relative z-10 max-w-[900px] md:px-6 px-4">
                <h1 className="font-monument text-white lg:text-5xl text-[32px] lg:leading-[60px] font-extrabold max-w-[300px]">
                  {extra_content.hero.title}
                </h1>

                <p className="mt-6 lg:text-lg text-sm max-w-[600px] text-[#CFCBE4]">
                  {extra_content.hero.subtitle}
                </p>

                <div className="mt-8">
                  <Base
                    text={extra_content.hero.button.text}
                    href={extra_content.hero.button.link}
                    className="justify-center lg:w-[300px]"
                  />
                </div>
          </div>

          <div className=' absolute md:bottom-10 bottom-4 left-4 right-4 flex justify-between'>
              <div className=" relative md:w-[120px] md:h-[120px] w-[60px] h-[60px] flex items-center justify-center">
                  <div className="absolute inset-0 md:w-[120px] md:h-[120px] w-[60px] h-[60px]">
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
                          • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO
                          </textPath>
                          </text>
                      </svg>
                  </div>
                  <button
                      // onClick={handlePlay}
                      className="
                      relative z-10
                      md:h-14 md:w-14 h-[26px] w-[26px]
                      rounded-full
                      bg-white
                      flex items-center justify-center
                      transition
                      "
                  >
                    <span className='block md:w-[21px] md:h-[24px] w-[12px] h-[13px]'>
                      <IconPlay />
                    </span>
                  </button>
              </div>
              {/* customers */}
              <div className="flex items-center md:gap-4 gap-2 md:mt-10">
                <div className="flex -space-x-3">
                  {extra_content.hero.customers.items.map((item: any, i: number) => (
                    <div className=' relative md:w-[60px] md:h-[60px] w-[30px] h-[30px]'>
                      <Image
                        key={i}
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        className="rounded-full border-2 border-[#0B0225]"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold font-monument md:text-2xl text-base text-secondary">
                    {extra_content.hero.customers.count}
                  </p>
                  <p className="text-white md:text-base text-xs">
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
                    <div className='relative z-[9] h-full flex flex-col justify-center items-center lg:py-20 py-12'>
                      <h3 className="font-monument font-extrabold lg;mb-8 lg:text-[77px] text-[44px] text-white">{extra_content.service_keywords_strip.before}</h3>
                        
                        <InfiniteVerticalKeywordSlider words={extra_content.service_keywords_strip.keywords} />

                      <h3 className=" lg:mt-8 lg:text-[90px] text-[40px] font-thin text-white">{extra_content.service_keywords_strip.after}</h3>
                    </div>
                </div>
            </div>
      </section>


      <section className='bg-primary'>
          
         
          <section ref={ref} className="md:pt-36 pt-12 scroll-px-14 max-w-[1440px] m-auto">

              <AnimatedSectionTitle
                text={extra_content.impact.title}
                inView={inView}
                className="text-white lg:mb-16 mb-6"
              />

              <motion.div
               variants={staggerContainer(0.35, 1.0)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex justify-center flex-wrap items-center"
              >
                {extra_content.impact.items.map((item: any, i: number) => (
                  <AnimatedIconCounter
                    key={i}
                    start={inView}
                    icon={item.icon}
                    value={parseInt(item.counter.replace(/\D/g, ""))}
                    suffix={item.counter.replace(/[0-9]/g, "")}
                    title={item.title}
                  />
                ))}
              </motion.div>
          </section>


          <div className="relative w-full lg:pt-32 pt-16">
            <div className=' rotate-[-3deg] relative z-[9]'>
              <div className="marquee-text-track">
                <span className="marquee-text">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>

                {/* duplicate for seamless loop */}
                <span className="marquee-text">
                  {' Connect • Create • Celebrate • Engage • Grow • '}
                </span>

                {/* duplicate for seamless loop */}
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

                  {/* duplicate for seamless loop */}
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

          
          <section ref={servicesRef} className="md:pt-36 pt-20 px-4 max-w-[1440px] m-auto">

                <AnimatedSectionTitle
                  text={extra_content.services.title}
                  inView={servicesInView}
                  className="text-white lg:mb-16 mb-6"
                />

                <motion.div
                  variants={staggerContainer(0.4)}
                  initial="hidden"
                  animate={servicesInView ? "visible" : "hidden"}
                  className="md:flex justify-center flex-wrap md:px-6"
                >
                  {extra_content.services.items.map((item: any, i: number) => (
                    <motion.div
                      key={i}
                      variants={cardVariant}
                      className="lg:p-6 py-4 lg:w-1/2"
                    >
                      <div className="bg-[linear-gradient(31.04deg,#FFB000,#FE007F,#822DD1,#00A7FF)] rounded-[40px] p-[2px] h-full">
                        <div className="relative p-8 bg-[linear-gradient(55.12deg,#12063B,#4B3219)] rounded-[40px] h-full">

                          <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-36 lg:h-36 flex">
                            <Image
                              className="w-12 h-12 md:w-16 md:h-16 lg:w-32 lg:h-32 m-auto"
                              src={item.icon.src}
                              alt={item.icon.alt}
                              fill
                            />
                          </div>

                          <h3 className="font-monument font-extrabold lg:text-2xl text-lg text-white lg:pt-8 pt-4 pb-2">
                            {item.title}
                          </h3>

                          <p className="text-white lg:text-lg text-sm max-w-[450px]">
                            {item.description}
                          </p>

                          <Link
                            href="./about-us"
                            className="
                              group
                              inline-flex
                              items-center
                              justify-center
                              bg-[#FDBA3B]
                              text-primary
                              lg:w-[100px] lg:h-[100px]
                              w-[50px] h-[50px]
                              rounded-full
                              absolute
                              lg:-right-8 -right-4
                              lg:-bottom-6 -bottom-3
                              border-[10px] border-primary
                              transition-all duration-300
                              hover:bg-pink hover:text-white
                            "
                          >
                            <span className="transition-all duration-300 group-hover:rotate-45 group-hover:translate-x-1">
                                <span className='md:w-[50px] md:h-[50px] w-[25px] h-[25px] block'><ArrowRightHome /></span>
                            </span>
                          </Link>

                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

          </section>

          <section ref={workRef} className="md:py-40 py-16 px-4 max-w-[1440px] m-auto">

            <div className="text-center">
              <AnimatedSectionTitle
                text={extra_content.how_we_work.title}
                inView={workInView}
                className="text-white"
              />

              <motion.p
                variants={fadeUpItem(20, 0.6)}
                initial="hidden"
                animate={workInView ? "visible" : "hidden"}
                className="text-center md:text-base text-sm text-white md:pt-6 pb-6 pt-[4px]"
              >
                {extra_content.how_we_work.subtitle}
              </motion.p>

              <motion.div
                variants={fadeUpItem(20, 0.6)}
                initial="hidden"
                animate={workInView ? "visible" : "hidden"}
              >
                <Base
                  text="Let’s Talk"
                  href="./contact-us"
                  className="m-auto"
                />
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer(0.25)}
              initial="hidden"
              animate={workInView ? "visible" : "hidden"}
              className="relative max-w-[1440px] mx-auto px-4 lg:pt-20 pt-12 overflow-hidden"
            >
                <Swiper
                  onSwiper={setSwiperInstance}
                  modules={[FreeMode, Mousewheel, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
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
                    0: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.5 },
                  }}
                >
                {extra_content.how_we_work.steps.map((step: any, i: number) => (
                  <SwiperSlide key={i} className="select-none !mr-[-2px]">
                    <motion.div variants={fadeUpItem(40, 0.8)}>
                      <HowWeWorkStep step={step} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

          </section>
      </section>

      <section className="md:py-24 py-16 px-4">
        <h2 className="text-center lg:text-5xl text-[32px] lg:leading-[58px] leading-[40px] font-monument font-extrabold text-primary max-w-[800px] mx-auto mb-16">
          {extra_content.features.title}
        </h2>

        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex md:flex-row flex-col md:gap-y-0 gap-y-3 justify-center max-w-[1200px] mx-auto md:px-6 overflow-visible"
          >
            {extra_content.features.items.map((item: any, i: number) => (
              <div key={i} data-card className="relative  md:w-1/4 w-full">
                <div
                  className="
                    p-8 rounded-2xl
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    will-change-transform cursor-pointer
                    w-full h-full
                  "
                  style={{
                    backgroundColor: item.card_color,
                    color: item.text_color,
                    transform: getTransform(i),
                    zIndex: hovered === i ? 20 : 1,
                  }}
                >
                  <h3 className="font-monument font-bold text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm">
                    {item.description}
                  </p>
                </div>
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
            <div className='max-w-[1440px] mx-auto px-4' ref={brandRef}>
                <div className={`py-20 relative text-center max-w-[1200px] m-auto ${scrolled300 ? ' opacity-100' : 'opacity-0'}`}>
                    <AnimatedSectionTitle
                      text={extra_content.brands.title}
                      inView={brandInView}
                      className="text-primary"
                    />
                    <div className='w-fit m-auto'>
                      <BrandArrow  />
                    </div>
                </div>
            </div>

            
            <div className="overflow-hidden pb-24 space-y-12">

                <div className="relative w-full overflow-hidden">
                  <div className="marquee-track marquee-left">
                    {firstRow.map((item: any, i: number) => (
                      <div
                        key={`row1-${i}`}
                        className="flex items-center justify-center min-w-[220px]"
                      >
                        <div className="relative w-[180px] h-[80px]">
                          <Image
                            src={item.logo.src}
                            alt={item.logo.alt || "brand"}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-full overflow-hidden">
                  <div className="marquee-track marquee-right">
                    {secondRow.map((item: any, i: number) => (
                      <div
                        key={`row2-${i}`}
                        className="flex items-center justify-center min-w-[220px]"
                      >
                        <div className="relative w-[180px] h-[80px]">
                          <Image
                            src={item.logo.src}
                            alt={item.logo.alt || "brand"}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
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
        <div className="text-center max-w-[1440px] m-auto px-5">

          <div ref={projectsRef}>
            <AnimatedTypingText
              text={extra_content.projects.title}
              inView={projectsSectionInView}
              onComplete={() => setTitleDone(true)}
              className="
                text-center
                lg:text-5xl
                text-[32px]
                lg:leading-[75px]
                leading-[52px]
                font-monument
                font-extrabold
                text-white
              "
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              titleDone
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-white py-6 max-w-[800px] m-auto"
          >
            {extra_content.projects.subtitle}
          </motion.p>
        </div>

        <div className="max-w-[1440px] m-auto px-4 pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={titleDone ? "show" : "hidden"}
          >
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
              {projects.map((project: any) => (
                <SwiperSlide key={project.id}>
                  <motion.div variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              titleDone
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <Base
              text="View Full Work"
              href="./portfolio"
              className="justify-center w-[230px] mx-auto md:mt-16 mt-8"
            />
          </motion.div>
        </div>
      </section>

      <section className="md:py-24 py-14" ref={faqsRef}>
        <AnimatedSectionTitle
          text={extra_content.faqs.title}
          inView={faqsInView}
          className="text-primary max-w-[600px] m-auto lg:leading-[60px] leading-[40px] lg:mb-16 mb-6"
        />

        <div className="max-w-[900px] mx-auto space-y-4 px-4">
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
              className="justify-center md:mt-12 mt-6  "
          />
        </div>
      </section>

      <section className='md:pt-20 pt-10 bg-[#E7E6EB]'>
        <div className='pb-14' ref={blogRef}>
          <AnimatedSectionTitle
            text={extra_content.blogs.title}
            inView={blogInView}
            className="text-primary max-w-[900px] m-auto lg:mb-16 mb-6 lg:leading-[60px] leading-[40px]"
          />
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 max-w-[1440px] m-auto">
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
                className="justify-center md:mt-12 mt-6"
            />
          </div>
        </div>
        <LetsTalk />
      </section>

    </div>
  )
}
