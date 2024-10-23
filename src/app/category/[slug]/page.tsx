import { notFound } from 'next/navigation';
import { decode } from 'he';

import { getPosts, getCategory } from '@/services/wordpress';
import PaginatedPosts from '@/components/PaginatedPosts';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const result = await getCategory({ slug });
  if (result.isOk()) {
    const data = result.unwrap();
    if (data) {
      return {
        title: decode(data.name)
      };
    }
  }
}

const SingleCategory = async ({ params: { slug, page } } : { params: { slug: string, page?: string } }) => {
  const currentPage = parseInt(page || '1', 10);
  const categoryResult = await getCategory({ slug });
  if (!categoryResult.isOk()) {
    throw new Error(categoryResult.unwrapErr().message);
  }

  const category = categoryResult.unwrap();
  if (!category) {
    return notFound();
  }

  const postResult = await getPosts({ page: currentPage, perPage: 10, categoryID: category.id });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { count, posts } = postResult.unwrap();
  return <PaginatedPosts count={count} posts={posts} baseURL={`/category/${slug}`} currentPage={currentPage} />;
}

export default SingleCategory;