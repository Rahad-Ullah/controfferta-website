"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Check, Loader2 } from "lucide-react";
import { apiKeys } from "@/lib/api/keys";
import { refreshCurrentUser, useCurrentUser } from "@/hooks/use-current-user";
import type {
  CreditPurchase,
  CreditPurchasePagination,
} from "@/types/credit-purchase.interface";

const POLL_MS = 2000;
const MAX_POLLS = 15;
const PENDING_PURCHASE_KEY = "pending-credit-purchase-id";
const sessionPurchaseKey = (sessionId: string) =>
  `credit-purchase-session:${sessionId}`;

function packageName(purchase: CreditPurchase | null) {
  if (!purchase) return null;
  return typeof purchase.package === "object" ? purchase.package.name : null;
}

function transactionId(purchase: CreditPurchase | null) {
  if (!purchase?.transaction) return null;
  if (typeof purchase.transaction === "string") return purchase.transaction;
  return purchase.transaction.uid || purchase.transaction.gatewayReferenceId || null;
}

function matchesSession(purchase: CreditPurchase, sessionId: string) {
  const txn = purchase.transaction;
  if (!txn || typeof txn === "string") return false;
  return txn.gatewayReferenceId === sessionId;
}

function isPurchasePaid(purchase: CreditPurchase | null) {
  if (!purchase) return false;
  if (purchase.paymentStatus === "paid") return true;
  const txn = purchase.transaction;
  return typeof txn === "object" && txn?.isPaid === true;
}

function readStoredPurchaseId(sessionId: string) {
  if (typeof window === "undefined") return null;
  try {
    return (
      sessionStorage.getItem(sessionPurchaseKey(sessionId)) ||
      sessionStorage.getItem(PENDING_PURCHASE_KEY)
    );
  } catch {
    return null;
  }
}

function rememberPurchaseId(sessionId: string, purchaseId: string) {
  try {
    sessionStorage.setItem(sessionPurchaseKey(sessionId), purchaseId);
    sessionStorage.setItem(PENDING_PURCHASE_KEY, purchaseId);
  } catch {
    /* ignore */
  }
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id")?.trim() || "";
  const { credits, refresh } = useCurrentUser({ enabled: Boolean(sessionId) });
  const [lockedPurchaseId, setLockedPurchaseId] = useState<string | null>(() =>
    sessionId ? readStoredPurchaseId(sessionId) : null,
  );
  const paidRef = useRef(false);

  const purchasesKey = sessionId
    ? `${apiKeys.creditPurchases}?limit=10&sort=-createdAt`
    : null;

  const { data: listData, isLoading: listLoading, mutate: mutateList } = useSWR<{
    data?: CreditPurchase[];
    pagination?: CreditPurchasePagination;
  }>(purchasesKey);

  const purchaseKey = lockedPurchaseId
    ? `${apiKeys.creditPurchases}/${lockedPurchaseId}`
    : null;

  const {
    data: purchaseData,
    isLoading: purchaseLoading,
    mutate: mutatePurchase,
  } = useSWR<{ data?: CreditPurchase }>(purchaseKey);

  const matchedFromList = useMemo(() => {
    const rows = Array.isArray(listData?.data) ? listData.data : [];
    return rows.find((purchase) => matchesSession(purchase, sessionId)) ?? null;
  }, [listData, sessionId]);

  useEffect(() => {
    if (!sessionId || !matchedFromList?._id) return;
    if (lockedPurchaseId === matchedFromList._id) return;
    rememberPurchaseId(sessionId, matchedFromList._id);
    setLockedPurchaseId(matchedFromList._id);
  }, [lockedPurchaseId, matchedFromList, sessionId]);

  const matchedPurchase =
    purchaseData?.data ?? matchedFromList ?? null;

  const creditsApplied = isPurchasePaid(matchedPurchase);
  useEffect(() => {
    paidRef.current = creditsApplied;
  }, [creditsApplied]);
  const checkoutFound = Boolean(matchedPurchase);
  const isLoadingPurchase =
    Boolean(sessionId) && !checkoutFound && (listLoading || purchaseLoading);

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    let cancelled = false;

    const tick = async () => {
      if (cancelled || paidRef.current) return;
      attempts += 1;
      await Promise.all([
        mutateList(),
        mutatePurchase(),
        refresh(),
        refreshCurrentUser(),
      ]);
    };

    void tick();
    const timer = window.setInterval(() => {
      if (cancelled || paidRef.current || attempts >= MAX_POLLS) {
        window.clearInterval(timer);
        return;
      }
      void tick();
    }, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [mutateList, mutatePurchase, refresh, sessionId]);

  useEffect(() => {
    if (!creditsApplied) return;
    void refresh();
    void refreshCurrentUser();
  }, [creditsApplied, refresh]);

  const creditsAdded = matchedPurchase?.creditsAmount ?? 0;
  const displayBalance =
    creditsApplied && credits !== null
      ? credits
      : (credits ?? 0) + creditsAdded;

  if (!sessionId) {
    return (
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
        <h1 className="text-xl font-bold text-slate-900">Payment session missing</h1>
        <p className="mt-2 text-sm text-slate-500">
          We could not find a Stripe session on this page. If you completed a purchase, check your
          credits in the dashboard.
        </p>
        <Link
          href="/dashboard/credit-packages"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white transition-colors hover:bg-[#00d68f]"
        >
          Back to packages
        </Link>
      </div>
    );
  }

  if (isLoadingPurchase) {
    return (
      <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-white p-10 text-slate-500 shadow-xs">
        <Loader2 className="size-6 animate-spin text-[#00BC7D]" />
        <p className="text-sm">Loading your payment…</p>
      </div>
    );
  }

  if (!checkoutFound) {
    return (
      <div className="w-full space-y-5 rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <Loader2 className="size-6 animate-spin" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment received</h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Stripe confirmed the checkout. We could not match the purchase yet — check your credit
            balance in the dashboard in a moment.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/leads"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white transition-colors hover:bg-[#00d68f]"
          >
            Browse Leads
          </Link>
          <Link
            href="/dashboard/credits"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-8 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            View credits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#E0F7EF] text-[#00BC7D]">
        <Check className="size-7 stroke-[3]" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payment successful!</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          You have added{" "}
          <span className="font-bold text-[#00BC7D]">{creditsAdded} credits</span> to your
          account.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-left text-xs sm:text-sm">
        {packageName(matchedPurchase) ? (
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Package</span>
            <span className="font-bold text-slate-900">{packageName(matchedPurchase)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Credits added</span>
          <span className="font-mono font-bold text-[#00BC7D]">{creditsAdded}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">New balance</span>
          <span className="font-mono font-bold text-slate-900">{displayBalance}</span>
        </div>
        <div className="my-2 border-t border-slate-200/60" />
        <div className="flex items-center justify-between gap-3">
          <span className="shrink-0 text-slate-500">Session</span>
          <span className="truncate font-mono text-[11px] text-slate-600">{sessionId}</span>
        </div>
        {transactionId(matchedPurchase) ? (
          <div className="flex items-center justify-between gap-3">
            <span className="shrink-0 text-slate-500">Transaction</span>
            <span className="truncate font-mono text-[11px] text-slate-600">
              {transactionId(matchedPurchase)}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard/leads"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white transition-colors hover:bg-[#00d68f]"
        >
          Browse Leads
        </Link>
        <Link
          href="/dashboard/credits"
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-8 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
        >
          View credits
        </Link>
      </div>
    </div>
  );
}
