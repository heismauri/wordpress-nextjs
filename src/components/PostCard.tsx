import Link from 'next/link';
import Image from 'next/image';
import { decode } from 'he';
import { BookOpenIcon } from '@heroicons/react/24/outline';

import { Post } from '@/types/Post';
import getReadingTime from '@/utils/getReadingTime';
import getTextFromHTML from '@/utils/getTextFromHTML';

const PostCard = ({ post, hideThumbnail = false }: { post: Post; hideThumbnail?: boolean }) => {
  const categories = post._embedded['wp:term'].find((terms) => {
    return terms.find((term) => term.taxonomy === 'category');
  });
  const firstCategory = categories?.[0];
  const thumbnail = !hideThumbnail && post._embedded['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="grid gap-6 grid-cols-3">
      {thumbnail && (
        <Link
          href={`/posts/${post.slug}`}
          className="hover:opacity-70 transition-opacity duration-300"
          prefetch
          scroll
        >
          <Image
            src={thumbnail}
            alt={decode(post.title.rendered)}
            width={170}
            height={170}
            className="w-full aspect-square object-cover flex-grow bg-sky-200"
          />
        </Link>
      )}
      <div className={thumbnail ? 'col-span-2' : 'col-span-3'}>
        {firstCategory && (
          <div className="text-sm font-serif lowercase text-sky-600">{decode(firstCategory.name)}</div>
        )}
        <Link href={`/posts/${post.slug}`} className="hover:text-sky-600" prefetch scroll>
          <h4 className="text-balance mb-2">{decode(post.title.rendered)}</h4>
        </Link>
        <div className="flex text-sm font-serif lowercase items-center gap-x-3 text-gray-500">
          <BookOpenIcon className="h-4 w-4 inline-block" />
          {getReadingTime(getTextFromHTML(post.content.rendered))} min read
        </div>
      </div>
    </div>
  );
};

export default PostCard;
