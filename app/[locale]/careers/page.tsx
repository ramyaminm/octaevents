import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import CareersPage from '@/_components/Pages/careers/CareersPage'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/careers', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/careers',
    params.locale
  )

  return (
    <CareersPage
      page={pageRes.props.data?.data}
    />
  )
}
