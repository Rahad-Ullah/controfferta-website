"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/layout/header";
import DashboardSidebar from "@/components/dashboard/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#EAEFF2] font-sans text-slate-800 selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <DashboardSidebar
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
      />

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto md:ml-64">
        <DashboardHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full flex-1 space-y-6 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
