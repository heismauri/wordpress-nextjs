import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'
import { FolderOpenIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { decode } from 'he';

import { getPosts } from '@/services/wordpress';
import MainContainer from '@/components/MainContainer';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const result = await getPosts({ slug });
  if (result.isOk()) {
    const data = result.unwrap();
    const [post] = data.posts;
    if (post) {
      return {
        title: decode(post.title.rendered)
      };
    }
  }
}

const SinglePost = async ({ params: { slug } } : { params: { slug: string } }) => {
  const result = await getPosts({ slug });
  if (result.isErr()) {
    throw new Error(result.unwrapErr().message);
  }

  const data = result.unwrap();
  const [post] = data.posts;
  if (!post) {
    return notFound();
  }

  const postCategories = post._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'category'));
  const postTags = post._embedded['wp:term'].find((terms) => terms.find((term) => term.taxonomy === 'post_tag'));
  const [author] = post._embedded.author;
  return (
    <MainContainer>
      {post && (
        <>
          <div className="grid md:grid-cols-2 gap-x-6 items-center">
            <div className="py-6">
              {post.date && (
                <div className="w-full text-sm text-center text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              )}
              <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              {postCategories && (
                <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
                  <FolderOpenIcon className="h-4 w-4 inline-block" />
                  {postCategories?.map((category) => (
                    <Link key={category.id} href={`/category/${category.slug}`} className="hover:text-red-500">
                      {decode(category.name)}
                    </Link>
                  ))}
                </div>
              )}
              {author && author.name && (
                <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-3 text-gray-500 flex-wrap">
                  <UserIcon className="h-4 w-4 inline-block" />
                  <Link href={`/author/${author.slug}`} className="hover:text-red-500">
                    {decode(author.name)}
                  </Link>
                </div>
              )}
            </div>
            {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url && (
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                width={540}
                height={300}
                className="mx-auto"
                priority
              />
            )}
          </div>
          <div className="border-t my-6" />
          <div className="max-w-3xl mx-auto mt-6">
            <div
              className="prose prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            {postTags && (
              <div className="flex text-sm font-serif lowercase items-center gap-x-3 mt-4 text-gray-500 flex-wrap">
                <TagIcon className="h-4 w-4 inline-block" />
                {postTags?.map((tag) => (
                  <Link key={tag.id} href={`/tag/${tag.slug}`} className="hover:text-red-500">
                    {decode(tag.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </MainContainer>
  );
}

export default SinglePost;
