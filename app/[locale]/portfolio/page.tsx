import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import PortfolioPage from '@/_components/Pages/portfolio/PortfolioPage'


export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/portfolio', params.locale)
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
    <PortfolioPage
      page={pageRes.props.data?.data}
    />
  )
}
