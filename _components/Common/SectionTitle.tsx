'use client'

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
    <div className="text-center bg-primary pb-14 pt-28  ">
      {tagline && (
        <div className="relative inline-block">
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
        </div>
      )}

      {(title) && (
        <div className="max-w-[750px] mt-[30px] mx-auto text-white">
          {title && (
            <h2 className="font-monument font-semibold text-5xl leading-[65px]">
              {title}
            </h2>
          )}
        </div>
      )}
    </div>
  )
}
