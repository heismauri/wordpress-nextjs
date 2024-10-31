import { Post, Embedded } from '@/types/Post';

interface PageEmbedded extends Embedded {
  up: Up[];
}

interface Up {
  id: number;
  slug: string;
}

export interface Page extends Omit<Post, 'type' | '_embedded'> {
  type: 'page';
  parent: number;
  _embedded: PageEmbedded;
}
