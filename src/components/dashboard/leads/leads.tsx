"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Lock,
  LockOpen,
  Check,
  ArrowLeft,
  Phone,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  formatLeadBudget,
  formatLeadDate,
  formatLeadPhone,
} from "@/components/dashboard/leads/lead-format";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Category, CategoryPagination } from "@/types/category.interface";
import type { Lead, LeadPagination } from "@/types/lead.interface";
import type { LeadAccess, LeadAccessPagination } from "@/types/lead-access.interface";

const REGIONS = [
  "All regions",
  "Lombardia",
  "Veneto",
  "Emilia",
  "Lazio",
  "Campania",
  "Toscana",
  "Piemonte",
] as const;

const LEADS_PAGE_LIMIT = "24";

type BrowseLead = {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  timeline: string;
  creditsRequired: number;
  createdAt: string;
  isUnlocked: boolean;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
};

function leadIdFromAccess(access: LeadAccess) {
  return typeof access.lead === "string" ? access.lead : access.lead._id;
}

function clientFromAccess(access: LeadAccess | undefined) {
  if (!access || typeof access.lead === "string") return undefined;
  return access.lead.client;
}

function toBrowseLead(lead: Lead, access?: LeadAccess): BrowseLead {
  const client = clientFromAccess(access);
  return {
    id: lead._id,
    category: lead.category?.name ?? "—",
    title: lead.title,
    description: lead.description,
    location: lead.address,
    budget: formatLeadBudget(lead.budgetRange),
    timeline: lead.timeline || "—",
    creditsRequired: lead.category?.creditCost ?? 0,
    createdAt: formatLeadDate(lead.createdAt),
    isUnlocked: Boolean(access),
    customerName: client?.name,
    customerPhone: client ? formatLeadPhone(client.phone) : undefined,
    customerEmail: client?.email,
    customerAddress: client?.address,
  };
}

