/**
 * SWR cache keys for GET routes.
 * A write passes its own URL where the call is defined.
 * Values are API paths. `nextFetch` prefixes `envConfig().apiBaseUrl`.
 */
export const apiKeys = {
  me: "/users/me",
  categories: "/categories",
  leads: "/leads",
  leadAccesses: "/lead-accesses",
  leadAccess: (id: string) => `/lead-accesses/${id}`,
  creditLedgers: "/credit-ledgers",
  creditPackages: "/credit-packages",
  creditPurchases: "/credit-purchases",
  blogs: "/blogs",
  platformReviews: "/platform-reviews",
  supports: "/supports",
  settings: "/settings",
} as const;
