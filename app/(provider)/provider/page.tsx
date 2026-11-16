import CompanyLandingPage from "@/components/landing/company-landing-page";

export const metadata = {
  title: "Qualified requests for companies",
  description:
    "Find verified customer requests in your trade and area. Companies on Controfferta buy leads and contact people who already asked for the service.",
};

export default function ProviderHomePage() {
  return <CompanyLandingPage />;
}
