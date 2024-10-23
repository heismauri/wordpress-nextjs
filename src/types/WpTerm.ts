export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: 'category' | 'post_tag';
}

export interface WpTerms {
  count: number;
  wp_terms: WpTerm[];
}
