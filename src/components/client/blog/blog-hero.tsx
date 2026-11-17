import { Suspense } from "react";
import Link from "next/link";
import { BlogSearch } from "@/components/client/blog/blog-search";
import { blogHref } from "@/components/client/blog/blog-query";
import type { Category } from "@/types/category.interface";

const trendingTags = [
  { label: "#Ristrutturazione", term: "Ristrutturazione" },
  { label: "#BonusCasa2025", term: "BonusCasa2025" },
  { label: "#PannelliSolari", term: "PannelliSolari" },
  { label: "#Preventivi", term: "Preventivi" },
];

export function BlogHero({
  searchTerm,
  categories,
  activeCategory,
}: {
  searchTerm: string;
  categories: Category[];
  activeCategory?: string;
}) {
  return (
    <section className="bg-white border-b border-slate-100 pt-14 pb-12 sm:pt-18 sm:pb-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Insights &amp; <span className="text-[#00BC7D]">Inspiration</span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
          Discover helpful tips, expert advice, and ideas to make your next project easier.
        </p>

        <Suspense fallback={<div className="pt-5 mx-auto h-14 max-w-xl" />}>
          <BlogSearch searchTerm={searchTerm} />
        </Suspense>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-zinc-500">
          <span className="text-zinc-400 font-semibold mr-1">Trending:</span>
          {trendingTags.map((tag) => (
            <Link
              key={tag.term}
              href={blogHref({ searchTerm: tag.term })}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-full px-2.5 py-0.5 text-zinc-600 hover:text-[#00BC7D] hover:border-[#00BC7D]/40 transition-colors"
            >
              {tag.label}
            </Link>
          ))}
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <Link
            href={blogHref({ searchTerm: searchTerm || undefined })}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory
                ? "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                : "bg-[#00BC7D] text-white shadow-sm"
            }`}
          >
            All Articles
          </Link>
          {categories.map((category) => {
            const active = activeCategory === category._id;
            return (
              <Link
                key={category._id}
                href={blogHref({
                  searchTerm: searchTerm || undefined,
                  category: category._id,
                })}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#00BC7D] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
