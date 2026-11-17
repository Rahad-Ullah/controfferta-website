"use server";

import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type {
  Category,
  CategoryQuery,
  CategoryPagination,
} from "@/types/category.interface";

function categoryListUrl(query: CategoryQuery = {}) {
  const params = new URLSearchParams();

  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.sort) params.set("sort", query.sort);

  const search = params.toString();
  return search ? `${apiKeys.categories}?${search}` : apiKeys.categories;
}

export async function getCategories(query?: CategoryQuery): Promise<{
  data: Category[];
  pagination: CategoryPagination | null;
} | null> {
  try {
    const body = await nextFetch<{
      data?: Category[];
      pagination?: CategoryPagination;
    }>({
      url: categoryListUrl(query),
      next: { revalidate: 3600, tags: [apiKeys.categories] },
    });
    if (!Array.isArray(body.data)) return { data: [], pagination: null };
    return { data: body.data, pagination: body.pagination ?? null };
  } catch {
    return null;
  }
}
