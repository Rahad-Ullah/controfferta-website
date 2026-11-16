"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomerNavbar from "@/components/shared/customer-navbar";
import {
  Search,
  MapPin,
  ChevronDown,
  AlertTriangle,
  User,
  Mail,
  CheckCircle2,
  FileText,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubmitRequestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [requestRef, setRequestRef] = useState<string>("");

  // Form State
  const [category, setCategory] = useState<string>("Solar Panels");
  const [serviceName, setServiceName] = useState<string>("Solar panel installation");
  const [location, setLocation] = useState<string>("Brescia, Italy");
  const [region, setRegion] = useState<string>("Lombardy");

  const [timeline, setTimeline] = useState<string>("As soon as possible");
  const [description, setDescription] = useState<string>(
    "Interested in installing a high-efficiency rooftop solar system for our family home. Need advice on hybrid storage inverter options."
  );
  const [budget, setBudget] = useState<string>("€5,000 – €10,000");

  const [fullName, setFullName] = useState<string>("Marco Rossi");
  const [email, setEmail] = useState<string>("m.rossi@residenzabrescia.it");
  const [countryCode, setCountryCode] = useState<string>("+39");
  const [phoneNumber, setPhoneNumber] = useState<string>("335 128 9942");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);

  const categories = [
    "Solar Panels",
    "Energy Saving",
    "Windows & Doors",
    "Construction",
    "Moving",
    "Renovation",
    "Gardening",
    "Air Conditioning",
    "Painting",
  ];

  const timelines = [
    "As soon as possible",
    "Within 1 month",
    "Within 3 months",
    "Flexible / Just exploring",
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestRef(String(Math.floor(10000 + Math.random() * 90000)));
    setIsSuccess(true);

    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("demo_company_leads");
        const existing = raw ? JSON.parse(raw) : [];
        const newLead = {
          id: `lead-${Date.now()}`,
          category: category,
          title: `${serviceName} in ${location}`,
          description: description,
          location: location,
          budget: budget,
          timeline: timeline,
          creditsRequired: 15,
          createdAt: "Just now",
          customerName: fullName,
          customerPhone: `${countryCode} ${phoneNumber}`,
          customerEmail: email,
          customerAddress: `${location}`,
          isUnlocked: false,
        };
        existing.unshift(newLead);
        localStorage.setItem("demo_company_leads", JSON.stringify(existing));
      }
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#ECEFF2] text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      {/* 1. Header / Navbar */}
      <CustomerNavbar />

      {/* Main Request Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {!isSuccess ? (
          <div>
            {/* Top Heading */}
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight">
                {currentStep === 3
                  ? "Review Your Request"
                  : "Find the right professional for your project"}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
                {currentStep === 3
                  ? "Verify your project details and enter your contact information."
                  : "Tell us what you need in a few quick steps. Fast, free quotes from certified contractors."}
              </p>
            </div>

            {/* 3-Step Progress Bar */}
            <div className="w-full max-w-2xl mx-auto bg-slate-300/70 h-1.5 rounded-full overflow-hidden mb-10">
              <motion.div
                className="bg-[#00BC7D] h-full rounded-full transition-all duration-500"
                style={{
                  width:
                    currentStep === 1
                      ? "33%"
                      : currentStep === 2
                      ? "66%"
                      : "100%",
                }}
              />
            </div>

            {/* STEP 1: Service Category, Service Name, Location */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Field 1: Category */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Which service category are you interested in?
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 appearance-none outline-none focus:border-[#00BC7D] transition-colors cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 2: Specific Service */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    What service do you need?
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="e.g. Solar panel installation"
                      className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none focus:border-[#00BC7D] transition-colors"
                    />
                  </div>
                </div>

                {/* Field 3: Location */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Where is it needed?
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (e.target.value.toLowerCase().includes("brescia") || e.target.value.toLowerCase().includes("milan")) {
                          setRegion("Lombardy");
                        } else if (e.target.value.toLowerCase().includes("rome")) {
                          setRegion("Lazio");
                        }
                      }}
                      placeholder="e.g. Brescia, Italy"
                      className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none focus:border-[#00BC7D] transition-colors"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-8 border-t border-slate-300/60 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-9 py-2.5 rounded-full border border-slate-300 bg-[#D9DFE4] hover:bg-[#cfd6dc] text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-9 py-2.5 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Timeline, Description, Estimated Budget */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Field 1: Timeline */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    When do you need the service?
                  </label>
                  <div className="relative">
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 appearance-none outline-none focus:border-[#00BC7D] transition-colors cursor-pointer"
                    >
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 2: Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">
                      Briefly describe what you need
                    </label>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {description.length} / 500 characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your project or requirements... (e.g. 6kW rooftop system with hybrid inverter, pitched clay tile roof, need site inspection)"
                    className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl p-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none focus:border-[#00BC7D] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Field 3: Estimated Budget */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <span className="text-sm font-bold text-slate-500 absolute left-4 top-1/2 -translate-y-1/2">
                      €
                    </span>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. €5,000 – €10,000"
                      className="w-full bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none focus:border-[#00BC7D] transition-colors"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-8 border-t border-slate-300/60 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-9 py-2.5 rounded-full border border-slate-300 bg-[#D9DFE4] hover:bg-[#cfd6dc] text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-9 py-2.5 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review Your Request & Contact Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Request Summary Card */}
                <div className="lg:col-span-5 bg-[#E2E6E9] rounded-2xl p-6 border border-slate-300/70 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/60">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
                      <FileText className="w-4 h-4 text-[#00BC7D]" />
                      <span>Request Summary</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[#00BC7D] hover:underline cursor-pointer"
                    >
                      ← Edit Request
                    </button>
                  </div>

                  {/* Service */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50">
                    <span className="text-[11px] font-medium text-zinc-500 block">
                      Service
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {serviceName || category}
                    </span>
                  </div>

                  {/* Location & Region */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-zinc-500 block">
                        Location
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                        {location}
                      </span>
                    </div>
                    {region && (
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {region}
                      </span>
                    )}
                  </div>

                  {/* Estimated Budget */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50">
                    <span className="text-[11px] font-medium text-zinc-500 block">
                      Estimated Budget
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#00BC7D] block mt-0.5">
                      {budget}
                    </span>
                  </div>

                  {/* Pills row (Category & Urgency) */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                      {category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {timeline}
                    </span>
                  </div>

                  {/* Project Scope & Requirements */}
                  <div className="bg-[#ECEFF2] p-3.5 rounded-xl border border-slate-300/50 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 block">
                      Project Scope &amp; Requirements
                    </span>
                    <p className="text-xs text-zinc-600 italic leading-relaxed">
                      &quot;{description}&quot;
                    </p>
                  </div>
                </div>

                {/* Right Column: Contact Details & Submit */}
                <div className="lg:col-span-7 bg-[#E2E6E9] rounded-2xl p-6 sm:p-7 border border-slate-300/70 space-y-5">
                  {/* Warning Notice Banner */}
                  <div className="bg-[#FFF8E6] border border-amber-300/60 text-amber-900 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      This data will be visible to buyers only after the lead is unlocked.
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-800">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-zinc-400">
                          Legal or contact person
                        </span>
                      </div>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Marco Rossi"
                          className="w-full bg-[#ECEFF2] border border-slate-300/80 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-800">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-zinc-400">
                          Detailed quotes sent here
                        </span>
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="m.rossi@residenzabrescia.it"
                          className="w-full bg-[#ECEFF2] border border-slate-300/80 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-800">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-zinc-400">
                          For quote dispatch SMS
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-[#ECEFF2] border border-slate-300/80 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 shrink-0">
                          <span className="text-sm">🇮🇹</span>
                          <span>+39</span>
                          <ChevronDown className="w-3 h-3 text-zinc-400" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="335 128 9942"
                          className="w-full bg-[#ECEFF2] border border-slate-300/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#00BC7D] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2.5 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 rounded text-[#00BC7D] focus:ring-[#00BC7D] border-slate-300 mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-xs text-zinc-600 cursor-pointer leading-snug">
                        I agree to the{" "}
                        <span className="font-semibold text-slate-800 underline">
                          Terms &amp; Conditions
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-slate-800 underline">
                          Privacy Policy
                        </span>
                        .
                      </label>
                    </div>

                    {/* Final Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer transform hover:-translate-y-0.5"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* SUCCESS CONFIRMATION STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Request Submitted Successfully!
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Your request for <span className="font-bold text-slate-800">{serviceName}</span> in <span className="font-bold text-slate-800">{location}</span> has been dispatched to certified contractors.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 text-xs text-zinc-600 text-left space-y-1.5 border border-slate-200/70">
              <div className="flex justify-between">
                <span className="text-zinc-400">Request Ref:</span>
                <span className="font-mono font-bold text-slate-800">#IT-{requestRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Contact:</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Status:</span>
                <span className="font-bold text-[#00BC7D]">Active • Matching Pros</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 py-3 px-5 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs sm:text-sm font-semibold shadow-md transition-all text-center"
              >
                Back to Homepage
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setRequestRef("");
                }}
                className="flex-1 py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#080C12] text-white border-t border-white/10 pt-14 pb-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-1 group">
                <span className="text-white font-extrabold tracking-widest text-lg">CONTR</span>
                <span className="inline-flex items-center text-[#00BC7D] px-0.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5L3 12L8 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 5L21 12L16 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[#00BC7D] font-extrabold tracking-widest text-lg">FFERTA</span>
                <span className="text-white font-bold tracking-wider text-lg">.IT</span>
              </Link>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The B2B marketplace for qualified lead generation. Connect businesses with real customers.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Account</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Sector Portals</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">FotovoltaicoPerTe.com</a></li>
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">RisparmioEnergeticoPerTe.com</a></li>
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">InfissiPerTe.com</a></li>
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">EdiliziaPerTe.com</a></li>
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">TraslocoPerTe.com</a></li>
                <li><a href="#" className="hover:text-[#00BC7D] transition-colors">PreventiviPerTe.com</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-zinc-500">
            &copy; 2026 CONTROFFERTA.IT - Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}

