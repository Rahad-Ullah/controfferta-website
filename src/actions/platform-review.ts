"use server";

import { revalidateTag } from "next/cache";
import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type {
  PlatformReview,
  PlatformReviewPagination,
  PlatformReviewQuery,
} from "@/types/platform-review.interface";

function platformReviewListUrl(query: PlatformReviewQuery = {}) {
  const params = new URLSearchParams();

  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query.page) params.set("page", query.page);
  if (query.limit) params.set("limit", query.limit);
  if (query.sort) params.set("sort", query.sort);

  const search = params.toString();
  return search ? `${apiKeys.platformReviews}?${search}` : apiKeys.platformReviews;
}

export async function getPlatformReviews(query?: PlatformReviewQuery): Promise<{
  data: PlatformReview[];
  pagination: PlatformReviewPagination | null;
} | null> {
  try {
    const body = await nextFetch<{
      data?: PlatformReview[];
      pagination?: PlatformReviewPagination;
    }>({
      url: platformReviewListUrl(query),
      next: { revalidate: 3600, tags: [apiKeys.platformReviews] },
    });
    if (!Array.isArray(body.data)) return { data: [], pagination: null };
    return { data: body.data, pagination: body.pagination ?? null };
  } catch {
    return null;
  }
}
