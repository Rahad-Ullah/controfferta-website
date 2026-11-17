"use server";

import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Setting } from "@/types/setting.interface";

export async function getSetting(): Promise<Setting | null> {
  try {
    const body = await nextFetch<{ data?: Setting | null }>({
      url: apiKeys.settings,
      next: { revalidate: 3600, tags: [apiKeys.settings] },
    });
    if (!body?.data) return null;
    return body.data;
  } catch {
    return null;
  }
}
