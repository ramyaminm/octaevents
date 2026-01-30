import TermsPage from '@/_components/Pages/terms/TermsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Octa Events',
}

export default function Page() {
  return <TermsPage />
}
