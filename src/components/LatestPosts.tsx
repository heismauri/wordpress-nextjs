import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { decode } from 'he';

import { getPosts } from '@/services/wordpress';
import getExcerpt from '@/utils/getExcerpt';
import PostCard from '@/components/PostCard';

const LatestPosts = async () => {
  const result = await getPosts({ page: 1, perPage: 5 });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { posts } = result.unwrap();
  const [firstPost, ...restPosts] = posts;
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {firstPost && (
          <div className="md:col-span-2 md:border-r md:pr-6">
            {firstPost._embedded['wp:featuredmedia'] &&
              firstPost._embedded['wp:featuredmedia'][0]?.source_url && (
                <Link
                  href={`/posts/${firstPost.slug}`}
                  className={clsx(
                    'block relative mb-4 before:block before:absolute before:top-0 before:right-0 hover:opacity-70',
                    'before:border-[1.5rem] before:border-transparent before:border-r-sky-600',
                    'before:border-t-sky-600 transition-opacity duration-300'
                  )}
                  prefetch
                  scroll
                >
                  <Image
                    src={firstPost._embedded['wp:featuredmedia'][0].source_url}
                    alt={firstPost.title.rendered}
                    width={400}
                    height={400}
                    className="w-full aspect-video object-cover bg-sky-200"
                  />
                </Link>
              )}
            <div>
              <Link href={`/posts/${firstPost.slug}`} className="hover:text-sky-600" prefetch scroll>
                <h2 className="text-3xl text-pretty">{decode(firstPost.title.rendered)}</h2>
              </Link>
              <p className="mt-3">{getExcerpt(decode(firstPost.content.rendered))}</p>
            </div>
          </div>
        )}
        <div className="grid auto-rows-max gap-6 border-t md:border-transparent pt-6 md:pt-0">
          {restPosts &&
            restPosts.length > 0 &&
            restPosts.map((post) => <PostCard key={post.id} post={post} hideThumbnail />)}
        </div>
      </div>
    </>
  );
};

export default LatestPosts;
