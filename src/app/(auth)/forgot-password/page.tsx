"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Email address is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Reset link sent! Please check your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
    }, 600);
  };

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
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            placeholder="e.g. marco@ferretti.it"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              error
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {error && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {error}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Send Reset Link</span>
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
