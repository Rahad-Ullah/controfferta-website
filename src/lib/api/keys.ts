/**
 * SWR cache keys for GET routes.
 * A write passes its own URL where the call is defined.
 * Values are API paths. `nextFetch` prefixes `envConfig().apiBaseUrl`.
 */
export const apiKeys = {
  categories: "/categories",
  leads: "/leads",
  settings: "/settings",
  supports: "/supports",
} as const;
