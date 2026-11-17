import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlog } from "@/actions/blog";
import { ArticleDetail } from "@/components/client/blog/article-detail";
import { articleId } from "@/components/client/blog/blog-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = articleId(slug);
  if (!id) return { title: "Article" };

  const blog = await getBlog(id);
  if (!blog) return { title: "Article" };
  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = articleId(slug);
  if (!id) notFound();

  const blog = await getBlog(id);
  if (!blog) notFound();
  return <ArticleDetail blog={blog} />;
}
