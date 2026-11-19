import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PaymentSuccess from "@/components/payment/payment-success";

function PaymentSuccessFallback() {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-white p-10 text-slate-500 shadow-xs">
      <Loader2 className="size-6 animate-spin text-[#00BC7D]" />
      <p className="text-sm">Loading payment details…</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccess />
    </Suspense>
  );
}
