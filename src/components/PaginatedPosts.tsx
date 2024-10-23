import Image from 'next/image';
import Link from 'next/link';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

import { Posts } from '@/types/Post';
import getReadingTime from '@/utils/getReadingTime';
import getTextFromHTML from '@/utils/getTextFromHTML';
import MainContainer from '@/components/MainContainer';

interface PaginatedPostsProps extends Posts {
  baseURL: string;
  currentPage: number;
}

const PaginatedPosts = ({ count, posts, baseURL, currentPage }: PaginatedPostsProps) => {
  const totalPages = Math.ceil(count / 10);
  return (
    <MainContainer>
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group"
            prefetch
            scroll
          >
            <div className="grid gap-6 grid-flow-col">
              {post._embedded['wp:featuredmedia'] &&
                post._embedded['wp:featuredmedia'][0]?.source_url && (
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    width={600}
                    height={400}
                    className="w-48 aspect-square object-cover flex-grow"
                  />
                )}
              <div>
                <div className="text-sm">
                  {new Date(post.date).toLocaleDateString()} •{' '}
                  {post._embedded.author.map((a) => a.name).join(', ')}
                </div>
                <h4
                  className="text-balance mb-3 group-hover:text-red-500 transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="text-xs uppercase">
                  {getReadingTime(getTextFromHTML(post.content.rendered))} min
                  read
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="grid grid-cols-3 gap-6 my-6">
          <div className="sr-only">Pagination</div>
          <div className="text-left font-serif">
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
          <div className="text-right font-serif">
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
    </MainContainer>
  );
};

export default PaginatedPosts;
