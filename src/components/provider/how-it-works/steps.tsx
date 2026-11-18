import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Browse requests",
    description: "Explore customer requests filtered by category, area and budget.",
    className: "md:col-start-1 md:row-start-1",
  },
  {
    number: "2",
    title: "Evaluate the lead",
    description: "Read the preview: category, area, description. Decide if the lead is a good fit.",
    className: "md:col-start-1 md:row-start-2",
  },
  {
    number: "3",
    title: "Buy credits",
    description: "Top up your balance with the best package. Credits never expire.",
    className: "md:col-start-2 md:row-start-2",
  },
  {
    number: "4",
    title: "Unlock & contact",
    description: "Use credits to unlock the customer\u2019s name, phone number and email.",
    className: "md:col-start-2 md:row-start-1",
  },
];

export default function ProviderHowItWorksSteps() {
  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-12">
          {steps.map((step) => (
            <article key={step.number} className={`flex items-start gap-4 ${step.className}`}>
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00BC7D] text-sm font-bold text-white">
                {step.number}
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900 sm:text-base">{step.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center sm:mt-16">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#00BC7D] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(0,188,125,0.85)] transition-colors hover:bg-[#00a36d]"
          >
            Sign Up for Free
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
