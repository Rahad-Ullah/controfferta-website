"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  RotateCw,
  X,
  Send,
  CheckCircle2,
  Calendar,
  BookOpen,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface BlogPost {
  id: number;
  category: string;
  badgeClass: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    { label: "All Articles", count: 48 },
    { label: "Home & Renovation", count: 18 },
    { label: "Solar & Energy", count: 12 },
    { label: "Moving", count: 7 },
    { label: "Gardening", count: 5 },
    { label: "Business Tips", count: 6 },
  ];

  const trendingTags = [
    "#Ristrutturazione",
    "#BonusCasa2025",
    "#PannelliSolari",
    "#Preventivi",
  ];

  // Featured Article
  const featuredArticle: BlogPost = {
    id: 0,
    category: "Home & Renovation",
    badgeClass: "bg-emerald-50 text-[#00BC7D]",
    title: "How to Choose the Right Professionals for Your Home Project",
    excerpt:
      "Planning a renovation or home repair in Italy can feel overwhelming. Learn how to verify contractor certifications, compare itemized quotes, and protect your budget from start to finish.",
    date: "18 Ottobre 2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=95",
  };

  // 6 Latest Articles
  const allArticles: BlogPost[] = [
    {
      id: 1,
      category: "Solar & Energy",
      badgeClass: "bg-cyan-50 text-cyan-700",
      title: "How to Choose the Right Solar Panels for Your Home",
      excerpt:
        "Evaluate tier-1 photovoltaic systems, Italian tax incentives, storage batteries, and expected ROI for residential energy...",
      date: "14 Ottobre 2024",
      image:
        "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=95",
    },
    {
      id: 2,
      category: "Home & Renovation",
      badgeClass: "bg-emerald-50 text-[#00BC7D]",
      title: "5 Things to Consider Before Renovating Your Home",
      excerpt:
        "From structural permits and municipal SCIA paperwork to material lead times: essential planning steps before tearing down walls.",
      date: "11 Ottobre 2024",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=95",
    },
    {
      id: 3,
      category: "Moving",
      badgeClass: "bg-amber-50 text-amber-700",
      title: "A Complete Guide to Planning Your Next Move",
      excerpt:
        "Checklists for stress-free relocation, packaging delicate items, booking parking permits, and securing licensed moving...",
      date: "06 Ottobre 2024",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=95",
    },
    {
      id: 4,
      category: "Business Tips",
      badgeClass: "bg-emerald-50 text-[#00BC7D]",
      title: "How to Find the Right Professional for Your Project",
      excerpt:
        "Why verified customer reviews, portfolio inspection, and escrow-safe milestones ensure seamless execution for complex jobs.",
      date: "03 Ottobre 2024",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=95",
    },
    {
      id: 5,
      category: "Solar & Energy",
      badgeClass: "bg-cyan-50 text-cyan-700",
      title: "Tips for Improving Your Home Energy Efficiency",
      excerpt:
        "Smart thermostats, heat pumps, insulation audits, and thermal windows that slash winter heating and summer cooling utility bills.",
      date: "28 Settembre 2024",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=95",
    },
    {
      id: 6,
      category: "Home & Renovation",
      badgeClass: "bg-emerald-50 text-[#00BC7D]",
      title: "How to Compare Service Quotes",
      excerpt:
        "Spot hidden costs, understand labor vs materials breakdowns, and negotiate fair payment schedules with confidence.",
      date: "22 Settembre 2024",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=95",
    },
  ];

  // Filtered Articles based on category and search query
  const filteredArticles = allArticles.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Articles" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Modal Request Form
  const [formData, setFormData] = useState({
    service: "",
    city: "",
    fullName: "",
    phone: "",
  });

  const handleOpenModal = (article?: BlogPost) => {
    if (article) {
      setSelectedArticle(article);
      setFormData((prev) => ({ ...prev, service: article.category }));
    }
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      
      {/* 2. Hero Section ("Insights & Inspiration") */}
      <section className="bg-white border-b border-slate-100 pt-14 pb-12 sm:pt-18 sm:pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Insights &amp; <span className="text-[#00BC7D]">Inspiration</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Discover helpful tips, expert advice, and ideas to make your next project easier.
          </p>

          {/* Search Pill Bar */}
          <div className="pt-5 max-w-xl mx-auto">
            <div className="bg-white rounded-full p-1.5 sm:p-2 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 pl-3.5 flex-1">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, cost estimators..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none bg-transparent"
                />
              </div>
              <button
                type="button"
                className="bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trending tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-zinc-500">
              <span className="text-zinc-400 font-semibold mr-1">Trending:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag.replace("#", ""))}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-full px-2.5 py-0.5 text-zinc-600 hover:text-[#00BC7D] hover:border-[#00BC7D]/40 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const active = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.label);
                    setSearchQuery("");
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-[#00BC7D] text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? "bg-white/20 text-white" : "bg-white text-zinc-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Large Featured Article Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Large Photo */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[380px] rounded-2xl overflow-hidden group">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              quality={95} sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#00BC7D] text-[11px] font-bold uppercase tracking-wider">
                {featuredArticle.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 leading-tight">
              {featuredArticle.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleOpenModal(featuredArticle)}
                className="bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Latest Articles Section */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Latest Articles
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500">
            Fresh guides, market benchmarks, and practical tips from verified professionals.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredArticles.slice(0, visibleCount).map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image with Tag Overlay */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    quality={95} sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#070A0F]/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#00BC7D]">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="text-[11px] text-zinc-400 mb-2 font-medium">
                    {article.date}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00BC7D] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Link Bottom */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenModal(article)}
                  className="text-xs sm:text-sm font-semibold text-[#00BC7D] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => (prev >= 6 ? 12 : 6))}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Load More Articles</span>
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <p className="mt-2 text-xs text-zinc-400">
            Showing {Math.min(visibleCount, filteredArticles.length)} of {categories[0].count} articles
          </p>
        </div>

      </section>


      {/* Reader / Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200"
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
                      Request Quotes for this Service
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {selectedArticle?.title || "Get Connected with Verified Pros"}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-1.5">
                    No login required. Top rated professionals will review your requirement.
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
                        placeholder="e.g. Renovation, Solar, Moving..."
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
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Request Sent!</h4>
                  <p className="text-xs text-zinc-500">
                    Your inquiry has been received. Certified contractors will contact you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#00BC7D] text-white px-5 py-2 rounded-xl text-xs font-semibold"
                  >
                    Close
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
