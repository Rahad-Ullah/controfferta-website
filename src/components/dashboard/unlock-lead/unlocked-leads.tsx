"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { ChevronRight, Loader2, Lock, Search } from "lucide-react";
import { formatLeadDate } from "@/components/dashboard/leads/lead-format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiKeys } from "@/lib/api/keys";
import type { Lead } from "@/types/lead.interface";
import {
  type LeadAccess,
  type LeadAccessPagination,
  type LeadAccessStatus,
  LEAD_ACCESS_STATUS_LABELS,
} from "@/types/lead-access.interface";

type TabValue = "all" | LeadAccessStatus;
const tabValues = [
  "all",
  "unlocked",
  "contacted",
  "in_progress",
  "completed",
] as const;

function getAccessLead(access: LeadAccess): Lead | null {
  return typeof access.lead === "object" && access.lead !== null
    ? access.lead
    : null;
}

function getStatusBadgeClass(status: LeadAccessStatus) {
  switch (status) {
    case "completed":
      return "border-emerald-200/80 bg-[#DCFCE7] text-[#16A34A]";
    case "in_progress":
      return "border-amber-200/80 bg-[#FEF3C7] text-[#D97706]";
    case "contacted":
      return "border-blue-200/80 bg-[#EFF6FF] text-[#2563EB]";
    case "unlocked":
    default:
      return "border-emerald-200/80 bg-[#E0F7EF] text-[#00BC7D]";
  }
}

