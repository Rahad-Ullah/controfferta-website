"use client";

import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import {
  formatLeadBudget,
  formatLeadDate,
  formatLeadPhone,
} from "@/components/dashboard/leads/lead-format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Lead } from "@/types/lead.interface";
import {
  type LeadAccess,
  type LeadAccessStatus,
  LEAD_ACCESS_STATUS_LABELS,
  LEAD_ACCESS_STATUS_TRANSITIONS,
} from "@/types/lead-access.interface";

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

export default function UnlockedLeadDetail({ id }: { id: string }) {
  const { mutate: globalMutate } = useSWRConfig();

  const accessKey = apiKeys.leadAccess(id);
  const { data, error, isLoading, mutate } = useSWR<{ data?: LeadAccess }>(
    accessKey,
  );

  const access = data?.data ?? null;
  const lead = access ? getAccessLead(access) : null;

  const { trigger: updateStatusMutation, isMutating: isUpdatingStatus } =
    useSWRMutation(
      accessKey,
      (_key: string, { arg }: { arg: { status: LeadAccessStatus } }) =>
        nextFetch<{ message?: string; data?: LeadAccess }>({
          url: `${apiKeys.leadAccesses}/${id}/status`,
          method: "PATCH",
          payload: { status: arg.status },
        }),
      { populateCache: false },
    );

  const handleStatusChange = async (newStatus: LeadAccessStatus) => {
    if (!access || isUpdatingStatus) return;
    if (newStatus === access.status) return;

    const allowed = LEAD_ACCESS_STATUS_TRANSITIONS[access.status];
    if (!allowed.includes(newStatus)) {
      toast.error(
        `Cannot change status from "${LEAD_ACCESS_STATUS_LABELS[access.status]}" to "${LEAD_ACCESS_STATUS_LABELS[newStatus]}".`,
      );
      return;
    }

    try {
      const response = await updateStatusMutation(
        { status: newStatus },
        { throwOnError: true },
      );
      // Moving a lead can change both the rows and totals in multiple status filters.
      await Promise.all([
        mutate(),
        globalMutate(
          (key) =>
            typeof key === "string" && key.startsWith(apiKeys.leadAccesses),
        ),
      ]);
      toast.success(
        response?.message ||
          `Status updated to "${LEAD_ACCESS_STATUS_LABELS[newStatus]}".`,
      );
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to update lead status. Please try again.";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center gap-2 py-24 text-sm text-slate-500">
        <Loader2 className="size-5 animate-spin text-[#00BC7D]" />
        <span>Loading lead details…</span>
      </div>
    );
  }

  if (error || !access || !lead) {
    return (
      <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
        <p className="text-sm font-semibold text-slate-700">
          {error instanceof Error
            ? error.message
            : "Unlocked lead details could not be found."}
        </p>
        <Button
          render={
            <Link
              href="/dashboard/unlock-lead"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#00BC7D] px-6 text-xs font-bold text-white hover:bg-[#00d68f]"
            />
          }
        >
          <ArrowLeft className="size-4" />
          <span>Back to unlocked leads</span>
        </Button>
      </div>
    );
  }

  const categoryName =
    typeof lead.category === "object" ? lead.category?.name : "General";
  const creditsUsed =
    access.creditCost ||
    (typeof lead.category === "object" ? lead.category?.creditCost : 0) ||
    0;
  const phone = formatLeadPhone(lead.client?.phone);
  const email = lead.client?.email || "";

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <Link
        href="/dashboard/unlock-lead"
        className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-900 sm:text-sm"
      >
        <ArrowLeft className="size-4" />
        <span>Back to unlocked leads</span>
      </Link>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7 lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="h-auto rounded-full border-slate-200/60 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {categoryName}
            </Badge>
            <Badge
              variant="outline"
              className={`h-auto rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                access.status,
              )}`}
            >
              {LEAD_ACCESS_STATUS_LABELS[access.status]}
            </Badge>
          </div>

          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {lead.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-slate-400" />
              {lead.client?.address || lead.address || "Italy"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-slate-400" />
              {formatLeadDate(lead.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-slate-400" />
              {lead.timeline || "Flexible"}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              {formatLeadBudget(lead.budgetRange)}
            </span>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              Description
            </h2>
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              {lead.description || "No description provided."}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              Customer Contact Information
            </h2>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-[#E0F5EC] p-3.5 text-xs sm:text-sm">
                <span className="font-medium text-emerald-800">
                  Customer Name
                </span>
                <span className="font-bold text-slate-900">
                  {lead.client?.name || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-[#E0F5EC] p-3.5 text-xs sm:text-sm">
                <span className="font-medium text-emerald-800">Phone</span>
                {phone !== "—" ? (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-semibold text-slate-900 transition-colors hover:text-[#00BC7D]"
                  >
                    {phone}
                  </a>
                ) : (
                  <span className="font-semibold text-slate-500">—</span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-[#E0F5EC] p-3.5 text-xs sm:text-sm">
                <span className="font-medium text-emerald-800">Email</span>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-slate-900 transition-colors hover:text-[#00BC7D]"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="font-semibold text-slate-500">—</span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-[#E0F5EC] p-3.5 text-xs sm:text-sm">
                <span className="font-medium text-emerald-800">
                  Full Address
                </span>
                <span className="font-semibold text-slate-900">
                  {lead.client?.address || lead.address || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7 lg:col-span-5 xl:col-span-4">
          <h2 className="text-xs font-medium text-slate-500 sm:text-sm">
            Unlock Information
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Unlocked on</span>
              <span className="font-bold text-slate-900">
                {formatLeadDate(access.unlockedAt || access.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Credits used</span>
              <span className="font-bold text-slate-900">
                {creditsUsed} credits
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-900 sm:text-sm">
              Lead Status
            </label>
            <Select
              value={access.status}
              disabled={
                isUpdatingStatus ||
                LEAD_ACCESS_STATUS_TRANSITIONS[access.status].length === 0
              }
              onValueChange={(val) => {
                if (val) handleStatusChange(val as LeadAccessStatus);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-slate-50 px-4 text-xs font-semibold capitalize text-slate-800 focus-visible:border-[#00BC7D] focus-visible:ring-0 data-[size=default]:h-11 sm:text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="p-1">
                <SelectItem value={access.status}>
                  {LEAD_ACCESS_STATUS_LABELS[access.status]} (Current)
                </SelectItem>
                {LEAD_ACCESS_STATUS_TRANSITIONS[access.status].map((next) => (
                  <SelectItem key={next} value={next}>
                    Move to: {LEAD_ACCESS_STATUS_LABELS[next]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isUpdatingStatus ? (
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Loader2 className="size-3 animate-spin text-[#00BC7D]" />
                Updating status…
              </p>
            ) : LEAD_ACCESS_STATUS_TRANSITIONS[access.status].length === 0 ? (
              <p className="text-[11px] text-slate-400">
                This lead is completed and cannot be transitioned further.
              </p>
            ) : (
              <p className="text-[11px] text-slate-400">
                Next status:{" "}
                {LEAD_ACCESS_STATUS_TRANSITIONS[access.status]
                  .map((s) => LEAD_ACCESS_STATUS_LABELS[s])
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {phone !== "—" ? (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#00BC7D] text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#00d68f]"
              >
                <Phone className="size-3.5" />
                <span>Call Customer</span>
              </a>
            ) : (
              <Button
                type="button"
                disabled
                className="h-10 flex-1 rounded-xl bg-slate-100 text-xs font-medium text-slate-400"
              >
                <Phone className="size-3.5" />
                <span>No Phone</span>
              </Button>
            )}

            {email ? (
              <a
                href={`mailto:${email}`}
                className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                <Mail className="size-3.5" />
                <span>Send Email</span>
              </a>
            ) : (
              <Button
                type="button"
                disabled
                className="h-10 flex-1 rounded-xl bg-slate-100 text-xs font-medium text-slate-400"
              >
                <Mail className="size-3.5" />
                <span>No Email</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
