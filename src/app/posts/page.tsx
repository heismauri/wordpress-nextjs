import type { Metadata } from 'next';
import { redirect } from 'next/navigation'

import { PaginatedRouteWithSearch } from '@/types/PaginatedRoute';
import { getPosts } from '@/services/wordpress';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';

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
  if (currentPage > 1 && count === 0) {
    return redirect(`/posts${encodedSearch}`);
  }

  return (
    <MainContainer>
      {search && (
        <h1 className="mb-6 lowercase">
          Results for: <span className="font-sans underline underline-offset-2 decoration-lime-500">{search}</span>
        </h1>
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
