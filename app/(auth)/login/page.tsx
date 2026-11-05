"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { loginDemo } from "@/lib/demoAuth";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail("company@gmail.com");
    setPassword("hello123");
    setErrors({});
    toast.info("Demo credentials filled: company@gmail.com / hello123");
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = loginDemo(email, password);
      setIsLoading(false);

      if (result.success && result.user) {
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("user_role", "provider");
            localStorage.setItem("has_seen_onboarding", "true");
            document.cookie = `user_role=provider; path=/; max-age=2592000; SameSite=Lax`;
          }
        } catch {
          // ignore storage errors
        }
        toast.success(`Welcome back, ${result.user.companyName}!`);
        router.push(redirectParam || "/");
      } else {
        setErrors({
          general: result.error || "Invalid credentials. Use demo: company@gmail.com / hello123",
          password: "Check password or click demo autofill below",
        });
        toast.error(result.error || "Login failed");
      }
    }, 600);
  };

  return (
    <div className="bg-[#ECEFF2] text-slate-900 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-300/40">
      {/* Title & Subtitle */}
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Log in to your account
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Welcome back! Enter your company credentials.
        </p>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="mb-5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2">
        <div className="text-left text-xs">
          <p className="font-semibold text-emerald-800 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#00BC7D]" />
            Demo Credentials
          </p>
          <p className="text-zinc-600 text-[11px] font-mono mt-0.5">
            company@gmail.com · hello123
          </p>
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="text-[11px] font-bold text-white bg-[#00BC7D] hover:bg-[#00a86b] px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          Auto Fill
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.email || errors.general
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field with Forgot password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#00BC7D] hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password || errors.general) {
                setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
              }
            }}
            placeholder="••••••••"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.password || errors.general
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
          {errors.general && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-1.5 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.general}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Log In</span>
            )}
          </button>
        </div>
      </form>

      {/* Footer link: Sign up */}
      <div className="mt-6 text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#00BC7D] font-bold hover:underline"
        >
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
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
