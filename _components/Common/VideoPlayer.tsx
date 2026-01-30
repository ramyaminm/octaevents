'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'next/font/google'
import IconPlay from '../SVGs/icon_play'

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current?.play()
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black">
      
      {!isPlaying && poster && (
        <div className="absolute inset-0 z-10">
            <Image
                src={poster}
                alt="video cover"
                fill
                className="object-cover h-full"
            />

            {/* <div className="absolute inset-0 bg-black/40" /> */}

            <div className="absolute top-0 bottom-0 right-0 left-0 m-auto w-[120px] h-[120px] flex items-center justify-center">
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
                    onClick={handlePlay}
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
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        controls={isPlaying}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
