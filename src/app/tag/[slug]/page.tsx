import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { decode } from 'he';

import { PaginatedRouteWithSlug } from '@/types/PaginatedRoute';
import { getPosts, getTag } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';

export const generateMetadata = async ({ params: { slug, page } }: PaginatedRouteWithSlug): Promise<Metadata> => {
  const result = await getTag({ slug });
  const metadata: Metadata = {}
  if (result.isOk()) {
    const data = result.unwrap();
    if (data) {
      const currentPage = parseInt(page || '1', 10);
      const description = data.description || ''

      metadata.title = currentPage > 1 ? `${decode(data.name)} – Page ${currentPage}` : decode(data.name);
      if (description.trim().length !== 0) metadata.description = getExcerpt(decode(description));
    }
  }
  return metadata;
}

const SingleTag = async ({ params: { slug, page } } : PaginatedRouteWithSlug) => {
  const currentPage = parseInt(page || '1', 10);
  const tagResult = await getTag({ slug });
  if (!tagResult.isOk()) {
    throw new Error(tagResult.unwrapErr().message);
  }

  const tag = tagResult.unwrap();
  if (!tag) {
    return notFound();
  }

  const postResult = await getPosts({ page: currentPage, perPage: 10, tagId: tag.id });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { count, posts } = postResult.unwrap();
  return (
    <MainContainer>
      <h1 className="mb-6 lowercase">
        Tag:{' '}
        <span
          className="font-sans underline underline-offset-2 decoration-lime-500"
          dangerouslySetInnerHTML={{ __html: tag.name }}
        />
      </h1>
      {tag?.description && tag.description.trim().length !== 0 && (
        <p className="text-pretty mb-6" dangerouslySetInnerHTML={{ __html: tag.description }} />
      )}
      <PaginatedPosts count={count} posts={posts} baseURL={`/tag/${slug}`} currentPage={currentPage} />
    </MainContainer>
  );
}

export default SingleTag;
