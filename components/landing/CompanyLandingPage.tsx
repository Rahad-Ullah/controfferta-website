"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Users,
  Award,
  Clock,
  MapPin,
  Check,
  ChevronRight,
  Star,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CompanyLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sampleRequests = [
    {
      category: "Windows and doors",
      title: "Replacement of over 6 windows",
      location: "Lombardy / Pavia",
      date: "Jan 5, 2026",
      credits: "15 credits",
    },
    {
      category: "Photovoltaic",
      title: "6kW photovoltaic system",
      location: "Veneto / Verona",
      date: "Jan 5, 2026",
      credits: "20 credits",
    },
    {
      category: "Move",
      title: "80sqm apartment move",
      location: "Piedmont / Turin",
      date: "Jan 4, 2026",
      credits: "10 credits",
    },
    {
      category: "Construction",
      title: "Complete bathroom renovation",
      location: "Tuscany / Florence",
      date: "Jan 3, 2026",
      credits: "18 credits",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-[#00BC7D]/30 selection:text-[#00BC7D]">
      {/* 1. NAVBAR FOR COMPANIES */}
      <header className="sticky top-0 z-40 bg-[#070A0F]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-1 group">
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

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Log In & Register Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-zinc-200 hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#00BC7D]/20 transition-all transform hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00BC7D]/[0.08] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-emerald-500/[0.06] blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00BC7D] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00BC7D] animate-ping" />
                12,400+ ACTIVE LEADS AVAILABLE
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.15] tracking-tight">
                Get <span className="text-[#00BC7D] italic">Qualified Requests</span> from Clients Looking for Your Services
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
                The B2B marketplace that connects companies with the right customers. Buy verified leads, reach out to those who have already shown interest in your industry.
              </p>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-[#00BC7D] hover:bg-[#00d68f] text-white px-7 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#00BC7D]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find New Customers</span>
                </Link>
              </div>
            </div>

            {/* Right Map Graphic */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-md h-[400px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#021A15] via-[#05261F] to-[#0A1626] border border-emerald-500/20 p-8 flex items-center justify-center shadow-2xl">
                {/* SVG Stylized Map of Italy with Green Glowing Pins */}
                <svg className="w-full h-full text-emerald-300 drop-shadow-[0_0_15px_rgba(0,188,125,0.4)]" viewBox="0 0 200 240" fill="none">
                  {/* Italy mainland silhouette */}
                  <path
                    d="M 50 35 L 75 30 L 115 40 L 135 60 L 125 75 L 110 85 L 120 110 L 140 140 L 155 160 L 175 165 L 170 175 L 150 175 L 140 160 L 125 175 L 105 185 L 95 175 L 105 155 L 100 135 L 85 105 L 75 80 L 60 65 L 45 45 Z"
                    fill="#00BC7D"
                    fillOpacity="0.25"
                    stroke="#00BC7D"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Sicily */}
                  <path
                    d="M 75 200 L 115 195 L 105 215 L 75 210 Z"
                    fill="#00BC7D"
                    fillOpacity="0.25"
                    stroke="#00BC7D"
                    strokeWidth="2"
                  />
                  {/* Sardinia */}
                  <path
                    d="M 25 110 L 40 110 L 45 155 L 30 155 Z"
                    fill="#00BC7D"
                    fillOpacity="0.2"
                    stroke="#00BC7D"
                    strokeWidth="2"
                  />

                  {/* Pulsing City Pins */}
                  {/* Milan */}
                  <circle cx="70" cy="48" r="4.5" fill="#00BC7D" />
                  <circle cx="70" cy="48" r="9" stroke="#00BC7D" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />

                  {/* Turin */}
                  <circle cx="52" cy="52" r="3.5" fill="#00BC7D" />

                  {/* Venice */}
                  <circle cx="112" cy="50" r="4" fill="#00BC7D" />

                  {/* Bologna */}
                  <circle cx="95" cy="75" r="4" fill="#00BC7D" />

                  {/* Florence */}
                  <circle cx="95" cy="98" r="4" fill="#00BC7D" />

                  {/* Rome */}
                  <circle cx="108" cy="135" r="5" fill="#00BC7D" />
                  <circle cx="108" cy="135" r="10" stroke="#00BC7D" strokeWidth="1.2" className="animate-ping" opacity="0.6" />

                  {/* Naples */}
                  <circle cx="132" cy="155" r="4" fill="#00BC7D" />

                  {/* Bari */}
                  <circle cx="165" cy="152" r="3.5" fill="#00BC7D" />

                  {/* Palermo */}
                  <circle cx="95" cy="202" r="3.5" fill="#00BC7D" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3 Stats Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto border-t border-slate-800/80 mt-16 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">12,400+</p>
              <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Quotes Every Year</p>
            </div>
            <div className="border-t sm:border-t-0 sm:border-x border-slate-800/80 pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white">3,200+</p>
              <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Registered Companies</p>
            </div>
            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white">1,400+</p>
              <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Visitors Every Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A SMARTER WAY TO GET LEADS (LIGHT BACKGROUND SECTION) */}
      <section className="bg-[#ECEFF2] text-slate-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              A Smarter Way to <span className="text-[#00BC7D]">Get Leads</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              We connect lead providers and businesses through one trusted platform. Built for growth, designed for real opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">More Security</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                We verify and filter every request and lead, so you get genuine and relevant opportunities from trusted sources.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">More Control</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Choose the type of requests and specific areas you&apos;re interested in, so you only receive what fits your needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Greater Peace of Mind</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                With verified leads and transparent processes, you can focus on what matters most - your business growth.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Higher Average Quality of Contacts</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Get better leads with accurate information, so you don&apos;t have to deal with duplicates, fake, or incomplete requests.
              </p>
            </div>

            {/* Card 5 (Emerald Highlighted) */}
            <div className="bg-[#D9EFE6] rounded-2xl p-6 text-center space-y-2 border-2 border-[#00BC7D] shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#00BC7D]/20 text-[#00BC7D] mx-auto flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#008A5B]">More Exclusivity</h3>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Our web portals give you access to potential customers, with a maximum of 4 companies per market.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#E5E9EC] rounded-2xl p-6 text-center space-y-2 border border-slate-300/60 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300/70 text-slate-700 mx-auto flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Greater Reliability</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Our service has been trusted by hundreds of companies who continue to use our platform month after month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST REQUESTS */}
      <section className="bg-[#ECEFF2] text-slate-900 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Latest Requests</h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">The most recent customer requests on the platform.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleRequests.map((req, idx) => (
              <div
                key={idx}
                className="bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-2xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[11px] text-zinc-500 font-medium">{req.category}</span>
                    <span className="text-[10px] font-bold text-[#00BC7D] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Available
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mb-2">{req.title}</h3>
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    {req.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-300/70 text-xs">
                  <span className="text-[11px] text-zinc-500">{req.date}</span>
                  <span className="font-extrabold text-[#00BC7D]">{req.credits}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#00BC7D] hover:underline"
            >
              <span>View All Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE CONTROFFERTA */}
      <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Choose Controfferta.it?</h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">A simple and transparent process to attract new qualified clients.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#E5E9EC] rounded-2xl p-6 space-y-2 border border-slate-300/60">
              <span className="text-xs font-bold text-zinc-400 block">01</span>
              <h3 className="text-sm font-bold text-slate-900">Save Time</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Submit one request and reach relevant professionals without contacting them individually.
              </p>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl p-6 space-y-2 border border-slate-300/60">
              <span className="text-xs font-bold text-zinc-400 block">02</span>
              <h3 className="text-sm font-bold text-slate-900">Multiple Professionals</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Connect with businesses that offer the services you need.
              </p>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl p-6 space-y-2 border border-slate-300/60">
              <span className="text-xs font-bold text-zinc-400 block">03</span>
              <h3 className="text-sm font-bold text-slate-900">Local Connections</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Find professionals who serve your area.
              </p>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl p-6 space-y-2 border border-slate-300/60">
              <span className="text-xs font-bold text-zinc-400 block">04</span>
              <h3 className="text-sm font-bold text-slate-900">Simple & Free</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Submit your service request easily without paying to post it.
              </p>
            </div>
          </div>

          {/* REGISTER NOW BANNER */}
          <div className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl bg-[#E5E9EC] border border-slate-300/80 shadow-sm space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-lg bg-[#00BC7D] text-white font-black text-sm uppercase tracking-wider transform -rotate-2">
              REGISTER NOW
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              You can see the complete list of requests in your area and have the next requests we receive notified by email
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-block bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                REGISTER FOR FREE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS FOR COMPANIES */}
      <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How It Works</h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">A simple and transparent process to attract new qualified clients.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#E5E9EC] rounded-2xl overflow-hidden border border-slate-300/60 flex flex-col justify-between">
              <div className="p-5 text-center">
                <span className="w-8 h-8 rounded-full bg-[#00BC7D] text-white font-black text-xs inline-flex items-center justify-center mb-2">
                  01
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Browse Requests</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Find customer requests in your category and area of interest.
                </p>
              </div>
              <div className="h-36 bg-slate-300 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                  alt="Browse Requests"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl overflow-hidden border border-slate-300/60 flex flex-col justify-between">
              <div className="p-5 text-center">
                <span className="w-8 h-8 rounded-full bg-[#00BC7D] text-white font-black text-xs inline-flex items-center justify-center mb-2">
                  02
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Evaluate the Lead</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Preview the request without unlocking it yet.
                </p>
              </div>
              <div className="h-36 bg-slate-300 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
                  alt="Evaluate Lead"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl overflow-hidden border border-slate-300/60 flex flex-col justify-between">
              <div className="p-5 text-center">
                <span className="w-8 h-8 rounded-full bg-[#00BC7D] text-white font-black text-xs inline-flex items-center justify-center mb-2">
                  03
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Buy Credits</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Top up your balance with the package that best fits your volume.
                </p>
              </div>
              <div className="h-36 bg-slate-300 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Buy Credits"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl overflow-hidden border border-slate-300/60 flex flex-col justify-between">
              <div className="p-5 text-center">
                <span className="w-8 h-8 rounded-full bg-[#00BC7D] text-white font-black text-xs inline-flex items-center justify-center mb-2">
                  04
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Unlock and Contact</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Use credits to reveal the customer&apos;s information and contact them.
                </p>
              </div>
              <div className="h-36 bg-slate-300 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
                  alt="Unlock and Contact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT COMPANIES SAY */}
      <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Companies Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#E5E9EC] rounded-2xl p-6 border border-slate-300/60 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                &ldquo;In three months we gained 27 new clients through this platform. The credit system is transparent and convenient.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-300/70 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Marco Ferretti</span>
                <span className="text-[11px] text-zinc-500">Windows and doors</span>
              </div>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl p-6 border border-slate-300/60 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                &ldquo;The quality of the leads is way higher compared to other services. The clients are really interested and the conversion rate is high.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-300/70 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Giulia Romano</span>
                <span className="text-[11px] text-zinc-500">Photovoltaic</span>
              </div>
            </div>

            <div className="bg-[#E5E9EC] rounded-2xl p-6 border border-slate-300/60 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                &ldquo;Professional and intuitive platform. Customer support is excellent. I recommend it to all companies in the construction industry.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-300/70 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Alessandro Conti</span>
                <span className="text-[11px] text-zinc-500">Construction</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/reviews" className="text-xs font-semibold text-zinc-600 hover:text-slate-900 underline">
              See All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* 8. READY TO GET NEW CLIENTS CTA BANNER */}
      <section className="bg-[#070A0F] text-white py-16 sm:py-20 relative overflow-hidden border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Ready to get new clients?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Register your business for free and get access to thousands of requests from qualified clients in your industry.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#00BC7D]/30 transition-all transform hover:-translate-y-0.5"
            >
              Sign Up for Free
            </Link>
            <Link
              href="/how-it-works"
              className="bg-[#141A23] hover:bg-[#1E2633] text-zinc-200 border border-slate-700 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all"
            >
              Find Out How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#05070B] text-zinc-400 text-xs py-12 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-1 mb-3">
              <span className="text-white font-extrabold tracking-widest text-base">CONTR</span>
              <span className="text-[#00BC7D] font-extrabold tracking-widest text-base">FFERTA</span>
              <span className="text-white font-bold text-base">.IT</span>
            </Link>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              The B2B marketplace for qualified customer requests. Connect businesses with new customers.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Platform</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/reviews" className="hover:text-white">Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Account</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/login" className="hover:text-white">Log In</Link></li>
              <li><Link href="/register" className="hover:text-white">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Company Dashboard</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Contact Support</h4>
            <p className="text-[11px] text-zinc-400">info@controfferta.com</p>
            <p className="text-[11px] text-zinc-400 mt-1">support@controfferta.com</p>
            <p className="text-[11px] text-zinc-400 mt-1">Mon - Fri: 9:00 - 18:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
