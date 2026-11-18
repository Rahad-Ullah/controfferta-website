"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { refreshCurrentUser } from "@/hooks/use-current-user";

const OTP_LENGTH = 6;
/** Matches backend `OTP_TTL_MS` */
const OTP_TTL_SECONDS = 5 * 60;
/** Matches backend `OTP_RESEND_GAP_MS` (60s min between sends for the same email) */
const RESEND_COOLDOWN_SECONDS = 60;

type VerifyEmailResponse = {
  message?: string;
  data?: {
    resetToken?: string;
    sessionId?: string;
    role?: string;
    _id?: string;
  };
};

type OtpTimers = {
  expiresAt: number;
  resendAvailableAt: number;
  verifyAvailableAt: number;
};

function timerStorageKey(email: string) {
  return `otp-timers:${email.trim().toLowerCase()}`;
}

function readTimers(email: string): OtpTimers | null {
  if (!email || typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(timerStorageKey(email));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OtpTimers>;
    if (!parsed.expiresAt || !parsed.resendAvailableAt) return null;
    return {
      expiresAt: parsed.expiresAt,
      resendAvailableAt: parsed.resendAvailableAt,
      verifyAvailableAt: parsed.verifyAvailableAt ?? 0,
    };
  } catch {
    return null;
  }
}

function writeTimers(email: string, timers: OtpTimers) {
  if (!email || typeof window === "undefined") return;
  sessionStorage.setItem(timerStorageKey(email), JSON.stringify(timers));
}