export default function Leads() {
  const { credits, refresh: refreshUser } = useCurrentUser();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("All regions");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery.trim());

  const [selectedLead, setSelectedLead] = useState<BrowseLead | null>(null);
  const [confirmModalLead, setConfirmModalLead] = useState<BrowseLead | null>(null);
  const [successModalLead, setSuccessModalLead] = useState<BrowseLead | null>(null);

  const { data: categoryList, isLoading: categoriesLoading } = useSWR<{
    data?: Category[];
    pagination?: CategoryPagination;
  }>(`${apiKeys.categories}?limit=50`);
  const categories = Array.isArray(categoryList?.data) ? categoryList.data : [];

  const leadsKey = useMemo(() => {
    const params = new URLSearchParams({
      limit: LEADS_PAGE_LIMIT,
      sort: "-createdAt",
    });
    if (selectedCategoryId !== "all") params.set("category", selectedCategoryId);
    // Feed search is address-only. Use typed search, else the region name.
    const searchTerm =
      deferredSearch || (selectedRegion !== "All regions" ? selectedRegion : "");
    if (searchTerm) params.set("searchTerm", searchTerm);
    return `${apiKeys.leads}?${params.toString()}`;
  }, [deferredSearch, selectedCategoryId, selectedRegion]);

  const {
    data: leadsResponse,
    error: leadsError,
    isLoading: leadsLoading,
    isValidating: leadsValidating,
    mutate: mutateLeads,
  } = useSWR<{ data?: Lead[]; pagination?: LeadPagination }>(leadsKey);

  const leadAccessKey = `${apiKeys.leadAccesses}?limit=60`;
  const { data: accessResponse, mutate: mutateAccesses } = useSWR<{
    data?: LeadAccess[];
    pagination?: LeadAccessPagination;
  }>(leadAccessKey);

  const accessByLeadId = useMemo(() => {
    const map = new Map<string, LeadAccess>();
    for (const access of accessResponse?.data ?? []) {
      map.set(leadIdFromAccess(access), access);
    }
    return map;
  }, [accessResponse?.data]);

  const browseLeads = useMemo(() => {
    const rows = Array.isArray(leadsResponse?.data) ? leadsResponse.data : [];
    let mapped = rows.map((lead) => toBrowseLead(lead, accessByLeadId.get(lead._id)));

    // When the user typed a search, region is only a client-side address filter.
    if (deferredSearch && selectedRegion !== "All regions") {
      const region = selectedRegion.toLowerCase();
      mapped = mapped.filter((lead) => lead.location.toLowerCase().includes(region));
    }

    return mapped;
  }, [accessByLeadId, deferredSearch, leadsResponse?.data, selectedRegion]);

  const { trigger: unlockLead, isMutating: unlocking } = useSWRMutation(
    apiKeys.leadAccesses,
    (_key: string, { arg }: { arg: { lead: string } }) =>
      nextFetch<{ message?: string; data?: LeadAccess }>({
        url: `${apiKeys.leadAccesses}/unlock`,
        method: "POST",
        payload: arg,
      }),
    { populateCache: false },
  );

  const creditBalance = credits ?? 0;
  const confirmHasEnoughCredits = confirmModalLead
    ? creditBalance >= confirmModalLead.creditsRequired
    : true;

  const handleConfirmUnlock = async () => {
    if (!confirmModalLead) return;
    const leadToUnlock = confirmModalLead;

    if (creditBalance < leadToUnlock.creditsRequired) {
      toast.error(
        `Not enough credits. You need ${leadToUnlock.creditsRequired} credits to unlock this lead.`,
      );
      return;
    }

    try {
      const response = await unlockLead({ lead: leadToUnlock.id }, { throwOnError: true });
      const access = response?.data;
      const unlocked: BrowseLead =
        access && typeof access.lead === "object"
          ? {
              ...toBrowseLead(access.lead, access),
              budget: leadToUnlock.budget,
              createdAt: leadToUnlock.createdAt,
              creditsRequired: leadToUnlock.creditsRequired || access.creditCost,
            }
          : { ...leadToUnlock, isUnlocked: true };

      setConfirmModalLead(null);
      setSuccessModalLead(unlocked);
      setSelectedLead(unlocked);
      await Promise.all([mutateAccesses(), mutateLeads(), refreshUser()]);
      toast.success(response?.message || "Lead unlocked successfully.");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Could not unlock this lead. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      {selectedLead ? (
        <div className="animate-in fade-in space-y-5 duration-150">
          <button
            type="button"
            onClick={() => setSelectedLead(null)}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-900 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7 lg:col-span-7 xl:col-span-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-slate-200/60 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {selectedLead.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedLead.isUnlocked
                      ? "border border-emerald-200 bg-[#E0F7EF] text-[#00BC7D]"
                      : "border border-emerald-200 bg-[#E0F7EF] text-[#00BC7D]"
                  }`}
                >
                  {selectedLead.isUnlocked ? "Unlocked" : "Available"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{selectedLead.title}</h2>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {selectedLead.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {selectedLead.createdAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {selectedLead.timeline}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-400">$</span>
                  {selectedLead.budget}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Description
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {selectedLead.description}
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Contact Information
                </h3>

                {selectedLead.isUnlocked ? (
                  <div className="space-y-2.5">
                    {[
                      ["Customer name", selectedLead.customerName],
                      ["Customer phone", selectedLead.customerPhone],
                      ["Customer email", selectedLead.customerEmail],
                      ["Customer full address", selectedLead.customerAddress],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-[#E8F8F2] p-3.5 text-xs"
                      >
                        <span className="font-medium text-slate-600">{label}</span>
                        {label === "Customer phone" && value ? (
                          <a
                            href={`tel:${value}`}
                            className="font-mono font-bold text-[#00BC7D] hover:underline"
                          >
                            {value}
                          </a>
                        ) : label === "Customer email" && value ? (
                          <a
                            href={`mailto:${value}`}
                            className="font-mono font-bold text-[#00BC7D] hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="font-bold text-slate-900">{value || "—"}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {["Customer name", "Customer phone", "Customer email", "Customer full address"].map(
                      (label) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs"
                        >
                          <div className="flex items-center gap-2 text-slate-500">
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{label}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-amber-600">
                            Unlock to view
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-5 xl:col-span-4">
              <div>
                <span className="text-xs font-medium text-slate-500">Credit Cost</span>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#00BC7D] sm:text-4xl">
                  {selectedLead.creditsRequired} credits
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Your Balance</span>
                  <span className="font-bold text-slate-900">{creditBalance} credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Remaining after unlock</span>
                  <span className="font-bold text-slate-900">
                    {Math.max(0, creditBalance - selectedLead.creditsRequired)} credits
                  </span>
                </div>
              </div>

              <div className="pt-2">
                {selectedLead.isUnlocked ? (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-default rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-xs font-bold text-[#00BC7D] sm:text-sm"
                  >
                    Lead Already Unlocked
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmModalLead(selectedLead)}
                    className="w-full cursor-pointer rounded-xl bg-[#00BC7D] py-3 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#00d68f] sm:text-sm"
                  >
                    Unlock Lead - {selectedLead.creditsRequired} Credits
                  </button>
                )}
                <p className="mt-2.5 text-center text-[11px] text-slate-400">
                  Full contact details revealed instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3.5 rounded-2xl border border-slate-300/60 bg-[#DFE5EA] p-4 shadow-xs sm:p-5">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <div className="relative w-full flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area..."
                  className="h-11 w-full rounded-xl border-slate-300/80 bg-[#EDF1F4] pr-4 pl-10 text-xs text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-[#00BC7D] focus-visible:bg-white focus-visible:ring-0 sm:text-sm"
                />
              </div>

              <Select
                value={selectedRegion}
                onValueChange={(value) => {
                  if (value) setSelectedRegion(value);
                }}
              >
                <SelectTrigger className="h-11 w-full cursor-pointer rounded-xl border-slate-300/80 bg-[#EDF1F4] px-4 text-xs font-medium text-slate-700 shadow-none focus-visible:border-[#00BC7D] focus-visible:ring-0 data-[size=default]:h-11 sm:w-[11.5rem] sm:text-sm">
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  alignItemWithTrigger={false}
                  className="min-w-[11.5rem] p-1"
                >
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-0.5">
              <button
                type="button"
                onClick={() => setSelectedCategoryId("all")}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategoryId === "all"
                    ? "bg-[#00BC7D] text-white shadow-xs"
                    : "border border-slate-300/60 bg-[#EDF1F4] text-slate-700 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {categoriesLoading ? (
                <span className="px-2 text-xs text-slate-500">Loading categories…</span>
              ) : (
                categories.map((category) => (
                  <button
                    key={category._id}
                    type="button"
                    onClick={() => setSelectedCategoryId(category._id)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategoryId === category._id
                        ? "bg-[#00BC7D] text-white shadow-xs"
                        : "border border-slate-300/60 bg-[#EDF1F4] text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">
              {leadsLoading
                ? "Loading leads…"
                : `${leadsResponse?.pagination?.total ?? browseLeads.length} leads found`}
              {leadsValidating && !leadsLoading ? (
                <Loader2 className="ml-2 inline size-3.5 animate-spin text-slate-400" />
              ) : null}
            </span>

            <div className="flex items-center gap-1.5 rounded-full border border-[#00BC7D]/40 bg-[#E0F7EF] px-3.5 py-1 text-xs font-bold text-[#00BC7D]">
              <Clock className="h-3.5 w-3.5 stroke-[2.2]" />
              <span>{creditBalance} credits available</span>
            </div>
          </div>

          {leadsError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {leadsError instanceof Error
                ? leadsError.message
                : "Could not load leads. Please try again."}
            </p>
          ) : null}

          {leadsLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
              <Loader2 className="size-4 animate-spin" />
              Loading leads…
            </div>
          ) : browseLeads.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-xs">
              <p className="text-sm font-semibold text-slate-700">No leads match these filters</p>
              <p className="mt-1 text-xs text-slate-500">Try another region, category, or search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {browseLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-slate-200/60 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                        {lead.category}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-[#E0F7EF] px-2.5 py-0.5 text-[11px] font-semibold text-[#00BC7D]">
                        {lead.isUnlocked ? "Unlocked" : "Available"}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedLead(lead)}
                      className="mt-3 cursor-pointer text-sm font-bold text-slate-900 transition-colors group-hover:text-[#00BC7D]"
                    >
                      {lead.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                      {lead.description}
                    </p>

                    <div className="mt-3.5 space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{lead.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span>{lead.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-400">$</span>
                        <span>{lead.budget}</span>
                      </div>
                    </div>

                    <div className="mt-3.5 flex items-center gap-2 rounded-xl border border-slate-200/60 bg-slate-100/90 px-3 py-2 text-xs text-slate-400">
                      <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {lead.isUnlocked
                          ? "Client contacts unlocked"
                          : "Customer name, phone and email hidden"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm font-extrabold text-[#00BC7D]">
                      {lead.creditsRequired} credits
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className={
                        lead.isUnlocked
                          ? "cursor-pointer rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-[#00BC7D] transition-colors hover:bg-[#00BC7D] hover:text-white"
                          : "cursor-pointer rounded-full bg-[#00BC7D] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#00d68f]"
                      }
                    >
                      {lead.isUnlocked ? "View Details" : "Unlock Lead"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {confirmModalLead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-3xl bg-white p-6 text-center text-slate-800 shadow-2xl duration-200">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0F7EF] text-[#00BC7D]">
              <LockOpen className="h-6 w-6 stroke-[2]" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Unlock this lead?</h3>
            <p className="mx-auto mt-1 mb-5 max-w-xs text-xs text-slate-500">
              You are about to use your credits to access the customer&apos;s full details.
            </p>

            <div className="mb-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-900">{confirmModalLead.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unlock cost</span>
                <span className="font-bold text-[#00BC7D]">
                  {confirmModalLead.creditsRequired} credits
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Current balance</span>
                <span
                  className={`font-bold ${confirmHasEnoughCredits ? "text-slate-900" : "text-red-600"}`}
                >
                  {creditBalance} credits
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Balance after</span>
                <span
                  className={`font-bold ${confirmHasEnoughCredits ? "text-slate-900" : "text-red-600"}`}
                >
                  {Math.max(0, creditBalance - confirmModalLead.creditsRequired)} credits
                </span>
              </div>
            </div>

            {!confirmHasEnoughCredits ? (
              <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                Not enough credits. You need{" "}
                {confirmModalLead.creditsRequired - creditBalance} more to unlock this lead.
              </p>
            ) : null}

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={unlocking}
                onClick={() => setConfirmModalLead(null)}
                className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-60"
              >
                Cancel
              </button>
              {confirmHasEnoughCredits ? (
                <button
                  type="button"
                  disabled={unlocking}
                  onClick={handleConfirmUnlock}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00BC7D] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00d68f] disabled:opacity-60"
                >
                  {unlocking ? <Loader2 className="size-3.5 animate-spin" /> : null}
                  Confirm Unlock
                </button>
              ) : (
                <Link
                  href="/dashboard/credit-packages"
                  onClick={() => setConfirmModalLead(null)}
                  className="inline-flex cursor-pointer items-center rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-slate-800"
                >
                  Buy Credits
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {successModalLead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-3xl bg-white p-6 text-center text-slate-800 shadow-2xl duration-200">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0F7EF] text-[#00BC7D]">
              <Check className="h-7 w-7 stroke-[3]" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Lead Unlocked!</h3>
            <p className="mt-1 mb-4 text-xs text-slate-500">
              You have access to the customer&apos;s full details.
            </p>

            <div className="mb-6 space-y-2.5 rounded-2xl border border-emerald-200/80 bg-[#E8F8F2] p-4 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Name</span>
                <span className="font-bold text-slate-900">
                  {successModalLead.customerName || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Phone</span>
                {successModalLead.customerPhone ? (
                  <a
                    href={`tel:${successModalLead.customerPhone}`}
                    className="font-mono font-bold text-[#00BC7D]"
                  >
                    {successModalLead.customerPhone}
                  </a>
                ) : (
                  <span className="font-bold text-slate-900">—</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Email</span>
                {successModalLead.customerEmail ? (
                  <a
                    href={`mailto:${successModalLead.customerEmail}`}
                    className="font-mono font-bold text-[#00BC7D]"
                  >
                    {successModalLead.customerEmail}
                  </a>
                ) : (
                  <span className="font-bold text-slate-900">—</span>
                )}
              </div>

              <div className="my-2 border-t border-emerald-200/60" />

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Request</span>
                <span className="font-bold text-slate-900">{successModalLead.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Budget</span>
                <span className="font-bold text-slate-900">{successModalLead.budget}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSuccessModalLead(null)}
                className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Close
              </button>
              {successModalLead.customerPhone ? (
                <a
                  href={`tel:${successModalLead.customerPhone}`}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#00BC7D] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00d68f]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Contact Now</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
