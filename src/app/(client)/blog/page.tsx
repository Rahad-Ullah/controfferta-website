import { getBlogs } from "@/actions/blog";
import { getCategories } from "@/actions/category";
import { ArticleGrid } from "@/components/client/blog/article-grid";
import { BLOG_PAGE_SIZE } from "@/components/client/blog/blog-query";
import { BlogHero } from "@/components/client/blog/blog-hero";
import { FeaturedArticle } from "@/components/client/blog/featured-article";
import type { BlogQuery } from "@/types/blog.interface";

export const metadata = {
  title: "Blog",
  description:
    "Guides and practical tips for home projects, renovations, and choosing a professional.",
};

function listLimit(raw?: string) {
  const limit = Number(raw);
  if (!Number.isSafeInteger(limit) || limit < BLOG_PAGE_SIZE) return BLOG_PAGE_SIZE;
  return Math.min(limit, 60);
}

function objectId(value?: string) {
  if (!value || !/^[a-f\d]{24}$/i.test(value)) return undefined;
  return value;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogQuery>;
}) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() || undefined;
  const category = objectId(params.category);
  const limit = listLimit(params.limit);

  const [articles, categories] = await Promise.all([
    getBlogs({
      searchTerm,
      category,
      page: "1",
      limit: String(limit),
      sort: "-createdAt",
    }),
    getCategories({ limit: "60", sort: "name" }),
  ]);

  const blogs = articles?.data ?? null;
  const total = articles?.pagination?.total ?? blogs?.length ?? 0;
  const featured = blogs?.[0];
  const latest = blogs?.slice(1) ?? [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <BlogHero
        searchTerm={searchTerm ?? ""}
        categories={categories?.data ?? []}
        activeCategory={category}
      />

      {blogs === null ? (
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">Articles could not be loaded.</p>
        </section>
      ) : blogs.length === 0 ? (
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            {searchTerm || category ? "No articles match that search." : "No articles yet."}
          </p>
        </section>
      ) : (
        <>
          {featured ? <FeaturedArticle blog={featured} /> : null}
          <ArticleGrid
            articles={latest}
            shown={blogs.length}
            total={total}
            searchTerm={searchTerm}
            category={category}
            limit={limit}
          />
        </>
      )}
    </div>
  );
}
