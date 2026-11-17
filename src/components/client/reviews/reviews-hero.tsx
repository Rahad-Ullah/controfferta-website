import Image from "next/image";

export function ReviewsHero({
  average,
  total,
}: {
  average: number;
  total: number;
}) {
  const rating = total > 0 ? average.toFixed(1) : "0";

  return (
    <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=95"
          alt=""
          fill
          priority
          quality={95}
          className="object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          Reviews
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Hear from customers who found the right professionals through Controfferta.it.
        </p>

        <div className="pt-6 flex items-center justify-center gap-12 sm:gap-16">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00BC7D] tracking-tight">
              {rating}
            </div>
            <div className="text-xs text-zinc-400 mt-1">Average rating</div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00BC7D] tracking-tight">
              {total}
            </div>
            <div className="text-xs text-zinc-400 mt-1">Verified reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
