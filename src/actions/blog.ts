"use server";

import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Blog, BlogPagination, BlogQuery } from "@/types/blog.interface";

function blogListUrl(query: BlogQuery = {}) {
  const params = new URLSearchParams();

  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query.category) params.set("category", query.category);
  if (query.page) params.set("page", query.page);
  if (query.limit) params.set("limit", query.limit);
  if (query.sort) params.set("sort", query.sort);

  const search = params.toString();
  return search ? `${apiKeys.blogs}?${search}` : apiKeys.blogs;
}

export async function getBlog(id: string): Promise<Blog | null> {
  if (!/^[a-f\d]{24}$/i.test(id)) return null;

  try {
    const body = await nextFetch<{ data?: Blog }>({
      url: `${apiKeys.blogs}/${id}`,
      next: { revalidate: 300, tags: [apiKeys.blogs] },
    });
    if (!body.data?._id) return null;
    return body.data;
  } catch {
    return null;
  }
}

export async function getBlogs(query?: BlogQuery): Promise<{
  data: Blog[];
  pagination: BlogPagination | null;
} | null> {
  try {
    const body = await nextFetch<{
      data?: Blog[];
      pagination?: BlogPagination;
    }>({
      url: blogListUrl(query),
      next: { revalidate: 300, tags: [apiKeys.blogs] },
    });
    if (!Array.isArray(body.data)) return { data: [], pagination: null };
    return { data: body.data, pagination: body.pagination ?? null };
  } catch {
    return null;
  }
}
