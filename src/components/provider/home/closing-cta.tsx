import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProviderClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-16 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden h-full aspect-[524/261] md:block">
        <Image
          src="/images/provider/home/call-to-action.png"
          alt=""
          fill
          sizes="720px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] from-0% via-[#0F172A]/55 via-[32%] to-[#0F172A]/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get new clients?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Register your business for free and get access to thousands of requests from qualified clients in your industry.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" nativeButton={false} render={<Link href="/register" />} className="rounded-full">
            Sign Up for Free
          </Button>
          <Link
            href="/provider/how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-400/80 px-6 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Find Out How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
