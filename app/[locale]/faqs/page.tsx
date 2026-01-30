import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import FAQPage from '@/_components/Pages/faq/FaqPage'
import LetsTalk from '@/_components/Common/LetsTalk'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/faqs', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/faqs',
    params.locale
  )

  return (
    <> 
    <FAQPage page={pageRes.props.data?.data} />
    <LetsTalk />
    </>
  )
}
