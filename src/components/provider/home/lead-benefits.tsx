import { Contact, Goal, Leaf, Lock, Settings, Shield, UserRound, type LucideIcon } from "lucide-react";

function PeaceOfMindIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      <UserRound className="size-full" />
      <Leaf className="absolute -top-1.5 -right-1.5 size-3" />
    </span>
  );
}

const benefits: { title: string; description: string; icon: LucideIcon | typeof PeaceOfMindIcon }[] = [
  {
    title: "More Security",
    description:
      "We verify and filter every request and lead, so you get genuine and relevant opportunities from trusted sources.",
    icon: Lock,
  },
  {
    title: "More Control",
    description:
      "Choose the type of requests and specific areas you're interested in, so you only receive what fits your needs.",
    icon: Settings,
  },
  {
    title: "Greater Peace of Mind",
    description:
      "With verified leads and transparent processes, you can focus on what matters most - your business growth.",
    icon: PeaceOfMindIcon,
  },
  {
    title: "Higher Average Quality of Contacts",
    description:
      "Get better leads with accurate information, so you don't have to deal with duplicates, fake, or incomplete requests.",
    icon: Contact,
  },
  {
    title: "More Exclusivity",
    description:
      "Our web portals give you access to potential customers, with a maximum of 4 companies per market.",
    icon: Goal,
  },
  {
    title: "Greater Reliability",
    description:
      "Our service has been trusted by hundreds of companies who continue to use our platform month after month.",
    icon: Shield,
  },
];

export default function ProviderLeadBenefits() {
  return (
    <section className="bg-[#F4F7F8] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A Smarter Way to <span className="text-[#00D492]">Get Leads</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            We connect lead providers and businesses through one trusted platform.
            <br className="hidden sm:block" /> Built for growth, designed for real opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="group rounded-2xl border border-[#E3F2EB] bg-white px-6 py-8 text-center transition-colors hover:border-[#7EE0C0] hover:bg-[#F3FCF8]"
              >
                <Icon className="mx-auto size-6 text-slate-500 transition-colors group-hover:text-[#00D492]" />
                <h3 className="mt-4 text-xs font-bold tracking-wide text-slate-900 uppercase">{benefit.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-[13px]">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
