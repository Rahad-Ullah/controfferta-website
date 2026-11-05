import React from "react";
import { FileText, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Free to Submit",
      description: "Create your request at no cost and get matched with professionals.",
    },
    {
      icon: Clock,
      title: "Fast & Simple",
      description: "Complete the form in minutes and receive relevant offers.",
    },
    {
      icon: ShieldCheck,
      title: "Qualified Professional",
      description: "Work with certified and experienced service providers.",
    },
    {
      icon: MapPin,
      title: "Local & Nearby",
      description: "Get offers from professionals in your area.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[11px] font-bold tracking-widest text-[#00BC7D] uppercase">
          HOW IT WORKS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-1">
          A simple process, big opportunities!
        </h2>

        {/* 4 Process Steps */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00BC7D] flex items-center justify-center shadow-sm">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

