'use client'

import { motion } from "framer-motion"

interface ExtraContent {
  tagline?: string
  tagline_front_color?: string
  tagline_back_color?: string
  title?: string
  subtitle?: string | null
}

interface SectionTitleProps {
  data?: {
    title?: string
    content?: string
    extra_content?: ExtraContent
  }
  textColor?: string
}

export default function SectionTitle({
  data,
  textColor = '#FFFFFF',
}: SectionTitleProps) {
  if (!data) return null

  const extra = data.extra_content

  const tagline = extra?.tagline ?? data.title
  const title = extra?.title ?? data.title
  const subtitle = extra?.subtitle ?? data.content

  const frontColor = extra?.tagline_front_color ?? '#842BD0'
  const backColor = extra?.tagline_back_color ?? '#FDBA3B'

  if (!tagline && !title) return null

  return (
    <div className="text-center bg-primary md:pt-40 md:pb-28 pb-14 pt-28  px-4">
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

      {(title) && (
        <div className="max-w-[750px] mt-[30px] mx-auto text-white">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4,delay: 0.4, ease: "easeOut" }}
              className="font-monument font-semibold md:text-5xl text-[32px] md:leading-[65px] leading-[42px]"
            >
              {title}
            </motion.h2>
          )}
        </div>
      )}
    </div>
  )
}
