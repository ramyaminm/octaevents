'use client'

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BlogsWidget, { BlogsWidgetProps } from "@/_components/Common/BlogsWidget";
import Base from "@/_components/Common/Buttons/base";

export interface SingleBlogProps {
  data: {
    id: string;
    slug: string;
    title: string;
    front_image: {
      src: string;
      alt: string;
    };
    blog_image: {
      src: string;
      alt: string;
    };
    short_content: string;
    content: string;
    categories: string[];
    tags: string[];
  };
  relatedBlogs: BlogsWidgetProps[];
}

export default function SingleMedia({
  data,
  relatedBlogs,
}: SingleBlogProps) {
  const t = useTranslations();

  return (
    <div>
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
                rotate-[-5deg] bg-[#842BD0] text-white
              "
            >
              Media Center
            </h1>
          </div>
  
          <div
            className="font-monument font-semibold max-w-[750px] mt-[30px] mx-auto leading-[65px] text-5xl text-white"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
      </div>

      <div className="bg-black1 md:py-20 py-10 px-4">
        <div className="max-w-[770px] mx-auto space-y-8">

          <div className="relative md:h-[400px] h-[220px] rounded-3xl overflow-hidden">
            <Image
              src={data.blog_image.src}
              alt={data.blog_image.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* {data.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {data.categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-black05 text-black7"
                >
                  {cat}
                </span>
              ))}
            </div>
          )} */}

          <p className="text-black7 text-lg ">
            {data.short_content}
          </p>

          <div
            className="prose max-w-none prose-headings:font-monument"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>

      {relatedBlogs.length > 0 && (
        <div className="bg-[#E7E6EB] py-12 px-4">
          <div className="max-w-[1392px] mx-auto space-y-10">
            <h2 className="text-center font-monument md:text-[44px] md:leading-[55px] text-[32px] font-extrabold">
              {t("Read Also")}
            </h2>

            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
              {relatedBlogs.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[330px] rounded-3xl overflow-hidden"
                >
                  <BlogsWidget data={item} />
                </div>
              ))}
            </div>

            <div className=" text-center">
              <Base
                  text='Read More'
                  href='/media-center  '
                />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
