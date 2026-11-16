"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BrowseLeadsAlias() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/browser-leads");
  }, [router]);
  return null;
}

