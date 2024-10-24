import Image from 'next/image';
import Link from 'next/link';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';

import { Posts } from '@/types/Post';
import getReadingTime from '@/utils/getReadingTime';
import getTextFromHTML from '@/utils/getTextFromHTML';

interface PaginatedPostsProps extends Posts {
  baseURL?: string;
  currentPage?: number;
}

const PaginatedPosts = ({ count, posts, baseURL, currentPage }: PaginatedPostsProps) => {
  const totalPages = Math.ceil(count / 10);
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => {
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
                <div>
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={post.title.rendered}
                      width={600}
                      height={400}
                      className="w-full aspect-square object-cover flex-grow"
                    />
                  ) : (
                    <div className="bg-gray-100 pb-[100%] animate-pulse" />
                  )}
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <h4
                    className="text-balance mb-2 group-hover:text-red-500 transition-colors duration-300"
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
              href={currentPage === 2 ? baseURL : `${baseURL}/page/${currentPage - 1}`}
              className="btn p-0 hover:text-red-500 aria-disabled:text-gray-300"
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
              href={`${baseURL}/page/${currentPage + 1}`}
              className="btn p-0 hover:text-red-500 aria-disabled:text-gray-300"
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
