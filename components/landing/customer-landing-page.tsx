"use client";

import React, { useState } from "react";
import {
  Hero,
  StatsBar,
  PopularCategories,
  HowItWorks,
  WhyChooseUs,
  ProviderCallout,
  Testimonials,
  BottomCta,
  QuickRequestModal,
} from "./customer-landing";

export default function CustomerLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleOpenRequestModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedCategory(serviceName);
    } else if (searchQuery.trim()) {
      setSelectedCategory(searchQuery);
    } else {
      setSelectedCategory("");
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Popular Categories */}
      <PopularCategories
        onSelectCategory={(category) => handleOpenRequestModal(category)}
      />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Why Choose Controfferta.it */}
      <WhyChooseUs />

      {/* 7. B2B Provider Callout Banner */}
      <ProviderCallout />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Bottom CTA */}
      <BottomCta />

      <QuickRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedCategory}
      />
    </div>
  );
}
