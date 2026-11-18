const points = [
  {
    title: "Free preview",
    description: "Browse all leads at no cost. Evaluate freely before deciding.",
  },
  {
    title: "Pay only for what you want",
    description: "Each lead has a transparent credit cost. You only unlock the interesting ones.",
  },
  {
    title: "No wasted credits",
    description: "If a lead turns out to be unreachable, we refund the credits.",
  },
];

export default function ProviderCreditSystem() {
  return (
    <section className="bg-[#F7F9FC] py-16 text-slate-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The credit system</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Pay only for the leads you choose to unlock. No subscription, no risk.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {points.map((point) => (
            <article
              key={point.title}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-10 text-center shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]"
            >
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">{point.title}</h3>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-500 sm:text-sm">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
