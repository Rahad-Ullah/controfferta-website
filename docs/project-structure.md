# Project structure

Read this before adding files. Client data fetching also follows `docs/swr.md`.

## Naming

- File and folder names are lowercase with hyphens: `env-config.ts`, `customer-navbar.tsx`, `customer-landing`.
- The exported React component is the only PascalCase name: file `customer-navbar.tsx`, function `CustomerNavbar`.
- Next.js reserved files stay as they are: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Do not add new source files in the repository root. Root is for tooling: `package.json`, `next.config.ts`, `tsconfig.json`, `AGENTS.md`.

## Where code goes

| Path | Put it here |
|---|---|
| `app/` | Routes only. One `page.tsx` per URL. Layouts wrap a segment. |
| `app/api/` | Route handlers this Next app owns, such as auth cookie set and clear. |
| `components/ui/` | Shared primitives (button, input, dialog). |
| `components/shared/` | Site chrome used by more than one page (navbar, footer). |
| `components/landing/` | Marketing sections. Group a page's sections in a kebab-case folder. |
| `components/onboarding/` | Role-selection screen. |
| `components/providers.tsx` | Root client providers. Already wraps the app from `app/layout.tsx`. |
| `lib/` | Shared modules that are not React components. |
| `lib/api/keys.ts` | Every SWR cache key. |
| `lib/api/fetcher.ts` | `nextFetch` and `swrFetcher`. |
| `lib/env-config.ts` | `envConfig()`. Public and server env values. |
| `lib/auth-cookie.ts` | HttpOnly `auth_token` helpers. Server only. |
| `lib/placeholders.ts` | Static screen data until a screen calls the API. |
| `utils/` | Small helpers that are not the API or auth layer. Prefer `lib/` for new shared modules. |
| `docs/` | Instructions for agents. Update the matching doc when a rule changes. |
| `types.ts` | Types used by more than one feature. |

## Routes

- `(main)` is the public marketing site. `(auth)` is login and registration. `dashboard` is the company portal.
- A new URL is `app/<segment>/page.tsx`. Do not invent a `pages/` directory.
- Keep route files thin. Render a component from `components/`. Do not build a large UI inside `page.tsx`.

## Adding a feature

1. Add the path to `lib/api/keys.ts`.
2. Read with `useSWR(apiKeys.someKey)` and write with `useSWRMutation(apiKeys.someKey, ...)`. See `docs/swr.md`.
3. Call the API only through `nextFetch`.
4. Put the screen component in `components/<feature>/<name>.tsx` and export it as PascalCase.
5. Read configuration through `envConfig()` in `lib/env-config.ts`. Do not add another env module.
6. Do not put the access token in `localStorage`, `sessionStorage`, or `document.cookie`.

## What not to do

- Do not create `camelCase` or `PascalCase` file names.
- Do not add a second data cache. SWR is the client cache.
- Do not leave a new helper in the repository root.
