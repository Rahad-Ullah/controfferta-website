import React from "react";
import { Users, FileText, Clock, MapPin } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      num: "01",
      title: "Reach Professionals",
      desc: "Your request is shared with businesses that offer the service you need.",
      icon: Users,
    },
    {
      num: "02",
      title: "Get Multiple Offers",
      desc: "Receive responses from interested professionals and compare your options.",
      icon: FileText,
    },
    {
      num: "03",
      title: "Save Time & Effort",
      desc: "Submit one request instead of searching and contacting businesses one by one.",
      icon: Clock,
    },
    {
      num: "04",
      title: "Find Local Experts",
      desc: "Connect with professionals who serve your area and understand your requirements.",
      icon: MapPin,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#F9FBFC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Why Choose Controfferta.it?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-500">
          Connect with the right professionals for your needs.
        </p>

        {/* 4 Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-xs font-bold text-zinc-400">{item.num}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{item.title}</h3>
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center h-28 bg-emerald-50/40 rounded-xl">
                  <Icon className="w-10 h-10 text-[#00BC7D]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

