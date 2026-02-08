'use client'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogsWidget, { BlogsWidgetProps } from '../../Common/BlogsWidget'
import { getServerSideProps } from '../../api/general'
import SectionTitle from '../../Common/SectionTitle'

interface PageData {
  title?: string
  content?: string
  extra_content?: {
    tagline?: string
    tagline_front_color?: string
    tagline_back_color?: string
    title?: string
    subtitle?: string | null
  }
}


interface MediaProps {
  page?: PageData
  gallery: { id: number; thumb_url: string; alt: string }[]
}

interface BlogApiResponse {
  id: string
  slug: string
  title: string
  front_image: {
    src: string
    alt: string
  }
  short_content: string
}

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

type ViewMode = 'blog' | 'gallery'

export default function MediaPage({ page, gallery }: MediaProps) {
  const t = useTranslations()
  const locale = useLocale()

  const [view, setView] = useState<ViewMode>('blog')
  const [blogs, setBlogs] = useState<BlogApiResponse[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)

  const limit = 8

  useEffect(() => {
    if (view !== 'blog') return

    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const res = await getServerSideProps(
          `blogs?limit=${limit}&page=${pageNum}`,
          locale
        )

        if (res.props.data?.success) {
          setBlogs(res.props.data.data)
          setPagination(res.props.data.pagination)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [view, pageNum, locale])

  const currentPage = pagination?.current_page ?? 1
  const totalPages = pagination?.last_page ?? 1

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNum(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }


  return (
    <div>
      <SectionTitle data={page} />

      <div className="bg-[#E7E6EB] px-4 py-10">
        <div className="max-w-[1440px] mx-auto space-y-12">

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setView('blog')}
              className={`md:text-lg w-48 md:p-3 p-2 rounded-full font-semibold transition
                ${
                  view === 'blog'
                    ? 'bg-secondary'
                    : 'border border-primary text-primary hover:bg-secondary hover:border-secondary'
                }
              `}
            >
              Blog
            </button>

            <button
              onClick={() => setView('gallery')}
              className={`md:text-lg w-48 md:p-3 p-2 rounded-full font-semibold transition
                ${
                  view === 'gallery'
                     ? 'bg-secondary'
                    : 'border border-primary text-primary hover:bg-secondary hover:border-secondary'
                }
              `}
            >
              Gallery
            </button>
          </div>

          {view === 'gallery' ? (
           <div className="p-6 rounded-3xl">
           <div className="columns-2 md:columns-3 gap-6">
             {gallery.map(img => (
               <div
                 key={img.id}
                 className="
                   mb-6
                   break-inside-avoid
                   rounded-3xl
                   overflow-hidden
                 "
               >
                 <Image
                   src={img.thumb_url}
                   alt={img.alt}
                   width={600}
                   height={800}
                   className="w-full h-auto object-cover"
                 />
               </div>
             ))}
           </div>
         </div>
         
          ) : loading ? (
            <p className="text-center text-gray-500">
              {t('loading')}...
            </p>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 mt-20">
                {blogs.map(blog => (
                  <BlogsWidget
                    key={blog.id}
                    data={blog as unknown as BlogsWidgetProps}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-10">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 border rounded disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <span>
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-600">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}