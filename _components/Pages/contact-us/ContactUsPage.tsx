'use client'

import ContactForm from '@/_components/Common/ContactUsForm'
import Image from 'next/image'

interface ContactPageProps {
  page?: any
}

export default function ContactUsPage({ page }: ContactPageProps) {
  if (!page) return null

  const extra = page.extra_content

  return (
    <div className="bg-primary py-20 px-4">
      <div className="max-w-[1440px] mx-auto space-y-20 pt-[80px]">

        <div className="bg-white rounded-[32px] p-10 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="relative inline-block">
                <span
                  className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0"
                  style={{ background: extra.form.tagline.back_color }}
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
                    text-primary
                  "
                  style={{
                    backgroundColor: extra.form.tagline.front_color,
                  }}
                >
                   {extra.form.tagline.text}
                </h1>
              </div>
          

            <h1 className=" text-[44px] font-monument font-extrabold text-primary py-4">
              {extra.form.title}
            </h1>

            <p className="text-[#413862] max-w-[500px]">
              {extra.form.subtitle}
            </p>

            <ContactForm />
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/contact-us.jpg"
              alt="Contact"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className=" relative bg-[linear-gradient(180deg,#300B50_0%,#842BD0_100%)] rounded-[32px] p-14 text-white">
            <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                backgroundImage: `
                    url('/images/bg_letstalk.jpg')
                `,
            }} />
          <h2 className="text-center font-monument text-[44px] font-extrabold mb-14 z-[9] relative">
            {extra.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center z-[9] relative">

            <div className="space-y-4">
              <Image
                src={extra.email.icon.src}
                alt={extra.email.icon.alt}
                width={130}
                height={130}
                className="mx-auto"
              />
              <h4 className="font-extrabold font-monument text-2xl">{extra.email.title}</h4>
              <p>{extra.email.value}</p>
            </div>

            <div className="space-y-4">
              <Image
                src={extra.phone.icon.src}
                alt={extra.phone.icon.alt}
                width={130}
                height={130}
                className="mx-auto"
              />
              <h4 className="font-extrabold font-monument text-2xl">{extra.phone.title}</h4>
              <p>{extra.phone.value}</p>
            </div>

            <div className="space-y-4">
              <Image
                src={extra.location.icon.src}
                alt={extra.location.icon.alt}
                width={130}
                height={130}
                className="mx-auto"
              />
              <h4 className="font-extrabold font-monument text-2xl">{extra.location.title}</h4>
              <p>{extra.location.address}</p>

              <a
                href={extra.location.map_link}
                target="_blank"
                className="text-secondary text-sm"
              >
                Get Direction
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
