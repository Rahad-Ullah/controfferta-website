"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import {
  AppWindow,
  Sun,
  Home,
  Truck,
  Wind,
  CheckCircle2,
  Lock,
  Unlock,
  X,
  Check,
  Coins,
} from "lucide-react";
import { toast } from "sonner";
import { apiKeys } from "@/lib/api/keys";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Lead, LeadPagination } from "@/types/lead.interface";
import type { LeadAccess, LeadAccessPagination } from "@/types/lead-access.interface";
import type { PlaceholderLead } from "@/lib/placeholders";

type ApiListResponse<T, P> = { data?: T[]; pagination?: P };
type ProviderOverview = {
  availableCredits: number;
  unlockedLeads: number;
  availableLeads: number;
  creditsUsed: number;
};

function formatDate(value: string | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value));
}

function leadToPreview(lead: Lead): PlaceholderLead & {
  icon: typeof AppWindow;
  subtitle: string;
  cost: string;
} {
  const client = lead.client;
  return {
    id: lead._id,
    icon: AppWindow,
    subtitle: `${lead.address} · ${formatDate(lead.createdAt)}`,
    cost: `${lead.category?.creditCost ?? 0}cr`,
    category: lead.category?.name ?? "Lead",
    status: "Available",
    title: lead.title,
    description: lead.description,
    location: lead.address,
    budget: lead.budgetRange
      ? `€${lead.budgetRange.minimum.toLocaleString()} - €${lead.budgetRange.maximum.toLocaleString()}`
      : "Not specified",
    timeline: lead.timeline,
    creditsRequired: lead.category?.creditCost ?? 0,
    createdAt: formatDate(lead.createdAt),
    customerName: client?.name ?? "Hidden until unlocked",
    customerPhone: client ? `${client.phone.countryCode} ${client.phone.number}` : "",
    customerEmail: client?.email ?? "",
    customerAddress: client?.address ?? "",
    isUnlocked: Boolean(client),
  };
}

