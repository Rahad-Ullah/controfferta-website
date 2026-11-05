"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomerNavbar from "@/components/shared/CustomerNavbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Zap,
  AppWindow,
  Hammer,
  Truck,
  Wrench,
  Flower2,
  Wind,
  Paintbrush,
  ArrowRight,
  X,
  Send,
  CheckCircle2,
  Search,
} from "lucide-react";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const [formData, setFormData] = useState({
    service: "",
    city: "",
    description: "",
    fullName: "",
    phone: "",
  });

  const serviceCategories = [
    {
      id: "solar-panels",
      title: "Solar Panels",
      leads: "142 leads",
      icon: Sun,
      description: "Residential and commercial solar systems, storage batteries, tax incentives.",
      actionText: "Submit a Requests →",
    },
    {
      id: "energy-saving",
      title: "Energy Saving",
      leads: "89 leads",
      icon: Zap,
      description: "Thermal insulation, heat pumps, windows, energy audits.",
      actionText: "Submit a Requests →",
    },
    {
      id: "windows-doors",
      title: "Windows & Doors",
      leads: "156 leads",
      icon: AppWindow,
      description: "PVC, aluminum, wood windows, security doors, mosquito nets, shutters.",
      actionText: "Submit a Requests →",
    },
    {
      id: "construction",
      title: "Construction",
      leads: "217 leads",
      icon: Hammer,
      description: "Renovations, roof resurfacing, masonry, waterproofing.",
      actionText: "Submit a Requests →",
    },
    {
      id: "moving",
      title: "Moving",
      leads: "93 leads",
      icon: Truck,
      description: "Residential and corporate moves, portering, furniture storage.",
      actionText: "Submit a Requests →",
    },
    {
      id: "renovation",
      title: "Renovation",
      leads: "184 leads",
      icon: Wrench,
      description: "Bathrooms, kitchens, flooring, painting, general contractor.",
      actionText: "Submit a Requests →",
    },
    {
      id: "gardening",
      title: "Gardening",
      leads: "67 leads",
      icon: Flower2,
      description: "Garden design, lawn maintenance, pruning, irrigation.",
      actionText: "Submit a Requests →",
    },
    {
      id: "air-conditioning",
      title: "Air Conditioning",
      leads: "112 leads",
      icon: Wind,
      description: "Split installation, boiler maintenance, mechanical ventilation.",
      actionText: "Submit a Requests →",
    },
    {
      id: "painting",
      title: "Painting",
      leads: "112 leads",
      icon: Paintbrush,
      description: "Interior painting, exterior painting, wall finishing, decorative painting.",
      actionText: "Browse requests →",
    },
  ];

  const handleOpenModal = (serviceTitle?: string) => {
    const title = serviceTitle || "General Service";
    setSelectedService(title);
    setFormData((prev) => ({ ...prev, service: title }));
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const filteredCategories = serviceCategories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      
      {/* =========================================================
          1. HEADER / NAVBAR
          ========================================================= */}
      <CustomerNavbar onOpenRequestModal={() => handleOpenModal()} />

      {/* =========================================================
          2. HERO BANNER ("Service Categories")
          ========================================================= */}
      <section className="relative bg-[#0B131D] text-white py-20 sm:py-24 overflow-hidden border-b border-slate-800">
        {/* Isometric Grid Background Artwork */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95"
            alt="Business infrastructure background"
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B131D]/90 via-[#0B131D]/80 to-[#0B131D]" />
        </div>

        {/* Ambient watermark words from design */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden md:block text-xs font-semibold text-white/10 tracking-widest uppercase pointer-events-none">
          Professional Businesses
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block text-xs font-semibold text-white/10 tracking-widest uppercase pointer-events-none">
          Logistics
        </div>

        {/* Emerald Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Service Categories
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Tell us what service you need and find the right professionals for your request.
          </p>

          {/* Optional Quick Filter Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter services by keyword..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-zinc-400 outline-none focus:border-[#00BC7D] backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. 9 SERVICE CATEGORY CARDS GRID
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredCategories.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => handleOpenModal(service.title)}
                  className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-[#00BC7D]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Top Row: Icon Badge (Left) + Lead Count Pill (Right) */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#00BC7D] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00BC7D] text-[11px] font-semibold border border-emerald-100">
                        {service.leads}
                      </span>
                    </div>

                    {/* Middle: Title & Description */}
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight group-hover:text-[#00BC7D] transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom: Action Text Right-Aligned */}
                  <div className="mt-6 pt-2 flex justify-end">
                    <span className="text-xs sm:text-sm font-semibold text-[#00BC7D] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      {service.actionText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          4. FOOTER
          ========================================================= */}
      <footer id="footer" className="bg-[#080C12] text-white border-t border-white/10 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Col 1: Brand */}
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
                <span className="text-zinc-400 font-bold tracking-wider text-lg">.IT</span>
              </Link>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The B2B marketplace for qualified lead generation. Connect businesses with real customers.
              </p>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="text-[#00BC7D] transition-colors">Services</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Col 3: Account */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Account</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="#footer" className="hover:text-white transition-colors">Contact</a></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

            {/* Col 4: Sector Portals */}
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

      {/* =========================================================
          ZERO-AUTH REQUEST MODAL
          ========================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00BC7D]" />
                    <span className="text-[11px] font-bold text-[#00BC7D] uppercase tracking-wider">
                      Zero Auth • 100% Free
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Request {selectedService}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Submit your requirement in seconds. Qualified local contractors will reach out with offers.
                  </p>

                  <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service Category
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City or Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Rome, Milan..."
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Describe What You Need
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Dimensions, project timeline, specific materials..."
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Marco Rossi"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone / Email
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="marco@example.com"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Request (No Login Needed)</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                    Your request for <span className="font-semibold text-slate-800">{formData.service}</span> has been broadcast to active specialists. You will receive competitive quotes soon!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#00BC7D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Back to Services
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

