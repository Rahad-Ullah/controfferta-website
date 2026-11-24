"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category.interface";

export default function PopularCategories({
  categories,
}: {
  categories: Category[] | null;
}) {
  const visibleCategories =
    categories === null ? null : categories.slice(0, 8);

  return (
    <section id="services" className="py-12 sm:py-16 bg-">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-10 lg:gap-y-6">
          {/* Section Tag & Heading */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold tracking-wider text-[#00BC7D] uppercase">
              POPULAR CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What kind of service do you need?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Browse popular categories or submit a custom request. We&apos;ll help you connect with right professionals.
            </p>
          </div>

          {/* 8 categories: 2 on mobile, 4 on tablet and desktop, 3 on large laptops */}
          <div className="lg:col-span-7 lg:row-start-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3.5">
            {visibleCategories === null ? (
              <p className="col-span-full text-sm text-slate-600">
                Categories could not be loaded.
              </p>
            ) : visibleCategories.length === 0 ? (
              <p className="col-span-full text-sm text-slate-600">
                No categories yet.
              </p>
            ) : (
              visibleCategories.map((category) => (
                <Link
                  key={category._id}
                  href={`/submit-request?category=${encodeURIComponent(category.name)}`}
                  className="group bg-gray-50 hover:bg-white/50 rounded-xl p-4 sm:p-4.5 flex flex-col items-center justify-center text-center border border-[#DCDCDC] hover:border-[#00BC7D] hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  {category.iconUrl ? (
                    <Image
                      src={category.iconUrl}
                      alt=""
                      width={48}
                      height={48}
                      className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
                    />
                  ) : null}
                  <span className="mt-2.5 text-xs sm:text-[13px] font-medium text-slate-800 group-hover:text-[#00BC7D] transition-colors leading-tight">
                    {category.name}
                  </span>
                </Link>
              ))
              )}
          </div>

          {/* Featured image spans the heading and the category grid */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 relative aspect-[356/271] lg:aspect-auto w-full self-stretch shadow-md overflow-hidden bg-zinc-800 rounded-2xl">
            <Image
              src="/images/popular-categories-architect.png"
              alt="Professional Architect"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
