"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PasswordChangedPage() {
  return (
    <div className="bg-[#ECEFF2] text-slate-900 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-300/40 text-center">
      {/* Celebration Confetti & Checkmark Graphic */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-5">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 120 120"
          fill="none"
        >
          {/* Blue confetti particles */}
          <rect x="22" y="20" width="3.5" height="7.5" rx="1.5" transform="rotate(-28 22 20)" fill="#3B82F6" />
          <rect x="96" y="22" width="3.5" height="7" rx="1.5" transform="rotate(22 96 22)" fill="#3B82F6" />
          <rect x="16" y="52" width="3.5" height="6.5" rx="1.5" transform="rotate(42 16 52)" fill="#60A5FA" />
          <rect x="101" y="52" width="3.5" height="8" rx="1.5" transform="rotate(-32 101 52)" fill="#2563EB" />
          <rect x="78" y="98" width="3.5" height="7" rx="1.5" transform="rotate(32 78 98)" fill="#3B82F6" />
          <circle cx="58" cy="108" r="2" fill="#2563EB" />

          {/* Amber / Yellow confetti particles */}
          <rect x="36" y="10" width="3.5" height="7" rx="1.5" transform="rotate(12 36 10)" fill="#F59E0B" />
          <rect x="84" y="12" width="3.5" height="7" rx="1.5" transform="rotate(-18 84 12)" fill="#FBBF24" />
          <circle cx="18" cy="38" r="2.5" fill="#F59E0B" />
          <circle cx="104" cy="74" r="2.5" fill="#FBBF24" />
          <rect x="32" y="94" width="3.5" height="7" rx="1.5" transform="rotate(-38 32 94)" fill="#F59E0B" />

          {/* Green confetti particles */}
          <rect x="14" y="78" width="3.5" height="6" rx="1.5" transform="rotate(25 14 78)" fill="#10B981" />
          <circle cx="98" cy="36" r="2.5" fill="#059669" />
          <circle cx="26" cy="98" r="2" fill="#10B981" />
          <rect x="66" y="104" width="3.5" height="6" rx="1.5" transform="rotate(-15 66 104)" fill="#00BC7D" />

          {/* Orange confetti particles */}
          <rect x="54" y="6" width="3.5" height="7" rx="1" transform="rotate(-8 54 6)" fill="#FB923C" />
          <circle cx="106" cy="46" r="2" fill="#F97316" />
          <circle cx="14" cy="64" r="2" fill="#FB923C" />
        </svg>

        {/* Green Checkmark Circle */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-[#00BC7D] flex items-center justify-center shadow-lg shadow-[#00BC7D]/30">
          <Check className="w-8 h-8 text-white stroke-[3.5]" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Password changed!
      </h1>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mb-6 sm:mb-8 leading-relaxed">
        Your password has been updated successfully. You can now sign in securely.
      </p>

      {/* Confirm Button */}
        <Link
          href="/login"
          className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center cursor-pointer transform hover:-translate-y-0.5"
        >
          Confirm
        </Link>
    </div>
  );
}

