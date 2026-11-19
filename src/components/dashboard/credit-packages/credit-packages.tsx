"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { useCurrentUser } from "@/hooks/use-current-user";
import type {
  CreditPackage,
  CreditPackagePagination,
  CreditPurchaseCheckout,
} from "@/types/credit-package.interface";

function pricePerCreditLabel(pkg: CreditPackage) {
  if (!pkg.creditsAmount) return "—";
  const rate = pkg.price / pkg.creditsAmount;
  return `€ ${rate.toFixed(2)}/credit`;
}

function packageBadge(pkg: CreditPackage) {
  if (pkg.tag === "popular") {
    return { label: "Most popular", tone: "green" as const };
  }
  if (pkg.tag === "recommended") {
    return { label: "Recommended", tone: "black" as const };
  }
  return null;
}

export default function CreditPackages() {
  const { credits, isLoading: userLoading, refresh } = useCurrentUser();

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const { data, error, isLoading } = useSWR<{
    data?: CreditPackage[];
    pagination?: CreditPackagePagination;
  }>(`${apiKeys.creditPackages}?limit=20&sort=price`);

  const packages = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data?.data],
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId || packages.length === 0) return;
    const preferred =
      packages.find((pkg) => pkg.tag === "popular") ??
      packages.find((pkg) => pkg.tag === "recommended") ??
      packages[0];
    setSelectedId(preferred._id);
  }, [packages, selectedId]);

  const selectedPkg = packages.find((pkg) => pkg._id === selectedId) ?? null;

  const { trigger: startPurchase, isMutating } = useSWRMutation(
    apiKeys.creditPurchases,
    (_key: string, { arg }: { arg: { package: string } }) =>
      nextFetch<{ message?: string; data?: CreditPurchaseCheckout }>({
        url: `${apiKeys.creditPurchases}/create`,
        method: "POST",
        payload: arg,
      }),
    { populateCache: false },
  );

  const handlePurchase = async () => {
    if (!selectedPkg) return;

    try {
      const response = await startPurchase(
        { package: selectedPkg._id },
        { throwOnError: true },
      );
      const checkoutUrl = response?.data?.checkoutUrl;
      const purchaseId = response?.data?.purchase?._id;
      if (!checkoutUrl) {
        toast.error("Could not start checkout. Please try again.");
        return;
      }
      if (purchaseId) {
        try {
          sessionStorage.setItem("pending-credit-purchase-id", purchaseId);
        } catch {
          /* ignore quota / private mode */
        }
      }
      window.location.assign(checkoutUrl);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Could not start the payment. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-150">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
          Buy Credits
        </h1>
        <p className="text-xs text-slate-500 sm:text-sm">
          Choose the package best suited to your customer acquisition volume.
        </p>

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-[#E0F7EF] px-4 py-1.5 text-xs font-medium text-slate-600">
            Current balance:{" "}
            <span className="font-bold text-[#00BC7D]">
              {userLoading ? "…" : credits === null ? "—" : credits} credits
            </span>
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-500">
          <Loader2 className="size-4 animate-spin" />
          Loading packages…
        </div>
      ) : error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Could not load credit packages. Please try again."}
        </p>
      ) : packages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-700">No packages available</p>
          <p className="mt-1 text-xs text-slate-500">Check back soon for new credit packs.</p>
        </div>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => {
              const isSelected = selectedPkg?._id === pkg._id;
              const badge = packageBadge(pkg);

              return (
                <button
                  key={pkg._id}
                  type="button"
                  disabled={isMutating}
                  onClick={() => {
                    if (isMutating) return;
                    setSelectedId(pkg._id);
                  }}
                  className={`relative flex flex-col justify-between rounded-2xl border-2 p-6 text-left transition-colors duration-150 ${
                    isSelected
                      ? "border-[#00BC7D] bg-[#F3FAF7] shadow-sm"
                      : "border-slate-200/90 bg-white shadow-xs hover:border-slate-300"
                  } ${
                    isMutating
                      ? isSelected
                        ? "cursor-wait"
                        : "pointer-events-none cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  {badge ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] font-bold whitespace-nowrap shadow-xs ${
                          badge.tone === "green"
                            ? "bg-[#00BC7D] text-white"
                            : "bg-[#0F172A] text-white"
                        }`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  ) : null}

                  <div>
                    <p
                      className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
                        isSelected ? "text-[#00BC7D]" : "text-slate-900"
                      }`}
                    >
                      {pkg.creditsAmount}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-400">credits</p>

                    <div className="mt-5">
                      <p className="text-lg font-bold text-slate-900 sm:text-xl">
                        € {pkg.price}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {pricePerCreditLabel(pkg)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">{pkg.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {pkg.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mx-auto max-w-md space-y-2 pt-2 text-center">
            <button
              type="button"
              disabled={!selectedPkg || isMutating}
              onClick={handlePurchase}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#00d68f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[400px]"
            >
              {isMutating ? <Loader2 className="size-4 animate-spin" /> : null}
              {selectedPkg
                ? `Proceed to purchase - ${selectedPkg.creditsAmount} credits for € ${selectedPkg.price}`
                : "Select a package"}
            </button>
            <p className="text-xs text-slate-400">
              Credits never expire · Secure Stripe checkout
            </p>
          </div>
        </>
      )}
    </div>
  );
}
