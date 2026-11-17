import Image from "next/image";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { ContactForm } from "@/components/client/contact/contact-form";
import { getSetting } from "@/actions/setting";
import type { SettingAddress } from "@/types/setting.interface";

export const metadata = {
  title: "Contact",
  description:
    "Contact Controfferta about submitting a request, quotes, or registering your company.",
};

function addressLines(address?: SettingAddress) {
  if (!address) return [];

  const text = (value?: string) => value?.trim() ?? "";
  const street = [text(address.line1), text(address.line2)].filter(Boolean).join(", ");
  const city = [text(address.postalCode), text(address.city)].filter(Boolean).join(" ");
  const locality = [city, text(address.state), text(address.country)].filter(Boolean).join(", ");

  return [street, locality].filter(Boolean);
}

export default async function ContactPage() {
  const setting = await getSetting();
  const contact = setting?.contactInfo;
  const email = contact?.email?.trim() ?? "";
  const phone = contact?.phone?.trim() ?? "";
  const whatsApp = contact?.whatsApp?.trim() ?? "";
  const whatsAppNumber = whatsApp.replace(/\D/g, "");
  const address = addressLines(contact?.address);
  const hasContact = Boolean(email || phone || whatsApp || address.length);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2400&q=95"
            alt=""
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#00BC7D] uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Have questions about submitting requests or becoming a service provider? Our team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Customer &amp; Partner Support
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  We are available Monday to Friday from 9:00 AM to 6:00 PM CET to assist customers and registered companies.
                </p>

                {hasContact ? (
                  <div className="space-y-4 pt-2">
                    {email ? (
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">Email Us</h3>
                          <a href={`mailto:${email}`} className="text-xs text-[#00BC7D] font-medium">
                            {email}
                          </a>
                        </div>
                      </div>
                    ) : null}

                    {phone ? (
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">Call Us</h3>
                          <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-xs text-zinc-500">
                            {phone}
                          </a>
                        </div>
                      </div>
                    ) : null}

                    {whatsApp ? (
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">WhatsApp</h3>
                          {whatsAppNumber ? (
                            <a href={`https://wa.me/${whatsAppNumber}`} className="text-xs text-zinc-500">
                              {whatsApp}
                            </a>
                          ) : (
                            <p className="text-xs text-zinc-500">{whatsApp}</p>
                          )}
                        </div>
                      </div>
                    ) : null}

                    {address.length ? (
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">Headquarters</h3>
                          {address.map((line) => (
                            <p key={line} className="text-xs text-zinc-500">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">Contact details are not available yet.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
