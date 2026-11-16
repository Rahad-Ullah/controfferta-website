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

export default function ProviderHomePage() {
  return (
    <main>
      <ProviderHero />
      <ProviderLeadBenefits />
      <ProviderLatestRequests />
      <ProviderWhyChoose />
      <ProviderHowItWorks />
      <ProviderReviews />
      <ProviderClosingCta />
    </main>
  );
}
