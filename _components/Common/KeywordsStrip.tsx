'use client'

import { useEffect, useState } from 'react'

export default function KeywordSwitcher({
  words,
}: {
  words: string[]
}) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)

      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length)
        setVisible(true)
      }, 200) 
    }, 1000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="h-[90px] flex items-center justify-center overflow-hidden">
      <span
        className={`
          bg-secondary
          text-white
          font-monument
          font-extrabold
          px-10
          py-2
          rounded-full
          lg:text-[42px]
          whitespace-nowrap
          transition-all
          duration-150
          ${visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3'}
        `}
      >
        {words[index]}
      </span>
    </div>
  )
}
