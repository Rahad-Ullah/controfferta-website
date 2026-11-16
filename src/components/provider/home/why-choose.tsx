import Link from "next/link";

const reasons = [
  {
    number: "01",
    title: "Save Time",
    description: "Submit one request and reach relevant professionals without contacting them individually.",
  },
  {
    number: "02",
    title: "Multiple Professionals",
    description: "Connect with businesses that offer the services you need.",
  },
  {
    number: "03",
    title: "Local Connections",
    description: "Find professionals who serve your area.",
  },
  {
    number: "04",
    title: "Simple & Free",
    description: "Submit your service request easily without paying to post it.",
  },
];

export default function ProviderWhyChoose() {
  return (
    <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Choose Controfferta.it?</h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">A simple and transparent process to attract new qualified clients.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason) => (
            <div key={reason.number} className="bg-[#E5E9EC] rounded-2xl p-6 space-y-2 border border-slate-300/60">
              <span className="text-xs font-bold text-zinc-400 block">{reason.number}</span>
              <h3 className="text-sm font-bold text-slate-900">{reason.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl bg-[#E5E9EC] border border-slate-300/80 shadow-sm space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-[#00BC7D] text-white font-black text-sm uppercase tracking-wider transform -rotate-2">
            REGISTER NOW
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            You can see the complete list of requests in your area and have the next requests we receive notified by email
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-block bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              REGISTER FOR FREE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
