export type OnboardingRole = "provider" | "client";

const ONBOARDING_STORAGE_KEY = "controfferta_onboarding";
const LEGACY_STORAGE_KEYS = ["user_role", "has_seen_onboarding"];
const ONBOARDING_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredOnboardingPreference {
  role: OnboardingRole;
  expiresAt: number;
}

function isOnboardingRole(value: unknown): value is OnboardingRole {
  return value === "provider" || value === "client";
}

export function getStoredOnboardingRole(): OnboardingRole | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw) as Partial<StoredOnboardingPreference>;
    if (
      !isOnboardingRole(stored.role) ||
      typeof stored.expiresAt !== "number" ||
      stored.expiresAt <= Date.now()
    ) {
      clearOnboardingPreference();
      return null;
    }

    return stored.role;
  } catch {
    clearOnboardingPreference();
    return null;
  }
}

export function saveOnboardingRole(role: OnboardingRole) {
  if (typeof window === "undefined") return;

  try {
    const preference: StoredOnboardingPreference = {
      role,
      expiresAt: Date.now() + ONBOARDING_TTL_MS,
    };

    window.localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify(preference),
    );
    LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

export function clearOnboardingPreference() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Ignore storage errors; authentication must not depend on local storage.
  }
}
