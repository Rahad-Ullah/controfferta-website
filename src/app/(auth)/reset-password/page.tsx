"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { ArrowLeft, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { nextFetch } from "@/lib/api/fetcher";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";
  const isDirectSuccess = searchParams.get("success") === "true";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({});
  const [isSuccess, setIsSuccess] = useState(isDirectSuccess);

  const { trigger, isMutating } = useSWRMutation(
    "reset-password",
    (
      _key: string,
      {
        arg,
      }: {
        arg: { newPassword: string; confirmPassword: string; token: string };
      },
    ) =>
      nextFetch<{ message?: string }>({
        url: "/auth/reset-password",
        method: "POST",
        payload: {
          newPassword: arg.newPassword,
          confirmPassword: arg.confirmPassword,
        },
        headers: { Authorization: arg.token },
      }),
  );

  const validate = () => {
    const next: { password?: string; confirmPassword?: string; general?: string } = {};

    if (!token) {
      next.general = "Reset token is missing. Request a new password reset.";
    }

    if (!password) {
      next.password = "New password is required";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      next.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await trigger(
        { newPassword: password, confirmPassword, token },
        { throwOnError: true },
      );
      toast.success(response?.message || "Password updated successfully!");
      setIsSuccess(true);
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : "Could not reset your password.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-slate-300/40 bg-[#ECEFF2] p-8 text-center text-slate-900 shadow-2xl sm:p-10">
        <div className="relative mx-auto mb-5 flex size-28 items-center justify-center">
          <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-[#00BC7D] shadow-lg shadow-[#00BC7D]/30">
            <Check className="size-8 stroke-[3.5] text-white" />
          </div>
        </div>

        <h1 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl">Password changed!</h1>
        <p className="mx-auto mb-6 max-w-xs text-xs leading-relaxed text-slate-500 sm:mb-8 sm:text-sm">
          Your password has been updated successfully. You can now sign in securely.
        </p>

        <Link
          href="/login"
          className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-full bg-[#00BC7D] text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#00d68f] sm:text-sm"
        >
          Confirm
        </Link>
      </div>
    );
  }

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

      <p className="mb-5 text-xs leading-relaxed text-zinc-500 sm:text-sm">Enter your new password below.</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password || errors.general) {
                  setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
                }
              }}
              placeholder="Minimum 8 characters"
              className={`h-[46px] w-full rounded-xl border bg-[#E5E9EC] py-0 pr-11 pl-4 text-xs text-slate-800 outline-none transition-colors placeholder:text-zinc-400 hover:bg-[#dfe4e8] sm:text-sm ${
                errors.password
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {errors.password}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword || errors.general) {
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined, general: undefined }));
                }
              }}
              placeholder="Minimum 8 characters"
              className={`h-[46px] w-full rounded-xl border bg-[#E5E9EC] py-0 pr-11 pl-4 text-xs text-slate-800 outline-none transition-colors placeholder:text-zinc-400 hover:bg-[#dfe4e8] sm:text-sm ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {errors.confirmPassword}
            </p>
          ) : null}
          {errors.general ? (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {errors.general}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isMutating}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#00d68f] disabled:opacity-50 sm:text-sm"
          >
            {isMutating ? <Loader2 className="size-4 animate-spin" /> : <span>Confirm</span>}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
