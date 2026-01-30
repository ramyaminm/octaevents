import { getServerSideProps } from '@/_components/api/general'
import DesktopFooter from './DesktopFooter'

/* ================= TYPES ================= */

export interface FooterApiData {
  logo: {
    src: string
    alt: string
  }
  menu: {
    title: string
    items: {
      title: string
      link: string | null
    }[]
  }[]
  social: {
    icon: {
      src: string
      alt: string
    }
    link: string
  }[]
  contact: {
    email: string
    phone: string
    address: string
  }
}

/* ================= COMPONENT ================= */

export default async function Footer({ locale }: { locale: string }) {
  const res = await getServerSideProps('components/footer', locale)

  const footerData: FooterApiData | null =
    res?.props?.data?.data?.extra_content ?? null

  if (!footerData) return null

  return (
    <footer>
      <DesktopFooter data={footerData} />
    </footer>
  )
}
