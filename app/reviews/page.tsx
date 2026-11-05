"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomerNavbar from "@/components/shared/CustomerNavbar";
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
          1. HEADER / NAVBAR
          ========================================================= */}
      <CustomerNavbar onOpenRequestModal={() => setIsModalOpen(true)} />

      {/* =========================================================
          2. HERO BANNER ("Reviews")
          ========================================================= */}
      <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden border-b border-slate-800">
        {/* Background Team Meeting with Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=95"
            alt="Customer reviews background"
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Reviews
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Hear from customers who found the right professionals through Controfferta.it.
          </p>

          {/* Stats Counters (4.8 Average rating, 6+ Verified reviews) */}
          <div className="pt-6 flex items-center justify-center gap-12 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00BC7D] tracking-tight">
                4.8
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Average rating
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00BC7D] tracking-tight">
                6+
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Verified reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. 9 REVIEWS GRID (3 Columns x 3 Rows)
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {reviewsList.map((rev, index) => (
              <div
                key={rev.id || index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed italic">
                  &quot;{rev.quote}&quot;
                </p>

                {/* Author & Rating Stars Bottom */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        quality={95}
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  {/* 5 Amber Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================
              4. "Add Review for Platform" CARD
              ========================================================= */}
          <div className="mt-16 sm:mt-20 max-w-xl mx-auto">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xl text-center relative overflow-hidden">
              
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Add Review for Platform
              </h3>

              {!reviewSubmitted ? (
                <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
                  {/* Interactive Star Rating Selector */}
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Message Field */}
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe in detail what the customer is looking for, type of work, quantity, technical specifications..."
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setMessage("")}
                      className="flex-1 py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-5 rounded-xl bg-[#00BC7D] hover:bg-[#00d68f] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Thank you for your review!
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Your feedback helps us continue providing the best connection between customers and professionals.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReviewSubmitted(false)}
                    className="text-xs text-[#00BC7D] font-semibold underline pt-2 cursor-pointer"
                  >
                    Write another review
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          5. FOOTER
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
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/reviews" className="text-[#00BC7D] transition-colors">Reviews</Link></li>
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

