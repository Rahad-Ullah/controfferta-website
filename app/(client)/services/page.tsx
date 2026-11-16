"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

