export interface WpTerm {
  id: number;
  name: string;
  description?: string;
  slug: string;
  taxonomy: 'category' | 'post_tag';
}

export interface WpTerms {
  count: number;
  wp_terms: WpTerm[];
}