function formatCountdown(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function nowSecondsLeft(targetAt: number) {
  return Math.max(0, Math.ceil((targetAt - Date.now()) / 1000));
}

function retryWaitSeconds(err: ApiError, fallback: number) {
  return Math.max(1, err.retryAfterSeconds ?? fallback);
}

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email")?.trim() || "";

  const [digits, setDigits] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | undefined>(undefined);
  const [expiresAt, setExpiresAt] = useState(() => Date.now() + OTP_TTL_SECONDS * 1000);
  const [resendAvailableAt, setResendAvailableAt] = useState(
    () => Date.now() + RESEND_COOLDOWN_SECONDS * 1000,
  );
  const [verifyAvailableAt, setVerifyAvailableAt] = useState(0);
  const [expiresIn, setExpiresIn] = useState(OTP_TTL_SECONDS);
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_SECONDS);
  const [verifyIn, setVerifyIn] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { trigger: verifyEmail, isMutating: isVerifying } = useSWRMutation(
    "verify-email",
    (_key: string, { arg }: { arg: { email: string; oneTimeCode: number } }) =>
      nextFetch<VerifyEmailResponse>({ url: "/auth/verify-email", method: "POST", payload: arg }),
  );

  const { trigger: resendCode, isMutating: isResending } = useSWRMutation(
    "resend-otp",
    (_key: string, { arg }: { arg: { email: string } }) =>
      nextFetch<{ message?: string }>({ url: "/auth/forget-password", method: "POST", payload: arg }),
  );

  const persist = (next: OtpTimers) => {
    setExpiresAt(next.expiresAt);
    setResendAvailableAt(next.resendAvailableAt);
    setVerifyAvailableAt(next.verifyAvailableAt);
    writeTimers(email, next);
  };

  useEffect(() => {
    if (!email) return;

    const stored = readTimers(email);
    const next: OtpTimers = {
      expiresAt:
        stored?.expiresAt && stored.expiresAt > Date.now()
          ? stored.expiresAt
          : Date.now() + OTP_TTL_SECONDS * 1000,
      resendAvailableAt:
        stored?.resendAvailableAt && stored.resendAvailableAt > Date.now()
          ? stored.resendAvailableAt
          : Date.now() + RESEND_COOLDOWN_SECONDS * 1000,
      verifyAvailableAt:
        stored?.verifyAvailableAt && stored.verifyAvailableAt > Date.now()
          ? stored.verifyAvailableAt
          : 0,
    };

    persist(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed once per email
  }, [email]);

  useEffect(() => {
    const tick = () => {
      setExpiresIn(nowSecondsLeft(expiresAt));
      setResendIn(nowSecondsLeft(resendAvailableAt));
      setVerifyIn(nowSecondsLeft(verifyAvailableAt));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [expiresAt, resendAvailableAt, verifyAvailableAt]);

  const startAfterSuccessfulSend = () => {
    persist({
      expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
      resendAvailableAt: Date.now() + RESEND_COOLDOWN_SECONDS * 1000,
      verifyAvailableAt: 0,
    });
    setExpiresIn(OTP_TTL_SECONDS);
    setResendIn(RESEND_COOLDOWN_SECONDS);
    setVerifyIn(0);
  };

  const lockResendFor = (seconds: number) => {
    const nextResendAt = Date.now() + seconds * 1000;
    persist({
      expiresAt,
      resendAvailableAt: nextResendAt,
      verifyAvailableAt,
    });
    setResendIn(seconds);
  };

  const lockVerifyFor = (seconds: number) => {
    const nextVerifyAt = Date.now() + seconds * 1000;
    persist({
      expiresAt,
      resendAvailableAt,
      verifyAvailableAt: nextVerifyAt,
    });
    setVerifyIn(seconds);
  };

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...digits];
    next[index] = val.slice(-1);
    setDigits(next);
    if (error) setError(undefined);

    if (val && index < OTP_LENGTH - 1) {
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
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, idx) => {
      next[idx] = char;
    });
    setDigits(next);
    if (error) setError(undefined);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Missing email. Go back and try again.");
      return;
    }

    if (verifyIn > 0) {
      setError(`Too many verification attempts. Try again in ${formatCountdown(verifyIn)}.`);
      return;
    }

    if (expiresIn <= 0) {
      setError("This code has expired. Request a new one.");
      return;
    }

    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError(`Please enter the complete ${OTP_LENGTH}-digit verification code`);
      return;
    }

    try {
      const response = await verifyEmail(
        { email, oneTimeCode: Number(code) },
        { throwOnError: true },
      );

      const resetToken = response?.data?.resetToken;
      toast.success(response?.message || "Code verified successfully!");
      sessionStorage.removeItem(timerStorageKey(email));

      if (resetToken) {
        router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
        return;
      }

      await refreshCurrentUser();
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not verify the code.";

      if (err instanceof ApiError && err.status === 429) {
        const wait = retryWaitSeconds(err, 60);
        lockVerifyFor(wait);
        setError(
          message.includes("verification")
            ? `${message} Try again in ${formatCountdown(wait)}.`
            : `Too many verification attempts. Try again in ${formatCountdown(wait)}.`,
        );
        return;
      }

      setError(message);

      if (/Too many incorrect codes/i.test(message)) {
        setDigits(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Missing email. Go back and try again.");
      return;
    }

    if (resendIn > 0 || isResending) return;

    try {
      const response = await resendCode({ email }, { throwOnError: true });
      setDigits(Array(OTP_LENGTH).fill(""));
      setError(undefined);
      startAfterSuccessfulSend();
      inputRefs.current[0]?.focus();
      toast.success(response?.message || `A new verification code was sent to ${email}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        const wait = retryWaitSeconds(err, RESEND_COOLDOWN_SECONDS);
        lockResendFor(wait);
        toast.error(
          err.message.includes("wait")
            ? `${err.message} (${formatCountdown(wait)})`
            : `Too many code requests. Try again in ${formatCountdown(wait)}.`,
        );
        return;
      }

      toast.error(err instanceof ApiError ? err.message : "Could not resend the code.");
    }
  };

  const canResend = resendIn <= 0 && !isResending;
  const canVerify = verifyIn <= 0 && expiresIn > 0 && !isVerifying;

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-300/40 bg-[#ECEFF2] p-8 text-slate-900 shadow-2xl sm:p-10">
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer text-slate-700 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">Verify Email</h1>
      </div>

      <p className="mb-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
        Enter the {OTP_LENGTH}-digit verification code sent to{" "}
        <span className="font-semibold text-slate-800">{email || "your email"}</span>
      </p>
      <p
        className={`mb-6 text-center text-[11px] font-medium sm:text-xs ${
          expiresIn <= 0 ? "text-red-500" : expiresIn <= 60 ? "text-amber-600" : "text-zinc-500"
        }`}
      >
        {expiresIn <= 0 ? "Code expired. Request a new one." : `Code expires in ${formatCountdown(expiresIn)}`}
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <div className="mx-auto flex max-w-sm items-center justify-between gap-2 sm:gap-2.5">
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
                className={`h-12 w-10 rounded-xl border text-center text-xl font-bold text-slate-800 shadow-inner outline-none transition-all sm:h-14 sm:w-12 sm:text-2xl ${
                  error && !digit
                    ? "border-red-400 bg-red-50/20 focus:border-red-500"
                    : "border-slate-300 bg-[#E5E9EC] focus:border-[#00BC7D] focus:bg-white"
                }`}
              />
            ))}
          </div>

          {error ? (
            <p className="mt-3 flex items-center justify-center gap-1 text-center text-[11px] font-medium text-red-500 sm:text-xs">
              <span className="inline-block size-1 rounded-full bg-red-500" />
              {error}
            </p>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!canVerify}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#00d68f] disabled:opacity-50 sm:text-sm"
          >
            {isVerifying ? (
              <Loader2 className="size-4 animate-spin" />
            ) : verifyIn > 0 ? (
              <span>Try again in {formatCountdown(verifyIn)}</span>
            ) : (
              <span>Verify Code</span>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs text-zinc-500">
        Didn&apos;t receive code?{" "}
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="cursor-pointer font-bold text-[#00BC7D] hover:underline"
          >
            Resend
          </button>
        ) : (
          <span className="font-semibold text-slate-600">
            {isResending ? "Resending..." : `Resend in ${formatCountdown(resendIn)}`}
          </span>
        )}
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
