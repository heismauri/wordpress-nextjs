import { Ok, Err, Result } from 'ts-results-es';

import { Post, Posts } from '@/types/Post';
import { WpTerm } from '@/types/WpTerm';

const WORDPRESS_API_BASE_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

interface WordPressPostParams {
  page?: number;
  perPage?: number;
  search?: string | null;
  slug?: string | null;
  sticky?: boolean;
  embed?: boolean;
  categoryID?: number;
  tagID?: number;
}

interface WordPressParams {
  slug: string;
}

const getPosts = async (
  { page = 1, perPage = 1, search, slug, sticky, embed = true, categoryID, tagID }: WordPressPostParams = {}
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
    if (categoryID) postsParams.set('categories', categoryID.toString());
    if (tagID) postsParams.set('tags', tagID.toString());
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

const getPage = async ({ slug }: WordPressParams): Promise<Result<Post, Error>> => {
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

const getCategory = async ({ slug }: WordPressParams): Promise<Result<WpTerm, Error>> => {
  try {
    const categoryEndpoint = new URL(`${WORDPRESS_API_BASE_URL}/categories`);
    categoryEndpoint.search = new URLSearchParams({
      per_page: '1',
      slug
    }).toString();
    const response = await fetch(categoryEndpoint);

    const body = await response.json();
    const [category] = body;
    return Ok(category || null);
  } catch {
    return Err(new Error('Failed to fetch category'));
  }
}

export { getPosts, getPage, getCategory };