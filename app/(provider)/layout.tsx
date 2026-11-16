import ProviderNavbar from "@/components/provider/navbar";
import ProviderFooter from "@/components/provider/footer";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col">
      <ProviderNavbar />
      <div className="flex-1">{children}</div>
      <ProviderFooter />
    </div>
  );
}
