'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Base from '../Buttons/base'
import { useLocale } from 'next-intl'


interface MenuItem {
  title: string
  link: string
}

interface HeaderProps {
  data: {
    logo: {
      src: string
      alt: string
    }
    logo_dark: {
      src: string
      alt: string
    }
    cta_button: {
      text: string
      link: string
    }
    menu: MenuItem[]
  }
}

export default function DesktopHeader({ data }: HeaderProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 90)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`
      fixed top-0 inset-x-0 z-[999] px-6
      transition-all duration-300
      ${scrolled ? 'bg-white shadow-lg backdrop-blur' : 'bg-transparent'}
    `}>
     {/* <div className="z-50 bg-primary px-6"> */}
      <div className="max-w-[1392px] mx-auto flex items-center justify-between h-[90px]">

        <Link href={locale === 'en' ? '/' : '/ar'} className="relative w-[140px] h-[52px]">
          <Image src={scrolled ? data.logo_dark.src : data.logo.src} alt={scrolled ? data.logo_dark.alt : data.logo.alt} fill />
          
        </Link>

        <nav className="hidden lg:flex gap-10">
          {data.menu.map((item, i) => {
            const active =
              pathname === item.link ||
              pathname === `/${locale}${item.link}`

            return (
              <Link
                key={i}
                href={`${locale === 'en' ? '' : '/ar'}${item.link}`}
                className={` text-lg font-semibold transition hover:text-secondary ${active ? 'text-secondary' : ''} ${scrolled ? 'text-primary' : 'text-white'}`}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        <Base
            text={data.cta_button.text}
            href={data.cta_button.link}
        />
      </div>
    </div>
  )
}
