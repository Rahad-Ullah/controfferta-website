import ProviderAboutGetStarted from "@/components/provider/about/get-started";
import ProviderAboutHero from "@/components/provider/about/hero";
import ProviderAboutLeadQuality from "@/components/provider/about/lead-quality";
import ProviderAboutMission from "@/components/provider/about/mission";

export const metadata = {
  title: "About Us",
  description:
    "Controfferta is the Italian B2B marketplace for qualified lead generation. Companies connect with customers who already want their services.",
};

export default function ProviderAboutPage() {
  return (
    <main>
      <ProviderAboutHero />
      <ProviderAboutMission />
      <ProviderAboutLeadQuality />
      <ProviderAboutGetStarted />
    </main>
  );
}
