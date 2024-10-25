import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { decode } from 'he';

import { getPosts, getCategory } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const result = await getCategory({ slug });
  const metadata: Metadata = {}
  if (result.isOk()) {
    const data = result.unwrap();
    if (data) {
      const description = data.description || ''

      metadata.title = decode(data.name);
      if (description.trim().length !== 0) metadata.description = getExcerpt(decode(description));
    }
  }
  return metadata;
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

  const postResult = await getPosts({ page: currentPage, perPage: 10, categoryId: category.id });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { count, posts } = postResult.unwrap();
  return (
    <MainContainer>
      <h1 className="mb-6 lowercase">
        Category: <span className="font-sans underline underline-offset-2 decoration-lime-500">{category.name}</span>
      </h1>
      {(category?.description || '').trim().length !== 0 && (
        <p className="text-pretty mb-6">{category.description}</p>
      )}
      <PaginatedPosts count={count} posts={posts} baseURL={`/category/${slug}`} currentPage={currentPage} />
    </MainContainer>
  );
}

export default SingleCategory;
