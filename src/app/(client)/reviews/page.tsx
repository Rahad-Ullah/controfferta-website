import { getPlatformReviews } from "@/actions/platform-review";
import { ReviewGrid } from "@/components/client/reviews/review-grid";
import { ReviewsHero } from "@/components/client/reviews/reviews-hero";

export const metadata = {
  title: "Reviews",
  description:
    "Read reviews from customers and companies who use Controfferta to request and compare home-service quotes.",
};

export default async function ReviewsPage() {
  const reviews = await getPlatformReviews({ limit: "60", sort: "-createdAt" });
  const list = reviews?.data.reviews ?? [];
  const total = reviews?.data.totalReviews ?? 0;
  const average = reviews?.data.averageRating ?? 0;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <ReviewsHero average={average} total={total} />

      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews === null ? (
            <p className="text-sm text-slate-600">Reviews could not be loaded.</p>
          ) : (
            <ReviewGrid reviews={list} />
          )}
        </div>
      </section>
    </div>
  );
}
