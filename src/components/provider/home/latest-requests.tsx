import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

const requests = [
  {
    category: "Windows and doors",
    title: "Replacement of over 6 windows",
    location: "Lombardy / Pavia",
    date: "Jan 5, 2026",
    credits: "15 credits",
  },
  {
    category: "Photovoltaic",
    title: "6kW photovoltaic system",
    location: "Veneto / Verona",
    date: "Jan 5, 2026",
    credits: "20 credits",
  },
  {
    category: "Move",
    title: "80sqm apartment move",
    location: "Piedmont / Turin",
    date: "Jan 4, 2026",
    credits: "10 credits",
  },
  {
    category: "Construction",
    title: "Complete bathroom renovation",
    location: "Tuscany / Florence",
    date: "Jan 3, 2026",
    credits: "18 credits",
  },
];

export default function ProviderLatestRequests() {
  return (
    <section className="bg-[#ECEFF2] text-slate-900 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Latest Requests</h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">The most recent customer requests on the platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {requests.map((request) => (
            <div
              key={request.title}
              className="bg-[#E5E9EC] hover:bg-[#dfe4e8] border border-slate-300/80 rounded-2xl p-5 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[11px] text-zinc-500 font-medium">{request.category}</span>
                  <span className="text-[10px] font-bold text-[#00BC7D] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Available
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mb-2">{request.title}</h3>
                <p className="text-[11px] text-zinc-500 flex items-center gap-1 mb-4">
                  <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                  {request.location}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-300/70 text-xs">
                <span className="text-[11px] text-zinc-500">{request.date}</span>
                <span className="font-extrabold text-[#00BC7D]">{request.credits}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/register"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#00BC7D] hover:underline"
          >
            <span>View All Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
