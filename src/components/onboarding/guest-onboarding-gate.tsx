"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  clearOnboardingPreference,
  getStoredOnboardingRole,
} from "@/lib/onboarding-storage";

type GateDecision = "checking" | "show-onboarding" | "allow";

export default function GuestOnboardingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, error, isLoading, isValidating } = useCurrentUser();
  const [decision, setDecision] = useState<GateDecision>("checking");

  useEffect(() => {
    if (isLoading || isValidating) return;

    if (user) {
      clearOnboardingPreference();
      setDecision("allow");
      return;
    }

    if (error || !user) {
      setDecision(getStoredOnboardingRole() ? "allow" : "show-onboarding");
    }
  }, [error, isLoading, isValidating, user]);

  useEffect(() => {
    if (decision === "show-onboarding") {
      router.replace("/onboarding");
    }
  }, [decision, router]);

  // Keep the server-rendered public page visible while the client session check
  // completes, preserving the SEO-friendly SSR response and avoiding a blank page.
  return <>{children}</>;
}
