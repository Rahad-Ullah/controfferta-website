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
                      Zero Auth • 100% Free
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

