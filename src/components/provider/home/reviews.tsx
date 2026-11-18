import Link from "next/link";
import { Star, User } from "lucide-react";
import type { PlatformReview } from "@/types/platform-review.interface";

function reviewName(review: PlatformReview) {
  return [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ");
}

export default function ProviderReviews({ reviews }: { reviews: PlatformReview[] | null }) {
  const cards = reviews ?? [];

  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What Companies Say</h2>

        {reviews === null ? (
          <p className="text-center text-sm text-slate-500">Reviews could not be loaded.</p>
        ) : cards.length === 0 ? (
          <p className="text-center text-sm text-slate-500">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.map((review) => {
              const name = reviewName(review) || "Customer";
              const stars = Math.min(5, Math.max(0, review.rating));

              return (
                <article key={review._id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F9FAFC] p-6">
                  <div className="flex items-center gap-1 text-[#E8A121]">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${index < stars ? "fill-current stroke-none" : "fill-none stroke-current"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">&ldquo;{review.message}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                      <User className="size-4" />
                    </span>
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/provider/reviews" className="text-sm text-slate-500 hover:text-slate-900">
            See All Review
          </Link>
        </div>
      </div>
    </section>
  );
}