export default function DashboardHomePage() {
  const { user: currentUser, credits } = useCurrentUser();
  const user = { name: currentUser?.firstName ?? "Marco", credits: credits ?? 0 };
  const { data: leadsResponse, isLoading: leadsLoading } = useSWR<ApiListResponse<Lead, LeadPagination>>(
    `${apiKeys.leads}?limit=6&sort=-createdAt`,
  );
  const { data: accessResponse, isLoading: accessesLoading } = useSWR<ApiListResponse<LeadAccess, LeadAccessPagination>>(
    `${apiKeys.leadAccesses}?limit=6&sort=-createdAt%20-_id`,
  );
  const { data: overviewResponse } = useSWR<{ data?: ProviderOverview }>(
    apiKeys.analyticsProviderOverview,
  );
  const [previewLead, setPreviewLead] = useState<PlaceholderLead | null>(null);
  const [unlockedSuccessModal] = useState<PlaceholderLead | null>(null);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const handleUnlockLead = () => {
    setPreviewLead(null);
    toast.info("Placeholder. Lead unlock is not connected yet.");
  };

  const handleBuyCredits = (amount: number, packageName: string) => {
    setTopUpModalOpen(false);
    toast.info(`Placeholder. ${packageName} (${amount} credits) is not connected yet.`);
  };

  // The 6 exact Recent Leads matching the screenshot
  const recentLeads = [
    {
      id: "lead-101",
      icon: AppWindow,
      title: "Replacement of 8 PVC windows",
      subtitle: "Lombardia / Milano · Jan 8",
      cost: "15cr",
      category: "Windows & Doors",
      description: "Looking to replace 8 wooden windows with high thermal insulation PVC triple-glazing windows. Acoustic comfort and tax incentive documentation required.",
      location: "Lombardia / Milano",
      timeline: "Within 1 month",
      budget: "€6,000 - €9,000",
      creditsRequired: 15,
      customerName: "Giulia Esposito",
      customerPhone: "+39 335 871 2940",
      customerEmail: "giulia.esposito@email.it",
      customerAddress: "Via Monte Napoleone 12, Milano",
      isUnlocked: true,
    },
    {
      id: "lead-102",
      icon: Sun,
      title: "8kW residential system",
      subtitle: "Veneto / Padova · Jan 7",
      cost: "20cr",
      category: "Solar & Energy",
      description: "Detached villa with south-facing pitched roof. Looking for turnkey installation including GSE connection, hybrid inverter, and 10kWh battery storage.",
      location: "Veneto / Padova",
      timeline: "Within 2 months",
      budget: "€12,000 - €16,000",
      creditsRequired: 20,
      customerName: "Luca Bianchi",
      customerPhone: "+39 347 912 3456",
      customerEmail: "l.bianchi@gmail.com",
      customerAddress: "Via Prato della Valle 8, Padova",
      isUnlocked: true,
    },
    {
      id: "lead-103",
      icon: Home,
      title: "House roof resurfacing",
      subtitle: "Emilia / Bologna · Jan 7",
      cost: "25cr",
      category: "Construction",
      description: "Complete resurfacing and thermal insulation of residential pitched roof (180sqm), including tile replacement and gutter repairs.",
      location: "Emilia / Bologna",
      timeline: "Within 2 months",
      budget: "€15,000 - €22,000",
      creditsRequired: 25,
      customerName: "Sara Conti",
      customerPhone: "+39 339 654 3210",
      customerEmail: "sara.conti@outlook.com",
      customerAddress: "Via Saragozza 45, Bologna",
      isUnlocked: true,
    },
    {
      id: "lead-104",
      icon: Truck,
      title: "120sqm office move",
      subtitle: "Lazio / Roma · Jan 6",
      cost: "12cr",
      category: "Moving",
      description: "Corporate office relocation including disassembly, transport, and reassembly of desks, filing cabinets, and conference equipment.",
      location: "Lazio / Roma",
      timeline: "Jan 15",
      budget: "€2,200 - €3,500",
      creditsRequired: 12,
      customerName: "Marco Ferretti",
      customerPhone: "+39 338 123 9876",
      customerEmail: "m.ferretti@libero.it",
      customerAddress: "Via Nazionale 88, Roma",
      isUnlocked: false,
    },
    {
      id: "lead-105",
      icon: Wind,
      title: "Installation of 3 split units",
      subtitle: "Campania / Napoli · Jan 6",
      cost: "10cr",
      category: "Air Conditioning",
      description: "Installation of 3 inverter air conditioners (9000 + 9000 + 12000 BTU) with external condenser unit. Pre-piped setup.",
      location: "Campania / Napoli",
      timeline: "Within 2 weeks",
      budget: "€2,800 - €4,200",
      creditsRequired: 10,
      customerName: "Antonio De Rosa",
      customerPhone: "+39 340 789 0123",
      customerEmail: "a.derosa@yahoo.it",
      customerAddress: "Via Toledo 120, Napoli",
      isUnlocked: false,
    },
    {
      id: "lead-106",
      icon: Wind,
      title: "Installation of 3 split units",
      subtitle: "Campania / Napoli · Jan 6",
      cost: "10cr",
      category: "Air Conditioning",
      description: "Installation of multi-split heat pump system in residential duplex. Certified technicians and energetic certification required.",
      location: "Campania / Napoli",
      timeline: "Immediate",
      budget: "€3,000 - €4,500",
      creditsRequired: 10,
      customerName: "Gennaro Russo",
      customerPhone: "+39 333 456 7891",
      customerEmail: "g.russo@live.it",
      customerAddress: "Corso Umberto I 54, Napoli",
      isUnlocked: false,
    },
  ];

  // The 6 exact Recently Unlocked matching the screenshot
  const recentlyUnlocked = [
    {
      initial: "G",
      name: "Giulia Esposito",
      service: "Windows & Doors · Jan 5",
      status: "Contacted",
      badgeClass: "bg-[#EFF6FF] text-[#2563EB] border border-blue-200/80",
    },
    {
      initial: "L",
      name: "Luca Bianchi",
      service: "Solar Panels · Jan 3",
      status: "In Progress",
      badgeClass: "bg-[#FEF3C7] text-[#D97706] border border-amber-200/80",
    },
    {
      initial: "S",
      name: "Sara Conti",
      service: "Construction · Jan 1",
      status: "Completed",
      badgeClass: "bg-[#DCFCE7] text-[#16A34A] border border-emerald-200/80",
    },
    {
      initial: "S",
      name: "Sara Conti",
      service: "Construction · Jan 1",
      status: "Completed",
      badgeClass: "bg-[#DCFCE7] text-[#16A34A] border border-emerald-200/80",
    },
    {
      initial: "G",
      name: "Giulia Esposito",
      service: "Windows & Doors · Jan 5",
      status: "Contacted",
      badgeClass: "bg-[#EFF6FF] text-[#2563EB] border border-blue-200/80",
    },
    {
      initial: "L",
      name: "Luca Bianchi",
      service: "Solar Panels · Jan 3",
      status: "In Progress",
      badgeClass: "bg-[#FEF3C7] text-[#D97706] border border-amber-200/80",
    },
  ];

  const liveRecentLeads = useMemo(
    () => (leadsResponse?.data ?? []).map(leadToPreview),
    [leadsResponse?.data],
  );
  const liveRecentlyUnlocked = useMemo(
    () =>
      (accessResponse?.data ?? []).map((access) => {
        const lead = typeof access.lead === "string" ? null : access.lead;
        const name = lead?.client?.name ?? "Unlocked lead";
        const status = access.status === "in_progress"
          ? "In Progress"
          : access.status.charAt(0).toUpperCase() + access.status.slice(1);
        return {
          initial: name.charAt(0).toUpperCase(),
          name,
          service: `${lead?.category?.name ?? "Lead"} · ${formatDate(access.unlockedAt)}`,
          status,
          badgeClass:
            access.status === "completed"
              ? "bg-[#DCFCE7] text-[#16A34A] border border-emerald-200/80"
              : access.status === "contacted" || access.status === "in_progress"
                ? "bg-[#EFF6FF] text-[#2563EB] border border-blue-200/80"
                : "bg-[#FEF3C7] text-[#D97706] border border-amber-200/80",
        };
      }),
    [accessResponse?.data],
  );
  const displayRecentLeads = leadsLoading ? recentLeads : liveRecentLeads;
  const displayRecentlyUnlocked = accessesLoading ? recentlyUnlocked : liveRecentlyUnlocked;
  const overview = overviewResponse?.data;
  const unlockedCount = overview?.unlockedLeads ?? accessResponse?.pagination?.total ?? 0;
  const availableLeadCount = overview?.availableLeads ?? leadsResponse?.pagination?.total ?? 0;
  const creditsUsed = overview?.creditsUsed ?? 0;

  return (
    <div className="space-y-6">
      {/* 1. Greeting Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Good morning, {user?.name || "Marco"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          <span className="font-bold text-[#00BC7D]">{availableLeadCount} leads</span> currently available.
        </p>
      </div>

      {/* 2. Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Credits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <p className="text-3xl font-bold text-[#EA580C]">{overview?.availableCredits ?? credits ?? "—"}</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Available Credits</p>
        </div>

        {/* Card 2: Unlocked Leads */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <p className="text-3xl font-bold text-[#0F172A]">{unlockedCount}</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Unlocked Leads</p>
        </div>

        {/* Card 3: Available Leads */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <p className="text-3xl font-bold text-[#2563EB]">{availableLeadCount}</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Available Leads</p>
        </div>

        {/* Card 4: Credits Used */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <p className="text-3xl font-bold text-[#9333EA]">{creditsUsed}</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Credits Used</p>
        </div>
      </div>

      {/* 3. Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Leads (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Recent Leads</h2>
            <Link
              href="/dashboard/leads"
              className="text-xs font-semibold text-[#00BC7D] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <span>→</span>
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {displayRecentLeads.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                onClick={() => setPreviewLead(item as unknown as PlaceholderLead)}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#00BC7D]/10 group-hover:text-[#00BC7D] transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#00BC7D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#00BC7D] shrink-0">
                    {item.cost}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Credit Balance + Recently Unlocked (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Widget: Credit Balance Card (Dark) */}
          <div className="bg-[#0B111D] rounded-2xl p-6 border border-slate-800 shadow-sm text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Credit Balance</span>
              <Link
                href="/dashboard/credit-packages"
                className="text-xs font-semibold text-[#00BC7D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Top up</span>
                <span>→</span>
              </Link>
            </div>

            <div className="mt-3">
              <p className="text-4xl font-black text-[#00BC7D] tracking-tight">
                {overview?.availableCredits ?? credits ?? "—"}
              </p>
              <p className="text-xs text-slate-400 mt-1">{unlockedCount} leads unlocked</p>
            </div>

            <div className="mt-5">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00BC7D] rounded-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span>Available: {overview?.availableCredits ?? credits ?? "—"}</span>
                <span>Unlocked: {unlockedCount}</span>
              </div>
            </div>
          </div>

          {/* Bottom Widget: Recently Unlocked Card (White) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Recently Unlocked</h2>
              <Link
                href="/dashboard/unlock-lead"
                className="text-xs font-semibold text-[#00BC7D] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {displayRecentlyUnlocked.map((item, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 px-2 -mx-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#059669] font-bold text-xs flex items-center justify-center shrink-0">
                      {item.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">{item.service}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${item.badgeClass}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW & UNLOCK LEAD MODAL */}
      {previewLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setPreviewLead(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#00BC7D]/10 text-[#00BC7D] border border-[#00BC7D]/30">
                {previewLead.category}
              </span>
              <span className="text-xs text-slate-400">ID #{previewLead.id}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">{previewLead.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{previewLead.description}</p>

            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-5">
              <div>
                <span className="text-slate-400 text-[11px] block">Location</span>
                <span className="font-semibold text-slate-800">{previewLead.location}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Timeline</span>
                <span className="font-semibold text-slate-800">{previewLead.timeline}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Estimated Budget</span>
                <span className="font-bold text-[#00BC7D]">{previewLead.budget}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Unlock Cost</span>
                <span className="font-bold text-amber-600">{previewLead.creditsRequired} Credits</span>
              </div>
            </div>

            {previewLead.isUnlocked ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 mb-4">
                <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Unlocked Client Details
                </p>
                <p className="text-slate-800"><strong className="text-slate-500">Client:</strong> {previewLead.customerName}</p>
                <p className="text-slate-800"><strong className="text-slate-500">Phone:</strong> {previewLead.customerPhone}</p>
                <p className="text-slate-800"><strong className="text-slate-500">Email:</strong> {previewLead.customerEmail}</p>
                <p className="text-slate-800"><strong className="text-slate-500">Address:</strong> {previewLead.customerAddress}</p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 mb-4">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  Client details are currently hidden
                </p>
                <p className="text-slate-500">
                  Unlocking this lead will instantly reveal the client&apos;s full name, phone number, email, and address.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Your current balance:</span>
                  <span className="font-bold text-slate-900">{credits ?? "—"} credits</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreviewLead(null)}
                className="flex-1 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>

              {!previewLead.isUnlocked && (
                <button
                  type="button"
                  onClick={() => handleUnlockLead()}
                  className="flex-1 h-11 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Lead Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LEAD UNLOCKED CELEBRATION MODAL */}
      {unlockedSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-200 rounded-3xl max-w-md w-full p-6 text-center text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00BC7D] border border-emerald-300 mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Lead Unlocked!</h3>
            <p className="text-xs text-slate-500 mb-4">
              You can now contact <span className="text-slate-900 font-bold">{unlockedSuccessModal.customerName}</span> directly.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${unlockedSuccessModal.customerPhone}`} className="font-bold text-[#00BC7D]">
                  {unlockedSuccessModal.customerPhone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <a href={`mailto:${unlockedSuccessModal.customerEmail}`} className="text-slate-800">
                  {unlockedSuccessModal.customerEmail}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="text-slate-800 text-right">{unlockedSuccessModal.customerAddress}</span>
              </div>
            </div>

            <Link
              href="/dashboard/unlock-lead"
              className="w-full h-11 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center cursor-pointer"
            >
              Go to My Unlocked Leads
            </Link>
          </div>
        </div>
      )}

      {/* QUICK TOP UP MODAL */}
      {topUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setTopUpModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-[#00BC7D]" />
              <h3 className="text-lg font-bold text-slate-900">Top Up Credits</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">Select a credit package to instantly top up your balance.</p>

            <div className="space-y-3 mb-6">
              <div
                onClick={() => handleBuyCredits(50, "Starter Package")}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Starter Package (50 Credits)</h4>
                  <p className="text-[11px] text-slate-500">Unlock 3-5 verified leads</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€49 + VAT</span>
              </div>

              <div
                onClick={() => handleBuyCredits(150, "Pro Growth Package")}
                className="p-4 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border-2 border-[#00BC7D] flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Pro Growth (150 Credits)</h4>
                    <span className="text-[9px] bg-[#00BC7D] text-white px-1.5 py-0.2 rounded font-extrabold">POPULAR</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Unlock 10-15 verified leads (Save 15%)</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€129 + VAT</span>
              </div>

              <div
                onClick={() => handleBuyCredits(500, "Enterprise Package")}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Enterprise (500 Credits)</h4>
                  <p className="text-[11px] text-slate-500">Maximum savings for large companies (Save 30%)</p>
                </div>
                <span className="font-extrabold text-[#00BC7D] text-sm">€349 + VAT</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTopUpModalOpen(false)}
              className="w-full h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
