import React from "react";

export default function StatsBar() {
  return (
    <section className="bg-[#E5E5E5] pb-14 sm:pb-16 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between sm:justify-around text-center max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="px-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              12,400+
            </div>
            <div className="mt-1 text-xs sm:text-sm text-zinc-500 font-normal">
              Quotes Every Year
            </div>
          </div>

          {/* Green vertical divider */}
          <div className="w-[2.5px] h-8 sm:h-10 bg-[#00BC7D] shrink-0" />

          {/* Stat 2 */}
          <div className="px-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              3,200+
            </div>
            <div className="mt-1 text-xs sm:text-sm text-zinc-500 font-normal">
              Registered Companies
            </div>
          </div>

          {/* Green vertical divider */}
          <div className="w-[2.5px] h-8 sm:h-10 bg-[#00BC7D] shrink-0" />

          {/* Stat 3 */}
          <div className="px-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              1,400+
            </div>
            <div className="mt-1 text-xs sm:text-sm text-zinc-500 font-normal">
              Visitors Every Year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
