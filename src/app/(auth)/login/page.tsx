"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { refreshCurrentUser } from "@/hooks/use-current-user";

type LoginResponse = {
  message?: string;
  data?: {
    sessionId?: string;
    role?: string;
    _id?: string;
  };
};

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const { trigger, isMutating } = useSWRMutation(
    "login",
    (_key: string, { arg }: { arg: { email: string; password: string } }) =>
      nextFetch<LoginResponse>({ url: "/auth/login", method: "POST", payload: arg }),
  );

  const validate = () => {
    const next: { email?: string; password?: string } = {};

    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address";
    }

    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const trimmedEmail = email.trim();

    try {
      const response = await trigger(
        { email: trimmedEmail, password },
        { throwOnError: true },
      );
      toast.success(response?.message || "Logged in successfully.");
      await refreshCurrentUser();
      router.push(redirectParam || "/dashboard");
    } catch (error) {
      if (error instanceof ApiError && error.status === 407) {
        toast.info(error.message || "Please verify your account, then try to login again.");
        router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
        return;
      }

      setErrors({
        general: error instanceof Error ? error.message : "Could not log in.",
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-300/40 bg-[#ECEFF2] p-8 text-slate-900 shadow-2xl sm:p-10">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Log in to your account</h1>
        <p className="text-xs text-zinc-500 sm:text-sm">Welcome back! Enter your company credentials.</p>
      </div>

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
              if (errors.email || errors.general) {
                setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
              }
            }}
            placeholder="company@gmail.com"
            className={`h-[46px] w-full rounded-xl border bg-[#E5E9EC] px-4 text-xs text-slate-800 outline-none transition-colors placeholder:text-zinc-400 hover:bg-[#dfe4e8] sm:text-sm ${
              errors.email || errors.general
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.email ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="cursor-pointer text-xs font-semibold text-[#00BC7D] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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
              placeholder="••••••••"
              className={`h-[46px] w-full rounded-xl border bg-[#E5E9EC] py-0 pr-11 pl-4 text-xs text-slate-800 outline-none transition-colors placeholder:text-zinc-400 hover:bg-[#dfe4e8] sm:text-sm ${
                errors.password || errors.general
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
          {errors.general ? (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {errors.general}
            </p>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isMutating}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#00d68f] disabled:opacity-50 sm:text-sm"
          >
            {isMutating ? <Loader2 className="size-4 animate-spin" /> : <span>Log In</span>}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-[#00BC7D] hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
