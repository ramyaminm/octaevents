export const runtime = 'edge';
import SingleCareersPage from '@/_components/Pages/careers/SingleCareersPage'
import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  return generatePageMetadata(
    `careers/${params.slug}`,
    params.locale
  )
}

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const res = await getServerSideProps(
    `careers/${params.slug}`,
    params.locale
  )

  const career = res.props.data?.data

  return (
    <SingleCareersPage career={career} />
  )
}
