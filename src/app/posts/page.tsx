import type { Metadata } from 'next';

import { getPosts } from '@/services/wordpress';
import PaginatedPosts from '@/components/PaginatedPosts';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'All the latest posts from WordPress Next.js'
};

const Posts = async ({ params: { page } } : { params: { page?: string } }) => {
  const currentPage = parseInt(page || '1', 10);
  const result = await getPosts({ page: currentPage, perPage: 10 });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { count, posts } = result.unwrap();
  return <PaginatedPosts count={count} posts={posts} baseURL="/posts" currentPage={currentPage} />;
}

export default Posts;
