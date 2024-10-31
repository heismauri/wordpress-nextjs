import Link from 'next/link';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

import { Posts } from '@/types/Post';
import PostCard from '@/components/PostCard';

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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && baseURL && currentPage && (
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="sr-only">Pagination</div>
          <div className="text-left font-serif lowercase">
            <Link
              href={`${currentPage === 2 ? baseURL : `${baseURL}/page/${currentPage - 1}`}${encodedSearch}`}
              className="btn p-0 hover:text-rose-600 aria-disabled:opacity-0"
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
              className="btn p-0 hover:text-rose-600 aria-disabled:opacity-0"
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
