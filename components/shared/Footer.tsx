"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#121214] text-white border-t border-white/10 pt-16 sm:pt-20 pb-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Larger Logo (Top Left) & Brand Information */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/icons/Dark_Mode.png"
                alt="Controfferta"
                width={300}
                height={80}
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-sm">
              Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] block">
                Support &amp; Inquiries
              </span>
              <a
                href="mailto:support@controfferta.it"
                className="inline-flex items-center gap-1.5 text-[#00BC7D] hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>support@controfferta.it</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00BC7D] hover:border-[#00BC7D]/50 hover:bg-[#00BC7D]/10 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00BC7D] hover:border-[#00BC7D]/50 hover:bg-[#00BC7D]/10 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00BC7D] hover:border-[#00BC7D]/50 hover:bg-[#00BC7D]/10 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00BC7D] hover:border-[#00BC7D]/50 hover:bg-[#00BC7D]/10 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/professionals" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Featured Professionals
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  For Companies
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Discover Nearby
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Partners */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase">
              For Partners
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/company" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  For Companies
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  For Service Providers
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  How the Platform Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  About Our Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase">
              Support &amp; Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Help Center &amp; FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-zinc-400 hover:text-[#00BC7D] transition-colors">
                  Create an Account
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean & Minimal (Zero Duplicate Links) */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Controfferta. All rights reserved.</p>
          <p className="text-zinc-500">
            Find the right professional for your project.
          </p>
        </div>
      </div>
    </footer>
  );
}