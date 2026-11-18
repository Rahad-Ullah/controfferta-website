"use client";

import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { CheckCircle2, MessageSquare, Star } from "lucide-react";
import AuthRequiredDialog from "@/components/shared/auth-required-dialog";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { useCurrentUser } from "@/hooks/use-current-user";
import { reviewFieldErrors, reviewFields } from "@/schemas/review";
import type { Review, ReviewCreate } from "@/types/review.interface";

type ReviewCreateResponse = {
  success: boolean;
  message: string;
  data?: Review;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export function ReviewForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, refresh } = useCurrentUser();
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const redirectTo = pathname || "/reviews";

  const { trigger, isMutating } = useSWRMutation(
    apiKeys.platformReviews,
    (_url: string, { arg }: { arg: ReviewCreate }) =>
      nextFetch<ReviewCreateResponse>({
        url: "/platform-reviews/create",
        method: "POST",
        payload: arg,
      }),
    { revalidate: true, populateCache: false },
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError("");

    const result = reviewFields.safeParse({ rating, message });
    if (!result.success) {
      setErrors(reviewFieldErrors(result.error));
      return;
    }

    // Don't gate on the SWR profile cache — it can be empty/stale while API cookies
    // are already valid. Attempt create; only open auth UI on a real 401.
    try {
      if (!user && !isLoading) {
        try {
          await refresh();
        } catch {
          // Profile refresh failed; still try the review create with cookies.
        }
      }

      const response = await trigger(result.data, { throwOnError: true });
      if (!response?.success || !response.data?._id) {
        setSubmitError(response?.message || "Could not send your review.");
        return;
      }

      router.refresh();
      setMessage("");
      setRating(4);
      setErrors({});
      setSuccessMessage(response.message);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setAuthDialogOpen(true);
        return;
      }
      if (error instanceof ApiError && error.status === 403) {
        setSubmitError("This account cannot leave a review.");
        return;
      }
      setSubmitError(error instanceof Error ? error.message : "Could not send your review.");
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl sm:p-9">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 shadow-xs">
          <MessageSquare className="size-5" />
        </div>

        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Add Review for Platform</h2>

        {!submitted ? (
          <form noValidate onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setErrors((current) => {
                        if (!current.rating) return current;
                        const next = { ...current };
                        delete next.rating;
                        return next;
                      });
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isMutating}
                    aria-pressed={star === rating}
                    aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    className="cursor-pointer transition-transform hover:scale-110 focus:outline-none disabled:cursor-not-allowed"
                  >
                    <Star
                      className={`size-7 transition-colors sm:size-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <FieldError message={errors.rating} />
            </div>

            <div className="text-left">
              <label htmlFor="review-message" className="mb-1 block text-xs font-semibold text-slate-700">
                Message *
              </label>
              <textarea
                id="review-message"
                rows={4}
                value={message}
                aria-invalid={Boolean(errors.message)}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setErrors((current) => {
                    if (!current.message) return current;
                    const next = { ...current };
                    delete next.message;
                    return next;
                  });
                }}
                disabled={isMutating}
                placeholder="Describe in detail what the customer is looking for, type of work, quantity, technical specifications..."
                className="w-full resize-none rounded-xl border border-slate-200 p-3.5 text-xs leading-relaxed outline-none focus:border-[#00BC7D] disabled:opacity-60 sm:text-sm"
              />
              <FieldError message={errors.message} />
            </div>

            {submitError ? <p className="text-xs text-red-600">{submitError}</p> : null}

            <div className="flex items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setErrors({});
                  setSubmitError("");
                }}
                disabled={isMutating}
                className="flex-1 cursor-pointer rounded-xl border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isMutating || isLoading}
                className="flex-1 cursor-pointer rounded-xl bg-[#00BC7D] px-5 py-3 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#00d68f] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                {isMutating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 py-6">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-[#00BC7D]">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Thank you for your review!</h3>
            <p className="mx-auto max-w-sm text-xs text-zinc-500">
              {successMessage ||
                "Your feedback helps us continue providing the best connection between customers and professionals."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitError("");
                setSuccessMessage("");
                setSubmitted(false);
              }}
              className="cursor-pointer pt-2 text-xs font-semibold text-[#00BC7D] underline"
            >
              Write another review
            </button>
          </div>
        )}
      </div>

      <AuthRequiredDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        redirectTo={redirectTo}
        title="Sign in to leave a review"
        description="Create an account or sign in as a customer or company to submit your platform review."
        primaryLabel="Sign Up to Review"
      />
    </div>
  );
}
