"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import NavbarAuth from "@/components/shared/navbar-auth";

const navLinks = [
  { label: "Home", href: "/provider" },
  { label: "About Us", href: "/provider/about" },
  { label: "Services", href: "/provider/services" },
  { label: "How It Works", href: "/provider/how-it-works" },
  { label: "Reviews", href: "/provider/reviews" },
  { label: "Contact", href: "/provider/contact" },
];

export default function ProviderNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/provider") return pathname === "/provider";
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
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0F172A]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/provider" className="inline-flex shrink-0 items-center">
            <Image
              src="/logo/logo.png"
              alt="Controfferta.it"
              width={1290}
              height={112}
              priority
              className="h-4 w-auto md:h-5 xl:h-6"
            />
          </Link>

          <nav className="hidden items-center gap-4 text-sm font-medium xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors ${
                    active ? "font-semibold text-[#00BC7D]" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <NavbarAuth />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div key="provider-mobile-nav" className="fixed inset-0 z-[60] xl:hidden">
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
                  className="absolute top-0 left-0 flex h-full w-[min(20rem,85vw)] flex-col border-r border-white/10 bg-[#0F172A] shadow-2xl"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                >
                  <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
                    <Image src="/logo/logo.png" alt="Controfferta.it" width={1290} height={112} className="h-4 w-auto" />
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="cursor-pointer rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
                      aria-label="Close navigation menu"
                    >
                      <X className="size-5" />
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
                          className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-[#00BC7D]/10 font-semibold text-[#00BC7D]"
                              : "text-zinc-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="border-t border-white/10 p-4">
                    <NavbarAuth variant="mobile" onNavigate={closeMenu} />
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
