'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FooterApiData } from './Footer'
import Message from '@/_components/SVGs/message'
import Phone from '@/_components/SVGs/phone-ring'
import Map from '@/_components/SVGs/map-alt'

export default function DesktopFooter({ data }: { data: FooterApiData }) {
  return (
    <div className="bg-primary text-white px-6 py-20">
        <div className="max-w-[1392px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            <div>
                <Image
                    src={data.logo.src}
                    alt={data.logo.alt}
                    width={180}
                    height={70}
                    priority
                />

                <div className="flex gap-4 pt-12">
                    {data.social.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        target="_blank"
                        className="flex items-center justify-center"
                    >
                        <Image
                        src={item.icon.src}
                        alt={item.icon.alt}
                        width={28}
                        height={28}
                        />
                    </Link>
                    ))}
                </div>
            </div>

            {data.menu.map((menu, index) => {
            const isSupport = menu.title.toLowerCase() === 'support'

             return (
                <div key={index}>
                    <h4 className="font-monument font-extrabold text-lg mb-4">{menu.title}</h4>

                    <ul className="space-y-4 text-white">
                        {menu.items.map((item, i) => (
                            <li key={i}>
                            <Link
                                href={item.link || '#'}
                                className="hover:text-secondary transition"
                            >
                                {item.title}
                            </Link>
                            </li>
                        ))}
                    </ul>

                    {isSupport && (
                        <ul className="mt-6 space-y-4 text-white">
                            <li className="flex items-center gap-3">
                                <Message />
                                {data.contact.email}
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone />
                                {data.contact.phone}
                            </li>

                            <li className="flex items-start gap-3">
                                <Map />
                                {data.contact.address}
                            </li>
                        </ul>
                    )}
                </div>
            )})}
        </div>

        <div className="mt-16 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Octaevents. All Rights Reserved.
        </div>
    </div>
  )
}
