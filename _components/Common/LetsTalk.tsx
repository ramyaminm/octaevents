'use client'

import LetsTalkIcon from "../SVGs/letstalk"

export default function LetsTalk() {
    return (
      <section className="px-4 md:py-16 py-8">
        <div
          className="
            relative
            max-w-[950px]
            mx-auto
            rounded-3xl
            overflow-hidden
          bg-[linear-gradient(31.04deg,#FFB000_4.37%,#FE007F_33.87%,#822DD1_61.59%,#00A7FF_88.52%)]         "
        >
            <div className="bg-cover bg-center bg-no-repeat absolute left-0 right-0 top-0 bottom-0 opacity-20"  style={{
                backgroundImage: `
                    url('/images/bg_letstalk.jpg')
                `,
                }} />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-10 lg:p-16 relative z-[9]">
            
            <div className="text-white space-y-6">
              <h2 className="font-monument text-4xl lg:text-5xl font-extrabold">
                Let’s Talk
              </h2>
  
              <p className="max-w-[480px] text-white/90 leading-relaxed">
                Have a vision waiting to come alive? Let’s transform your ideas
                into immersive experiences that inspire, engage, and leave a
                lasting impact.s
              </p>
  
              <button
                className="
                  mt-4 w-72
                  bg-white
                  text-primary
                  font-semibold
                  px-8
                  py-5
                  rounded-full
                  transition
                  hover:scale-105
                "
              >
                Let’s Talk
              </button>
            </div>
  
            <div className="relative flex justify-center lg:justify-end">
              <LetsTalkIcon />
            </div>
          </div>
        </div>
      </section>
    )
  }
  