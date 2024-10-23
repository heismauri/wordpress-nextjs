import Image from 'next/image';
import { notFound } from 'next/navigation'

import { getPosts } from '@/services/wordpress';
import MainContainer from '@/components/MainContainer';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const result = await getPosts({ slug });
  if (result.isOk()) {
    const data = result.unwrap();
    const [post] = data.posts;
    if (post) {
      return {
        title: post.title.rendered
      };
    }
  }
}

const SinglePost = async ({ params: { slug } } : { params: { slug: string } }) => {
  const result = await getPosts({ slug });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const data = result.unwrap();
  const [post] = data.posts;
  if (!post) {
    return notFound();
  }

  return (
    <MainContainer>
      {post && (
        <>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url && (
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                width={540}
                height={300}
                className="mx-auto"
                priority
              />
            )}
          </div>
          <div className="border-t my-6" />
          <div className="max-w-3xl mx-auto mt-6">
            <div
              className="prose prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        </>
      )}
    </MainContainer>
  );
}

export default SinglePost;
