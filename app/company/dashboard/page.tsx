"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompanyDashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <div className="min-h-screen bg-[#080B10] flex items-center justify-center text-[#00BC7D]">
      <div className="animate-spin w-8 h-8 border-2 border-[#00BC7D] border-t-transparent rounded-full" />
    </div>
  );
}
