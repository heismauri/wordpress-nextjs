import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { decode } from 'he';

import { PaginatedRouteWithSlugs } from '@/types/PaginatedRoute';
import { getPosts, getTag } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';

export const generateMetadata = async ({ params: { slugs } }: PaginatedRouteWithSlugs): Promise<Metadata> => {
  let parent = 0;
  const pageIndex = slugs.indexOf('page');
  const currentPage = parseInt(pageIndex !== -1 && slugs[pageIndex + 1] || '1', 10);
  const tagSlugs = slugs.slice(0, pageIndex === -1 ? slugs.length : pageIndex);

  if (tagSlugs.length > 1) {
    const result = await getTag({ slug: tagSlugs[tagSlugs.length - 2] });
    if (result.isOk()) {
      const data = result.unwrap();
      if (data) {
        parent = data.id;
      }
    }
  }

  const result = await getTag({ slug: tagSlugs[tagSlugs.length - 1], parent });
  const metadata: Metadata = {}
  if (result.isOk()) {
    const data = result.unwrap();
    if (data) {
      const description = data.description || ''

      metadata.title = currentPage > 1 ? `${decode(data.name)} – Page ${currentPage}` : decode(data.name);
      if (description.trim().length !== 0) metadata.description = getExcerpt(decode(description));
    }
  }
  return metadata;
}

const Tags = async ({ params: { slugs } } : PaginatedRouteWithSlugs) => {
  let parent = 0;
  const pageIndex = slugs.indexOf('page');
  const currentPage = parseInt(pageIndex !== -1 && slugs[pageIndex + 1] || '1', 10);
  const tagSlugs = slugs.slice(0, pageIndex === -1 ? slugs.length : pageIndex);

  if (tagSlugs.length > 1) {
    const result = await getTag({ slug: tagSlugs[tagSlugs.length - 2] });
    if (result.isOk()) {
      const data = result.unwrap();
      if (data) {
        parent = data.id;
      }
    }
  }

  const tagResult = await getTag({ slug: tagSlugs[tagSlugs.length - 1], parent });
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
  if (currentPage !== 1 && count === 0) {
    notFound();
  }

  return (
    <MainContainer>
      <h1 className="mb-6 lowercase">
        Tag:{' '}
        <span className="font-sans underline underline-offset-2 decoration-rose-600">
          {decode(tag.name)}
        </span>
      </h1>
      {tag?.description && tag.description.trim().length !== 0 && (
        <p className="text-pretty mb-6">
          {decode(tag.description)}
        </p>
      )}
      <PaginatedPosts count={count} posts={posts} baseURL={`/tag/${tagSlugs.join('/')}`} currentPage={currentPage} />
    </MainContainer>
  );
}

export default Tags;
