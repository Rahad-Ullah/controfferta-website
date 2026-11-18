import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Lead } from "@/types/lead.interface";

function formatLeadDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ProviderLatestRequests({ leads }: { leads: Lead[] }) {
  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Latest Requests</h2>
          <p className="mt-2 text-sm text-slate-500">The most recent customer requests on the platform.</p>
        </div>

        {leads.length === 0 ? (
          <p className="text-center text-sm text-slate-500">No requests to show yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leads.map((lead) => (
              <article
                key={lead._id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-10px_#0f172a2e] transition-colors hover:border-[#00D492]"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                      {lead.category?.name}
                    </span>
                    <span className="rounded-full bg-[#E7F8F1] px-2.5 py-0.5 text-[11px] font-semibold text-[#12a37a]">
                      Available
                    </span>
                  </div>
                  <h3 className="mb-3 text-sm font-bold text-slate-900">{lead.title}</h3>
                  <p className="mb-5 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="size-3.5 shrink-0" />
                    {lead.address}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="text-slate-400">{formatLeadDate(lead.createdAt)}</span>
                  <span className="font-bold text-[#00D492]">{lead.category?.creditCost} credits</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/provider/services" className="text-sm font-semibold text-[#00D492] underline underline-offset-4">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
