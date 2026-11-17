import { getPlatformReviews } from "@/actions/platform-review";
import { ReviewForm } from "@/components/client/reviews/review-form";
import { ReviewGrid } from "@/components/client/reviews/review-grid";
import { ReviewsHero } from "@/components/client/reviews/reviews-hero";

export const metadata = {
  title: "Reviews",
  description:
    "Read reviews from customers and companies who use Controfferta to request and compare home-service quotes.",
};

export default async function ReviewsPage() {
  const reviews = await getPlatformReviews({ limit: "60", sort: "-createdAt" });
  const list = reviews?.data ?? [];
  const total = reviews?.pagination?.total ?? list.length;
  const average = list.length
    ? list.reduce((sum, review) => sum + review.rating, 0) / list.length
    : 0;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <ReviewsHero average={average} total={reviews === null ? 0 : total} />

      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews === null ? (
            <p className="text-sm text-slate-600">Reviews could not be loaded.</p>
          ) : (
            <ReviewGrid reviews={list} />
          )}
          <ReviewForm />
        </div>
      </section>
    </div>
  );
}
