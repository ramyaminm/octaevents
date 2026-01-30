import MediaPage from '@/_components/Pages/media-center/MediaPage'
import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/media-center', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/media-center',
    params.locale
  )

  const galleryRes = await getServerSideProps(
    'gallery',
    params.locale
  )

  return (
    <MediaPage
      page={pageRes.props.data?.data}
      gallery={galleryRes.props.data?.data ?? []}
    />
  )
}
