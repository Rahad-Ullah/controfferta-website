import Image from "next/image";

export default function ProviderAboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-20 text-white sm:py-28">
      <Image
        src="/images/provider/about-us/about-us.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0F172A]/75" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
          <span className="font-semibold text-[#00D492]">CONTROFFERTA.IT</span> is the Italian B2B
          marketplace for qualified lead generation. We connect businesses with customers who are
          looking for exactly their services.
        </p>
      </div>
    </section>
  );
}
