# Project structure

Read this before adding files. The stack is `docs/tech-stack.md`. Client data fetching also follows `docs/swr.md`.

## Naming

- File and folder names are lowercase with hyphens: `env-config.ts`, `client/home/hero.tsx`.
- The exported React component is the only PascalCase name: file `navbar.tsx`, function `ClientNavbar`.
- Next.js reserved files stay as they are: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Source code lives in `src/`. Do not add new source files in the repository root. Root is for tooling: `package.json`, `next.config.ts`, `tsconfig.json`, `AGENTS.md`, `public/`.

## Where code goes

| Path | Put it here |
|---|---|
| `src/app/` | Routes only. One `page.tsx` per URL. Layouts wrap a segment. |
| `src/app/api/` | Route handlers this Next app owns, such as auth cookie set and clear. |
| `src/components/ui/` | Shared primitives (button, input, dialog). |
| `src/components/shared/` | Site chrome used by more than one role. |
| `src/components/client/` | Client chrome and page sections. `navbar.tsx` and `footer.tsx` stay here because the layout uses them on every client route. Sections for one route go in a folder named after that route: `home/`, `about/`, `services/`, `how-it-works/`, `reviews/`, `blog/`, `contact/`, `submit-request/`. |
| `src/components/provider/` | Provider chrome and page sections. `navbar.tsx` and `footer.tsx` stay here because the layout uses them on every provider route. Sections for one route go in a folder named after that route: `home/`, `about/`, `services/`, `how-it-works/`, `reviews/`, `contact/`. |
| `src/components/onboarding/` | Role-selection screen. |
| `src/components/swr-config.tsx` | Root SWR defaults. `src/app/layout.tsx` wraps every page with `SwrDefaults`. |
| `src/actions/` | Server actions. One file per entity, named for that entity (`category.ts`). A file can export more than one action. |
| `src/hooks/` | Shared React hooks. One hook per file, named for the hook (`use-search-param.ts`). |
| `src/schemas/` | Zod validation schemas. One file per form or entity (`submit-request.ts`). A file can export more than one schema. |
| `src/types/` | Shared API types. One file per entity (`category.interface.ts`, `lead.interface.ts`). |
| `src/lib/` | Shared modules that are not React components. |
| `src/lib/api/keys.ts` | Every SWR cache key. |
| `src/lib/api/fetcher.ts` | `nextFetch` and `swrFetcher`. |
| `src/lib/env-config.ts` | `envConfig()`. Public and server env values. |
| `src/lib/auth-cookie.ts` | HttpOnly `auth_token` helpers. Server only. |
| `src/lib/placeholders.ts` | Static screen data until a screen calls the API. |
| `src/utils/` | Small helpers that are not the API or auth layer. Prefer `src/lib/` for new shared modules. |
| `docs/` | Instructions for agents. Update the matching doc when a rule changes. |

## Routes

Route groups choose the layout. A group name in parentheses is not part of the URL. `src/app/layout.tsx` stays the document shell (`html`, `body`, providers). Do not pick a layout from `localStorage`.

| Group | Layout | Screens |
|---|---|---|
| `(client)` | `src/app/(client)/layout.tsx` | Customer site: `/`, `/about`, `/services`, `/blog`, `/contact`, `/how-it-works`, `/reviews`, `/submit-request` |
| `(provider)` | `src/app/(provider)/layout.tsx` | Company site: `/provider`, `/provider/about`, `/provider/services`, `/provider/how-it-works`, `/provider/reviews`, `/provider/contact` |
| `(dashboard)` | `src/app/(dashboard)/layout.tsx` | Company portal: `/dashboard` and its pages |
| `(auth)` | `src/app/(auth)/layout.tsx` | Login, registration, and password recovery |

`/onboarding` stays outside these groups. It is the role chooser and uses only the root layout. Customer continues to `/`. Provider continues to `/register`.

- A new customer screen goes in `src/app/(client)/<segment>/page.tsx`.
- A new company marketing screen goes in `src/app/(provider)/provider/<segment>/page.tsx`.
- A new portal screen goes in `src/app/(dashboard)/dashboard/<segment>/page.tsx`.
- Do not invent a `pages/` directory.
- Keep route files thin. Render a component from `src/components/`. Do not build a large UI inside `page.tsx`.

## Adding a feature

1. Add the path to `src/lib/api/keys.ts`.
2. Read with `useSWR(apiKeys.someKey)` and write with `useSWRMutation(apiKeys.someKey, ...)`. See `docs/swr.md`.
3. Call the API only through `nextFetch`.
4. Put the screen component in `src/components/<feature>/<name>.tsx` and export it as PascalCase.
5. Read configuration through `envConfig()` in `src/lib/env-config.ts`. Do not add another env module.
6. Do not put the access token in `localStorage`, `sessionStorage`, or `document.cookie`.

## What not to do

- Do not create `camelCase` or `PascalCase` file names.
- Do not add a second data cache. SWR is the client cache.
- Do not leave a new helper in the repository root.
