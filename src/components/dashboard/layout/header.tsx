"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coins, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { dashboardPageTitle } from "@/components/dashboard/layout/nav-links";

type DashboardHeaderProps = {
  onOpenMobileMenu: () => void;
};

export default function DashboardHeader({ onOpenMobileMenu }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user, credits, isLoading: userLoading } = useCurrentUser();
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "Account";
  const initials = user
    ? `${user.firstName?.trim()?.[0] ?? ""}${user.lastName?.trim()?.[0] ?? ""}`.toUpperCase() ||
      user.email.slice(0, 1).toUpperCase()
    : "?";
  const creditsLabel = userLoading ? "…" : credits === null ? "—" : String(credits);

  const handleBuyCredits = (amount: number, packageName: string) => {
    setBuyCreditsModalOpen(false);
    toast.info(`Placeholder. ${packageName} (${amount} credits) is not connected yet.`);
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200/70 bg-white/95 px-4 shadow-[0_1px_0_rgba(15,23,42,0.04),0_6px_16px_-8px_rgba(15,23,42,0.12)] backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200/80 hover:text-slate-900 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="truncate text-base font-bold text-slate-800 sm:text-lg">
            {dashboardPageTitle(pathname)}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setBuyCreditsModalOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-amber-300/80 bg-[#FFFDF5] px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-xs transition-colors hover:bg-amber-100/60 sm:text-sm"
          >
            <Coins className="size-3.5 shrink-0 text-amber-500" />
            <span>{creditsLabel} Credits</span>
          </button>

          <Link
            href="/dashboard/profile"
            className="inline-flex max-w-[11rem] items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pr-3 pl-1 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:max-w-[14rem]"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00BC7D]/15 text-xs font-semibold text-[#00BC7D]">
              {initials}
            </span>
            <span className="hidden min-w-0 truncate text-sm font-medium text-slate-700 sm:inline">
              {displayName}
            </span>
          </Link>
        </div>
      </header>

      {buyCreditsModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl">
            <button
              type="button"
              onClick={() => setBuyCreditsModalOpen(false)}
              className="absolute top-4 right-4 cursor-pointer p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>
            <div className="mb-2 flex items-center gap-2">
              <Coins className="size-5 text-[#00BC7D]" />
              <h3 className="text-lg font-bold text-slate-900">Top Up Credits (Demo Mode)</h3>
            </div>
            <p className="mb-5 text-xs text-slate-500">
              Select a credit package to instantly top up your account balance.
            </p>
            <div className="mb-6 space-y-3">
              <button
                type="button"
                onClick={() => handleBuyCredits(50, "Starter Package")}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:bg-slate-100"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Starter Package (50 Credits)</h4>
                  <p className="text-[11px] text-slate-500">Unlock 3-5 verified leads</p>
                </div>
                <span className="text-sm font-extrabold text-[#00BC7D]">€49 + VAT</span>
              </button>
              <button
                type="button"
                onClick={() => handleBuyCredits(150, "Pro Growth Package")}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-[#00BC7D] bg-emerald-50/50 p-4 text-left transition-all hover:bg-emerald-50"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">Pro Growth (150 Credits)</h4>
                    <span className="rounded bg-[#00BC7D] px-1.5 text-[9px] font-extrabold text-white">
                      POPULAR
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Unlock 10-15 verified leads (Save 15%)</p>
                </div>
                <span className="text-sm font-extrabold text-[#00BC7D]">€129 + VAT</span>
              </button>
              <button
                type="button"
                onClick={() => handleBuyCredits(500, "Enterprise Package")}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:bg-slate-100"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Enterprise (500 Credits)</h4>
                  <p className="text-[11px] text-slate-500">
                    Maximum savings for large companies (Save 30%)
                  </p>
                </div>
                <span className="text-sm font-extrabold text-[#00BC7D]">€349 + VAT</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setBuyCreditsModalOpen(false)}
              className="h-11 w-full cursor-pointer rounded-full bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
