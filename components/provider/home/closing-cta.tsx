import Link from "next/link";

export default function ProviderClosingCta() {
  return (
    <section className="bg-[#070A0F] text-white py-16 sm:py-20 relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Ready to get new clients?</h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Register your business for free and get access to thousands of requests from qualified clients in your industry.
        </p>
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#00BC7D]/30 transition-all transform hover:-translate-y-0.5"
          >
            Sign Up for Free
          </Link>
          <Link
            href="/provider/how-it-works"
            className="bg-[#141A23] hover:bg-[#1E2633] text-zinc-200 border border-slate-700 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all"
          >
            Find Out How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
