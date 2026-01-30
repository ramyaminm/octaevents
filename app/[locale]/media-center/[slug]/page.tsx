import { Metadata } from "next";
import { getServerSideProps } from "@/_components/api/general";
import SingleMedia from "@/_components/Pages/media-center/SingleMediaPage";

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const res = await getServerSideProps(
    `blogs/${params.slug}`,
    params.locale
  );

  const blog = res.props.data?.data;

  if (!blog) {
    return {
      title: "Blog not found",
      description: "Blog not found",
    };
  }

  return {
    title: blog.title,
    description: blog.short_content,
    openGraph: {
      title: blog.title,
      description: blog.short_content,
      images: [
        {
          url: blog.front_image?.src,
          alt: blog.front_image?.alt,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const blogRes = await getServerSideProps(
    `blogs/${slug}`,
    locale
  );

  const blog = blogRes.props.data.data;

  const relatedRes = await getServerSideProps(
    `blogs?limit=4&filter[excluded_id]=${blog.id}`,
    locale
  );

  return (
    <SingleMedia
    data={{
        ...blog,
        categories: parseInt(blog.categories),
        tags: parseInt(blog.tags),
      }}
      relatedBlogs={relatedRes.props.data.data}
    />
  );
}
