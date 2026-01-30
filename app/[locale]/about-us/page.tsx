// app/[locale]/about-us/page.tsx
export const runtime = 'edge';
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { getServerSideProps } from '@/_components/api/general'
import AboutUsPage from '@/_components/Pages/about-us/AboutUsPage'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/about-us', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/about-us',
    params.locale
  )

  return (
    <AboutUsPage page={pageRes?.props?.data?.data} />
  )
}
