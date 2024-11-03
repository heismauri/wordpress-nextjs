import { getPosts } from '@/services/wordpress';
import PostCard from '@/components/PostCard';

const RecentPosts = async () => {
  const result = await getPosts({ perPage: 3 });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { posts } = result.unwrap();
  return (
    <div className="border-t my-6 pt-4">
      <h2 className="lowercase mb-6">Recent Posts</h2>
      <div className="grid auto-rows-max gap-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} hideThumbnail />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
