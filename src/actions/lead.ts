"use server";

import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Lead, LeadPagination } from "@/types/lead.interface";

const latestLeadLimit = 4;

/** Public lead feed (`GET /leads`). Contact details stay hidden until unlock. */
export async function getCategoryLeads(categoryId: string): Promise<{
  leads: Lead[];
  total: number;
} | null> {
  const params = new URLSearchParams({
    category: categoryId,
    page: "1",
    limit: "60",
    sort: "-createdAt",
  });

  try {
    const body = await nextFetch<{ data?: Lead[]; pagination?: LeadPagination }>({
      url: `${apiKeys.leads}?${params.toString()}`,
      next: { revalidate: 60, tags: [apiKeys.leads] },
    });
    const leads = Array.isArray(body.data) ? body.data : [];
    return { leads, total: body.pagination?.total ?? leads.length };
  } catch {
    return null;
  }
}

/** Public latest accepted leads for the provider marketing home. */
export async function getLatestLeads(): Promise<Lead[]> {
  const params = new URLSearchParams({
    page: "1",
    limit: String(latestLeadLimit),
    sort: "-createdAt",
  });

  try {
    const body = await nextFetch<{ data?: Lead[]; pagination?: LeadPagination }>({
      url: `${apiKeys.leads}?${params.toString()}`,
      next: { revalidate: 60, tags: [apiKeys.leads] },
    });
    if (!Array.isArray(body.data)) return [];
    return body.data.slice(0, latestLeadLimit);
  } catch {
    return [];
  }
}
