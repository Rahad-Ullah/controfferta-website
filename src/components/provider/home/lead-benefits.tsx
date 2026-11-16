import { Award, ShieldCheck, SlidersHorizontal, Smile, Sparkles, Users } from "lucide-react";

const benefits = [
  {
    title: "More Security",
    description: "We verify and filter every request and lead, so you get genuine and relevant opportunities from trusted sources.",
    icon: ShieldCheck,
  },
  {
    title: "More Control",
    description: "Choose the type of requests and specific areas you're interested in, so you only receive what fits your needs.",
    icon: SlidersHorizontal,
  },
  {
    title: "Greater Peace of Mind",
    description: "With verified leads and transparent processes, you can focus on what matters most - your business growth.",
    icon: Smile,
  },
  {
    title: "Higher Average Quality of Contacts",
    description: "Get better leads with accurate information, so you don't have to deal with duplicates, fake, or incomplete requests.",
    icon: Users,
  },
  {
    title: "More Exclusivity",
    description: "Our web portals give you access to potential customers, with a maximum of 4 companies per market.",
    icon: Sparkles,
    highlighted: true,
  },
  {
    title: "Greater Reliability",
    description: "Our service has been trusted by hundreds of companies who continue to use our platform month after month.",
    icon: Award,
  },
];

export default function ProviderLeadBenefits() {
  return (
    <section className="bg-[#ECEFF2] text-slate-900 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            A Smarter Way to <span className="text-[#00BC7D]">Get Leads</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            We connect lead providers and businesses through one trusted platform. Built for growth, designed for real opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={
                  benefit.highlighted
                    ? "bg-[#D9EFE6] rounded-2xl p-6 text-center space-y-2 border-2 border-[#00BC7D] shadow-md"
                    : "bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm"
                }
              >
                <div
                  className={
                    benefit.highlighted
                      ? "w-10 h-10 rounded-full bg-[#00BC7D]/20 text-[#00BC7D] mx-auto flex items-center justify-center"
                      : "w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center"
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className={
                    benefit.highlighted
                      ? "text-xs font-extrabold uppercase tracking-wider text-[#008A5B]"
                      : "text-xs font-extrabold uppercase tracking-wider text-slate-900"
                  }
                >
                  {benefit.title}
                </h3>
                <p className={benefit.highlighted ? "text-[11px] text-slate-700 leading-relaxed" : "text-[11px] text-zinc-600 leading-relaxed"}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
