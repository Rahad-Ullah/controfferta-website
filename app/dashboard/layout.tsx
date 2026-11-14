"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Unlock,
  Clock,
  ShoppingBag,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Coins,
} from "lucide-react";
import { toast } from "sonner";
import { placeholderCompany } from "@/lib/placeholders";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const user = placeholderCompany;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setMobileMenuOpen(false);
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setLogoutModalOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // The page still leaves the dashboard if the request fails.
    }
    toast.success("Signed out.");
    router.replace("/login");
  };

  const handleBuyCredits = (amount: number, packageName: string) => {
    setBuyCreditsModalOpen(false);
    toast.info(`Placeholder. ${packageName} (${amount} credits) is not connected yet.`);
  };

  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Browse Leads",
      href: "/dashboard/browser-leads",
      icon: Search,
      badge: "12",
      isActive: pathname.startsWith("/dashboard/browser-leads") || pathname.startsWith("/dashboard/browse-leads"),
    },
    {
      label: "Unlocked Leads",
      href: "/dashboard/unloack-lead",
      icon: Unlock,
      isActive: pathname.startsWith("/dashboard/unloack-lead") || pathname.startsWith("/dashboard/unlocked-leads"),
    },
    {
      label: "Credits",
      href: "/dashboard/credits",
      icon: Clock,
      isActive: pathname === "/dashboard/credits",
    },
    {
      label: "Buy Credits",
      href: "/dashboard/buy-credits",
      icon: ShoppingBag,
      isActive: pathname.startsWith("/dashboard/buy-credits"),
    },
    {
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: "3",
      isActive: pathname.startsWith("/dashboard/notifications"),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
      isActive: pathname.startsWith("/dashboard/profile"),
    },
  ];

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.includes("browser-leads") || pathname.includes("browse-leads")) return "Browse Leads";
    if (pathname.includes("unloack-lead") || pathname.includes("unlocked-leads")) return "Unlocked Leads";
    if (pathname.includes("buy-credits")) return "Buy Credits";
    if (pathname.includes("credits")) return "Credits";
    if (pathname.includes("notifications")) return "Notifications";
    if (pathname.includes("profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <div className="w-full bg-[#EAEFF2] text-slate-800 flex overflow-hidden font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      {/* 1. FIXED DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 z-30 bg-[#0A101D] border-r border-[#151D2A] shrink-0 justify-between">
        <div className="p-6 pb-2">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-1 group">
            <span className="text-white font-extrabold tracking-widest text-lg">CONTR</span>
            <span className="inline-flex items-center text-[#00BC7D] px-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M8 5L3 12L8 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5L21 12L16 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[#00BC7D] font-extrabold tracking-widest text-lg">FFERTA</span>
            <span className="text-white font-bold text-lg">.IT</span>
          </Link>

          {/* Buyer Portal pill */}
          <div className="mt-4 mb-6">
            <span className="inline-block bg-[#00BC7D] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
              Buyer Portal
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${link.isActive
                      ? "bg-[#0E2620] text-[#00BC7D]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${link.isActive ? "text-[#00BC7D]" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1C2533] text-zinc-300 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Log Out */}
        <div className="p-6 pt-3">
          <button
            type="button"
            onClick={handleOpenLogoutModal}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[2]" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* 2. SCROLLABLE CHILDREN CONTAINER */}
      <div className="flex-1 min-w-0 md:ml-64 h-screen overflow-y-auto flex flex-col bg-[#EAEFF2]">
        {/* Sticky Header */}
        <header className="h-16 bg-[#EAEFF2] border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-slate-800 capitalize">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Credits pill */}
            <button
              type="button"
              onClick={() => setBuyCreditsModalOpen(true)}
              className="flex items-center gap-1.5 border border-amber-300/80 bg-[#FFFDF5] text-amber-800 hover:bg-amber-100/60 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{user?.credits ?? 285} Credits</span>
            </button>

            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "M"}
            </div>
          </div>
        </header>

        {/* Dynamic Scrolling Child Content */}
        <main className="p-6 sm:p-4 flex-1 w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex">
          <div className="w-72 bg-[#0A101D] h-full flex flex-col justify-between p-6 border-r border-[#151D2A] animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <Link href="/" className="inline-flex items-center gap-1">
                  <span className="text-white font-extrabold tracking-widest text-base">CONTR</span>
                  <span className="text-[#00BC7D] font-extrabold tracking-widest text-base">FFERTA</span>
                  <span className="text-white font-bold text-base">.IT</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-4">
                <span className="inline-block bg-[#00BC7D] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Buyer Portal
                </span>
              </div>

              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium ${link.isActive
                          ? "bg-[#0E2620] text-[#00BC7D]"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${link.isActive ? "text-[#00BC7D]" : "text-slate-400"}`} />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1C2533] text-zinc-300 font-semibold">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleOpenLogoutModal}
                className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 hover:text-red-400 cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-[2]" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* LOGOUT CONFIRMATION MODAL */}
      {logoutModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setLogoutModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-sm sm:max-w-md w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLogoutModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logout Icon */}
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
              <LogOut className="w-6 h-6 stroke-[2]" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900">
              Log out of your account?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-6 leading-relaxed">
              Are you sure you want to log out? You will need to sign in again to access the dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4 stroke-[2]" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK TOP UP CREDITS MODAL */}
      {buyCreditsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setBuyCreditsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
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
              onClick={() => setBuyCreditsModalOpen(false)}
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
