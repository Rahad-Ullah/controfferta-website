# API integration

The website calls the Controfferta API. This doc is the only integration guide. Fetching rules stay in `docs/swr.md`.

## Backend is read-only

The API source is a separate repo. An agent working in this website may read it and must not change it.

| | |
|---|---|
| Path | `C:\Users\Rahad-Ullah\projects\controfferta-backend` |
| Branch | `main` |
| Allowed | Read files. Search. |
| Forbidden | Create, edit, delete, format, or commit anything in that repo. Do not run its install, tests, migrations, or server. Do not change its `.env`. |

If a screen needs a field the API does not return, stop and say so. Do not add the field on the backend to make the screen work.

## Where the API is

The process the team runs is `http://10.10.26.188:5013`. Express mounts the router at `/api/v1` in `src/app.ts`. A category list is `GET http://10.10.26.188:5013/api/v1/categories`.

`NEXT_PUBLIC_API_BASE_URL` is that prefix: `http://10.10.26.188:5013/api/v1`. `envConfig()` returns it as `apiBaseUrl`. Paths in `src/lib/api/keys.ts` start after the prefix, such as `/categories`. `nextFetch` joins the two. Do not hardcode the host in a component.

Swagger UI, when the server is not in production, is `http://10.10.26.188:5013/api-docs`. The spec is `http://10.10.26.188:5013/api-docs/v1.json`.

## How to find one endpoint

Read these files in the backend, in this order. Stop at the first file that answers the question.

1. `src/routes/index.ts` for the module prefix, such as `/leads`.
2. `src/app/modules/<module>/<module>.route.ts` for the method, path, `auth(...)`, and Zod schema.
3. The module's `validation` file for the body and query.
4. The module's `controller` for the success message and status.
5. The module's `*.doc.ts` when the route file is not enough.

Roles in `src/app/modules/user/user.constant.ts` are `client`, `provider`, `admin`, and `super_admin`. A route with no `auth(...)` is public. A route with `auth()` requires a logged-in user. A route with `auth(UserRole.Provider)` rejects every other role.

## Response shape

Success JSON is `{ success, message, data, pagination? }`. `pagination` is `{ page, limit, totalPage, total }` on lists. A failed validation is HTTP 400 with `success: false` and `errorMessages`. A missing token is 401. The wrong role is 403.

## How the website calls it

Change only this website.

1. Add the path to `apiKeys` in `src/lib/api/keys.ts`. Copy the path from the route file. Do not put a raw path in a component.
2. Call it through `nextFetch`. Client reads use `useSWR(apiKeys.someKey)`. Client writes use `useSWRMutation`. See `docs/swr.md`.
3. Public pages stay Server Components and pass `next: { revalidate, tags }` into `nextFetch`. Portal pages use SWR.
4. Send `credentials: "include"`. The API already does this inside `nextFetch`. Login sets HttpOnly `accessToken` and `refreshToken` cookies for browsers (`src/app/modules/auth/auth.cookies.ts` in the backend). Do not copy those tokens into `localStorage`.
5. Wire one endpoint at a time. Leave the placeholder data in place on screens you have not wired.

## Map a screen to a module

| Website | Backend module | Notes |
|---|---|---|
| Customer submit request | `lead` | Public `POST /leads/create`. No account. |
| Provider lead feed | `lead` | `GET /leads` hides contact details. |
| Unlock a lead | `leadAccess` | Provider spends credits. |
| Credits and checkout | `creditPackage`, `creditPurchase`, `creditLedger` | Stripe checkout. The webhook is the API's, not the website's. |
| Categories | `category` | Public list for marketing and forms. |
| Blog, reviews, FAQ | `blog`, `platformReview`, `faq` | Public reads. |
| Login and password | `auth` | Browser cookies. Paths are under `/auth`. |
