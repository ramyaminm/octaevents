'use client'
import Image from 'next/image'
import Base from '@/_components/Common/Buttons/base'
import LetsTalk from '@/_components/Common/LetsTalk'
import { useEffect, useState } from 'react'
import FAQItem from '@/_components/Common/FAQItem'
import { getServerSideProps } from '@/_components/api/general'
import MissionVision from '@/_components/Common/AboutScroll'
import MissionVisionPinned from '@/_components/Common/AboutScroll'

interface AboutPageData {
  title: string
  extra_content: {
    hero: {
      video: string
      tagline: string
      tagline_front_color: string
      tagline_back_color: string
      title: string
      subtitle: string
      button: {
        text: string
        link: string
      }
    }
    octa_word: {
      first_title: string
      second_title: string
      content: string
    }
    video: string
    values: {
      title: string
      items: {
        title: string
        description: string
        card_color: string
        text_color: string
      }[]
    }
    mission_vision: {
      items: {
        title: string
        content: string
        image: { src: string; alt: string }
        icon: { src: string; alt: string }
      }[]
    }
    paragraph_section: {
      title: string
      content: string
    }
    faqs: {
      title: string
    }
  }
}

export default function AboutUsPage({ page }: { page?: AboutPageData }) {
  if (!page) return null

    const { extra_content } = page
    const [faqs, setFaqs] = useState<any[]>([])
    const faqList = faqs.slice(0, 5)
    const [openId, setOpenId] = useState<number | null>(null)

    const [scrolled300, setScrolled300] = useState(false)

    const [hovered, setHovered] = useState<number | null>(null)
    const [isMobile, setIsMobile] = useState(false)


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
      }
    
      if (hovered === 0) {
        if (index === 0) return "translateX(60px) rotate(0deg)"
        if (index === 1) return "translateX(180px) rotate(-6deg)"
        if (index === 2) return "translateX(100px) rotate(6deg)"
      }
    
      if (hovered === 1) {
        if (index === 0) return "translateX(-60px) rotate(6deg)"
        if (index === 1) return "rotate(0deg)"
        if (index === 2) return "translateX(60px) rotate(6deg)"
      }
    
      if (hovered === 2) {
        if (index === 0) return "translateX(-100px) rotate(6deg)"
        if (index === 1) return "translateX(-150px) rotate(-6deg)"
        if (index === 2) return "translateX(-60px) rotate(0deg)"
      }
    
      return "translateX(0px) rotate(0deg)"
    }
    


    useEffect(() => {
        const fetchFaqs = async () => {
          const res = await getServerSideProps('faqs', 'en')
          if (res?.props?.data?.success) {
            const allFaqs = res.props.data.data
      
            const randomFive = [...allFaqs]
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
      
            setFaqs(randomFive)
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

  return (
    <div className="">

        <section className="relative overflow-hidden bg-primary  lg:h-screen h-[80vh] lg:py-0 py-32">
        
            {extra_content.hero.video && (
                <video
                className="absolute inset-0 w-full h-full"
                src={extra_content.hero.video}
                autoPlay
                muted
                loop
                playsInline
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(270deg,#11053A_16.45%,rgba(17,5,58,0)_50.21%,#11053A_83.96%)]
                        before:absolute before:inset-0
                        before:bg-[linear-gradient(0deg,rgba(17,5,58,0.4),rgba(17,5,58,0.4))]" />

            <div className="relative z-10 max-w-[750px] my-auto px-4 py-14 h-full">
                <div className="flex justify-center h-full flex-col">
                    {extra_content.hero.tagline && (
                        <div className="relative w-fit">
                                <span
                                className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0"
                                style={{ backgroundColor: extra_content.hero.tagline_back_color }}
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
                                text-black
                                border-[#1A0044]
                                whitespace-nowrap
                                rotate-[-5deg]
                                "
                                style={{
                                backgroundColor: extra_content.hero.tagline_front_color,
                                }}
                            >
                                {extra_content.hero.tagline}
                            </h1>
                        </div>
                    )}

                    {extra_content.hero.title && (
                        <h2 className="mt-8 font-monument font-extrabold text-white text-[32px] md:text-[50px]">
                            {extra_content.hero.title}
                        </h2>
                    )}

                    {extra_content.hero.subtitle && (
                        <p className="mt-6  max-w-[900px] mx-auto text-white text-lg font-light">
                            {extra_content.hero.subtitle}
                        </p>
                    )}

                    {extra_content.hero.button.link && (
                        <div className='w-[300px] pt-6'>
                            <Base
                                text={extra_content.hero.button.text}
                                href={extra_content.hero.button.link}
                                className="w-full justify-center"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>

        <section className=" text-primary lg:py-[120px] py-[60px]">
            <div className="max-w-[1440px] mx-auto px-4 text-center">
            <h4 className=" lg:text-[44px] text-[32px] font-monument font-extrabold">
                {extra_content.octa_word.first_title}
            </h4>
            <h2 className=" lg:text-[44px] text-[32px] font-monument font-extrabold lg:my-6 mb-4">
                {extra_content.octa_word.second_title}
            </h2>

            <div
                className=" lg:text-2xl font-medium max-w-[650px] m-auto lg:leading-10"
                dangerouslySetInnerHTML={{
                __html: extra_content.octa_word.content,
                }}
            />
            </div>
        </section>

        {extra_content.hero.video && (
            <section className='bg-primary p-6'>
                <div className='max-w-[500px] m-auto'>
                    <video
                            src={extra_content.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            width={480}
                            height={480}
                    />
                </div>
            </section>
        )}
     

        <section className="bg-primary lg:py-24 py-14">
            <div className="max-w-[1440px] mx-auto px-4">
                <h2 className="lg:text-5xl text-[32px] font-monument font-extrabold text-white text-center mb-12">
                    {extra_content.values.title}
                </h2>
                <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-3 max-w-[1000px] m-auto">
                   {extra_content.values.items.map((item, i) => {
                      return (
                        <div className=' relative md:w-1/3 w-full'>
                          <div
                          key={i}
                          onMouseEnter={() => {
                            if (window.innerWidth >= 1024) setHovered(i)
                          }}
                          onMouseLeave={() => {
                            if (window.innerWidth >= 1024) setHovered(null)
                          }}
                          className="
                            p-8 rounded-2xl cursor-pointer
                            transition-transform duration-500
                            ease-[cubic-bezier(.22,1,.36,1)]
                             w-full h-full
                          "
                          style={{
                            backgroundColor: item.card_color,
                            color: item.text_color,
                            transform: getTransform(i),
                          }}
                          >
                            <h3 className="font-monument font-extrabold text-2xl mb-3">
                              {item.title}
                            </h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
            </div>
        </section>


      <section>
      <MissionVisionPinned items={extra_content.mission_vision.items}/>
        {/* <div className="max-w-[1440px] mx-auto">
          {extra_content.mission_vision.items.map((item, i) => (
            <div
              key={i}
              className="flex lg:flex-row flex-col-reverse lg:h-[100vh]"
            >
                <div className='lg:w-1/2 bg-[linear-gradient(31.04deg,#FFB000_4.37%,#FE007F_33.87%,#822DD1_61.59%,#00A7FF_88.52%)]'>
                    <div className='flex flex-col h-full justify-center lg:px-8 p-12'>
                       <div className='flex items-center gap-6'>
                        <Image
                            src={item.icon.src}
                            alt={item.icon.alt}
                            width={64}
                            height={64}
                            />
                            <h3 className="lg:text-5xl text-[32px] text-white font-monument font-extrabold">
                            {item.title}
                            </h3>
                       </div>
                        <p className=" lg:text-3xl text-xl text-white font-normal pt-8">{item.content}</p>
                    </div>
                </div>
                <div className="relative lg:w-1/2 overflow-hidden">
                    <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={750}
                        height={800}
                        className="object-cover"
                    />
                </div>
            </div>
          ))}
        </div> */}
      </section>

      <section className="md:py-24 py-14">
            <h2 className="lg:text-5xl text-[32px] lg:leading-[60px] leading-[42px] font-monument font-extrabold text-primary text-center lg:mb-16 mb-6 max-w-[600px] m-auto">
                {extra_content.faqs.title}
            </h2>
            <div className="max-w-[900px] mx-auto space-y-4 px-4">
                {faqList.map(faq => {
                    const isOpen = openId === faq.id

                    return (
                    <FAQItem
                        key={faq.id}
                        id={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={isOpen}
                        onToggle={() =>
                        setOpenId(isOpen ? null : faq.id)
                        }
                    />
                    )
                })}
            </div>
            <div className='flex justify-center'>
                <Base
                    text={"View All"}
                    href={"./faqs"}
                    className="justify-center mt-12 "
                />
            </div>

      </section>

        <section>
                <div className='relative bg-primary  overflow-hidden'>
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
            
            
            
                        <div className='max-w-[1000px] mx-auto px-4'>
                            <div className="py-20 relative text-center">

                                <h2 className={`lg:text-[44px] text-[32px] lg:leading-[64px] leading-[40px] font-monument font-extrabold  ${scrolled300 ? 'text-primary' : 'text-white'}`}>
                                {extra_content.paragraph_section.title}
                                </h2>
                                <p className={`mt-6 lg:text-3xl text-xl leading-10 ${scrolled300 ? 'text-primary' : 'text-[#B8B4C4]'}`}>
                                    {extra_content.paragraph_section.content}
                                </p>
                            </div>
                        </div>
                </div>  
        </section>

      <LetsTalk />

    </div>
  )
}
