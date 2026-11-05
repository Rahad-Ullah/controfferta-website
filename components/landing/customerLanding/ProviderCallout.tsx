import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProviderCallout() {
  return (
    <section id="provider-callout" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
          {/* Left Image: Technician Repairing */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=95"
              alt="Service provider technician at work"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#00BC7D] uppercase tracking-wider">
              FOR COMPANIES &amp; FREELANCERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Are you a service provider?
            </h2>
            <p className="text-base font-semibold text-slate-700">
              Find New Business Opportunities
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Join Controfferta.it to discover qualified customer requests in your area. Browse verified leads that match your services, preview requirements before spending credits, and connect with potential customers to grow your business.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00BC7D] hover:text-[#00d68f] hover:underline"
              >
                <span>→ Register for Free as a Service Provider</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

