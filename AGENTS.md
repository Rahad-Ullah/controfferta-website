<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

For the stack and the four surfaces, read `docs/tech-stack.md`.

For a backend endpoint, read `docs/api-integration.md`. The backend repo is read-only.

For client data fetching, follow `docs/swr.md`. Use the root SWR fetcher. Do not add a second client cache.

For where files go and how they are named, follow `docs/project-structure.md`. File and folder names are lowercase with hyphens. Only the exported React component uses PascalCase.

For speed, caching, and SEO, follow `docs/performance-and-seo.md`. Use SWR for client data. Use the Next.js fetch cache for public data that rarely changes. Public pages must be server-rendered and indexable.
