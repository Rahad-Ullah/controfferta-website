"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Coins,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { apiKeys } from "@/lib/api/keys";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import type { CreditLedger } from "@/types/credit-ledger.interface";
import type {
  CreditPackage,
  CreditPackagePagination,
  CreditPurchaseCheckout,
} from "@/types/credit-package.interface";
import type { LeadAccess, LeadAccessPagination } from "@/types/lead-access.interface";

type ApiList<T, P> = {
  data?: T[];
  pagination?: P;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function ledgerLabel(entry: CreditLedger) {
  switch (entry.type) {
    case "unlock":
      return "Lead unlocked";
    case "purchase":
      return "Credit purchase";
    case "welcome":
      return "Welcome credits";
    case "refund":
      return "Credit refund";
    default:
      return "Credit adjustment";
  }
}

function ledgerTypeLabel(type: CreditLedger["type"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function CreditsPage() {
  const { credits, isLoading: userLoading } = useCurrentUser();
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const { data: ledgerResponse, error: ledgerError, isLoading: ledgerLoading } =
    useSWR<ApiList<CreditLedger, { page: number; limit: number; total: number; totalPage: number }>>(
      `${apiKeys.creditLedgers}?limit=20&sort=-createdAt`,
    );
  const { data: accessResponse } = useSWR<ApiList<LeadAccess, LeadAccessPagination>>(
    `${apiKeys.leadAccesses}?limit=100&sort=-unlockedAt`,
  );
  const { data: packageResponse, error: packageError, isLoading: packagesLoading } =
    useSWR<ApiList<CreditPackage, CreditPackagePagination>>(
      `${apiKeys.creditPackages}?limit=20&sort=price`,
    );

  const ledger = ledgerResponse?.data ?? [];
  const leadAccessById = useMemo(
    () => new Map((accessResponse?.data ?? []).map((access) => [access._id, access])),
    [accessResponse?.data],
  );
  const packages = packageResponse?.data ?? [];
  const creditsUsed = ledger.reduce(
    (total, entry) => total + (entry.amount < 0 ? Math.abs(entry.amount) : 0),
    0,
  );

  const { trigger: startPurchase, isMutating } = useSWRMutation(
    apiKeys.creditPurchases,
    (_key: string, { arg }: { arg: { package: string } }) =>
      nextFetch<{ data?: CreditPurchaseCheckout }>({
        url: `${apiKeys.creditPurchases}/create`,
        method: "POST",
        payload: arg,
      }),
    { populateCache: false },
  );

  const handleBuyCredits = async (pkg: CreditPackage) => {
    try {
      const response = await startPurchase({ package: pkg._id }, { throwOnError: true });
      const checkoutUrl = response?.data?.checkoutUrl;
      const purchaseId = response?.data?.purchase?._id;
      if (!checkoutUrl) {
        toast.error("Could not start checkout. Please try again.");
        return;
      }
      if (purchaseId) sessionStorage.setItem("pending-credit-purchase-id", purchaseId);
      window.location.assign(checkoutUrl);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not start the payment. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Top Up Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Credit Balance
        </h1>
        <Link
          href="/dashboard/credit-packages"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Top Up Credits</span>
        </Link>
      </div>

      {/* Top 2 Stats Cards (Image 1) */}
      <div className="grid w-full max-w-2xl grid-cols-1 items-center gap-4 sm:grid-cols-2">
        {/* Card 1: Current Balance */}
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <p className="text-3xl font-bold text-[#EA580C]">
            {userLoading ? "…" : credits ?? "—"}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">Current Balance</p>
        </div>

        {/* Card 2: Credits Used */}
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <p className="text-3xl font-bold text-slate-900">
            {ledgerLoading ? "…" : creditsUsed}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">Credits Used</p>
        </div>
      </div>

      {/* Main Table Card: Recent Usage (Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Title */}
        <div className="p-6 pb-4">
          <h2 className="text-base font-bold text-slate-900">Recent Usage</h2>
        </div>

        {/* Columns Header Row */}
        <div className="overflow-x-auto bg-slate-50 [scrollbar-color:#6EE7B7_#F1F5F9] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-300 [&::-webkit-scrollbar-thumb:hover]:bg-emerald-400">
          <div className="min-w-190">
            <div className="grid grid-cols-12 px-6 py-3 border-t border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-3 sm:col-span-2">Date</div>
              <div className="col-span-4 sm:col-span-4">Lead</div>
              <div className="col-span-2 sm:col-span-2">Type</div>
              <div className="col-span-2 sm:col-span-2 text-right sm:text-left">Credits</div>
              <div className="col-span-1 sm:col-span-2 text-right sm:text-left">Balance</div>
            </div>

            {ledgerLoading ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading usage…
          </div>
        ) : ledgerError ? (
          <div className="px-6 py-12 text-center text-sm text-red-600">
            Could not load credit usage. Please try again.
          </div>
        ) : ledger.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            No credit activity yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {ledger.map((entry) => {
              const accessId = entry.reference?.type === "lead_access" ? entry.reference.id : null;
              const access = accessId ? leadAccessById.get(accessId) : undefined;
              const lead = access && typeof access.lead !== "string" ? access.lead : null;
              const title = lead?.title ?? ledgerLabel(entry);
              const subtitle = lead?.category?.name ?? entry.note ?? entry.type;
              const amountClass =
                entry.amount > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : entry.amount < 0
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-600";
              const amountLabel = entry.amount > 0 ? `+${entry.amount}` : entry.amount;

              return (
                <div
                  key={entry._id}
                  className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50/70 transition-colors"
                >
                  <div className="col-span-3 sm:col-span-2 text-slate-500 text-xs">
                    {formatDateTime(entry.createdAt)}
                  </div>
                  <div className="col-span-4 sm:col-span-4 min-w-0 pr-3">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {subtitle}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-2 truncate text-[11px] font-semibold capitalize text-slate-500">
                    {ledgerTypeLabel(entry.type)}
                  </div>
                  <div className="col-span-2 sm:col-span-2 text-right sm:text-left">
                    <span className={`inline-flex items-center justify-center min-w-[2.2rem] px-2.5 py-0.5 rounded-full font-bold text-xs font-mono ${amountClass}`}>
                      {amountLabel}
                    </span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-right text-xs font-bold text-slate-700 sm:text-left">
                    {entry.balanceAfter}
                  </div>
                </div>
              );
            })}
          </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP UP CREDITS MODAL */}
      {topUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setTopUpModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-[#00BC7D]" />
            <h3 className="text-lg font-bold text-slate-900">Top Up Credits</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">Select a package to continue to secure Stripe checkout.</p>

            <div className="space-y-3 mb-6">
              {packagesLoading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading packages…
                </div>
              ) : packageError ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  Could not load credit packages. Please try again.
                </p>
              ) : packages.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">No packages available.</p>
              ) : (
                packages.map((pkg) => (
                  <button
                    key={pkg._id}
                    type="button"
                    disabled={isMutating}
                    onClick={() => handleBuyCredits(pkg)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-[#00BC7D] hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-60"
                  >
                    <span>
                      <span className="block text-xs font-bold text-slate-900 sm:text-sm">
                        {pkg.name} ({pkg.creditsAmount} Credits)
                      </span>
                      <span className="mt-0.5 block text-[11px] text-slate-500">{pkg.description}</span>
                    </span>
                    <span className="ml-4 shrink-0 text-sm font-extrabold text-[#00BC7D]">€{pkg.price}</span>
                  </button>
                ))
              )}
              {false && <div className="hidden">
              <div
                onClick={() => packages[0] && handleBuyCredits(packages[0])}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Starter Package (50 Credits)</h4>
                  <p className="text-[11px] text-slate-500">Unlock 3-5 verified leads</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€49 + VAT</span>
              </div>

              <div
                onClick={() => packages[1] && handleBuyCredits(packages[1])}
                className="p-4 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border-2 border-[#00BC7D] flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Pro Growth (150 Credits)</h4>
                    <span className="text-[9px] bg-[#00BC7D] text-white px-1.5 py-0.2 rounded font-extrabold">POPULAR</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Unlock 10-15 verified leads (Save 15%)</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€129 + VAT</span>
              </div>

              <div
                onClick={() => packages[2] && handleBuyCredits(packages[2])}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Enterprise (500 Credits)</h4>
                  <p className="text-[11px] text-slate-500">Maximum savings for large companies (Save 30%)</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€349 + VAT</span>
              </div>
              </div>}
            </div>

            <button
              type="button"
              onClick={() => setTopUpModalOpen(false)}
              className="w-full h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
