export const BLOG_PAGE_SIZE = 13;

// Keep the title readable in the URL and use the trailing database ID for lookup.
export function articleSlug(title: string, id: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `${slug}-${id}` : id;
}

export function articleId(slug: string) {
  return slug.match(/[a-f\d]{24}$/i)?.[0];
}

export function articleHref(title: string, id: string) {
  return `/blog/${articleSlug(title, id)}`;
}

export function blogHref({
  searchTerm,
  category,
  limit,
}: {
  searchTerm?: string;
  category?: string;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (category) params.set("category", category);
  if (limit && limit > BLOG_PAGE_SIZE) params.set("limit", String(limit));
  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

export function formatBlogDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
