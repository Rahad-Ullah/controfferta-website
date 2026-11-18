"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Category } from "@/types/category.interface";
import type { Lead } from "@/types/lead.interface";
import UnlockLeadDialog from "./unlock-dialog";

function formatLeadDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ProviderServiceLeads({
  category,
  result,
}: {
  category: Category;
  result: { leads: Lead[]; total: number } | null;
}) {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/dashboard/browser-leads");
  const leads = result?.leads ?? [];

  const unlockPath = (leadId: string) =>
    `/dashboard/browser-leads?lead=${encodeURIComponent(leadId)}`;

  const handleUnlock = (leadId: string) => {
    if (isLoading) return;

    const next = unlockPath(leadId);
    if (!user) {
      setRedirectTo(next);
      setDialogOpen(true);
      return;
    }

    router.push(next);
  };

  return (
    <section className="bg-white py-14 text-slate-900 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          <Link href="/provider/services" className="hover:text-slate-900">
            Services
          </Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-slate-900">{category.name}</span>
        </p>

        {result === null ? (
          <p className="mt-10 text-sm text-slate-500">Requests could not be loaded. Try again shortly.</p>
        ) : leads.length === 0 ? (
          <p className="mt-10 text-sm text-slate-500">No requests in this category yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leads.map((lead) => (
              <article
                key={lead._id}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] transition-colors hover:border-[#00D492]"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                      {lead.category?.name || category.name}
                    </span>
                    <span className="rounded-full bg-[#E7F8F1] px-2.5 py-0.5 text-[11px] font-semibold text-[#12a37a]">
                      Available
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">{lead.title}</h2>
                  {lead.address ? (
                    <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-400">
                      <MapPin className="mt-0.5 size-3.5 shrink-0" />
                      {lead.address}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5 space-y-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{formatLeadDate(lead.createdAt)}</span>
                    <span className="font-bold text-[#00D492]">
                      {lead.category?.creditCost ?? category.creditCost} credits
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnlock(lead._id)}
                    disabled={isLoading}
                    className="flex h-10 w-full items-center justify-center rounded-full bg-[#00D492] text-sm font-semibold text-white transition-colors hover:bg-[#00BC7D] disabled:opacity-60"
                  >
                    Unlock
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <UnlockLeadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        redirectTo={redirectTo}
      />
    </section>
  );
}
