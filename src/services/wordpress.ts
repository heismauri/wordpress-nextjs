import { Ok, Err, Result } from 'ts-results-es';

import { Post, Posts } from '@/types/post';

const WORDPRESS_API_BASE_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

interface WordPressPostParams {
  page?: number;
  perPage?: number;
  search?: string | null;
  slug?: string | null;
  sticky?: boolean;
  embed?: boolean;
}

interface WordPressPageParams {
  slug: string;
  embed?: boolean;
}

const getPosts = async (
  { page = 1, perPage = 1, search, slug, sticky, embed = true }: WordPressPostParams = {}
): Promise<Result<Posts, Error>> => {
  try {
    const postsEndpoint = new URL(`${WORDPRESS_API_BASE_URL}/posts`);
    const postsParams = new URLSearchParams({
      _embed: '1',
      page: page.toString(),
      per_page: perPage.toString()
    });
    if (search) postsParams.set('search', search);
    if (slug) postsParams.set('slug', slug);
    if (sticky) postsParams.set('sticky', '1');
    if (embed) postsParams.set('_embed', '1');
    postsEndpoint.search = postsParams.toString();
    const response = await fetch(postsEndpoint);

    const body = await response.json();
    const countString = response.headers.get('X-WP-Total');
    const count = (countString && parseInt(countString, 10)) || 0;
    return Ok({ count, posts: body });
  } catch {
    return Err(new Error('Failed to fetch posts'));
  }
};

const getPage = async ({ slug }: WordPressPageParams): Promise<Result<Post, Error>> => {
  try {
    const pagesEndpoint = new URL(`${WORDPRESS_API_BASE_URL}/pages`);
    pagesEndpoint.search = new URLSearchParams({
      _embed: '1',
      per_page: '1',
      slug
    }).toString();
    const response = await fetch(pagesEndpoint);

    const body = await response.json();
    const [page] = body;
    return Ok(page || null);
  } catch {
    return Err(new Error('Failed to fetch page'));
  }
};

export { getPosts, getPage };
