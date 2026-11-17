"use server";

import { revalidateTag } from "next/cache";
import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type {
  PlatformReviewList,
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
  data: PlatformReviewList;
  pagination: PlatformReviewPagination | null;
} | null> {
  try {
    const body = await nextFetch<{
      data?: Partial<PlatformReviewList>;
      pagination?: PlatformReviewPagination;
    }>({
      url: platformReviewListUrl(query),
      next: { revalidate: 3600, tags: [apiKeys.platformReviews] },
    });
    const reviews = body.data?.reviews;
    if (!Array.isArray(reviews)) {
      return {
        data: { totalReviews: 0, averageRating: 0, reviews: [] },
        pagination: null,
      };
    }
    return {
      data: {
        totalReviews: body.data?.totalReviews ?? 0,
        averageRating: body.data?.averageRating ?? 0,
        reviews,
      },
      pagination: body.pagination ?? null,
    };
  } catch {
    return null;
  }
}
