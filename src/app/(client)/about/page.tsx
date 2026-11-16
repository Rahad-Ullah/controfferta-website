"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Lock,
  Compass,
  FileCheck,
  CreditCard,
  ArrowRight,
  X,
  Phone,
  Mail,
  Building2,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    city: "",
    description: "",
    fullName: "",
    phone: "",
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      
      {/* =========================================================
          1. HEADER / NAVBAR
          ========================================================= */}

      {/* =========================================================
          2. HERO BANNER ("About Us")
          ========================================================= */}
      <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden">
        {/* Background Team Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=95"
            alt="Controfferta Team Collaboration"
            fill
            priority
            quality={95}
            className="object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
        </div>

        {/* Emerald ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00BC7D]/[0.10] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            About Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-[#00BC7D] font-bold">CONTROFFERTA.IT</span> is a platform that connects people looking for services with qualified professionals. We make it easy to submit your request and receive offers from professionals who are interested in your project.
          </p>
        </div>
      </section>

      {/* =========================================================
          3. OUR MISSION SECTION
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Mission Description */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Our mission
              </h2>
              <div className="space-y-4 text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
                <p>
                  We believe finding the right professional should be simple, transparent, and stress-free. Our mission is to help people connect with reliable service providers who match their needs.
                </p>
                <p>
                  With Controfferta.it, you can submit your request for free, receive offers, and compare options - all in one place.
                </p>
              </div>
            </div>

            {/* Right Column: 4 Feature Cards (2x2 Grid) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Card 1: Easy Request Submission */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center mb-4">
                    <Compass className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Easy Request Submission
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                    Tell us what you need in just a few simple steps.
                  </p>
                </div>
              </div>

              {/* Card 2: Qualified Professionals */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Qualified Professionals
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                    Connect with professionals interested in your project and service requirements.
                  </p>
                </div>
              </div>

              {/* Card 3: Free and Transparent */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center mb-4">
                    <CreditCard className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Free and Transparent
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                    Submit your request for free, with no hidden costs or obligations.
                  </p>
                </div>
              </div>

              {/* Card 4: Local Connections */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Local Connections
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                    Find professionals who serve your area and understand your needs.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          4. WHY YOUR REQUEST MATTERS SECTION
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[#F9FBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Your Request Matters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Every project is different. We help you find professionals who are interested in your specific requirements.
          </p>

          {/* 3 Green Dot Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1: Real Opportunities */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00BC7D] mb-4 shadow-[0_0_10px_rgba(0,188,125,0.4)]" />
              <h3 className="text-base font-bold text-slate-900">
                Real Opportunities
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Your request helps interested professionals understand your needs and provide relevant offers.
              </p>
            </div>

            {/* Card 2: Fast Responses */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00BC7D] mb-4 shadow-[0_0_10px_rgba(0,188,125,0.4)]" />
              <h3 className="text-base font-bold text-slate-900">
                Fast Responses
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Get notified when professionals respond to your request.
              </p>
            </div>

            {/* Card 3: Relevant Offers */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00BC7D] mb-4 shadow-[0_0_10px_rgba(0,188,125,0.4)]" />
              <h3 className="text-base font-bold text-slate-900">
                Relevant Offers
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Receive offers from professionals based on your project details and location.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          5. BOTTOM CTA ("Get started today")
          ========================================================= */}
      <section className="relative bg-[#070D15] text-white py-16 sm:py-24 overflow-hidden">
        {/* Background Team Collaboration image on right */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=95"
            alt="Business team discussing opportunity"
            fill
            quality={95}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D15] via-[#070D15]/80 to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00BC7D]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Get started today
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Looking for the right professional? Submit your request for free and connect with professionals who can help bring your project to life.
          </p>
          <div className="pt-4">
            <Link
              href="/submit-request"
              className="inline-flex items-center gap-2 bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(0,188,125,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Submit Your Request for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. FOOTER
          ========================================================= */}

      {/* =========================================================
          ZERO-AUTH REQUEST SUBMISSION MODAL
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
                      Zero Auth â€¢ 100% Free
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Submit Your Request
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    No login required. Connect with qualified local professionals in minutes.
                  </p>

                  <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        What service do you need?
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="e.g. Painting, Solar Panels, Windows..."
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
                        Project Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Briefly describe what needs to be done..."
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
                      <span>Send Request</span>
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
                    Your requirement has been sent to verified service providers in your area. You will receive quotes shortly!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#00BC7D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Back to About Page
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

