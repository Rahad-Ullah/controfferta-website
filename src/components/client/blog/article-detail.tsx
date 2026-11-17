import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCover } from "@/components/client/blog/blog-cover";
import { formatBlogDate } from "@/components/client/blog/blog-query";
import type { Blog } from "@/types/blog.interface";

export function ArticleDetail({ blog }: { blog: Blog }) {
  const author = [blog.author?.firstName, blog.author?.lastName].filter(Boolean).join(" ");
  const paragraphs = blog.bodyContent
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          All articles
        </Link>

        <p className="mt-8 text-[11px] font-bold uppercase tracking-wider text-[#00BC7D]">
          {blog.category.name}
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {blog.title}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-zinc-500">
          {formatBlogDate(blog.createdAt)}
          {author ? ` · ${author}` : ""}
        </p>

        <div className="relative mt-8 h-64 sm:h-96 overflow-hidden rounded-3xl">
          <BlogCover
            src={blog.imageUrl}
            alt={blog.title}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>

        <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
          {blog.description}
        </p>
        <div className="mt-6 space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
