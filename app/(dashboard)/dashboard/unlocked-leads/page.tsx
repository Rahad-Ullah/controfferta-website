"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnlockedLeadsAlias() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/unloack-lead");
  }, [router]);
  return null;
}

