import { getPlatformReviews } from "@/actions/platform-review";
import { ReviewForm } from "@/components/client/reviews/review-form";
import ProviderReviewGrid from "@/components/provider/reviews/review-grid";
import ProviderReviewsHero from "@/components/provider/reviews/hero";

export const metadata = {
  title: "Reviews from companies",
  description:
    "Read what companies say about finding customers and buying verified leads on Controfferta.",
};

export default async function ProviderReviewsPage() {
  const reviews = await getPlatformReviews({ limit: "60", sort: "-createdAt" });
  const list = reviews?.data.reviews ?? [];
  const total = reviews?.data.totalReviews ?? 0;
  const average = reviews?.data.averageRating ?? 0;

  return (
    <main className="bg-white">
      <ProviderReviewsHero average={average} total={total} />

      <section className="bg-white py-16 text-slate-900 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {reviews === null ? (
            <p className="text-center text-sm text-slate-500">Reviews could not be loaded.</p>
          ) : (
            <ProviderReviewGrid reviews={list} />
          )}
          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
