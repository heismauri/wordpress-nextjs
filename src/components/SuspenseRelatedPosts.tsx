import PostCardLoading from '@/components/PostCardLoading';

const SuspenseRelatedPosts = ({ cards = 2 }: { cards?: number }) => {
  return (
    <div className="border-t mt-6 pt-4">
      <h2 className="lowercase mb-6">Related Posts</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="grid gap-6 grid-cols-3">
            <PostCardLoading />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuspenseRelatedPosts;
