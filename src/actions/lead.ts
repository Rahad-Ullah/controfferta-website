"use server";

import { getAuthToken } from "@/lib/auth-cookie";
import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Lead, LeadPagination } from "@/types/lead.interface";

const latestLeadLimit = 4;

export async function getLatestLeads(): Promise<Lead[]> {
  const token = await getAuthToken();
  if (!token) return [];

  const params = new URLSearchParams({
    page: "1",
    limit: String(latestLeadLimit),
    sort: "-createdAt",
  });

  try {
    const body = await nextFetch<{ data?: Lead[]; pagination?: LeadPagination }>({
      url: `${apiKeys.leads}?${params.toString()}`,
      token,
      cache: "no-store",
    });
    if (!Array.isArray(body.data)) return [];
    return body.data.slice(0, latestLeadLimit);
  } catch {
    return [];
  }
}
