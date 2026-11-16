"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDirectSuccess = searchParams.get("success") === "true";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isSuccess, setIsSuccess] = useState(isDirectSuccess);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "New password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Password updated successfully!");
    }, 600);
  };

  // Screen 6: Password Changed Success Card (Matches media_1793251451787_7faeb2a6.jpg)
  if (isSuccess) {
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

  // Input Form (Screen 5)
  return (
    <div className="bg-[#ECEFF2] text-slate-900 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-300/40">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900">
          Reset Password
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-zinc-500 mb-5 leading-relaxed">
        Enter your new password below.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Minimum 8 characters"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.password
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            placeholder="Minimum 8 characters"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.confirmPassword
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Confirm</span>
            )}
          </button>

          <Link
            href="/login"
            className="w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] text-slate-700 rounded-full font-semibold text-xs sm:text-sm border border-slate-300/70 text-center flex items-center justify-center transition-colors cursor-pointer"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
