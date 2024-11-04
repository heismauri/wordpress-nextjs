import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { decode } from 'he';

import { getPosts } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import MainContainer from '@/components/MainContainer';
import Content from '@/components/Content';

export const generateMetadata = async ({
  params: { slug }
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const result = await getPosts({ slug });
  const metadata: Metadata = {};
  if (result.isOk()) {
    const data = result.unwrap();
    const [post] = data.posts;
    if (post) {
      const thumbnail = post._embedded['wp:featuredmedia']?.[0]?.source_url;

      metadata.title = decode(post.title.rendered);
      metadata.description = getExcerpt(decode(post.excerpt.rendered));
      if (thumbnail) metadata.openGraph = { images: [{ url: thumbnail }] };
    }
  }
  return metadata;
};

const SinglePost = async ({ params: { slug } }: { params: { slug: string } }) => {
  const result = await getPosts({ slug });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const data = result.unwrap();
  const [post] = data.posts;
  if (!post) {
    return notFound();
  }

  return <MainContainer>{post && <Content content={post} />}</MainContainer>;
};

export default SinglePost;
