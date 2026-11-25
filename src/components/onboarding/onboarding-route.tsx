"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingScreen from "@/components/onboarding/onboarding";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  clearOnboardingPreference,
  getStoredOnboardingRole,
} from "@/lib/onboarding-storage";

export default function OnboardingRoute() {
  const router = useRouter();
  const { user, isLoading, isValidating } = useCurrentUser();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (isLoading || isValidating) return;

    if (user) {
      clearOnboardingPreference();
      router.replace("/");
      return;
    }

    if (getStoredOnboardingRole()) {
      router.replace("/");
      return;
    }

    setIsAllowed(true);
  }, [isLoading, isValidating, router, user]);

  if (!isAllowed) {
    return <div className="min-h-screen bg-[#061B1E]" aria-hidden="true" />;
  }

  return <OnboardingScreen />;
}
