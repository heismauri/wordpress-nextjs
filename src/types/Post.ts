import { WpTerm } from '@/types/WpTerm';

interface Author {
  id?: number;
  name?: string;
  description?: string;
  slug?: string;
}

interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaSizes {
  thumbnail: MediaSize;
  medium: MediaSize;
  large: MediaSize;
  full: MediaSize;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  filesize: number;
  sizes: MediaSizes;
}

interface WpFeaturedmedia {
  id?: number;
  date?: Date;
  slug?: string;
  type?: string;
  link?: string;
  title?: { rendered: string };
  caption?: { rendered: string };
  alt_text?: string;
  media_type?: string;
  mime_type?: string;
  media_details?: MediaDetails;
  source_url?: string;
}

export interface Embedded {
  'author': Author[];
  'wp:featuredmedia'?: WpFeaturedmedia[];
  'wp:term': Array<WpTerm[]>;
}

export interface Post {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  type: 'post';
  _embedded: Embedded;
}

export interface Posts {
  count: number;
  posts: Post[];
}
