"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Lock,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import {
  DemoLead,
  getDemoLeads,
  updateLeadContactStatus,
} from "@/lib/demoAuth";

export default function UnlockedLeadsPage() {
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | "Contacted" | "In Progress" | "Completed">("All");
  const [selectedLead, setSelectedLead] = useState<DemoLead | null>(null);

  useEffect(() => {
    const allLeads = getDemoLeads();
    setLeads(allLeads);

    const handleUpdate = () => {
      const updated = getDemoLeads();
      setLeads(updated);
      setSelectedLead((prev) => {
        if (!prev) return null;
        return updated.find((l) => l.id === prev.id) || prev;
      });
    };
    window.addEventListener("company_session_updated", handleUpdate);
    return () => window.removeEventListener("company_session_updated", handleUpdate);
  }, []);

  const unlockedLeads = leads.filter((l) => l.isUnlocked);
  const completedCount = unlockedLeads.filter((l) => l.contactStatus === "Completed").length;

  const filteredLeads = unlockedLeads.filter((lead) => {
    if (activeTab === "All") return true;
    return (lead.contactStatus || "Contacted") === activeTab;
  });

  const handleStatusChange = (newStatus: "Contacted" | "In Progress" | "Completed") => {
    if (!selectedLead) return;
    const ok = updateLeadContactStatus(selectedLead.id, newStatus);
    if (ok) {
      const updated = { ...selectedLead, contactStatus: newStatus };
      setSelectedLead(updated);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      window.dispatchEvent(new Event("company_session_updated"));
      toast.success(`Status updated to "${newStatus}"`);
    }
  };

  const getStatusBadgeClass = (status?: string) => {
    if (status === "Completed") {
      return "bg-[#DCFCE7] text-[#16A34A] border border-emerald-200/80";
    }
    if (status === "In Progress") {
      return "bg-[#FEF3C7] text-[#D97706] border border-amber-200/80";
    }
    return "bg-[#EFF6FF] text-[#2563EB] border border-blue-200/80";
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* VIEW 1: LEAD DETAIL VIEW (Image 2)                                       */}
      {/* ========================================================================= */}
      {selectedLead ? (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Back button */}
          <button
            type="button"
            onClick={() => setSelectedLead(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Lead Info Card */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
              {/* Badges Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                  {selectedLead.category}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E0F7EF] text-[#00BC7D] border border-emerald-200">
                  {selectedLead.status || "Available"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedLead.title}
              </h2>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {selectedLead.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Jan 8 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedLead.timeline || "Within 1 months"}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold">$</span>
                  {selectedLead.budget || "€ 4,000–8,000"}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedLead.description || "Family seeking quote for complete PVC window replacement, ground floor and first floor."}
                </p>
              </div>

              {/* Contact Information Section (Mint Green Boxes - Image 2) */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-[#E0F5EC] border border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-emerald-800 font-medium">Customer Name</span>
                    <span className="font-bold text-slate-900">{selectedLead.customerName}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E0F5EC] border border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-emerald-800 font-medium">Phone</span>
                    <a
                      href={`tel:${selectedLead.customerPhone}`}
                      className="font-mono font-bold text-slate-900 hover:text-[#00BC7D] transition-colors"
                    >
                      {selectedLead.customerPhone}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E0F5EC] border border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-emerald-800 font-medium">Email</span>
                    <a
                      href={`mailto:${selectedLead.customerEmail}`}
                      className="font-mono font-bold text-slate-900 hover:text-[#00BC7D] transition-colors"
                    >
                      {selectedLead.customerEmail}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E0F5EC] border border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-emerald-800 font-medium">Full Address</span>
                    <span className="font-semibold text-slate-900">{selectedLead.customerAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Unlock Information & Status Selector (Image 2) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
              <h3 className="text-xs sm:text-sm text-slate-500 font-medium">
                Unlock Information
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Unlocked on</span>
                  <span className="font-bold text-slate-900">
                    {selectedLead.unlockedAt || "Today, 10:42 AM"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Credits used</span>
                  <span className="font-bold text-slate-900">
                    {selectedLead.creditsRequired || 25} credits
                  </span>
                </div>
              </div>

              {/* Status Selector Dropdown (Image 2) */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={selectedLead.contactStatus || "Contacted"}
                    onChange={(e) =>
                      handleStatusChange(e.target.value as "Contacted" | "In Progress" | "Completed")
                    }
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 pr-10 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#00BC7D] appearance-none cursor-pointer transition-colors"
                  >
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${selectedLead.customerPhone}`}
                  className="flex-1 h-10 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`mailto:${selectedLead.customerEmail}`}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: UNLOCKED LEADS LIST TABLE (Image 1)                               */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Header Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Unlocked Leads
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {unlockedLeads.length} total leads · {completedCount} completed
            </p>
          </div>

          {/* White Card Container with Tabs & Rows */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Top Tabs (Image 1) */}
            <div className="flex items-center px-6 pt-4 border-b border-slate-200 gap-6 overflow-x-auto scrollbar-none">
              {(["All", "Contacted", "In Progress", "Completed"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-[#00BC7D] text-[#00BC7D] font-bold -mb-px"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List of Unlocked Leads */}
            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <Lock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">No leads found in this tab</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try selecting another tab or browse new leads.
                </p>
                <Link
                  href="/dashboard/browser-leads"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00BC7D] text-white text-xs font-bold hover:bg-[#00d68f] shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Browse Leads</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    {/* Left: Avatar Circle + Title & Subtitle */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#059669] font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#00BC7D] group-hover:text-white transition-colors">
                        {lead.customerName ? lead.customerName.charAt(0).toUpperCase() : "G"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#00BC7D] transition-colors truncate">
                          {lead.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {lead.customerName} · {lead.location}
                        </p>
                      </div>
                    </div>

                    {/* Right Side Items: Category, Date, Credits, Status Badge, Arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                      <span className="hidden md:inline text-xs text-slate-400 font-normal">
                        {lead.category}
                      </span>
                      <span className="hidden sm:inline text-xs text-slate-400">
                        {lead.createdAt}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#00BC7D] font-mono">
                        {lead.creditsRequired}cr
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadgeClass(
                          lead.contactStatus
                        )}`}
                      >
                        {lead.contactStatus || "Contacted"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
