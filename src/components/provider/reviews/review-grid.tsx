import { Star, User } from "lucide-react";
import type { PlatformReview } from "@/types/platform-review.interface";

function reviewName(review: PlatformReview) {
  return [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ");
}

export default function ProviderReviewGrid({ reviews }: { reviews: PlatformReview[] }) {
  if (reviews.length === 0) {
    return <p className="text-center text-sm text-slate-500">No reviews yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {reviews.map((review) => {
        const name = reviewName(review) || "Company";
        const stars = Math.min(5, Math.max(0, review.rating));

        return (
          <article
            key={review._id}
            className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]"
          >
            <div className="flex items-center gap-0.5" aria-label={`${stars} out of 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${
                    index < stars ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">&ldquo;{review.message}&rdquo;</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500">
                <User className="size-4" />
              </span>
              <p className="truncate text-sm font-bold text-slate-900">{name}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
