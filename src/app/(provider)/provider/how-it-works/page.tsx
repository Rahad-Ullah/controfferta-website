import ProviderCreditSystem from "@/components/provider/how-it-works/credit-system";
import ProviderHowItWorksHero from "@/components/provider/how-it-works/hero";
import ProviderHowItWorksSteps from "@/components/provider/how-it-works/steps";

export const metadata = {
  title: "How it works for companies",
  description:
    "Browse customer requests, review a lead, buy credits, and unlock contact details. Companies on Controfferta pay only for the leads they choose.",
};

export default function ProviderHowItWorksPage() {
  return (
    <main>
      <ProviderHowItWorksHero />
      <ProviderHowItWorksSteps />
      <ProviderCreditSystem />
    </main>
  );
}
