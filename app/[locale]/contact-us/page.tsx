import ContactUsPage from '@/_components/Pages/contact-us/ContactUsPage'
import { getServerSideProps } from '@/_components/api/general'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return generatePageMetadata('pages/contact-us', params.locale)
}

export default async function Page({
  params,
}: {
  params: { locale: string }
}) {
  const pageRes = await getServerSideProps(
    'pages/contact-us',
    params.locale
  )

  return (
    <ContactUsPage page={pageRes.props.data?.data} />
  )
}
