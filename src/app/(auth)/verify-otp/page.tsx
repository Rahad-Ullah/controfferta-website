"use client";

import React, { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "marco@ferretti.it";

  // 5 digits as shown in design
  const [digits, setDigits] = useState<string[]>(["", "", "", "", ""]);
  const [error, setError] = useState<string | undefined>(undefined);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    setDigits(newDigits);
    if (error) setError(undefined);

    if (val && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pasted) return;

    const newDigits = [...digits];
    pasted.split("").forEach((char, idx) => {
      newDigits[idx] = char;
    });
    setDigits(newDigits);
    if (error) setError(undefined);
    inputRefs.current[Math.min(pasted.length, 4)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 5) {
      setError("Please enter the complete 5-digit verification code");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success("Code verified successfully!");
      router.push("/reset-password");
    }, 600);
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      toast.success(`A new verification code was sent to ${email}`);
    }, 500);
  };

  return (
    <div className="bg-[#ECEFF2] text-slate-900 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-300/40">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900">
          Verify Email
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
        Enter the 5-digit verification code sent to{" "}
        <span className="font-semibold text-slate-800">{email}</span>
      </p>

      {/* 5 Digit Input Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2.5 sm:gap-3 max-w-xs mx-auto">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 sm:w-13 sm:h-15 rounded-xl border text-center font-bold text-xl sm:text-2xl text-slate-800 outline-none transition-all shadow-inner ${
                  error && !digit
                    ? "border-red-400 bg-red-50/20 focus:border-red-500"
                    : "border-slate-300 bg-[#E5E9EC] focus:border-[#00BC7D] focus:bg-white"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-[11px] sm:text-xs mt-3 text-center font-medium flex items-center justify-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {error}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Verify Code</span>
            )}
          </button>
        </div>
      </form>

      {/* Resend footer */}
      <div className="mt-6 text-center text-xs text-zinc-500">
        Didn&apos;t receive code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-[#00BC7D] font-bold hover:underline cursor-pointer disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
