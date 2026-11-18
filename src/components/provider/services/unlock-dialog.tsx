"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleCheck, Lock } from "lucide-react";

const benefits = [
  "Full customer contact details",
  "Complete lead information",
  "Manage your unlocked leads",
];

export default function UnlockLeadDialog({
  open,
  onClose,
  redirectTo = "/dashboard/browser-leads",
}: {
  open: boolean;
  onClose: () => void;
  /** Where to send the user after login / signup completes. */
  redirectTo?: string;
}) {
  const redirectQuery = `redirect=${encodeURIComponent(redirectTo)}`;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-lead-title"
        className="w-full max-w-[400px] rounded-[28px] bg-white px-6 py-8 text-center text-slate-900 shadow-2xl sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-[#E7F8F1] text-[#12a37a]">
          <Lock className="size-6" strokeWidth={1.75} />
        </span>
        <h2 id="unlock-lead-title" className="mt-5 text-xl font-bold tracking-tight">
          Unlock this lead
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
          Create an account to unlock this lead and access the full customer details.
        </p>

        <div className="mt-6 rounded-2xl bg-[#F4F7FB] px-5 py-4 text-left">
          <p className="text-center text-sm font-bold text-slate-900">Get Access to:</p>
          <ul className="mt-3 space-y-2.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-sm text-slate-600">
                <CircleCheck className="size-4 shrink-0 text-[#00BC7D]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/register?${redirectQuery}`}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-[#00D492] text-sm font-semibold text-white hover:bg-[#00BC7D]"
        >
          Sign Up to Unlock
        </Link>
        <p className="mt-3 text-xs text-slate-500">
          Already have an account?{" "}
          <Link href={`/login?${redirectQuery}`} className="font-semibold text-[#00BC7D] hover:underline">
            Sign In
          </Link>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
