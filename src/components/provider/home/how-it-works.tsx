import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Browse Requests",
    description: "Find customer requests in your category and area of interest.",
    image: "/images/provider/home/how-it-works-01.png",
  },
  {
    number: "02",
    title: "Evaluate the Lead",
    description: "Preview the request without unlocking it yet.",
    image: "/images/provider/home/how-it-works-02.png",
  },
  {
    number: "03",
    title: "Buy Credits",
    description: "Top up your balance with the package that best fits your volume.",
    image: "/images/provider/home/how-it-works-03.png",
  },
  {
    number: "04",
    title: "Unlock and Contact",
    description: "Use credits to reveal the customer's information and contact them.",
    image: "/images/provider/home/how-it-works-04.png",
  },
];

export default function ProviderHowItWorks() {
  return (
    <section className="bg-[#F8FAFC] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How It Works</h2>
          <p className="mt-2 text-sm text-slate-500">A simple and transparent process to attract new qualified clients.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-colors hover:border-[#00D492]">
              <span className="mx-auto inline-flex size-10 items-center justify-center rounded-full bg-[#00BC7D] text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
              <div className="mt-auto pt-5">
                <Image
                  src={step.image}
                  alt=""
                  width={250}
                  height={169}
                  className="h-auto w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
