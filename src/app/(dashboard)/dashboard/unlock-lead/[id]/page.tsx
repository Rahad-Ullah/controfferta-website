"use client";

import { useParams } from "next/navigation";
import UnlockedLeadDetail from "@/components/dashboard/unlock-lead/unlocked-lead-detail";

export default function UnlockedLeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <UnlockedLeadDetail id={id} />;
}