export default function UnlockedLeads() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState({ searchTerm: "", page: 1 });

  const searchTerm = searchQuery.trim();
  const isSearchPending = searchTerm !== query.searchTerm;

  // Commit the search and page reset together so SWR skips requests for intermediate input.
  useEffect(() => {
    if (!isSearchPending) return;

    const timer = setTimeout(() => setQuery({ searchTerm, page: 1 }), 300);
    return () => clearTimeout(timer);
  }, [isSearchPending, searchTerm]);

  // Break ties by ID so leads with the same timestamp have a stable page order.
  const params = new URLSearchParams({
    page: String(query.page),
    limit: "20",
    sort: "-createdAt -_id",
  });
  if (activeTab !== "all") params.set("status", activeTab);
  if (query.searchTerm) params.set("searchTerm", query.searchTerm);

  const accessesKey = isSearchPending
    ? null
    : `${apiKeys.leadAccesses}?${params}`;

  const { data, error, isLoading, mutate } = useSWR<{
    data?: LeadAccess[];
    pagination?: LeadAccessPagination;
  }>(accessesKey);

  const accesses = data?.data ?? [];
  const pagination = data?.pagination;
  const lastPage = pagination ? Math.max(1, pagination.totalPage) : null;

  // A status change can leave the current page beyond the filtered results.
  useEffect(() => {
    if (lastPage === null || query.page <= lastPage) return;
    setQuery((current) => ({ ...current, page: lastPage }));
  }, [lastPage, query.page]);

  const isLoadingResults =
    isSearchPending || isLoading || (lastPage !== null && query.page > lastPage);

  const handleTabChange = (value: TabValue) => {
    setActiveTab(value);
    setQuery((current) => ({ ...current, page: 1 }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
          Unlocked Leads
        </h1>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            aria-label="Search unlocked leads by title or address"
            placeholder="Search by title or address"
            maxLength={100}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-xl border-slate-200 bg-white pr-4 pl-9 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus-visible:border-[#00BC7D] focus-visible:ring-0 sm:text-sm"
          />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs"
      >
        <TabsList
          aria-label="Lead status"
          variant="line"
          className="h-auto w-full justify-start gap-6 overflow-x-auto border-b border-slate-200 px-6 pt-4 pb-0 scrollbar-none group-data-horizontal/tabs:h-auto"
        >
          {tabValues.map((value) => (
            <TabsTrigger
              key={value}
              value={value}
              className="h-auto flex-none cursor-pointer rounded-none border-0 px-0 pt-0 pb-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 focus-visible:ring-inset data-active:font-bold data-active:text-[#00BC7D] after:bg-[#00BC7D] group-data-horizontal/tabs:after:bottom-0 sm:text-sm"
            >
              <span>
                {value === "all" ? "All" : LEAD_ACCESS_STATUS_LABELS[value]}
              </span>
              {/* The API returns a total for the current filter only. */}
              {value === activeTab && pagination && (
                <Badge className="bg-[#00BC7D]/10 text-[11px] font-bold text-[#00BC7D]">
                  {pagination.total}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabValues.map((value) => (
          <TabsContent key={value} value={value} keepMounted>
            {value === activeTab &&
              (isLoadingResults ? (
                <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-500">
                  <Loader2 className="size-4 animate-spin text-[#00BC7D]" />
                  <span>Loading unlocked leads…</span>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600 sm:text-sm">
                    {error instanceof Error
                      ? error.message
                      : "Failed to load unlocked leads. Please try again."}
                  </p>
                  <Button
                    type="button"
                    onClick={() => mutate()}
                    className="mt-4 h-9 rounded-full bg-slate-900 px-5 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    Retry
                  </Button>
                </div>
              ) : accesses.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Lock className="mx-auto mb-2 size-10 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-600">
                    {query.searchTerm
                      ? "No matching leads found"
                      : "No leads in this tab"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {query.searchTerm
                      ? "Try adjusting your search query."
                      : "Unlock new leads from the marketplace to start contacting clients."}
                  </p>
                  <Button
                    render={
                      <Link
                        href="/dashboard/leads"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#00BC7D] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#00d68f]"
                      />
                    }
                  >
                    <Search className="size-3.5" />
                    <span>Browse Leads</span>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {accesses.map((item) => {
                    const lead = getAccessLead(item);
                    if (!lead) return null;

                    const categoryName =
                      typeof lead.category === "object"
                        ? lead.category?.name
                        : "General";
                    const clientName = lead.client?.name || "Client";
                    const initial = clientName.charAt(0).toUpperCase() || "C";
                    const location =
                      lead.client?.address || lead.address || "Italy";
                    const cost =
                      item.creditCost ||
                      (typeof lead.category === "object"
                        ? lead.category?.creditCost
                        : 0) ||
                      0;

                    return (
                      <Link
                        key={item._id}
                        href={`/dashboard/unlock-lead/${item._id}`}
                        className="group flex cursor-pointer items-center justify-between gap-4 p-4 transition-colors hover:bg-slate-50/70 sm:p-5"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-sm font-bold text-[#059669] transition-colors group-hover:bg-[#00BC7D] group-hover:text-white">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-xs font-bold text-slate-900 transition-colors group-hover:text-[#00BC7D] sm:text-sm">
                              {lead.title}
                            </h3>
                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {clientName} · {location}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                          <span className="hidden text-xs font-normal text-slate-400 md:inline">
                            {categoryName}
                          </span>
                          <span className="hidden text-xs text-slate-400 sm:inline">
                            {formatLeadDate(item.unlockedAt || item.createdAt)}
                          </span>
                          <span className="text-xs font-bold text-[#00BC7D] sm:text-sm">
                            {cost}cr
                          </span>
                          <Badge
                            variant="outline"
                            className={`h-auto rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                              item.status,
                            )}`}
                          >
                            {LEAD_ACCESS_STATUS_LABELS[item.status]}
                          </Badge>
                          <ChevronRight className="size-4 text-slate-400 transition-colors group-hover:text-slate-700" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            {value === activeTab &&
              !isLoadingResults &&
              !error &&
              pagination &&
              pagination.totalPage > 1 && (
                <nav
                  aria-label="Unlocked leads pages"
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:px-5"
                >
                  <span className="text-sm text-slate-600" aria-live="polite">
                    Page {pagination.page} of {pagination.totalPage}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={query.page <= 1}
                      onClick={() => setQuery({ ...query, page: query.page - 1 })}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={query.page >= pagination.totalPage}
                      onClick={() => setQuery({ ...query, page: query.page + 1 })}
                    >
                      Next
                    </Button>
                  </div>
                </nav>
              )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
