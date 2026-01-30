'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import Base from '../Buttons/base'

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

export default function MobileHeader({ data }: HeaderProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
    useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 72)
      }
  
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }, [])

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 inset-x-0 z-[999] shadow lg:hidden ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div className="h-[72px] px-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href={locale === 'en' ? '/' : '/ar'}
            className="relative w-[120px] h-[44px]"
          >
            <Image
              src={scrolled ? data.logo_dark.src : data.logo.src}
              alt={scrolled ? data.logo_dark.alt : data.logo.alt}
              fill
            />
          </Link>

          {/* Burger */}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5"
          >
            <span className={`w-6 h-[2px]  ${scrolled ? 'bg-primary' : 'bg-white'}`} />
            <span className={`w-6 h-[2px]  ${scrolled ? 'bg-primary' : 'bg-white'}`} />
            <span className={`w-6 h-[2px]  ${scrolled ? 'bg-primary' : 'bg-white'}`} />
          </button>
        </div>
      </div>

      {/* Overlay Menu */}
      {open && (
        <div className="fixed inset-0 z-[1000] bg-primary text-white lg:hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 h-[72px]">
            <Link
              href={locale === 'en' ? '/' : '/ar'}
              onClick={() => setOpen(false)}
              className="relative w-[120px] h-[44px]"
            >
              <Image
                src={data.logo.src}
                alt={data.logo.alt}
                fill
              />
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-6 px-6 pt-10">
            {data.menu.map((item, i) => {
              const active =
                pathname === item.link ||
                pathname === `/${locale}${item.link}`

              return (
                <Link
                  key={i}
                  href={`${locale === 'en' ? '' : '/ar'}${item.link}`}
                  onClick={() => setOpen(false)}
                  className={`
                    text-2xl font-semibold
                    ${active ? 'text-secondary' : 'text-white'}
                  `}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="absolute bottom-10 inset-x-6">
            <Base
              text={data.cta_button.text}
              href={data.cta_button.link}
              className="w-full justify-center"
            />
          </div>
        </div>
      )}
    </>
  )
}
