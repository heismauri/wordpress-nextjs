import { notFound } from 'next/navigation';
import { decode } from 'he';

import { getPosts, getTag } from '@/services/wordpress';
import MainContainer from '@/components/MainContainer';
import PaginatedPosts from '@/components/PaginatedPosts';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const result = await getTag({ slug });
  if (result.isOk()) {
    const data = result.unwrap();
    if (data) {
      return {
        title: decode(data.name)
      };
    }
  }
}

const SingleTag = async ({ params: { slug, page } } : { params: { slug: string, page?: string } }) => {
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
        Tag: <span className="font-sans underline underline-offset-2 decoration-lime-500">{tag.name}</span>
      </h1>
      {(tag?.description || '').trim().length !== 0 && (
        <p className="text-pretty mb-6">{tag.description}</p>
      )}
      <PaginatedPosts count={count} posts={posts} baseURL={`/tag/${slug}`} currentPage={currentPage} />
    </MainContainer>
  );
}

export default SingleTag;
