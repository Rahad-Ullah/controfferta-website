import { getLatestLeads } from "@/actions/lead";
import { getPlatformReviews } from "@/actions/platform-review";
import ProviderClosingCta from "@/components/provider/home/closing-cta";
import ProviderHero from "@/components/provider/home/hero";
import ProviderHowItWorks from "@/components/provider/home/how-it-works";
import ProviderLatestRequests from "@/components/provider/home/latest-requests";
import ProviderLeadBenefits from "@/components/provider/home/lead-benefits";
import ProviderReviews from "@/components/provider/home/reviews";
import ProviderWhyChoose from "@/components/provider/home/why-choose";

export const metadata = {
  title: "Qualified requests for companies",
  description:
    "Find verified customer requests in your trade and area. Companies on Controfferta buy leads and contact people who already asked for the service.",
};

export default async function ProviderHomePage() {
  const [leads, reviews] = await Promise.all([
    getLatestLeads(),
    getPlatformReviews({ limit: "3", sort: "-createdAt" }),
  ]);

  return (
    <main>
      <ProviderHero />
      <ProviderLeadBenefits />
      <ProviderLatestRequests leads={leads} />
      <ProviderWhyChoose />
      <ProviderHowItWorks />
      <ProviderReviews reviews={reviews ? reviews.data.reviews.slice(0, 3) : null} />
      <ProviderClosingCta />
    </main>
  );
}
