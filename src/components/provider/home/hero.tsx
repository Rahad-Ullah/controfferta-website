import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const stats = [
  { value: "12,400+", label: "Quotes Every Year" },
  { value: "3,200+", label: "Registered Companies" },
  { value: "1,400+", label: "Visitors Every Year" },
];

export default function ProviderHero() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] pt-14 pb-16 md:pt-20 md:pb-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D492]/40 bg-[#00D492]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#00D492]">
              <span className="size-1.5 rounded-full bg-[#00D492]" />
              12,400+ ACTIVE LEADS AVAILABLE
            </div>

            <h1 className="mt-6 text-[clamp(1.7rem,4.2vw,2.875rem)] font-bold leading-[1.15] tracking-tight text-white">
              <span className="block">
                Get <span className="font-semibold text-[#00D492] italic">Qualified Requests</span>
              </span>
              <span className="block">from Clients Looking for</span>
              <span className="block">Your Services</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              The B2B marketplace that connects companies with the right customers. Buy verified
              leads, reach out to those who have already shown interest in your industry.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D492] to-[#00b87a] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,212,146,0.35)] transition-transform hover:-translate-y-0.5"
            >
              <Search className="size-4" />
              Find New Customers
            </Link>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(0,212,146,0.42)_0%,rgba(14,116,144,0.32)_38%,transparent_70%)] blur-3xl"
            />
            <Image
              src="/images/provider/home/home-hero.png"
              alt="Map of Italy with active service locations"
              width={470}
              height={569}
              priority
              className="relative z-10 h-auto w-full max-w-[480px]"
            />
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#00D492] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
