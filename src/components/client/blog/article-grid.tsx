import Link from "next/link";
import { ArrowRight, RotateCw } from "lucide-react";
import { BlogCover } from "@/components/client/blog/blog-cover";
import { articleHref, blogHref, formatBlogDate } from "@/components/client/blog/blog-query";
import type { Blog } from "@/types/blog.interface";

export function ArticleGrid({
  articles,
  shown,
  total,
  searchTerm,
  category,
  limit,
}: {
  articles: Blog[];
  shown: number;
  total: number;
  searchTerm?: string;
  category?: string;
  limit: number;
}) {
  const nextLimit = Math.min(limit + 6, 60, Math.max(total, limit));
  const canLoadMore = shown < total && nextLimit > limit;

  if (articles.length === 0 && !canLoadMore) return null;

  return (
    <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Latest Articles
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          Fresh guides, market benchmarks, and practical tips from verified professionals.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={articleHref(article.title, article._id)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <BlogCover
                    src={article.imageUrl}
                    alt=""
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#070A0F]/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#00BC7D]">
                    {article.category.name}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="text-[11px] text-zinc-400 mb-2 font-medium">
                    {formatBlogDate(article.createdAt)}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00BC7D] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <span className="text-xs sm:text-sm font-semibold text-[#00BC7D] inline-flex items-center gap-1">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-14 text-center">
        {canLoadMore ? (
          <Link
            href={blogHref({ searchTerm, category, limit: nextLimit })}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <span>Load More Articles</span>
            <RotateCw className="w-3.5 h-3.5" />
          </Link>
        ) : null}
        <p className="mt-2 text-xs text-zinc-400">
          Showing {shown} of {total} articles
        </p>
      </div>
    </section>
  );
}
