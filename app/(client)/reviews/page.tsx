"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  ArrowRight,
  User,
} from "lucide-react";

interface ReviewItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Review submission state
  const [rating, setRating] = useState<number>(4);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Initial 9 reviews as in the screenshot (3 distinct customer experiences repeated in 3 rows)
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    {
      id: 1,
      quote:
        "I submitted a request for solar panel installation and got multiple offers within a day. It was super easy and convenient.",
      author: "Marco Ferretti",
      role: "Ferretti Windows Ltd",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Great platform! I found a reliable contractor for my renovation project without any hassle.",
      author: "Giulia Romano",
      role: "Romano Solar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "The process was simple and clear. I received professional offers and choose the best one for my needs.",
      author: "Alessandro Conti",
      role: "Conti Constructions",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 4,
      quote:
        "I submitted a request for solar panel installation and got multiple offers within a day. It was super easy and convenient.",
      author: "Marco Ferretti",
      role: "Ferretti Windows Ltd",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 5,
      quote:
        "Great platform! I found a reliable contractor for my renovation project without any hassle.",
      author: "Giulia Romano",
      role: "Romano Solar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 6,
      quote:
        "The process was simple and clear. I received professional offers and choose the best one for my needs.",
      author: "Alessandro Conti",
      role: "Conti Constructions",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 7,
      quote:
        "I submitted a request for solar panel installation and got multiple offers within a day. It was super easy and convenient.",
      author: "Marco Ferretti",
      role: "Ferretti Windows Ltd",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 8,
      quote:
        "Great platform! I found a reliable contractor for my renovation project without any hassle.",
      author: "Giulia Romano",
      role: "Romano Solar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
    {
      id: 9,
      quote:
        "The process was simple and clear. I received professional offers and choose the best one for my needs.",
      author: "Alessandro Conti",
      role: "Conti Constructions",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=95",
      rating: 5,
    },
  ]);

  // Request modal form data
  const [formData, setFormData] = useState({
    service: "",
    city: "",
    description: "",
    fullName: "",
    phone: "",
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newRev: ReviewItem = {
      id: Date.now(),
      quote: message,
      author: "Verified Customer",
      role: "Customer Review",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=95",
      rating: rating,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setMessage("");
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

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

              {!requestSubmitted ? (
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
                    No login required. Local vetted professionals will send you quotes directly.
                  </p>

                  <form onSubmit={handleRequestSubmit} className="mt-6 space-y-4">
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
                    Back to Reviews
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

