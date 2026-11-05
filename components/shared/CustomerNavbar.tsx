"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { getCompanySession, DemoCompanyUser } from "@/lib/demoAuth";

interface CustomerNavbarProps {
  onOpenRequestModal?: () => void;
  onSwitchRole?: () => void;
}

export default function CustomerNavbar({
  onOpenRequestModal,
  onSwitchRole,
}: CustomerNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyUser, setCompanyUser] = useState<DemoCompanyUser | null>(null);

  useEffect(() => {
    const checkUserRole = () => {
      try {
        const role = localStorage.getItem("user_role");
        if (role === "customer") {
          // Customers MUST NOT have any dashboard or profile section
          setCompanyUser(null);
        } else {
          setCompanyUser(getCompanySession());
        }
      } catch {
        setCompanyUser(getCompanySession());
      }
    };

    checkUserRole();
    window.addEventListener("company_session_updated", checkUserRole);
    window.addEventListener("storage", checkUserRole);
    return () => {
      window.removeEventListener("company_session_updated", checkUserRole);
      window.removeEventListener("storage", checkUserRole);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/customer";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070A0F]/95 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching the design */}
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="text-white font-extrabold tracking-widest text-lg sm:text-xl">
            CONTR
          </span>
          <span className="inline-flex items-center text-[#00BC7D] px-0.5">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(0,188,125,0.7)]"
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
          <span className="text-[#00BC7D] font-extrabold tracking-widest text-lg sm:text-xl">
            FFERTA
          </span>
          <span className="text-white font-bold text-lg sm:text-xl">
            .IT
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active
                    ? "text-[#00BC7D] font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {companyUser ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00BC7D]/10 hover:bg-[#00BC7D]/20 border border-[#00BC7D]/30 text-[#00BC7D] text-xs font-bold transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard ({companyUser.credits}cr)</span>
            </Link>
          ) : (
            <Link
              href="/company"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1"
            >
              <span>For Companies</span>
            </Link>
          )}

          {onSwitchRole && (
            <button
              type="button"
              onClick={onSwitchRole}
              className="hidden xl:inline-flex text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 cursor-pointer"
              title="Change role selection"
            >
              Switch Role
            </button>
          )}

          <Link
            href="/submit-request"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border border-[#00BC7D] text-[#00BC7D] hover:bg-[#00BC7D] hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,188,125,0.15)] hover:shadow-[0_0_20px_rgba(0,188,125,0.4)] cursor-pointer"
          >
            <span>Submit a Request</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070A0F] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#00BC7D]/10 text-[#00BC7D] font-semibold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/submit-request"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block text-center py-2.5 px-4 rounded-xl bg-[#00BC7D] text-white text-xs font-semibold shadow-md"
            >
              Submit a Request
            </Link>

            <div className="pt-2 border-t border-white/10 space-y-1">
              {companyUser ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#00BC7D]"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Company Dashboard ({companyUser.credits} Credits)</span>
                </Link>
              ) : (
                <Link
                  href="/company"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs text-zinc-300 hover:text-white"
                >
                  For Companies (Find Customers)
                </Link>
              )}

              {onSwitchRole && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchRole();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Switch Role / Back to Onboarding
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
