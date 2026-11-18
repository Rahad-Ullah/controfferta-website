import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "In three months we gained 27 new clients through this platform. The credit system is transparent and convenient.",
    name: "Marco Ferretti",
    company: "Ferretti Windows Ltd",
    trade: "Windows and doors",
    image: "/images/testimonial-1.png",
  },
  {
    quote: "The quality of the leads is way higher compared to other services. The clients are really interested and the conversion rate is high.",
    name: "Giulia Romano",
    company: "Romano Solar",
    trade: "Photovoltaic",
    image: "/images/testimonial-2.png",
  },
  {
    quote: "Professional and intuitive platform. Customer support is excellent. I recommend it to all companies in the construction industry.",
    name: "Alessandro Conti",
    company: "Conti Constructions",
    trade: "Construction",
    image: "/images/testimonial-3.png",
  },
];

export default function ProviderReviews() {
  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What Companies Say</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F9FAFC] p-6">
              <div className="flex items-center gap-1 text-[#E8A121]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-4 fill-current stroke-none" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={review.image}
                    alt=""
                    width={30}
                    height={30}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{review.name}</p>
                    <p className="text-xs leading-snug text-slate-400">{review.company}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500">{review.trade}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/provider/reviews" className="text-sm text-slate-500 hover:text-slate-900">
            See All Review
          </Link>
        </div>
      </div>
    </section>
  );
}
