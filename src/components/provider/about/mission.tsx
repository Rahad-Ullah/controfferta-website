import { FileText, Lock, UserCheck, Zap, type LucideIcon } from "lucide-react";

const points: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Qualified Leads",
    description: "Every request comes from users with a real need.",
    icon: UserCheck,
  },
  {
    title: "Verified Data",
    description: "We validate every request to ensure quality.",
    icon: Lock,
  },
  {
    title: "Full Transparency",
    description: "Clear credit costs — no hidden fees, ever.",
    icon: FileText,
  },
  {
    title: "Fast Response",
    description: "Receive notifications and contact customers in real time.",
    icon: Zap,
  },
];

export default function ProviderAboutMission() {
  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our mission</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            <p>
              We believe every business deserves to connect with customers who are genuinely
              interested in their services. Cold prospecting is costly and inefficient — we offer
              an alternative based on verified data and real customer intent.
            </p>
            <p>
              Our credit model guarantees full transparency and budget control, eliminating the
              risk of untraceable investments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <Icon className="size-5 text-slate-500" />
                <h3 className="mt-4 text-sm font-bold text-slate-900">{point.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">{point.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
