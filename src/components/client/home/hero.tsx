"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/submit-request");
  };

  return (
    <section className="relative overflow-hidden">
      {/* =========================================================
          1. DARK UPPER HALF (with ambient emerald glow)
          ========================================================= */}
      <div className="relative bg-[#07131D] text-white pt-10 sm:pt-14 pb-24 sm:pb-32 overflow-hidden h-[654px]">
        {/* Ambient emerald radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#00BC7D]/[0.18] blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Small Top Tag */}
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-3">
            GET YOUR REQUEST FASTER
          </span>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.18] max-w-4xl mx-auto">
            Find the right professional for{" "}
            <span className="text-[#00BC7D] italic font-semibold">Your Project</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Tell us what you need and connect with qualified service providers in your area. It&apos;s fast, free and easy to submit your request.
          </p>

          {/* Search / Service Input Box */}
          <div className="mt-7 max-w-lg mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-md p-1 sm:p-1.5 flex items-center justify-between border border-slate-200/50 shadow-md"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="For Example: painting"
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none bg-transparent px-3 py-1.5 sm:py-2"
              />
              <button
                type="submit"
                className="bg-[#00BC7D] hover:bg-[#00a86f] text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-md transition-colors shrink-0 cursor-pointer"
              >
                Next
              </button>
            </form>
            <p className="mt-2.5 text-xs text-[#00BC7D] font-normal">
              It only takes a few minutes
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. LIGHT LOWER HALF (#E5E5E5) WITH OVERLAPPING 3 IMAGES
          ========================================================= */}
      <div className="bg-[#E5E5E5] pt-0 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-44 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-3 sm:gap-6 items-center">
            {/* Left Image: Painter (Square) */}
            <div className="col-span-12 sm:col-span-4 aspect-square relative shadow-md overflow-hidden bg-zinc-800 rounded-lg">
              <Image
                src="/images/hero-painter.png"
                alt="Professional Painter"
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover"
              />
            </div>

            {/* Center Image: Movers (Taller Portrait) */}
            <div className="col-span-12 sm:col-span-4 aspect-[283/375] relative shadow-lg overflow-hidden bg-zinc-800 z-10 rounded-lg">
              <Image
                src="/images/hero-movers.png"
                alt="Moving and Transport"
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36vw, 450px"
                className="object-cover"
              />
            </div>

            {/* Right Image: Construction Workers (Square) */}
            <div className="col-span-12 sm:col-span-4 aspect-square relative shadow-md overflow-hidden bg-zinc-800 rounded-lg">
              <Image
                src="/images/hero-workers.png"
                alt="Construction & Builders"
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
