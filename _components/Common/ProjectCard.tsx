'use client'

import Image from 'next/image'
import Link from 'next/link'
import WhiteBorderArrow from '@/_components/SVGs/White-border-arrow'

interface ProjectCardProps {
  project: {
    id: number
    name: string
    slug: string
    front_image: {
      src: string
      alt: string
    }
    brand?: {
      name: string | null
      logo?: string
    }
    service?: {
      name: string
      color?: string
    }[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const service = project.service?.[0]

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="
        group relative overflow-hidden
       cursor-pointer
      "
    >
      <Image
        src={project.front_image.src}
        alt={project.front_image.alt || project.name}
        width={400}
        height={300}
        className="
          w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      <div className="absolute inset-0 bg-black/50 group-hover:scale-105  transition-transform duration-500" />

      {project.brand?.logo && (
        <div className="absolute top-3 left-3 z-10">
          <Image
            src={project.brand.logo}
            alt={project.brand.name || 'brand'}
            width={90}
            height={40}
          />
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 z-10">
        {service?.name && (
          <span
            className="inline-block mb-2 text-xs font-medium px-2 py-1 rounded bg-white/80 text-primary"
          >
            {service.name}
          </span>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white">
            {project.brand?.name && (
              <p className="font-monument text-sm font-semibold">
                {project.brand.name}
              </p>
            )}
            <span className="w-1 h-1 bg-white rounded-full" />
            <h4 className="font-monument text-sm font-semibold">
              {project.name}
            </h4>
          </div>

          <WhiteBorderArrow />
        </div>
      </div>
    </Link>
  )
}
