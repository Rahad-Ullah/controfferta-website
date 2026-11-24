import BottomCta from "@/components/client/home/bottom-cta";
import Hero from "@/components/client/home/hero";
import HowItWorks from "@/components/client/home/how-it-works";
import PopularCategories from "@/components/client/home/popular-categories";
import ProviderCallout from "@/components/client/home/provider-callout";
import StatsBar from "@/components/client/home/stats-bar";
import Testimonials from "@/components/client/home/testimonials";
import WhyChooseUs from "@/components/client/home/why-choose-us";
import { getCategories } from "@/actions/category";
import { getPlatformReviews } from "@/actions/platform-review";

export const metadata = {
  title: "Find the right professional for your project",
  description:
    "Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.",
};

export default async function HomePage() {
  const [categories, reviews] = await Promise.all([
    getCategories({ limit: "8" }),
    getPlatformReviews({ limit: "12", sort: "-createdAt" }),
  ]);
  const categoryList = categories ? categories.data : null;

  return (
    <main className="bg-white text-slate-900">
      <Hero />
      <StatsBar />
      <PopularCategories categories={categoryList} />
      <HowItWorks />
      <WhyChooseUs />
      <ProviderCallout />
      <Testimonials reviews={reviews ? reviews.data.reviews : null} />
      <BottomCta />
    </main>
  );
}
