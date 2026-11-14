"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Mail, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

type RoleType = "provider" | "customer";

interface OnboardingScreenProps {
  onSelectCustomer?: () => void;
}

export default function OnboardingScreen({ onSelectCustomer }: OnboardingScreenProps) {
  const router = useRouter();
  // Set default to "customer" as first option
  const [selectedRole, setSelectedRole] = useState<RoleType>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleContinue = (role: RoleType) => {
    setIsSubmitting(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("user_role", role);
        localStorage.setItem("has_seen_onboarding", "true");
        document.cookie = `user_role=${role}; path=/; max-age=2592000; SameSite=Lax`;
      }
    } catch {
      // ignore storage errors
    }

    if (role === "customer") {
      if (onSelectCustomer) {
        onSelectCustomer();
        setIsSubmitting(false);
      } else {
        router.push("/");
      }
    } else {
      // 2. Portal: Redirect to signup page (/register)
      router.push("/register");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#00BC7D]/30 selection:text-[#00BC7D]"
      style={{
        backgroundColor: "#061B1E",
        backgroundImage: `
          radial-gradient(ellipse 850px 480px at 50% 10%, rgba(0, 188, 125, 0.35) 0%, rgba(0, 114, 82, 0.20) 45%, transparent 75%),
          radial-gradient(circle 800px at 0% 75%, rgba(1, 31, 23, 0.95) 0%, rgba(4, 29, 26, 0.6) 45%, transparent 80%),
          radial-gradient(circle 800px at 100% 20%, rgba(13, 22, 37, 0.95) 0%, rgba(11, 23, 35, 0.6) 50%, transparent 80%),
          radial-gradient(circle 600px at 100% 90%, rgba(8, 25, 32, 0.95) 0%, transparent 75%),
          linear-gradient(135deg, #061B1E 0%, #051D1A 35%, #0A1821 65%, #0D1625 100%)
        `,
      }}
    >
      {/* Background ambient radial glow lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-center ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#00BC7D]/[0.08] blur-[150px] rounded-full pointer-events-none" />

        {/* Ambient glow matching the active card */}
        <div
          className={`absolute top-1/3 ${
            selectedRole === "customer" ? "right-[10%]" : "left-[10%]"
          } w-[550px] h-[550px] bg-[#00BC7D]/[0.09] blur-[160px] rounded-full transition-all duration-700 pointer-events-none`}
        />

        {/* Subtle mesh background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 max-w-5xl mx-auto w-full">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5 max-w-2xl mx-auto">
          {/* Logo with modern chevrons */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 group transition-transform hover:scale-[1.02]"
          >
            <span className="text-white font-extrabold tracking-widest text-base sm:text-lg">
              CONTR
            </span>
            <span className="inline-flex items-center text-[#00BC7D] px-0.5">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 drop-shadow-[0_0_8px_rgba(0,188,125,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 5L3 12L8 19"
                  stroke="#00BC7D"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5L21 12L16 19"
                  stroke="#00BC7D"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[#00BC7D] font-extrabold tracking-widest text-base sm:text-lg">
              FFERTA
            </span>
            <span className="text-zinc-400 font-bold tracking-wider text-base sm:text-lg">
              .IT
            </span>
          </Link>

          {/* Welcome Badge */}
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#032014]/80 border border-[#00BC7D]/30 shadow-[0_0_15px_rgba(0,188,125,0.15)] backdrop-blur-md">
            <span className="text-xs font-medium text-[#00BC7D]">Welcome</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-white leading-[1.2]">
            What brings you to <br className="hidden sm:inline" />
            <span className="text-[#00BC7D]">CONTROFFERTA.IT</span> today?
          </h1>

          {/* Subtitle description */}
          <p className="text-xs sm:text-sm md:text-[14.5px] text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto px-2">
            Tell us what you&apos;re looking for and we&apos;ll tailor your experience - the platform works a little differently depending on which side of the marketplace you&apos;re on.
          </p>
        </div>

        {/* 2-Role Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 w-full max-w-3xl lg:max-w-4xl mx-auto mt-10 sm:mt-12 items-stretch">
          
          {/* FLOW 1: Customer Role – "I have a requirement to submit" */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => handleContinue("customer")}
            className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 backdrop-blur-xl ${
              selectedRole === "customer"
                ? "bg-[#111922]/90 border border-[#00BC7D] shadow-[0_0_35px_rgba(0,188,125,0.22)] ring-1 ring-[#00BC7D]/50"
                : "bg-[#0e151d]/75 border border-white/[0.08] hover:border-white/15 hover:bg-[#111922]/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            }`}
          >
            <div>
              {/* Icon Container */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  selectedRole === "customer"
                    ? "bg-[#00BC7D]/20 border border-[#00BC7D]/50 text-[#00BC7D] shadow-[0_0_15px_rgba(0,188,125,0.3)]"
                    : "bg-[#0c241b]/50 border border-[#00BC7D]/25 text-[#00BC7D]"
                }`}
              >
                <Mail className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Title & Description */}
              <div className="mt-5 sm:mt-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00BC7D] bg-[#00BC7D]/10 px-2.5 py-0.5 rounded-full border border-[#00BC7D]/30 inline-block mb-2">
                  Customer Flow · No Auth Required
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  I have a requirement to submit
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  I want to submit a request for companies to respond to. Browse the website and submit requirements freely.
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="mt-6 space-y-3 sm:space-y-3.5">
                {[
                  "No signup, login, or authentication required",
                  "Browse the website & submit requirements easily",
                  "Get matched with verified professionals",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300">
                    <Check className="w-4 h-4 text-[#00BC7D] stroke-[2.5] mt-0.5 shrink-0" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinue("customer");
                }}
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 bg-[#00BC7D] hover:bg-[#00d68f] text-white shadow-[0_4px_20px_rgba(0,188,125,0.35)] cursor-pointer"
              >
                <span>Continue to Main Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* FLOW 2: Portal Role – "I'm looking for customers" */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => handleContinue("provider")}
            className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 backdrop-blur-xl ${
              selectedRole === "provider"
                ? "bg-[#111922]/90 border border-[#00BC7D] shadow-[0_0_35px_rgba(0,188,125,0.22)] ring-1 ring-[#00BC7D]/50"
                : "bg-[#0e151d]/75 border border-white/[0.08] hover:border-white/15 hover:bg-[#111922]/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            }`}
          >
            <div>
              {/* Icon Container */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  selectedRole === "provider"
                    ? "bg-[#00BC7D]/20 border border-[#00BC7D]/50 text-[#00BC7D] shadow-[0_0_15px_rgba(0,188,125,0.3)]"
                    : "bg-[#0c241b]/50 border border-[#00BC7D]/25 text-[#00BC7D]"
                }`}
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Title & Description */}
              <div className="mt-5 sm:mt-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 inline-block mb-2">
                  Portal / Company Flow
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  I&apos;m looking for customers
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  I run a company or agency and want to find new, verified customer requests in my service area.
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="mt-6 space-y-3 sm:space-y-3.5">
                {[
                  "Redirect to signup & login to access portal",
                  "Browse live customer requests by category & location",
                  "Unlock full contact details with dashboard credits",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300">
                    <Check className="w-4 h-4 text-[#00BC7D] stroke-[2.5] mt-0.5 shrink-0" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinue("provider");
                }}
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 bg-[#182330] hover:bg-[#1f2d3d] text-zinc-200 hover:text-white border border-white/[0.1] hover:border-[#00BC7D]/50 cursor-pointer"
              >
                <span>Sign Up for Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation & Sign In Prompt */}
        <div className="mt-12 sm:mt-14 text-center space-y-3 text-xs sm:text-sm text-zinc-400">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00BC7D] hover:text-[#00d68f] font-semibold hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-500 pt-2">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00BC7D]" />
              Verified Marketplace
            </span>
            <span>•</span>
            <span>100% Free for Submitters</span>
            <span>•</span>
            <span>Instant Match</span>
          </div>
        </div>
      </main>
    </div>
  );
}
