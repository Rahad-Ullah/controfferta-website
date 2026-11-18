import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProviderAboutGetStarted() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] from-0% via-[#0F172A]/85 via-[42%] to-[#0F172A]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get started today</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Register your company and immediately access customer requests in your sector.
        </p>
        <div className="mt-8">
          <Button variant="primary" nativeButton={false} render={<Link href="/register" />} className="rounded-full">
            Sign Up for Free
          </Button>
        </div>
      </div>
    </section>
  );
}
