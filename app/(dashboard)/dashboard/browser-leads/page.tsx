"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Euro,
  Lock,
  Unlock,
  LockOpen,
  Check,
  ArrowLeft,
  ChevronDown,
  Phone,
  Mail,
  Coins,
} from "lucide-react";
import { toast } from "sonner";
import { placeholderCompany, placeholderLeads, type PlaceholderLead } from "@/lib/placeholders";

export default function BrowseLeadsPage() {
  const user = placeholderCompany;
  const leads = placeholderLeads;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All regions");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLead, setSelectedLead] = useState<PlaceholderLead | null>(null);

  const [confirmModalLead, setConfirmModalLead] = useState<PlaceholderLead | null>(null);
  const [successModalLead] = useState<PlaceholderLead | null>(null);

  const handleConfirmUnlock = () => {
    if (!confirmModalLead) return;
    setConfirmModalLead(null);
    toast.info("Placeholder. Lead unlock is not connected yet.");
  };

  const categories = [
    "All",
    "Windows & Doors",
    "Solar Panels",
    "Construction",
    "Moving",
    "Air Conditioning",
    "Renovation",
  ];

  const regions = [
    "All regions",
    "Lombardia",
    "Veneto",
    "Emilia",
    "Lazio",
    "Campania",
    "Toscana",
    "Piemonte",
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesCategory =
      selectedCategory === "All" ||
      lead.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesRegion =
      selectedRegion === "All regions" ||
      lead.location.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

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
              {/* Top Badges */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                  {selectedLead.category}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedLead.isUnlocked
                      ? "bg-[#E0F7EF] text-[#00BC7D] border border-emerald-200"
                      : selectedLead.status === "Sold"
                      ? "bg-[#FEE2E2] text-[#EF4444]"
                      : "bg-[#E0F7EF] text-[#00BC7D] border border-emerald-200"
                  }`}
                >
                  {selectedLead.isUnlocked ? "Unlocked" : selectedLead.status || "Available"}
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
                  {selectedLead.createdAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedLead.timeline}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold">$</span>
                  {selectedLead.budget}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedLead.description}
                </p>
              </div>

              {/* Contact Information Section */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact Information
                </h3>

                {selectedLead.isUnlocked ? (
                  /* Revealed Contact Details */
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-[#E8F8F2] border border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Customer name</span>
                      <span className="font-bold text-slate-900">{selectedLead.customerName}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#E8F8F2] border border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Customer phone</span>
                      <a href={`tel:${selectedLead.customerPhone}`} className="font-mono font-bold text-[#00BC7D] hover:underline">
                        {selectedLead.customerPhone}
                      </a>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#E8F8F2] border border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Customer email</span>
                      <a href={`mailto:${selectedLead.customerEmail}`} className="font-mono font-bold text-[#00BC7D] hover:underline">
                        {selectedLead.customerEmail}
                      </a>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#E8F8F2] border border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Customer full address</span>
                      <span className="font-bold text-slate-900">{selectedLead.customerAddress}</span>
                    </div>
                  </div>
                ) : (
                  /* Locked Contact Boxes (Image 2) */
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer name</span>
                      </div>
                      <span className="text-amber-600 font-semibold text-[11px]">Unlock to view</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer phone</span>
                      </div>
                      <span className="text-amber-600 font-semibold text-[11px]">Unlock to view</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer email</span>
                      </div>
                      <span className="text-amber-600 font-semibold text-[11px]">Unlock to view</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer full address</span>
                      </div>
                      <span className="text-amber-600 font-semibold text-[11px]">Unlock to view</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Credit Cost Widget (Image 2) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Credit Cost</span>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#00BC7D] tracking-tight mt-1">
                  {selectedLead.creditsRequired} credits
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Your Balance</span>
                  <span className="font-bold text-slate-900">{user?.credits ?? 285} credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Remaining after unlock</span>
                  <span className="font-bold text-slate-900">
                    {Math.max(0, (user?.credits ?? 285) - selectedLead.creditsRequired)} credits
                  </span>
                </div>
              </div>

              <div className="pt-2">
                {selectedLead.isUnlocked ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-xl bg-emerald-50 text-[#00BC7D] border border-emerald-200 font-bold text-xs sm:text-sm cursor-default"
                  >
                    Lead Already Unlocked
                  </button>
                ) : selectedLead.status === "Sold" ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs sm:text-sm cursor-not-allowed"
                  >
                    Lead Sold Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmModalLead(selectedLead)}
                    className="w-full py-3 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    Unlock Lead - {selectedLead.creditsRequired} Credits
                  </button>
                )}
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  Full contact details revealed instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: LEADS LISTING GRID (Image 1)                                      */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Top Search & Filter Container (Image 1) */}
          <div className="bg-[#DFE5EA] border border-slate-300/60 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
            {/* Top row: Search input + All regions dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or area..."
                  className="w-full h-11 bg-[#EDF1F4] border border-slate-300/80 rounded-xl pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#00BC7D] focus:bg-white transition-colors"
                />
              </div>

              {/* Region Selector */}
              <div className="relative w-full sm:w-auto shrink-0">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full sm:w-auto h-11 bg-[#EDF1F4] border border-slate-300/80 rounded-xl px-4 pr-9 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#00BC7D] appearance-none cursor-pointer transition-colors"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Bottom row: Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#00BC7D] text-white shadow-xs"
                      : "bg-[#EDF1F4] text-slate-700 hover:bg-slate-200 border border-slate-300/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-header row: Leads count & Credits available badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">
              {filteredLeads.length} leads found
            </span>

            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#00BC7D]/40 bg-[#E0F7EF] text-[#00BC7D] text-xs font-bold">
              <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>{user?.credits ?? 285} credits available</span>
            </div>
          </div>

          {/* 3-Column Leads Grid (Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                      {lead.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        lead.isUnlocked
                          ? "bg-[#E0F7EF] text-[#00BC7D] border border-emerald-200"
                          : lead.status === "Sold"
                          ? "bg-[#FEE2E2] text-[#EF4444]"
                          : "bg-[#E0F7EF] text-[#00BC7D] border border-emerald-200"
                      }`}
                    >
                      {lead.isUnlocked ? "Unlocked" : lead.status || "Available"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedLead(lead)}
                    className="text-sm font-bold text-slate-900 group-hover:text-[#00BC7D] transition-colors mt-3 cursor-pointer"
                  >
                    {lead.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {lead.description}
                  </p>

                  {/* Meta items */}
                  <div className="space-y-1 mt-3.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lead.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-semibold">$</span>
                      <span>{lead.budget}</span>
                    </div>
                  </div>

                  {/* Hidden Contact Banner */}
                  <div className="bg-slate-100/90 rounded-xl py-2 px-3 flex items-center gap-2 text-xs text-slate-400 mt-3.5 border border-slate-200/60">
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {lead.isUnlocked ? "Client contacts unlocked" : "Customer name, phone and email hidden"}
                    </span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                  <span className="text-sm font-extrabold text-[#00BC7D]">
                    {lead.creditsRequired} credits
                  </span>

                  {lead.isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="bg-emerald-50 hover:bg-[#00BC7D] text-[#00BC7D] hover:text-white border border-emerald-200 text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  ) : lead.status === "Sold" ? (
                    <span className="text-xs text-slate-400 font-semibold italic">
                      Unavailable
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      Unlock Lead
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CONFIRMATION MODAL ("Unlock this lead?") (Image 3)               */}
      {/* ========================================================================= */}
      {confirmModalLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top soft green icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#E0F7EF] text-[#00BC7D] mx-auto flex items-center justify-center mb-3">
              <LockOpen className="w-6 h-6 stroke-[2]" />
            </div>

            {/* Heading & Subtext */}
            <h3 className="text-lg font-bold text-slate-900">Unlock this lead?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 max-w-xs mx-auto">
              You are about to use your credits to access the customer&apos;s full details.
            </p>

            {/* Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-3 mb-6 text-left">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-900">{confirmModalLead.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unlock cost</span>
                <span className="font-bold text-[#00BC7D]">{confirmModalLead.creditsRequired} credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Current balance</span>
                <span className="font-bold text-slate-900">{user?.credits ?? 285} credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Balance after</span>
                <span className="font-bold text-slate-900">
                  {Math.max(0, (user?.credits ?? 285) - confirmModalLead.creditsRequired)} credits
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmModalLead(null)}
                className="rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-6 py-2.5 text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUnlock}
                className="rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold px-6 py-2.5 text-xs shadow-xs transition-all cursor-pointer"
              >
                Confirm Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SUCCESS MODAL ("Lead Unlocked!") (Image 4)                       */}
      {/* ========================================================================= */}
      {successModalLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top soft green icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#E0F7EF] text-[#00BC7D] mx-auto flex items-center justify-center mb-3">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            {/* Heading & Subtext */}
            <h3 className="text-lg font-bold text-slate-900">Lead Unlocked!</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              You have access to the customer&apos;s full details.
            </p>

            {/* Mint Green Revealed Box (Image 4) */}
            <div className="bg-[#E8F8F2] border border-emerald-200/80 rounded-2xl p-4 text-xs space-y-2.5 mb-6 text-left">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Name</span>
                <span className="font-bold text-slate-900">{successModalLead.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Phone</span>
                <a href={`tel:${successModalLead.customerPhone}`} className="font-mono font-bold text-[#00BC7D]">
                  {successModalLead.customerPhone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Email</span>
                <a href={`mailto:${successModalLead.customerEmail}`} className="font-mono font-bold text-[#00BC7D]">
                  {successModalLead.customerEmail}
                </a>
              </div>

              <div className="border-t border-emerald-200/60 my-2" />

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Request</span>
                <span className="font-bold text-slate-900">{successModalLead.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Budget</span>
                <span className="font-bold text-slate-900">{successModalLead.budget}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSuccessModalLead(null)}
                className="rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-6 py-2.5 text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`tel:${successModalLead.customerPhone}`}
                className="rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold px-6 py-2.5 text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
