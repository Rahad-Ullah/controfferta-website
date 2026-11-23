import type { Metadata } from "next";
import UnlockedLeadDetail from "@/components/dashboard/unlock-lead/unlocked-lead-detail";

export const metadata: Metadata = {
  title: "Unlocked Lead Details",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UnlockedLeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <UnlockedLeadDetail id={id} />;
}
