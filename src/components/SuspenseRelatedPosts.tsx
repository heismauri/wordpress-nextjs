const SuspenseRelatedPosts = ({ cards = 2 }: { cards?: number }) => {
  return (
    <div className="border-t mt-6 pt-4">
      <h2 className="lowercase mb-6">Related Posts</h2>
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="grid gap-6 grid-cols-3">
          <div>
            <div className="bg-gray-100 pb-[100%]" />
          </div>
          <div className="col-span-2">
            <div className="w-16 h-4 bg-gray-100 rounded-lg mb-1" />
            <h4 className="w-full h-7 mb-2 bg-gray-100 rounded-lg" />
            <div className="w-24 h-5 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuspenseRelatedPosts;
