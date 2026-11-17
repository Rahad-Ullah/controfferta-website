"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function ClientNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 bg-[#070A0F]/95 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo/logo.png"
            alt="Controfferta.it"
            width={1290}
            height={112}
            priority
            className="h-4 w-auto md:h-5 xl:h-8"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors ${
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

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Link
            href="/provider"
            className="hidden xl:inline-flex items-center gap-1 whitespace-nowrap text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1"
          >
            <span>For Companies</span>
          </Link>

          <Link
            href="/submit-request"
            className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full border border-[#00BC7D] text-[#00BC7D] hover:bg-[#00BC7D] hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,188,125,0.15)] hover:shadow-[0_0_20px_rgba(0,188,125,0.4)] cursor-pointer"
          >
            <span>Submit a Request</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </header>
    {typeof document !== "undefined" &&
      createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
          <div key="mobile-nav" className="xl:hidden fixed inset-0 z-[60]">
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute left-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col bg-[#070A0F] border-r border-white/10 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex h-20 items-center justify-between px-5 border-b border-white/10">
                <Image
                  src="/logo/logo.png"
                  alt="Controfferta.it"
                  width={1290}
                  height={112}
                  className="h-4 w-auto"
                />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#00BC7D]/10 text-[#00BC7D] font-semibold"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="space-y-2 border-t border-white/10 p-4">
                <Link
                  href="/submit-request"
                  onClick={closeMenu}
                  className="block text-center py-2.5 px-4 rounded-xl bg-[#00BC7D] text-white text-sm font-semibold"
                >
                  Submit a Request
                </Link>
                <Link
                  href="/provider"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-center text-xs text-zinc-300 hover:text-white"
                >
                  For Companies
                </Link>
              </div>
            </motion.aside>
          </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
