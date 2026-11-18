import { getSetting } from "@/actions/setting";
import { ContactForm } from "@/components/client/contact/contact-form";
import ClientContactHero from "@/components/client/contact/hero";
import ClientContactInformation from "@/components/client/contact/information";

export const metadata = {
  title: "Contact",
  description:
    "Contact Controfferta about submitting a request, quotes, or registering your company.",
};

export default async function ContactPage() {
  const setting = await getSetting();
  const contact = setting?.contactInfo;

  return (
    <main>
      <ClientContactHero />

      <section className="bg-white py-16 text-slate-900 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <ClientContactInformation
            email={contact?.email?.trim() ?? ""}
            phone={contact?.phone?.trim() ?? ""}
            whatsApp={contact?.whatsApp?.trim() ?? ""}
            address={contact?.address}
          />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
