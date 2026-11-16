# Performance and SEO

The site is Controfferta. The canonical origin is `https://controfferta.it`. Use that as `metadataBase`. Do not use The Cloud Salon or any other product name.

The site must stay fast, light, and responsive. Public pages must be indexable. Read this before changing UI, data loading, or metadata.

Two caches, used for different data:

| Data | Cache | Where |
|---|---|---|
| Company portal data that changes per user (leads, credits, profile) | SWR in the browser | Client components. See `docs/swr.md`. |
| Public content that rarely changes (marketing copy, categories, blog, reviews) | Next.js fetch cache | Server Components and Route Handlers, via `nextFetch`. |

Do not put public marketing pages behind SWR. The HTML must be ready on the server so the first paint and search engines do not wait on client JavaScript.

## Next.js cache for public data

Call `nextFetch` from a Server Component. Set `next.revalidate` in seconds and a `tag` so one publish can refresh that content.

```ts
const posts = await nextFetch<Post[]>({
  url: apiKeys.posts,
  next: { revalidate: 3600, tags: ["posts"] },
});
```

- Use a long `revalidate` only when the content rarely changes. An hour (`3600`) is the default for marketing content unless the task says otherwise.
- Do not set `cache: "no-store"` on public content.
- Do not cache authenticated or personal data with `next.revalidate`. Those requests stay on the client with SWR.
- `next.revalidate` does nothing in a client component. SWR is the client cache.

## Keep the UI light

- Public pages are Server Components. Add `"use client"` only for a leaf that needs state, events, or SWR.
- Do not add a library for something CSS or a small component can do.
- Images use `next/image` with real `width` and `height` or `fill` plus `sizes`. Always set `alt`.
- Fonts load with `next/font` and `display: "swap"`. Do not add a second font loader.
- Animations stay on the element that needs them. Do not mark a whole page as a client component so one button can animate.
- Layouts must work at a phone width and at a desktop width. Use the existing Tailwind breakpoints. Do not fix a layout with a fixed pixel width that overflows a phone.

## SEO

Every public route exports `metadata` or `generateMetadata` in its `page.tsx`.

- `title` is unique and names the page. The root template appends `| Controfferta`, so page titles should not repeat the brand.
- `description` is one or two sentences a person would search for. Do not repeat the title verbatim.
- One `h1` per page. It matches the page topic. Sections use `h2` and `h3` in order.
- The meaningful text is in the server-rendered HTML, not inserted only after `useEffect`.
- Links use `<Link>` for in-site URLs and a real `<a>` for off-site URLs. The href is a path, not a click handler that navigates.
- Images that convey information have a specific `alt`. Decorative images use `alt=""`.
- Set `lang` on `<html>`. The root layout already uses `en`. Change it only when a page is in another language.
- Do not block indexing of public pages. `noindex` is only for the dashboard, auth screens, and other private routes.

Dashboard and auth pages should export:

```ts
export const metadata = {
  robots: { index: false, follow: false },
};
```

## What not to do

- Do not fetch public, rarely changing content with `useSWR` as the first source of HTML.
- Do not cache per-user data in the Next.js fetch cache.
- Do not ship a public page that is only a client component with no `metadata`.
- Do not add weight (extra animation libraries, icon packs, or UI kits) for a single screen.
