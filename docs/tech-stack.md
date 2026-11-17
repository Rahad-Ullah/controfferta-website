# Tech stack

Controfferta (`https://controfferta.it`) is an Italian home-services lead marketplace. One Next.js app serves four surfaces: the customer site, the company marketing site, the company portal, and auth.

## Stack

| Layer | Choice |
|---|---|
| App | Next.js 15 App Router, React 19, TypeScript 5. Source is in `src/`. |
| UI | Tailwind CSS 4, shadcn/ui, Lucide icons, Sonner toasts, Framer Motion. |
| Public data | Server Components. `nextFetch` with the Next.js fetch cache. |
| Per-user data | SWR 2.5 in the browser. One fetcher, `src/components/swr-config.tsx`. |
| API | REST. Base URL is `NEXT_PUBLIC_API_BASE_URL`, read with `envConfig()` in `src/lib/env-config.ts`. |
| Auth | HttpOnly `auth_token` cookie. The browser sends `credentials: "include"`. |
| Tooling | Yarn. `yarn dev`, `yarn lint`. ESLint 9. |

## Routes

The URL picks the layout. A folder in parentheses is a route group and is not part of the URL.

| URL | Who | Layout |
|---|---|---|
| `/`, `/about`, `/services`, `/blog`, `/contact` | Customer | `src/app/(client)` |
| `/provider` and its pages | Company marketing | `src/app/(provider)` |
| `/dashboard` and its pages | Company portal | `src/app/(dashboard)` |
| `/login`, `/register`, password recovery | Auth | `src/app/(auth)` |
| `/onboarding` | Role chooser | Root layout only |

## Read next

| Question | Doc |
|---|---|
| Where does a file go? | `docs/project-structure.md` |
| How do we call the API? | `docs/swr.md` |
| Which backend route do we call? | `docs/api-integration.md` |
| What must stay fast and indexable? | `docs/performance-and-seo.md` |
