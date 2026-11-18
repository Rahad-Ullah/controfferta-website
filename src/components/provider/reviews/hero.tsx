import Image from "next/image";

export default function ProviderReviewsHero({
  average,
  total,
}: {
  average: number;
  total: number;
}) {
  const rating = total > 0 ? average.toFixed(1) : "0";

  return (
    <section className="relative overflow-hidden bg-[#0F2744] py-20 text-white sm:py-28">
      <Image
        src="/images/provider/reviews/reviews.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0F2744]/72" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Reviews</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
          What the companies that use Controfferta.it every day say.
        </p>

        <div className="mt-10 flex items-start justify-center gap-16 sm:gap-24">
          <div>
            <p className="text-4xl font-bold tracking-tight text-[#00D492] sm:text-5xl">{rating}</p>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">average rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold tracking-tight text-[#00D492] sm:text-5xl">{total}</p>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">verified reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
