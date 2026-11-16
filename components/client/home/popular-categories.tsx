"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sun,
  Zap,
  Construction,
  AppWindow,
  Truck,
  Sprout,
  AirVent,
  PaintRoller,
} from "lucide-react";
import QuickRequestModal from "./quick-request-modal";

export const CATEGORIES = [
  { name: "Solar Panels", icon: Sun, desc: "Renewable energy solutions" },
  { name: "Energy Saving", icon: Zap, desc: "Insulation & smart power" },
  { name: "Construction", icon: Construction, desc: "Builders & structural work" },
  { name: "Windows & Doors", icon: AppWindow, desc: "Installation & fixtures" },
  { name: "Moving", icon: Truck, desc: "Relocation & transport" },
  { name: "Gardening", icon: Sprout, desc: "Landscaping & maintenance" },
  { name: "Air Conditioning", icon: AirVent, desc: "HVAC & heating systems" },
  { name: "Renovation", icon: PaintRoller, desc: "Interior & exterior remodeling" },
];

export default function PopularCategories() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="services" className="py-12 sm:py-16 bg-">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading & 8 Category Buttons */}
          <div className="lg:col-span-7">
            {/* Section Tag & Heading */}
            <div>
              <span className="text-[11px] font-bold tracking-wider text-[#00BC7D] uppercase">
                POPULAR CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                What kind of service do you need?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Browse popular categories or submit a custom request. We&apos;ll help you connect with right professionals.
              </p>
            </div>

            {/* 8 Categories (2 rows x 4 columns) */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {CATEGORIES.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setIsModalOpen(true);
                    }}
                    className="group bg-gray-50 hover:bg-white/50 rounded-xl p-3 sm:p-3.5 flex flex-col items-center justify-center text-center border border-[#DCDCDC] hover:border-[#00BC7D] hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D6EFE5] group-hover:bg-[#00BC7D] text-[#00BC7D] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs font-medium text-slate-800 group-hover:text-[#00BC7D] transition-colors leading-tight">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Featured Architect Visual Card */}
          <div className="lg:col-span-5 relative aspect-[356/271] w-full shadow-md overflow-hidden bg-zinc-800 rounded-2xl">
            <Image
              src="/images/popular-categories-architect.png"
              alt="Professional Architect"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <QuickRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedCategory}
      />
    </section>
  );
}
