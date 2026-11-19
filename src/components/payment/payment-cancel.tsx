"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="w-full space-y-5 rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <X className="size-7 stroke-[2.5]" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payment cancelled</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          No credits were added. You can return to the packages page and try again whenever you are
          ready.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard/credit-packages"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white transition-colors hover:bg-[#00d68f]"
        >
          Back to packages
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-8 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
