'use client'

import { motion } from "framer-motion"

interface ExtraContent {
  tagline?: string
  tagline_front_color?: string
  tagline_back_color?: string
  title?: string
  subtitle?: string | null
  video?: string

}

interface SectionTitleProps {
  data?: {
    title?: string
    content?: string
    extra_content?: ExtraContent
  }
  textColor?: string
  videoSrc?: string
}


export default function TitleBackground({
  data,
  textColor = '#FFFFFF',
  videoSrc,
}: SectionTitleProps) {
  if (!data) return null

  const extra = data.extra_content

  const tagline = extra?.tagline ?? data.title
  const title = extra?.title ?? data.title
  const subtitle = extra?.subtitle ?? data.content

  const frontColor = extra?.tagline_front_color ?? '#842BD0'
  const backColor = extra?.tagline_back_color ?? '#FDBA3B'

  const bgVideo = extra?.video ?? videoSrc

  return (
    <section className="relative overflow-hidden bg-primary lg:py-28 py-14">
      
      {bgVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,0,68,0.6)_0%,#1A0044_100%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-14">
        <div className="text-center">

          {tagline && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative inline-block"
              >
                <span
                  className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0"
                  style={{ backgroundColor: backColor }}
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
                  "
                  style={{
                    backgroundColor: frontColor,
                    color: textColor,
                  }}
                >
                  {tagline}
                </h1>
              </motion.div>
          )}

          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4,delay: 0.4, ease: "easeOut" }}
              className="mt-8 font-monument font-extrabold text-white text-[32px] md:text-[58px]"
            >
               {title}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 } }
              transition={{ duration: 0.4,delay: 0.8, ease: "easeOut" }}
              className="mt-6  max-w-[900px] mx-auto text-white text-lg font-light"
            >
            {subtitle}
            </motion.p>
          )}

        </div>
      </div>
    </section>
  )
}

