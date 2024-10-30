import Image from 'next/image';
import Link from 'next/link';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { decode } from 'he';

import { Posts } from '@/types/Post';
import getReadingTime from '@/utils/getReadingTime';
import getTextFromHTML from '@/utils/getTextFromHTML';

interface PaginatedPostsProps extends Posts {
  baseURL?: string;
  currentPage?: number;
  encodedSearch?: string;
}

const PaginatedPosts = ({ count, posts, baseURL, currentPage, encodedSearch = '' }: PaginatedPostsProps) => {
  const totalPages = Math.ceil(count / 10);
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const categories = post._embedded['wp:term'].find((terms) => {
            return terms.find((term) => term.taxonomy === 'category')
          });
          const firstCategory = categories?.[0];
          const thumbnail = post._embedded['wp:featuredmedia']?.[0]?.source_url;
          return (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group"
              prefetch
              scroll
            >
              <div className="grid gap-6 grid-cols-3">
                {thumbnail && (
                  <div>
                    <Image
                      src={thumbnail}
                      alt={decode(post.title.rendered)}
                      width={170}
                      height={170}
                      className="w-full aspect-square object-cover flex-grow"
                    />
                  </div>
                )}
                <div className={thumbnail ? 'col-span-2' : 'col-span-3'}>
                  {firstCategory && (
                    <div className="text-sm font-serif lowercase text-lime-500">
                      {decode(firstCategory.name)}
                    </div>
                  )}
                  <h4
                    className="text-balance mb-2 group-hover:text-lime-500 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div className="flex text-sm font-serif lowercase items-center gap-x-3 text-gray-500">
                    <BookOpenIcon className="h-4 w-4 inline-block" />
                    {getReadingTime(getTextFromHTML(post.content.rendered))} min read
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {totalPages > 1 && baseURL && currentPage && (
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="sr-only">Pagination</div>
          <div className="text-left font-serif lowercase">
            <Link
              href={`${currentPage === 2 ? baseURL : `${baseURL}/page/${currentPage - 1}`}${encodedSearch}`}
              className="btn p-0 hover:text-lime-500 aria-disabled:opacity-0"
              aria-disabled={currentPage === 1}
            >
              <ArrowLongLeftIcon className="w-5 h-5" />
              Previous
            </Link>
          </div>
          <div className="text-center">
            {currentPage} / {totalPages}
          </div>
          <div className="text-right font-serif lowercase">
            <Link
              href={`${baseURL}/page/${currentPage + 1}${encodedSearch}`}
              className="btn p-0 hover:text-lime-500 aria-disabled:opacity-0"
              aria-disabled={currentPage === totalPages}
            >
              Next
              <ArrowLongRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginatedPosts;
