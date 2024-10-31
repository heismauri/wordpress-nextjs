import Image from 'next/image';
import Link from 'next/link';
import { decode } from 'he';

import { getPosts } from '@/services/wordpress';
import getTextFromHTML from '@/utils/getTextFromHTML';
import getReadingTime from '@/utils/getReadingTime';
import getExcerpt from '@/utils/getExcerpt';

const LatestPosts = async () => {
  const result = await getPosts({ page: 1, perPage: 4 });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { posts } = result.unwrap();
  const [firstPost, ...restPosts] = posts;
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {firstPost && (
          <div className="flex col-span-2 gap-6 border-r pr-6">
            <div>
              <Link href={`/posts/${firstPost.slug}`} className="w-1/2 hover:text-rose-600" prefetch scroll>
                <h2 className="text-4xl text-balance" dangerouslySetInnerHTML={{ __html: firstPost.title.rendered }} />
              </Link>
              <p className="mt-6">{getExcerpt(decode(firstPost.excerpt.rendered))}</p>
            </div>
            {firstPost._embedded['wp:featuredmedia'] && firstPost._embedded['wp:featuredmedia'][0]?.source_url && (
              <Image
                src={firstPost._embedded['wp:featuredmedia'][0].source_url}
                alt={firstPost.title.rendered}
                width={400}
                height={400}
                className="w-1/2 aspect-square object-cover"
              />
            )}
          </div>
        )}
        <div>
          {restPosts && restPosts.length > 0 && restPosts.map((post) => (
            <div key={post.id} className="mb-6 last-of-type:mb-0">
              <div className="text-sm">
                {new Date(post.date).toLocaleDateString()} • {post._embedded.author.map((a) => a.name).join(', ')}
              </div>
              <Link href={`/posts/${post.slug}`} className="hover:text-rose-600" prefetch scroll>
                <h4 className="text-balance" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </Link>
              <div className="uppercase">{getReadingTime(getTextFromHTML(post.content.rendered))} min read</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LatestPosts;
