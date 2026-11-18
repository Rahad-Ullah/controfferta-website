import Image from "next/image";

export default function ProviderServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#1B3352] py-16 text-white sm:py-20">
      <Image
        src="/images/provider/services/services.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#1B3352]/68" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Service Categories</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
          Find customer requests in your specific sector.
        </p>
      </div>
    </section>
  );
}
