import { getPosts } from '@/services/wordpress';
import PaginatedPosts from '@/components/PaginatedPosts';

interface RelatedPostsProps {
  postId: number;
  categoryId: number;
}

const RelatedPosts = async ({ postId, categoryId }: RelatedPostsProps) => {
  const postResult = await getPosts({ perPage: 3, categoryId });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { posts } = postResult.unwrap();
  const relatedPosts = posts.filter((post) => post.id !== postId).slice(0, 2);
  if (0 >= relatedPosts.length) {
    return <></>;
  }

  return (
    <div className="mt-6">
      <h2 className="lowercase mb-6">Related Posts</h2>
      <PaginatedPosts count={2} posts={relatedPosts} />
    </div>
  );
}

export default RelatedPosts;
