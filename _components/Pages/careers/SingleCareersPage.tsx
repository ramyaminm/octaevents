'use client'
import Calender from '@/_components/SVGs/calender-alt'
import Map from '@/_components/SVGs/map-alt'
import Link from 'next/link'

interface Career {
  title: string
  description: string
  job_type: string
  location: string
}

interface Props {
  career: Career
}

export default function SingleCareersPage({ career }: Props) {
  return (
    <>
    <div className="text-center bg-primary pt-[160px] pb-20 px-4">
          <div className="relative inline-block">
            <span
              className="bg-[#FDBA3B] absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0"
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
                rotate-[-5deg] bg-pink text-white
              "
            >
              Careers
            </h1>
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-extrabold mt-6">
            {career.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-base text-white">
            <div className='flex items-center gap-2'>
                <Calender />
                <p>{career.location}</p>
            </div>
            <span className='bg-[#00A7FF] w-2 h-2 rounded-full'/>
            <div className='flex items-center gap-2'>
                  <Map />
                  <p>{career.job_type}</p>
            </div>
          </div>
          <Link href={''}  
          className="
              bg-secondary 
              text-base
              text-primary
              font-semibold
              px-8
              py-2
              rounded-full
              hover:bg-[#e6a200]
              transition
              block w-fit mx-auto mt-6
            ">
            Apply Now
          </Link>
      </div>

      <section
        id="job-content"
        className="bg-white py-24 px-4"
      >
        <div className="max-w-[900px] mx-auto">

          <div className="mt-16 text-center">
            <Link
              href="/careers"
              className="text-[#FF007E] font-semibold hover:underline"
            >
              ← Back to Careers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
