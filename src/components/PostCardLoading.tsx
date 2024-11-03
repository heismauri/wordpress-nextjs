const PostCardLoading = ({ hideThumbnail = false }: { hideThumbnail?: boolean }) => {
  return (
    <div className="grid gap-6 grid-cols-3 animate-pulse">
      {!hideThumbnail && (
        <div>
          <div className="bg-gray-100 pb-[100%]" />
        </div>
      )}
      <div className={hideThumbnail ? 'col-span-3' : 'col-span-2'}>
        <div className="w-16 h-4 bg-gray-100 rounded-lg mb-1" />
        <h4 className="w-full h-7 mb-2 bg-gray-100 rounded-lg" />
        <div className="w-24 h-5 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
};

export default PostCardLoading;
