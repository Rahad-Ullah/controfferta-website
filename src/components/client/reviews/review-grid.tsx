import { Star, User } from "lucide-react";
import type { PlatformReview } from "@/types/platform-review.interface";

function reviewName(review: PlatformReview) {
  return [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ");
}

export function ReviewGrid({ reviews }: { reviews: PlatformReview[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-slate-600">No reviews yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {reviews.map((review) => {
        const name = reviewName(review);
        return (
          <article
            key={review._id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed italic">
              &quot;{review.message}&quot;
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0 border border-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                  {name}
                </p>
              </div>

              <div className="flex items-center gap-0.5 shrink-0" aria-label={`${review.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
