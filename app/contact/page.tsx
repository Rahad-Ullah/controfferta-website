"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomerNavbar from "@/components/shared/customer-navbar";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      {/* Reusable Customer Navbar */}
      <CustomerNavbar />

      {/* Hero Banner */}
      <section className="relative bg-[#070D14] text-white py-20 sm:py-28 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2400&q=95"
            alt="Contact support background"
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/90 via-[#070D14]/80 to-[#070D14]" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#00BC7D] uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Have questions about submitting requests or becoming a service provider? Our team is here to assist you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Customer &amp; Partner Support
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  We are available Monday to Friday from 9:00 AM to 6:00 PM CET to assist customers and registered companies.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Email Us</h4>
                      <p className="text-xs text-[#00BC7D] font-medium">support@controferta.it</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Call Us</h4>
                      <p className="text-xs text-zinc-500">+39 02 8900 1234</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Headquarters</h4>
                      <p className="text-xs text-zinc-500">Milan, Italy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
              {!submitted ? (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Fill out the form below and we will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Marco Rossi"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="marco@example.com"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry about lead generation / requests..."
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you today?"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-[#00BC7D] outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                    Thank you for reaching out, <span className="font-semibold text-slate-800">{formData.name}</span>. A member of our support team will reply to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="bg-[#00BC7D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-[#080C12] text-white border-t border-white/10 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                <span className="text-white font-bold tracking-wider text-lg">.IT</span>
              </Link>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The B2B marketplace for qualified lead generation. Connect businesses with real customers.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-[#00BC7D] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Account</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

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
    </div>
  );
}

