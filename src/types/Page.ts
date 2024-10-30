import { Post, Embedded } from '@/types/Post';

interface PageEmbedded extends Embedded {
  up: Up[];
}

interface Up {
  id: number;
  slug: string;
}

export interface Page extends Omit<Post, '_embedded'> {
  parent: number;
  _embedded: PageEmbedded;
}
