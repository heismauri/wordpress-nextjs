export interface PaginatedRoute {
  params: {
    page?: string;
  }
}

export interface PaginatedRouteWithSlug extends Omit<PaginatedRoute, 'params'> {
  params: {
    slug: string;
    page?: string;
  }
}

export interface PaginatedRouteWithSlugs extends Omit<PaginatedRoute, 'params'> {
  params: {
    slugs: string[];
  }
}

export interface PaginatedRouteWithSearch extends PaginatedRoute {
  searchParams: Promise<{ search: string }>;
}
