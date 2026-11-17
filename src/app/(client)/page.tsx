import BottomCta from "@/components/client/home/bottom-cta";
import Hero from "@/components/client/home/hero";
import HowItWorks from "@/components/client/home/how-it-works";
import PopularCategories from "@/components/client/home/popular-categories";
import ProviderCallout from "@/components/client/home/provider-callout";
import StatsBar from "@/components/client/home/stats-bar";
import Testimonials from "@/components/client/home/testimonials";
import WhyChooseUs from "@/components/client/home/why-choose-us";
import { apiKeys } from "@/lib/api/keys";
import { nextFetch } from "@/lib/api/fetcher";
import type { CategoryListResponse, HomeCategory } from "@/types/category";

async function loadCategories(): Promise<HomeCategory[] | null> {
  try {
    const body = await nextFetch<CategoryListResponse>({
      url: apiKeys.categories,
      next: { revalidate: 3600, tags: ["categories"] },
    });
    if (!Array.isArray(body.data)) return [];
    return body.data.map((category) => ({
      id: category._id,
      name: category.name,
      iconUrl: category.iconUrl ?? "",
    }));
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Find the right professional for your project",
  description:
    "Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.",
};

export default async function HomePage() {
  const categories = await loadCategories();

  return (
    <main className="bg-white text-slate-900">
      <Hero />
      <StatsBar />
      <PopularCategories categories={categories} />
      <HowItWorks />
      <WhyChooseUs />
      <ProviderCallout />
      <Testimonials />
      <BottomCta />
    </main>
  );
}
