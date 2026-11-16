/**
 * Every SWR cache key used by the app.
 * Pass the same key to `useSWR` and `useSWRMutation` so a write revalidates that query on the client.
 * Values are API paths. `nextFetch` prefixes `envConfig().apiBaseUrl`.
 */
export const apiKeys = {} as const;
