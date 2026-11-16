import Link from "next/link";
import { Search } from "lucide-react";

export default function ProviderHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00BC7D]/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-emerald-500/[0.06] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00BC7D] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00BC7D] animate-ping" />
              12,400+ ACTIVE LEADS AVAILABLE
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.15] tracking-tight">
              Get <span className="text-[#00BC7D] italic">Qualified Requests</span> from Clients Looking for Your Services
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
              The B2B marketplace that connects companies with the right customers. Buy verified leads, reach out to those who have already shown interest in your industry.
            </p>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#00BC7D] hover:bg-[#00d68f] text-white px-7 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#00BC7D]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find New Customers</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md h-[400px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#021A15] via-[#05261F] to-[#0A1626] border border-emerald-500/20 p-8 flex items-center justify-center shadow-2xl">
              <svg className="w-full h-full text-emerald-300 drop-shadow-[0_0_15px_rgba(0,188,125,0.4)]" viewBox="0 0 200 240" fill="none">
                <path
                  d="M 50 35 L 75 30 L 115 40 L 135 60 L 125 75 L 110 85 L 120 110 L 140 140 L 155 160 L 175 165 L 170 175 L 150 175 L 140 160 L 125 175 L 105 185 L 95 175 L 105 155 L 100 135 L 85 105 L 75 80 L 60 65 L 45 45 Z"
                  fill="#00BC7D"
                  fillOpacity="0.25"
                  stroke="#00BC7D"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M 75 200 L 115 195 L 105 215 L 75 210 Z"
                  fill="#00BC7D"
                  fillOpacity="0.25"
                  stroke="#00BC7D"
                  strokeWidth="2"
                />
                <path
                  d="M 25 110 L 40 110 L 45 155 L 30 155 Z"
                  fill="#00BC7D"
                  fillOpacity="0.2"
                  stroke="#00BC7D"
                  strokeWidth="2"
                />
                <circle cx="70" cy="48" r="4.5" fill="#00BC7D" />
                <circle cx="70" cy="48" r="9" stroke="#00BC7D" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
                <circle cx="52" cy="52" r="3.5" fill="#00BC7D" />
                <circle cx="112" cy="50" r="4" fill="#00BC7D" />
                <circle cx="95" cy="75" r="4" fill="#00BC7D" />
                <circle cx="95" cy="98" r="4" fill="#00BC7D" />
                <circle cx="108" cy="135" r="5" fill="#00BC7D" />
                <circle cx="108" cy="135" r="10" stroke="#00BC7D" strokeWidth="1.2" className="animate-ping" opacity="0.6" />
                <circle cx="132" cy="155" r="4" fill="#00BC7D" />
                <circle cx="165" cy="152" r="3.5" fill="#00BC7D" />
                <circle cx="95" cy="202" r="3.5" fill="#00BC7D" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto border-t border-slate-800/80 mt-16 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white">12,400+</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Quotes Every Year</p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-x border-slate-800/80 pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-white">3,200+</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Registered Companies</p>
          </div>
          <div className="pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-white">1,400+</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Visitors Every Year</p>
          </div>
        </div>
      </div>
    </section>
  );
}
