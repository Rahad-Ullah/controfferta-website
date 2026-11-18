"use client";

import useSWR, { mutate } from "swr";
import { apiKeys } from "@/lib/api/keys";
import type { CurrentUser, CurrentUserResponse } from "@/types/user.interface";

type UseCurrentUserOptions = {
  /** Set false to skip the request (e.g. on public pages). Default true. */
  enabled?: boolean;
};

/** Revalidate `/users/me` in the shared SWR cache (call after login / verify). */
export function refreshCurrentUser() {
  return mutate(apiKeys.me);
}

/** Drop the cached user without refetching (call on logout). */
export function clearCurrentUser() {
  return mutate(apiKeys.me, undefined, { revalidate: false });
}

/**
 * Current user from `GET /users/me`, cached in SWR.
 * Same key everywhere → one request, shared cache. Not a second store.
 */
export function useCurrentUser(options: UseCurrentUserOptions = {}) {
  const enabled = options.enabled ?? true;

  const { data, error, isLoading, isValidating, mutate: mutateUser } = useSWR<CurrentUserResponse>(
    enabled ? apiKeys.me : null,
  );

  const user: CurrentUser | null = data?.data ?? null;

  return {
    user,
    error,
    isLoading,
    isValidating,
    refresh: () => mutateUser(),
    clear: () => mutateUser(undefined, { revalidate: false }),
  };
}
