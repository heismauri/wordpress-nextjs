import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation'

import { PaginatedRouteWithSearch } from '@/types/PaginatedRoute';
import { getPosts } from '@/services/wordpress';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';
import RecentPosts from '@/components/RecentPosts';
import SuspenseRecentPosts from '@/components/SuspenseRecentPosts';

export const generateMetadata = async (
  { params: { page }, searchParams }: PaginatedRouteWithSearch
): Promise<Metadata> => {
  const { search } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const mainTitle = search ? `Results for: "${search}"` : 'Posts';

  const metadata: Metadata = {}
  metadata.title = currentPage > 1 ? `${mainTitle} – Page ${currentPage}` : mainTitle;

  return metadata;
}

const Posts = async ({ params: { page }, searchParams }: PaginatedRouteWithSearch) => {
  const { search } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const result = await getPosts({ page: currentPage, perPage: 10, search });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { count, posts } = result.unwrap();
  const encodedSearch = search ? `?search=${encodeURIComponent(search)}` : '';
  if (currentPage !== 1 && count === 0) {
    notFound();
  }

  return (
    <MainContainer>
      {search && (
        <>
          <h1 className="mb-6 lowercase">
            Results for: <span className="font-sans underline underline-offset-2 decoration-sky-600">{search}</span>
          </h1>
          <>
            {count === 0 && (
              <>
                <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                <Suspense fallback={<SuspenseRecentPosts />}>
                  <RecentPosts />
                </Suspense>
              </>
            )}
          </>
        </>
      )}
      <PaginatedPosts
        count={count}
        posts={posts}
        baseURL="/posts"
        currentPage={currentPage}
        encodedSearch={encodedSearch}
      />
    </MainContainer>
  );
};

export default Posts;
