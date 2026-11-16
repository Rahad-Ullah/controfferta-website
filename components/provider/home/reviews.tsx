import Link from "next/link";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "In three months we gained 27 new clients through this platform. The credit system is transparent and convenient.",
    name: "Marco Ferretti",
    trade: "Windows and doors",
  },
  {
    quote: "The quality of the leads is way higher compared to other services. The clients are really interested and the conversion rate is high.",
    name: "Giulia Romano",
    trade: "Photovoltaic",
  },
  {
    quote: "Professional and intuitive platform. Customer support is excellent. I recommend it to all companies in the construction industry.",
    name: "Alessandro Conti",
    trade: "Construction",
  },
];

export default function ProviderReviews() {
  return (
    <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Companies Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review.name} className="bg-[#E5E9EC] rounded-2xl p-6 border border-slate-300/60 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
              <div className="pt-2 border-t border-slate-300/70 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{review.name}</span>
                <span className="text-[11px] text-zinc-500">{review.trade}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/provider/reviews" className="text-xs font-semibold text-zinc-600 hover:text-slate-900 underline">
            See All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
