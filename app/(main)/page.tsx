"use client";

import React, { useState, useEffect } from "react";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import CustomerLandingPage from "@/components/landing/CustomerLandingPage";
import { getCompanySession, clearCompanySession } from "@/lib/demoAuth";

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState<"customer" | "provider" | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    // Check if the user has already selected a role or is logged in
    try {
      const savedRole = localStorage.getItem("user_role");
      const session = getCompanySession();

      if (savedRole === "customer") {
        setCurrentRole("customer");
      } else if (savedRole === "provider" || session) {
        setCurrentRole("provider");
      } else {
        setCurrentRole(null);
      }
    } catch {
      setCurrentRole(null);
    }
    setIsClientLoaded(true);
  }, []);

  const handleSelectCustomer = () => {
    try {
      clearCompanySession();
      localStorage.setItem("user_role", "customer");
      localStorage.setItem("has_seen_onboarding", "true");
      document.cookie = `user_role=customer; path=/; max-age=2592000; SameSite=Lax`;
    } catch {
      // ignore
    }
    setCurrentRole("customer");
  };

  const handleSwitchRole = () => {
    try {
      clearCompanySession();
      localStorage.removeItem("user_role");
      localStorage.removeItem("has_seen_onboarding");
      document.cookie = `user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } catch {
      // ignore
    }
    setCurrentRole(null);
  };

  // Prevent flash before client state is read
  if (!isClientLoaded) {
    return (
      <div className="min-h-screen bg-[#061B1E] flex items-center justify-center text-[#00BC7D]">
        <div className="animate-spin w-8 h-8 border-2 border-[#00BC7D] border-t-transparent rounded-full" />
      </div>
    );
  }

  // If customer or logged-in portal user, show the main website
  if (currentRole === "customer" || currentRole === "provider") {
    return <CustomerLandingPage onSwitchRole={handleSwitchRole} />;
  }

  // First visit / Onboarding: Show the role selection screen
  return <OnboardingScreen onSelectCustomer={handleSelectCustomer} />;
}
