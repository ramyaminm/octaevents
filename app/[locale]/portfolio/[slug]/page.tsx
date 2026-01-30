export const runtime = 'edge';
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getServerSideProps } from '@/_components/api/general'
import ProjectSinglePage from '@/_components/Pages/portfolio/PortfolioSingle'

type Props = {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale, slug } = params

  const res = await getServerSideProps(`projects/${slug}`, locale)
  const project = res?.props?.data?.data

  if (!project) {
    return {
      title: 'Project not found',
      description: 'Project not found',
    }
  }

  return {
    title: project.name,
    description: project.tagline ?? '',
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: project.gallery?.[0]?.src
        ? [{ url: project.gallery[0].src }]
        : [],
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params

  const res = await getServerSideProps(`projects/${slug}`, locale)
  const project = res?.props?.data?.data

  if (!project) return notFound()

  return <ProjectSinglePage project={project} />
}
