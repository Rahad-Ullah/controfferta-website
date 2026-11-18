import { getSetting } from "@/actions/setting";
import ProviderContactForm from "@/components/provider/contact/contact-form";
import ProviderContactHero from "@/components/provider/contact/hero";
import ProviderContactInformation from "@/components/provider/contact/information";

export const metadata = {
  title: "Contact for companies",
  description:
    "Contact Controfferta about company registration, lead categories, credits, or support for your business account.",
};

export default async function ProviderContactPage() {
  const setting = await getSetting();
  const contact = setting?.contactInfo;

  return (
    <main className="bg-white">
      <ProviderContactHero />

      <section className="bg-white py-16 text-slate-900 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <ProviderContactInformation
            email={contact?.email?.trim() ?? ""}
            phone={contact?.phone?.trim() ?? ""}
            address={contact?.address}
          />
          <ProviderContactForm />
        </div>
      </section>
    </main>
  );
}
