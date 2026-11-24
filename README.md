# Controfferta Website

Controfferta is a home-services lead marketplace for customers and companies in Italy. Customers can describe a project and receive relevant offers from qualified professionals. Companies can browse requests, unlock leads with credits, and manage their account through the company portal.

The project is a single Next.js application with separate experiences for the customer website, company marketing pages, authenticated company portal, and authentication screens.

## Product surfaces

| Surface | Main routes | Purpose |
| --- | --- | --- |
| Customer website | `/`, `/about`, `/services`, `/blog`, `/contact`, `/submit-request` | Public, indexable customer experience |
| Company website | `/provider`, `/provider/about`, `/provider/services` | Public company acquisition and product information |
| Company portal | `/dashboard` | Authenticated leads, credits, notifications, and profile management |
| Authentication | `/login`, `/register`, `/forgot-password`, `/reset-password` | Sign-in and account recovery |
| Onboarding | `/onboarding` | Role-selection entry point |

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS 4
- shadcn/ui primitives
- Lucide icons
- Framer Motion for focused UI animation
- SWR for browser-side authenticated data
- Next.js fetch caching for public content
- Sonner for toast notifications
- Vercel Speed Insights

## Requirements

- Node.js 20 or newer
- Yarn or npm
- Access to the Controfferta backend API for data-backed pages

## Local setup

1. Install dependencies:

   ```bash
   yarn install
   ```

   npm is also supported:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Set the backend URL in `.env`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

   Use the appropriate backend URL for your local or deployed environment. Never commit real credentials or tokens.

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
yarn dev          # Start the development server
yarn lint         # Run ESLint
yarn tsc --noEmit # Run TypeScript checks
yarn build        # Create a production build
yarn start        # Start the production server
```

## Project structure

```text
src/
├── actions/              Server-side public data actions
├── app/                  App Router routes and layouts
│   ├── (client)/         Customer website
│   ├── (provider)/       Company marketing website
│   ├── (dashboard)/      Authenticated company portal
│   ├── (auth)/           Authentication screens
│   ├── api/              App-owned route handlers
│   ├── onboarding/       Role-selection screen
│   ├── robots.ts         Robots metadata route
│   └── sitemap.ts        Sitemap metadata route
├── components/
│   ├── client/           Customer sections and chrome
│   ├── dashboard/        Company portal components
│   ├── provider/         Company marketing components
│   ├── shared/           Shared application components
│   └── ui/               Reusable shadcn/ui primitives
├── hooks/                Shared React hooks
├── lib/
│   ├── api/              API keys and fetch utilities
│   ├── auth-cookie.ts    Server-only auth cookie helpers
│   └── env-config.ts     Environment configuration
├── schemas/              Zod validation schemas
├── types/                Shared TypeScript interfaces
└── utils/                Small reusable utilities
```

## Data fetching

The application uses two intentional data-fetching patterns:

### Public content

Public categories, reviews, settings, and blog content are loaded in Server Components through the cached `nextFetch` helper. This keeps meaningful content in the initial HTML for performance and SEO.

### Authenticated company data

Leads, credits, notifications, profile data, and other per-user data are loaded in Client Components with SWR. The root SWR configuration lives in `src/components/swr-config.tsx`, and the shared fetch logic lives in `src/lib/api/fetcher.ts`.

Do not add another client-side cache or put user-specific data into the Next.js public fetch cache.

## Authentication

- Authentication uses an HttpOnly `auth_token` cookie.
- Browser requests use credentials so the cookie reaches the backend.
- The company dashboard checks the current user and requires the `provider` role.
- Expired sessions are cleared and redirected to login.
- Refresh and logout are handled through the app-owned routes under `src/app/api/auth/`.
- Tokens must not be stored in `localStorage`, `sessionStorage`, or regular browser cookies.

## API integration

Backend endpoint paths and request conventions are documented in [`docs/api-integration.md`](docs/api-integration.md). The backend repository is treated as read-only from this project.

Use the existing API utilities and keys instead of calling `fetch` directly from feature components:

- `src/lib/api/fetcher.ts`
- `src/lib/api/keys.ts`
- `src/actions/`

## SEO and performance

Public pages are server-rendered and intended to remain indexable. The project includes:

- Root metadata with title templates and descriptions
- Open Graph and Twitter card metadata
- Organization and WebSite JSON-LD structured data
- `/robots.txt` through `src/app/robots.ts`
- `/sitemap.xml` through `src/app/sitemap.ts`
- Dynamic blog URLs in the sitemap
- `next/image` optimization with AVIF and WebP output
- `next/font` with display swapping
- Vercel Speed Insights

SEO guidance is documented in [`docs/performance-and-seo.md`](docs/performance-and-seo.md). Private dashboard and authentication routes should not be indexed.

## Styling and UI conventions

- Use Tailwind classes for layout and styling.
- Reuse primitives from `src/components/ui/`.
- Use `Link` for internal navigation and real anchors for external URLs.
- Keep public pages responsive from phone to desktop widths.
- Use accessible labels, meaningful image `alt` text, keyboard-friendly controls, and visible focus states.
- Keep route files thin; place larger UI sections in the matching component folder.

## Environment variables

The main required variable is:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |

Google Maps configuration is optional and is read by `src/lib/env-config.ts` when map features are enabled. Keep all environment files containing real values local and out of version control.

## Deployment checklist

Before deploying:

1. Set `NEXT_PUBLIC_API_BASE_URL` to the production backend.
2. Confirm the production origin is `https://controfferta.it`.
3. Run `yarn lint` and `yarn tsc --noEmit`.
4. Run `yarn build`.
5. Verify authentication, token refresh, logout, and dashboard redirects.
6. Verify `/robots.txt`, `/sitemap.xml`, canonical public routes, and Open Graph previews.
7. Confirm no secrets, local IP addresses, or development credentials are committed.

## Further documentation

- [`docs/tech-stack.md`](docs/tech-stack.md) — architecture and technology choices
- [`docs/project-structure.md`](docs/project-structure.md) — file placement and naming conventions
- [`docs/api-integration.md`](docs/api-integration.md) — backend integration rules
- [`docs/swr.md`](docs/swr.md) — client-side fetching and cache behavior
- [`docs/performance-and-seo.md`](docs/performance-and-seo.md) — performance and indexing rules
