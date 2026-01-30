import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import CategoryLabel, { CategoryLabelProps } from './CategoryLabel'

export interface BlogsWidgetProps {
    slug: string,
    title: string,
    front_image: {
        src: string,
        alt: string
    },
    short_content: string,
    created_at: string
}
export default function BlogsWidget({ data }: { data: BlogsWidgetProps }) {
    const locale = useLocale();
    return (
        <Link href={`${locale === "en" ? "/" : "/en/"}media-center/${data.slug}`} className='rounded-[20px] block bg-white'>
            <div className='relative w-full h-[300px]'>
                <Image
                    src={data.front_image.src}
                    alt={data.front_image.alt ?? "Image"}
                    fill
                    className='object-cover rounded-[20px] p-3'
                />
            </div>
            <div className='px-4 pt-2 pb-5 space-y-2 h-[calc(100%-300px)]'>
                <div className='border-b-[1px] border-[#D0CDD8] pb-4'>
                    <h3 className='text-xl font-extrabold'>{data.title}</h3>
                    <p className='text-primary text-base font-normal pt-2'>{data.short_content}</p>
                </div>
                <div className="flex items-center gap-4 text-[#716A89] text-sm leading-none">
                    <span>January 27, 2025</span>
                    <span className="opacity-50">|</span>
                    <span>4 min read</span>
                </div>
            </div>
        </Link>
    )
}