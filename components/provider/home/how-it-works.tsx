import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Browse Requests",
    description: "Find customer requests in your category and area of interest.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    alt: "Team reviewing customer requests",
  },
  {
    number: "02",
    title: "Evaluate the Lead",
    description: "Preview the request without unlocking it yet.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    alt: "People evaluating a lead",
  },
  {
    number: "03",
    title: "Buy Credits",
    description: "Top up your balance with the package that best fits your volume.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    alt: "Professional managing credits",
  },
  {
    number: "04",
    title: "Unlock and Contact",
    description: "Use credits to reveal the customer's information and contact them.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
    alt: "Handshake after contacting a customer",
  },
];

export default function ProviderHowItWorks() {
  return (
    <section className="bg-[#ECEFF2] text-slate-900 py-16 border-t border-slate-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How It Works</h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">A simple and transparent process to attract new qualified clients.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div key={step.number} className="bg-[#E5E9EC] rounded-2xl overflow-hidden border border-slate-300/60 flex flex-col justify-between">
              <div className="p-5 text-center">
                <span className="w-8 h-8 rounded-full bg-[#00BC7D] text-white font-black text-xs inline-flex items-center justify-center mb-2">
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">{step.description}</p>
              </div>
              <div className="h-36 bg-slate-300 relative overflow-hidden">
                <Image src={step.image} alt={step.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
