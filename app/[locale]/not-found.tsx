import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 flex-wrap">
       
        <Image
          src="/images/404.jpg"
          alt="404 Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,0,68,0.6)_0%,#1A0044_100%)]" />

        <div className="relative z-10 text-center">
          <div className="relative w-fit mx-auto">
              <span
                className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-full rotate-[-5deg] z-0 bg-secondary"
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
                  bg-pink
                  text-white
                "
              >
                Ooops
              </h1>
          </div>

          <span className="text-white font-monument font-extrabold text-[150px] md:text-[120px]">404</span>

          <h1 className="md:text-[50px] text-[32px] font-monument font-bold text-white">Page Not Found</h1>

          <Link
            href="/"
            className="
              text-[#1A0044]
              rounded-full
              bg-secondary
              py-[10.5px]
              px-6
              flex
              md:w-fit
              w-full
              mx-auto
              mt-4
              justify-center
              gap-2.5
              text-base
              font-medium
              hover:text-white
              transition-all
              duration-500
            "
          >
            Back to Homepage
          </Link>

        </div>
    </div>
  );
}
