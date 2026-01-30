export const runtime = 'edge';
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { getServerSideProps } from '@/_components/api/general'
import HomePage from '@/_components/Pages/home/HomePage'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/home', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/home',
    params.locale
  )

  return (
    <HomePage page={pageRes?.props?.data?.data} />
  )
}
