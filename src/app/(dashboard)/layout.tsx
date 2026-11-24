"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearCurrentUser, useCurrentUser } from "@/hooks/use-current-user";
import DashboardShell from "@/components/dashboard/layout/dashboard-shell";
import DashboardLoading from "@/components/dashboard/layout/dashboard-loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, error, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isLoading || !error) return;

    void fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      void clearCurrentUser();
      router.replace("/login?redirect=/dashboard&reason=session-expired");
    });
  }, [error, isLoading, router]);

  useEffect(() => {
    if (!isLoading && user && user.role !== "provider") router.replace("/");
  }, [isLoading, router, user]);

  if (isLoading || error || !user || user.role !== "provider") {
    return (
      <DashboardShell>
        <DashboardLoading />
      </DashboardShell>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
