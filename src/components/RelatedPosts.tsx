import { getPosts } from '@/services/wordpress';
import PaginatedPosts from '@/components/PaginatedPosts';

interface RelatedPostsProps {
  postId: number;
  categoryId: number;
}

const RelatedPosts = async ({ postId, categoryId }: RelatedPostsProps) => {
  const postResult = await getPosts({ perPage: 2, exclude: postId, categoryId });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { posts } = postResult.unwrap();
  if (0 >= posts.length) {
    return <></>;
  }

  return (
    <div className="border-t mt-6 pt-4">
      <h2 className="lowercase mb-6">Related Posts</h2>
      <PaginatedPosts count={2} posts={posts} />
    </div>
  );
}

export default RelatedPosts;
