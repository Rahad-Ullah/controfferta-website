"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { nextFetch } from "@/lib/api/fetcher";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { trigger, isMutating } = useSWRMutation(
    "forget-password",
    (_key: string, { arg }: { arg: { email: string } }) =>
      nextFetch<{ message?: string }>({ url: "/auth/forget-password", method: "POST", payload: arg }),
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const trimmedEmail = email.trim();

    try {
      const response = await trigger({ email: trimmedEmail }, { throwOnError: true });
      toast.success(response?.message || "Reset code sent. Please check your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the reset code.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-300/40 bg-[#ECEFF2] p-8 text-slate-900 shadow-2xl sm:p-10">
      <div className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer text-slate-700 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">Reset Password</h1>
      </div>

      <p className="mb-5 text-xs leading-relaxed text-zinc-500 sm:text-sm">
        Enter your email address and we&apos;ll send you a code to reset your password.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
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
            className={`h-[46px] w-full rounded-xl border bg-[#E5E9EC] px-4 text-xs text-slate-800 outline-none transition-colors placeholder:text-zinc-400 hover:bg-[#dfe4e8] sm:text-sm ${
              error
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {error ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {error}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isMutating}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#00d68f] disabled:opacity-50 sm:text-sm"
          >
            {isMutating ? <Loader2 className="size-4 animate-spin" /> : <span>Send Reset Code</span>}
          </button>

          <Link
            href="/login"
            className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-full border border-slate-300/70 bg-[#E5E9EC] text-center text-xs font-semibold text-slate-700 transition-colors hover:bg-[#dfe4e8] sm:text-sm"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
