import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'
import { FolderOpenIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { decode } from 'he';
import { clsx } from 'clsx';

import { getPosts } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import MainContainer from '@/components/MainContainer';
import RelatedPosts from '@/components/RelatedPosts';
import SuspenseRelatedPosts from '@/components/SuspenseRelatedPosts';

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const result = await getPosts({ slug });
  const metadata: Metadata = {}
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

  const categories = post._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'category'));
  const tags = post._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'post_tag'));
  const [author] = post._embedded.author;
  const thumbnail = post._embedded['wp:featuredmedia']?.[0]?.source_url;
  return (
    <MainContainer>
      {post && (
        <>
          <div className="grid md:grid-cols-2 gap-x-6 items-center justify-items-center">
            <div className={clsx(!thumbnail && 'md:w-1/2 md:col-span-2', 'w-full py-6')}>
              {post.date && (
                <div className="w-full text-sm text-center text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              )}
              <h1 className="text-pretty" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              {categories && (
                <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
                  <FolderOpenIcon className="h-4 w-4 inline-block" />
                  {categories?.map((category) => (
                    <Link key={category.id} href={`/category/${category.slug}`} className="hover:text-lime-500">
                      {decode(category.name)}
                    </Link>
                  ))}
                </div>
              )}
              {author && author.name && (
                <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
                  <UserIcon className="h-4 w-4 inline-block" />
                  <Link href={`/author/${author.slug}`} className="hover:text-lime-500">
                    {decode(author.name)}
                  </Link>
                </div>
              )}
            </div>
            {thumbnail && (
              <div
                className={clsx(
                  'relative before:block before:absolute before:top-0 before:right-0 before:border-[1.5rem]',
                  'before:border-transparent before:border-r-white before:border-t-white'
                )}
              >
                <Image
                  src={thumbnail}
                  alt={decode(post.title.rendered)}
                  width={540}
                  height={310}
                  className="max-w-full w-auto h-auto mx-auto bg-lime-200"
                  priority
                />
              </div>
            )}
          </div>
          <div className="border-t my-6" />
          <div className="max-w-3xl mx-auto mt-6">
            <div
              className="prose prose-a:text-lime-500 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            {tags && (
              <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-4 text-gray-500 flex-wrap">
                <TagIcon className="h-4 w-4 inline-block" />
                {tags?.map((tag) => (
                  <Link key={tag.id} href={`/tag/${tag.slug}`} className="hover:text-lime-500">
                    {decode(tag.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {categories && categories[0] && (
            <Suspense fallback={<SuspenseRelatedPosts />}>
              <RelatedPosts postId={post.id} categoryId={categories[0].id} />
            </Suspense>
          )}
        </>
      )}
    </MainContainer>
  );
}

export default SinglePost;
