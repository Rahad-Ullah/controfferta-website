"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import {
  DemoCompanyUser,
  getCompanySession,
  buyDemoCredits,
} from "@/lib/demoAuth";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  pricePerCredit: string;
  badge?: string;
  badgeType?: "green" | "black";
  description: string;
}

export default function BuyCreditsPage() {
  const [user, setUser] = useState<DemoCompanyUser | null>(null);

  // 3 Steps: "packages" | "checkout" | "success"
  const [step, setStep] = useState<"packages" | "checkout" | "success">("packages");

  // Selected package state (Growth selected by default - Image 1)
  const packages: CreditPackage[] = [
    {
      id: "pkg-starter",
      name: "Starter",
      credits: 50,
      price: 49,
      pricePerCredit: "€ 0.98/credit",
      description: "Ideal for testing the platform",
    },
    {
      id: "pkg-growth",
      name: "Growth",
      credits: 150,
      price: 129,
      pricePerCredit: "€ 0.86/credit",
      badge: "Most popular",
      badgeType: "green",
      description: "For teams with medium volume",
    },
    {
      id: "pkg-pro",
      name: "Professional",
      credits: 500,
      price: 349,
      pricePerCredit: "€ 0.70/credit",
      badge: "Recommended",
      badgeType: "black",
      description: "For growing companies",
    },
    {
      id: "pkg-enterprise",
      name: "Enterprise",
      credits: 1000,
      price: 599,
      pricePerCredit: "€ 0.60/credit",
      description: "Maximum volume and savings",
    },
  ];

  const [selectedPkg, setSelectedPkg] = useState<CreditPackage>(packages[1]); // Growth default
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    pkgName: string;
    creditsAdded: number;
    newBalance: number;
    txnId: string;
  } | null>(null);

  // Payment Form state
  const [cardName, setCardName] = useState("Marco Ferretti");
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [expiry, setExpiry] = useState("12 / 28");
  const [cvv, setCvv] = useState("123");

  useEffect(() => {
    setUser(getCompanySession());

    const handleUpdate = () => {
      setUser(getCompanySession());
    };
    window.addEventListener("company_session_updated", handleUpdate);
    return () => window.removeEventListener("company_session_updated", handleUpdate);
  }, []);

  const handlePay = () => {
    const res = buyDemoCredits(selectedPkg.credits, selectedPkg.name);
    if (res.success) {
      setUser(getCompanySession());
      window.dispatchEvent(new Event("company_session_updated"));

      setPaymentSuccessData({
        pkgName: selectedPkg.name,
        creditsAdded: selectedPkg.credits,
        newBalance: res.newBalance,
        txnId: "TXN-V7170AC2",
      });
      setStep("success");
      toast.success(`Payment completed! Added ${selectedPkg.credits} credits to your account.`);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ========================================================================= */}
      {/* STEP 1: PACKAGES SELECTION (Image 1)                                      */}
      {/* ========================================================================= */}
      {step === "packages" && (
        <div className="w-full space-y-8 animate-in fade-in duration-150">
          {/* Centered Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Buy Credits
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Choose the package best suited to your customer acquisition volume.
            </p>

            {/* Current Balance Pill */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-emerald-300/80 bg-[#E0F7EF] text-slate-600 text-xs font-medium">
                Current balance:{" "}
                <span className="font-bold text-[#00BC7D]">
                  {user?.credits ?? 285} credits
                </span>
              </span>
            </div>
          </div>

          {/* 4 Packages Row (Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {packages.map((pkg) => {
              const isSelected = selectedPkg.id === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg)}
                  className={`rounded-2xl p-6 flex flex-col justify-between cursor-pointer relative border-2 transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#F3FAF7] border-[#00BC7D] shadow-sm"
                      : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`text-[11px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-xs ${
                          pkg.badgeType === "green"
                            ? "bg-[#00BC7D] text-white"
                            : "bg-[#0F172A] text-white"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Top: Credits amount */}
                  <div>
                    <p
                      className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                        isSelected ? "text-[#00BC7D]" : "text-slate-900"
                      }`}
                    >
                      {pkg.credits}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">credits</p>

                    {/* Price and Rate */}
                    <div className="mt-5">
                      <p className="text-lg sm:text-xl font-bold text-slate-900">
                        € {pkg.price}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {pkg.pricePerCredit}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Package Name & Description */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="font-bold text-xs sm:text-sm text-slate-900">
                      {pkg.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Proceed Button & Subtext */}
          <div className="text-center pt-2 max-w-md mx-auto space-y-2">
            <button
              type="button"
              onClick={() => setStep("checkout")}
              className="w-full sm:w-auto sm:min-w-[400px] px-8 py-3.5 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Proceed to purchase - {selectedPkg.credits} credits for € {selectedPkg.price}
            </button>
            <p className="text-xs text-slate-400">
              Credits never expire · Secure payment
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: CHECKOUT & PAYMENT INFORMATION (Image 2)                         */}
      {/* ========================================================================= */}
      {step === "checkout" && (
        <div className="w-full space-y-5 animate-in fade-in duration-150">
          {/* Back button */}
          <button
            type="button"
            onClick={() => setStep("packages")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to packages</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Payment Information Card (Image 2) */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Payment information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Card number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] focus:bg-white transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] focus:bg-white transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Secure SSL Note */}
              <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure SSL payment — your data is not stored</span>
              </div>
            </div>

            {/* Right Column: Order summary Card (Image 2) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Order summary</h2>

              <div className="space-y-3 text-xs sm:text-sm pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Package</span>
                  <span className="font-bold text-slate-900">{selectedPkg.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Credits</span>
                  <span className="font-bold text-[#00BC7D] font-mono">{selectedPkg.credits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Price/credit</span>
                  <span className="font-medium text-slate-900">{selectedPkg.pricePerCredit.replace("/credit", "")}</span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Total</span>
                  <span className="text-base font-extrabold text-slate-900">€ {selectedPkg.price}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-3 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                Pay € {selectedPkg.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: PAYMENT COMPLETED! (Image 3)                                      */}
      {/* ========================================================================= */}
      {step === "success" && paymentSuccessData && (
        <div className="max-w-md mx-auto text-center space-y-5 pt-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Checkmark Container */}
          <div className="w-14 h-14 rounded-2xl bg-[#E0F7EF] text-[#00BC7D] mx-auto flex items-center justify-center">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Payment Completed!</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              You have added{" "}
              <span className="font-bold text-[#00BC7D]">
                {paymentSuccessData.creditsAdded} credits
              </span>{" "}
              to your account.
            </p>
          </div>

          {/* Receipt Box (Image 3) */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-xs sm:text-sm space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Package</span>
              <span className="font-bold text-slate-900">{paymentSuccessData.pkgName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Credits added</span>
              <span className="font-bold text-[#00BC7D] font-mono">{paymentSuccessData.creditsAdded}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">New balance</span>
              <span className="font-bold text-slate-900 font-mono">{paymentSuccessData.newBalance}</span>
            </div>

            <div className="border-t border-slate-200/60 my-2" />

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Transaction ID</span>
              <span className="text-slate-600 font-mono text-xs">{paymentSuccessData.txnId}</span>
            </div>
          </div>

          {/* Browse Leads Button */}
          <div>
            <Link
              href="/dashboard/browser-leads"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
            >
              Browse Leads
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

