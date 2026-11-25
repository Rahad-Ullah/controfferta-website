import ClientNavbar from "@/components/client/navbar";
import ClientFooter from "@/components/client/footer";
import GuestOnboardingGate from "@/components/onboarding/guest-onboarding-gate";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestOnboardingGate>
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <ClientNavbar />
        <div className="flex-1">{children}</div>
        <ClientFooter />
      </div>
    </GuestOnboardingGate>
  );
}
