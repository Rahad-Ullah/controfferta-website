"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { CheckCircle2, MessageSquare, Star } from "lucide-react";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { reviewFieldErrors, reviewFields } from "@/schemas/review";
import type { Review, ReviewCreate } from "@/types/review.interface";
import { revalidateTag } from "next/cache";

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
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

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

    try {
      const response = await trigger(result.data, { throwOnError: true });
      if (!response?.success || !response.data?._id) {
        setSubmitError(response?.message || "Could not send your review.");
        return;
      }

      revalidateTag(apiKeys.platformReviews);
      router.refresh();
      setMessage("");
      setRating(4);
      setErrors({});
      setSuccessMessage(response.message);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setSubmitError("Sign in as a customer or company to leave a review.");
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
    <div className="mt-16 sm:mt-20 max-w-xl mx-auto">
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xl text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <MessageSquare className="w-5 h-5" />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Add Review for Platform</h2>

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
                    className="transition-transform hover:scale-110 focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${star <= (hoverRating || rating)
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
              <label htmlFor="review-message" className="block text-xs font-semibold text-slate-700 mb-1">
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
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none resize-none leading-relaxed disabled:opacity-60"
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
                className="flex-1 py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isMutating}
                className="flex-1 py-3 px-5 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isMutating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Thank you for your review!</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
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
              className="text-xs text-[#00BC7D] font-semibold underline pt-2 cursor-pointer"
            >
              Write another review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
