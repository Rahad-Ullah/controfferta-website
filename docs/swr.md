# SWR data fetching

Read this before adding or changing API calls. Which endpoint to call is `docs/api-integration.md`. The backend repo is read-only. SWR `2.5.1` is installed. `src/components/swr-config.tsx` already wraps the app, and its `SWRConfig` uses `swrFetcher`.

Dashboard screens still render `src/lib/placeholders.ts` until a screen is wired to the API.

## Where things live

| Piece | File |
|---|---|
| Cache keys | `src/lib/api/keys.ts` |
| Universal fetch | `src/lib/api/fetcher.ts` (`nextFetch`, `swrFetcher`) |
| SWR defaults | `src/components/swr-config.tsx` |
| API origin | `NEXT_PUBLIC_API_BASE_URL`, returned as `apiBaseUrl` from `envConfig` in `src/lib/env-config.ts` |

## Rules

- `apiKeys` holds GET routes used as SWR cache keys. Do not add a POST, PATCH, or DELETE path there.
- A write passes its URL in the `nextFetch` call where the mutation is defined. Pass a GET `apiKeys` value as the `useSWRMutation` key when that write should refresh a cached list.
- Do not give `useSWR` its own fetcher. `SWRConfig` already uses `swrFetcher`, which is a GET through `nextFetch`.
- Every other call, including writes and server fetches, goes through `nextFetch`. Do not call `fetch` directly for this API.
- `nextFetch` always sends `credentials: "include"`. On the client, omit `token`. The `auth_token` cookie is `HttpOnly`, so client code cannot read it.
- On the server, pass `token` from `getAuthToken()` in `src/lib/auth-cookie.ts` when the upstream API expects `Authorization: Bearer`.
- `cache` and `next.revalidate` / `next.tags` are Next.js fetch options for public data that rarely changes. Use them from a Server Component. See `docs/performance-and-seo.md`. They do not control the browser SWR cache.
- Do not store API results or the access token in `localStorage`.

## 1. Register the cache key

```ts
// src/lib/api/keys.ts
export const apiKeys = {
  users: "/users",
} as const;
```

Dynamic paths are functions in the same object:

```ts
lead: (id: string) => `/leads/${id}`,
```

## 2. Read with useSWR

The hook key is the path. `swrFetcher` calls `nextFetch({ url: key })`.

```tsx
"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/api/keys";

export interface User {
  id: number;
  name: string;
}

export function UsersList() {
  const { data: users, error, isLoading, isValidating } = useSWR<User[]>(apiKeys.users);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Failed to load: {error.message}</div>;

  return (
    <ul>
      {isValidating && <small>Syncing...</small>}
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

`isLoading` is the first load with no cached data. `isValidating` is any in-flight request. Keep showing the cached list while `isValidating` is true.

## 3. Write with useSWRMutation

When the write uses the same path as the cached GET, the mutation key is that `apiKeys` value and `nextFetch` receives it as `url`. When the write has its own path, pass that path in `nextFetch` at the call. `trigger(payload)` places the payload on `{ arg }`.

`populateCache: false` keeps a list cache from being replaced by a single created record. `revalidate: true` refetches every `useSWR(apiKeys.users)` after the write succeeds.

```tsx
"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { apiKeys } from "@/lib/api/keys";
import { nextFetch } from "@/lib/api/fetcher";
import type { User } from "./UsersList";

export function AddUserForm() {
  const [name, setName] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    apiKeys.users,
    (url: string, { arg }: { arg: { name: string } }) =>
      nextFetch<User>({ url, method: "POST", payload: arg }),
    { revalidate: true, populateCache: false }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await trigger({ name }, { throwOnError: true });
      setName("");
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isMutating}
      />
      <button type="submit" disabled={isMutating || !name.trim()}>
        {isMutating ? "Adding..." : "Add User"}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
```

`PATCH` and `DELETE` use the same shape. Change `method`. `isMutating` is the loading flag. Do not add a second `useState` for the request.

If one write must refresh a second query, call `mutate(apiKeys.other)` from `useSWRConfig` after `trigger` resolves.

## 4. nextFetch

```ts
await nextFetch<User[]>({
  url: apiKeys.users,
  method: "GET",
  token, // server only, from getAuthToken()
  cache: "force-cache",
  next: { revalidate: 60, tags: ["users"] },
});

await nextFetch<User>({
  url: apiKeys.users,
  method: "POST",
  payload: { name: "Marco" },
});
```

`url` may be a path (`/users`) or an absolute URL. Paths are prefixed with `apiBaseUrl` from `envConfig()`. A non-OK response throws `ApiError` with `status` and `message`. A `204` returns `null`.

## What not to do

- Do not add another client cache, and do not fetch this API from `useEffect` plus `useState`.
- Do not put the access token in `localStorage`, `sessionStorage`, or `document.cookie`.
- Do not hardcode an API origin. Paths go through `apiBaseUrl` from `envConfig()`.
- `/users` above is the shape to copy. Do not add a users feature unless the task asks for one.
