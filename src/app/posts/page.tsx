import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getPosts } from '@/services/wordpress';
import getTextFromHTML from '@/utils/getTextFromHTML';
import getReadingTime from '@/utils/getReadingTime';
import MainContainer from '@/components/MainContainer';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'All the latest posts from WordPress Next.js'
};

const Posts = async ({ params: { page } } : { params: { page?: string } }) => {
  const pageInt = parseInt(page || '1', 10);
  const result = await getPosts({ page: pageInt, perPage: 10 });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const { count, posts } = result.unwrap();
  const totalPages = Math.ceil(count / 10);
  return (
    <MainContainer>
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`} className="group" prefetch scroll>
            <div className="grid gap-6 grid-flow-col">
              {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url && (
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  width={600}
                  height={400}
                  className="w-48 aspect-square object-cover flex-grow"
                />
              )}
              <div>
                <div className="text-sm">
                  {new Date(post.date).toLocaleDateString()} • {post._embedded.author.map((a) => a.name).join(', ')}
                </div>
                <h4
                  className="text-balance mb-3 group-hover:text-gray-500 transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="text-xs uppercase">
                  {getReadingTime(getTextFromHTML(post.content.rendered))} min read
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="grid grid-cols-3 gap-6 my-6">
          <div className="text-left">
            <Link
              href={pageInt === 2 ? '/posts' : `/posts/page/${pageInt - 1}`}
              className="hover:text-gray-500"
              aria-disabled={pageInt === 1}
            >
              Previous
            </Link>
          </div>
          <div className="text-center">
            {pageInt} / {totalPages}
          </div>
          <div className="text-right">
            <Link
              href={`/posts/page/${pageInt + 1}`}
              className="hover:text-gray-500 aria-disabled:pointer-events-none"
              aria-disabled={pageInt === totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </MainContainer>
  );
}

export default Posts;
