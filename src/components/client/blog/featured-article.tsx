import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCover } from "@/components/client/blog/blog-cover";
import { articleHref, formatBlogDate } from "@/components/client/blog/blog-query";
import type { Blog } from "@/types/blog.interface";

export function FeaturedArticle({ blog }: { blog: Blog }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
      <Link
        href={articleHref(blog.title, blog._id)}
        className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center group"
      >
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[380px] rounded-2xl overflow-hidden">
          <BlogCover
            src={blog.imageUrl}
            alt=""
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#00BC7D] text-[11px] font-bold uppercase tracking-wider">
              {blog.category.name}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 leading-tight group-hover:text-[#00BC7D] transition-colors">
            {blog.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{blog.description}</p>

          <p className="text-[11px] text-zinc-400 font-medium">{formatBlogDate(blog.createdAt)}</p>

          <div className="pt-2">
            <span className="bg-[#00BC7D] group-hover:bg-[#00d68f] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md inline-flex items-center gap-1.5">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
