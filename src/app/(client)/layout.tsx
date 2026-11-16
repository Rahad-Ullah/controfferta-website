import ClientNavbar from "@/components/client/navbar";
import ClientFooter from "@/components/client/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <ClientNavbar />
      <div className="flex-1">{children}</div>
      <ClientFooter />
    </div>
  );
}
