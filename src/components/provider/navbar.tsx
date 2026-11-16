"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-40 bg-[#070A0F]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/provider" className="inline-flex items-center gap-1 group">
          <span className="text-white font-extrabold tracking-widest text-xl">CONTR</span>
          <span className="inline-flex items-center text-[#00BC7D] px-0.5">
            <svg className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,188,125,0.7)]" viewBox="0 0 24 24" fill="none">
              <path d="M8 5L3 12L8 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 5L21 12L16 19" stroke="#00BC7D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[#00BC7D] font-extrabold tracking-widest text-xl">FFERTA</span>
          <span className="text-white font-bold text-xl">.IT</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "text-[#00BC7D]" : "hover:text-white transition-colors"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-bold text-zinc-200 hover:text-white px-4 py-2 rounded-full transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#00BC7D]/20 transition-all"
          >
            Register
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden p-2 text-zinc-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-800 bg-[#070A0F] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm ${
                isActive(link.href) ? "text-[#00BC7D]" : "text-zinc-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
