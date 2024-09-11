import { Metadata, ResolvingMetadata } from 'next';
import BlogClient from './blogClient'; // Adjust the path if needed

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutBlog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  const blog = await response.json();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: blog.musicblog.blogTitle,
    description: blog.musicblog.description[0],
    openGraph: {
      title: blog.musicblog.blogTitle,
      description: blog.musicblog.description[0],
      images: [blog.musicblog.cover, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.musicblog.blogTitle,
      description: blog.musicblog.description[0],
      images: [blog.musicblog.cover],
    },
  };
}

export default function Page({ params }: Props) {
  return (
    <div>
      <BlogClient /> {/* This will render the client-side component */}
    </div>
  );
}
