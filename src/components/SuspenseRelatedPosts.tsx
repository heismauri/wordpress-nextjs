const SuspenseRelatedPosts = () => {
  return (
    <div className="mt-6">
      <h2 className="lowercase mb-6">Related Posts</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-6 grid-cols-3 animate-pulse">
          <div>
            <div className="bg-gray-100 pb-[100%]" />
          </div>
          <div className="col-span-2">
            <div className="w-16 h-4 bg-gray-100 rounded-lg mb-1" />
            <h4 className="w-full h-7 mb-2 bg-gray-100 rounded-lg" />
            <div className="w-24 h-5 bg-gray-100 rounded-lg" />
          </div>
        </div>
        <div className="grid gap-6 grid-cols-3 animate-pulse">
          <div>
            <div className="bg-gray-100 pb-[100%]" />
          </div>
          <div className="col-span-2">
            <div className="w-16 h-4 bg-gray-100 rounded-lg mb-1" />
            <h4 className="w-full h-7 mb-2 bg-gray-100 rounded-lg" />
            <div className="w-24 h-5 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspenseRelatedPosts;
