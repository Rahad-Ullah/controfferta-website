const reasons = [
  {
    title: "Real Intent",
    description:
      "Our leads come from people who have actively requested a quote or information for a service.",
  },
  {
    title: "Fresh Data",
    description:
      "Every lead is published within 24–48 hours of creation, maximizing conversion probabilities.",
  },
  {
    title: "Complete Data",
    description:
      "Name, contact, geographic area, and detailed description of the need — everything you need for an effective first contact.",
  },
];

export default function ProviderAboutLeadQuality() {
  return (
    <section className="bg-[#F6F8FB] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why lead quality matters</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            A poor lead is not just useless — it&apos;s a hidden cost in terms of time, resources,
            and missed opportunities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <span className="block size-3.5 rounded-full bg-[#00D492]" />
              <h3 className="mt-5 text-base font-bold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
