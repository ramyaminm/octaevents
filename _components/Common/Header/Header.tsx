import { getServerSideProps } from '@/_components/api/general'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

interface HeaderApiData {
  logo: {
    src: string
    alt: string
  }
  logo_dark: {
    src: string
    alt: string
  }
  cta_button: {
    text: string
    link: string
  }
  menu: {
    title: string
    link: string
  }[]
}

export default async function Header({ locale }: { locale: string }) {
  const res = await getServerSideProps('components/header', locale)

  const headerData: HeaderApiData | null =
    res?.props?.data?.data?.extra_content ?? null

  if (!headerData) return null

  return (
    <header>
      {/* <DesktopHeader data={headerData} />
      <MobileHeader data={headerData}/> */}
      <div className="hidden lg:block">
        <DesktopHeader data={headerData} />
      </div>

      <div className="block lg:hidden">
        <MobileHeader data={headerData} />
      </div>
    </header>
  )
}
