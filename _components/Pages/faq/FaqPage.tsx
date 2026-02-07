'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { getServerSideProps } from '../../api/general'
import TitleBackground from '@/_components/Common/TitleBackground'
import FAQItem from '@/_components/Common/FAQItem'


interface Category {
  id: number
  name: string
}

interface FAQ {
  id: number
  question: string
  answer: string
  categories: Category[]
}

interface PageData {
  title?: string
  content?: string
  extra_content?: any
}

interface FAQPageProps {
  page?: PageData
}

export default function FAQPage({ page }: FAQPageProps) {
  const t = useTranslations()
  const locale = useLocale()

  const [categories, setCategories] = useState<Category[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all')
  const [openId, setOpenId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const categoriesRes = await getServerSideProps(
          'faq-categories',
          locale
        )

        const faqsRes = await getServerSideProps(
          'faqs',
          locale
        )

        if (categoriesRes.props.data?.success) {
          setCategories(categoriesRes.props.data.data)
        }

        if (faqsRes.props.data?.success) {
          setFaqs(faqsRes.props.data.data)
        }
      } catch (error) {
        console.error('FAQ error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter(faq =>
          faq.categories.some(cat => cat.id === activeCategory)
        )

  return (
    <div>
      <TitleBackground data={page} />

      <div className="px-4 md:py-14 py-8">
        <div className="max-w-[1200px] mx-auto md:space-y-14 space-y-4">

          <div className="
              flex
              gap-2
              overflow-x-auto
              whitespace-nowrap
              pb-2
              lg:flex-wrap
              lg:justify-center
              lg:overflow-visible">
            <button
              onClick={() => setActiveCategory('all')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  activeCategory === 'all'
                    ? 'bg-secondary text-primary'
                    : 'border border-primary text-primary hover:bg-secondary hover:border-secondary'
                }
              `}
            >
              {t('All FAQS') ?? 'All FAQs'}
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeCategory === cat.id
                      ? 'bg-secondary text-primary'
                      : 'border border-primary text-primary hover:bg-secondary hover:border-secondary'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-gray-500">
              {t('loading')}...
            </p>
          ) : filteredFaqs.length > 0 ? (
            <div className="max-w-[900px] mx-auto md:space-y-4 space-y-2">
              {filteredFaqs.map(faq => {
                const isOpen = openId === faq.id

                return (
                <FAQItem
                    key={faq.id}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={isOpen}
                    onToggle={() =>
                      setOpenId(isOpen ? null : faq.id)
                    }
                  />
                )
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              {t('no_results') ?? 'No FAQs found'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
