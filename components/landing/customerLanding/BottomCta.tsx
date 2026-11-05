import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BottomCta() {
  return (
    <section className="relative bg-[#070D15] text-white py-16 sm:py-20 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00BC7D]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Ready to get started?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Submit your request now and find the right professional for your project.
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
      </div>
    </section>
  );
}

