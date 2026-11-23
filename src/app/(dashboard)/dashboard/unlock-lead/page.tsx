import type { Metadata } from "next";
import UnlockedLeads from "@/components/dashboard/unlock-lead/unlocked-leads";

export const metadata: Metadata = {
  title: "Unlocked Leads",
  robots: { index: false, follow: false },
};

export default function UnlockedLeadsPage() {
  return <UnlockedLeads />;
}
