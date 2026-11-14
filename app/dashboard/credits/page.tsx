"use client";

import React, { useState } from "react";
import {
  Coins,
  Plus,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { placeholderCompany } from "@/lib/placeholders";

export default function CreditsPage() {
  const user = placeholderCompany;
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const handleBuyCredits = (amount: number, packageName: string) => {
    setTopUpModalOpen(false);
    toast.info(`Placeholder. ${packageName} (${amount} credits) is not connected yet.`);
  };

  // Exact 7 usage rows matching the screenshot
  const recentUsageData = [
    {
      date: "Jan 8",
      title: "More than 6 fixtures",
      category: "Windows & Doors",
      credits: 12,
    },
    {
      date: "Jan 7",
      title: "6kW solar system",
      category: "Solar Panels",
      credits: 546,
    },
    {
      date: "Jan 6",
      title: "Kitchen renovation",
      category: "Construction",
      credits: 44,
    },
    {
      date: "Jan 7",
      title: "6kW solar system",
      category: "Solar Panels",
      credits: 546,
    },
    {
      date: "Jan 6",
      title: "Kitchen renovation",
      category: "Construction",
      credits: 44,
    },
    {
      date: "Jan 6",
      title: "Kitchen renovation",
      category: "Construction",
      credits: 44,
    },
    {
      date: "Jan 5",
      title: "Move Roma Nord",
      category: "Moving",
      credits: 34,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Top Up Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Credit Balance
        </h1>
        <button
          type="button"
          onClick={() => setTopUpModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Top Up Credits</span>
        </button>
      </div>

      {/* Top 2 Stats Cards (Image 1) */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Card 1: Current Balance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs w-full sm:w-64">
          <p className="text-3xl font-bold text-[#EA580C]">
            {user?.credits ?? 285}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">Current Balance</p>
        </div>

        {/* Card 2: Credits Used */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs w-full sm:w-64">
          <p className="text-3xl font-bold text-slate-900">54</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Credits Used</p>
        </div>
      </div>

      {/* Main Table Card: Recent Usage (Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Title */}
        <div className="p-6 pb-4">
          <h2 className="text-base font-bold text-slate-900">Recent Usage</h2>
        </div>

        {/* Columns Header Row */}
        <div className="grid grid-cols-12 px-6 py-3 border-t border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3 sm:col-span-2">Date</div>
          <div className="col-span-6 sm:col-span-7">Lead</div>
          <div className="col-span-3 sm:col-span-3 text-right sm:text-left">Credits</div>
        </div>

        {/* Table Rows (Exact 7 rows from screenshot) */}
        <div className="divide-y divide-slate-100 text-xs">
          {recentUsageData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50/70 transition-colors"
            >
              {/* Date */}
              <div className="col-span-3 sm:col-span-2 text-slate-500 text-xs">
                {item.date}
              </div>

              {/* Lead (Title + Category) */}
              <div className="col-span-6 sm:col-span-7 min-w-0 pr-3">
                <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {item.category}
                </p>
              </div>

              {/* Credits Pill */}
              <div className="col-span-3 sm:col-span-3 text-right sm:text-left">
                <span className="inline-flex items-center justify-center min-w-[2.2rem] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs font-mono">
                  {item.credits}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP UP CREDITS MODAL */}
      {topUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setTopUpModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-[#00BC7D]" />
              <h3 className="text-lg font-bold text-slate-900">Top Up Credits (Demo Mode)</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">Select a credit package to instantly top up your account balance.</p>

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
