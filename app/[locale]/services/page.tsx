import ServicesPage from '@/_components/Pages/services/ServicesPage'
import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/our-services', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/our-services',
    params.locale
  )

  return (
    <ServicesPage page={pageRes.props.data.data} />
  )
}
