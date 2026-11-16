"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  Send,
  CheckCircle2,
  Check,
  Sparkles,
} from "lucide-react";

export default function HowItWorksPage() {
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
          2. HERO BANNER ("How It Works")
          ========================================================= */}
      <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden border-b border-slate-800">
        {/* Background 3D glass isometric artwork */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=95"
            alt="Process pipeline background"
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            How It Works
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Submit your request and let the right professionals find you.
          </p>
        </div>
      </section>

      {/* =========================================================
          3. 4 STEPS PROCESS GRID & ACTION BUTTON
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 4 Steps in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-10 sm:gap-y-12">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#081225] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                1
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Tell us what you need
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Choose your service category and describe what you&apos;re looking for.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#081225] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                3
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Get matched with professionals
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Your request is shared with relevant businesses that offer the service you need.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#081225] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                2
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Submit your request
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Provide a few details about your project, location and requirements.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#081225] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                4
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Receive responses
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Interested professionals can contact you to discuss your request and provide their offer.
                </p>
              </div>
            </div>

          </div>

          {/* Central Action Button */}
          <div className="mt-14 sm:mt-16 text-center">
            <Link
              href="/submit-request"
              className="bg-[#0A1128] hover:bg-[#121c3b] text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Submit Your Request for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
          4. WHY SUBMIT A REQUEST? SECTION
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[#F9FBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why submit a request?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Save time and connect with professionals who are interested in your specific needs.
          </p>

          {/* 3 Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 text-center">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                One request, multiple opportunities
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Reach relevant professionals without contacting them one by one.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Relevant professionals
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Your request is shown to businesses based on your service and location.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Save time
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Let interested professionals come to you instead of searching for them yourself.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          5. FOOTER
          ========================================================= */}

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
                      Zero Auth â€¢ 100% Free
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Submit Your Request
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    No login required. Local vetted professionals will send you quotes directly.
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
                        placeholder="e.g. Painting, Solar Panels, Moving..."
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
                        Project Details
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
                    Your request has been broadcast to active specialists. You will receive quotes soon!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#00BC7D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Back to How It Works
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

