import { getPosts } from '@/services/wordpress';
import PaginatedPosts from '@/components/PaginatedPosts';

const TrendingPosts = async () => {
  const postResult = await getPosts({ perPage: 4, categoryId: 19 });
  if (postResult.isErr()) {
    throw new Error(postResult.unwrapErr().message);
  }

  const { count, posts } = postResult.unwrap();
  return (
    <div className="border-t mt-6 pt-4">
      <h1 className="mb-6 lowercase">
        <span className="text-sky-600">#</span>
        Trending
      </h1>
      <PaginatedPosts count={count} posts={posts} />
    </div>
  );
}

export default TrendingPosts;
