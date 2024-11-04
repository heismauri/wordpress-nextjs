import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FolderOpenIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import { decode } from 'he';
import { clsx } from 'clsx';

import { Post } from '@/types/Post';
import { Page } from '@/types/Page';
import RelatedPosts from '@/components/RelatedPosts';
import SuspenseRelatedPosts from '@/components/SuspenseRelatedPosts';

const Content = ({ content }: { content: Post | Page }) => {
  const isPost = content.type === 'post';
  const categories =
    isPost &&
    content._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'category'));
  const tags =
    isPost &&
    content._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'post_tag'));
  const [author] = (isPost && content._embedded.author) || [];
  const thumbnail = content._embedded['wp:featuredmedia']?.[0]?.source_url;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-x-6 items-center justify-items-center">
        <div className={clsx(!thumbnail && 'md:w-1/2 md:col-span-2', 'w-full py-6')}>
          {isPost && content.date && (
            <div className="w-full text-sm text-center text-sky-600 mb-2">
              {new Date(content.date).toLocaleDateString([], {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
          <h1 className="text-pretty">{decode(content.title.rendered)}</h1>
          {isPost && categories && (
            <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
              <FolderOpenIcon className="h-4 w-4 inline-block" />
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.link.split('/').slice(4).join('/')}`}
                  className="hover:text-sky-600"
                >
                  {decode(category.name)}
                </Link>
              ))}
            </div>
          )}
          {isPost && author && author.name && (
            <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
              <UserIcon className="h-4 w-4 inline-block" />
              <Link href={`/author/${author.slug}`} className="hover:text-sky-600">
                {decode(author.name)}
              </Link>
            </div>
          )}
        </div>
        {thumbnail && (
          <div
            className={clsx(
              'relative before:block before:absolute before:top-0 before:right-0 before:border-[1.5rem]',
              'before:border-transparent before:border-r-sky-600 before:border-t-sky-600'
            )}
          >
            <Image
              src={thumbnail}
              alt={decode(content.title.rendered)}
              width={540}
              height={310}
              className="max-w-full w-auto h-auto mx-auto bg-sky-200"
              priority
            />
          </div>
        )}
      </div>
      <div className="border-t my-6" />
      <div className="max-w-3xl mx-auto mt-6">
        <div
          className={clsx(
            'prose prose-a:text-sky-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-transparent',
            'hover:prose-a:border-sky-600 prose-a:has-[img]:!border-b-0'
          )}
          dangerouslySetInnerHTML={{ __html: content.content.rendered }}
        />
        {isPost && tags && (
          <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-4 text-gray-500 flex-wrap">
            <TagIcon className="h-4 w-4 inline-block" />
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`} className="hover:text-sky-600">
                {decode(tag.name)}
              </Link>
            ))}
          </div>
        )}
      </div>
      {isPost && categories && categories[0] && (
        <Suspense fallback={<SuspenseRelatedPosts />}>
          <RelatedPosts postId={content.id} categoryId={categories[0].id} />
        </Suspense>
      )}
    </>
  );
};

export default Content;
