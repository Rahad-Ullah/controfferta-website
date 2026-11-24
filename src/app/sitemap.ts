import type { MetadataRoute } from "next";
import { getBlogs } from "@/actions/blog";
import { articleHref } from "@/components/client/blog/blog-query";

const siteUrl = "https://controfferta.it";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/submit-request", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/provider", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/provider/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/provider/services", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/provider/how-it-works", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/provider/reviews", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/provider/contact", priority: 0.5, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogs = await getBlogs({ limit: "60", sort: "-updatedAt" });
  for (const blog of blogs?.data ?? []) {
    entries.push({
      url: `${siteUrl}${articleHref(blog.title, blog._id)}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
