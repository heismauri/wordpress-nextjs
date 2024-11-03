import PostCardLoading from '@/components/PostCardLoading';

const SuspenseRecentPosts = ({ cards = 3 }: { cards?: number }) => {
  return (
    <div className="border-t my-6 pt-4">
      <h2 className="lowercase mb-6">Recent Posts</h2>
      <div className="grid auto-rows-max gap-y-4">
        {Array.from({ length: cards }).map((_, i) => (
          <PostCardLoading key={i} hideThumbnail />
        ))}
      </div>
    </div>
  );
};

export default SuspenseRecentPosts;
