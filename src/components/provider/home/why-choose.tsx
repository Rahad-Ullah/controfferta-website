import Image from "next/image";
import Link from "next/link";

const reasons = [
  {
    number: "01",
    title: "Save Time",
    description: "Submit one request and reach relevant professionals without contacting them individually.",
    image: "/images/provider/home/why-choose-01.png",
    width: 278,
    height: 237,
  },
  {
    number: "02",
    title: "Multiple Professionals",
    description: "Connect with businesses that offer the services you need.",
    image: "/images/provider/home/why-choose-02.png",
    width: 277,
    height: 232,
  },
  {
    number: "03",
    title: "Local Connections",
    description: "Find professionals who serve your area.",
    image: "/images/provider/home/why-choose-03.png",
    width: 178,
    height: 208,
  },
  {
    number: "04",
    title: "Simple & Free",
    description: "Submit your service request easily without paying to post it.",
    image: "/images/provider/home/why-choose-04.png",
    width: 178,
    height: 178,
  },
];

export default function ProviderWhyChoose() {
  return (
    <>
    <section className="bg-[#F4F7F8] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Choose Controfferta.it?</h2>
          <p className="mt-2 text-sm text-slate-500">A simple and transparent process to attract new qualified clients.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article key={reason.number} className="flex h-full flex-col bg-white p-5 shadow-sm">
              <span className="text-sm font-medium text-slate-400">{reason.number}</span>
              <h3 className="mt-2 text-base font-bold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{reason.description}</p>
              <div className="mt-auto flex h-44 items-end justify-center pt-6">
                <Image
                  src={reason.image}
                  alt=""
                  width={reason.width}
                  height={reason.height}
                  className="h-auto max-h-40 w-auto max-w-[170px] object-contain"
                />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>

    <section className="bg-white py-16 text-center sm:py-20">
      <div className="mx-auto max-w-xl px-4">
        <Image
          src="/images/provider/home/register-now.png"
          alt="Register now"
          width={233}
          height={113}
          className="mx-auto h-auto w-[140px]"
        />
        <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-[#1D293D] sm:text-base">
          You can see the complete list of requests in your area and have the next requests we receive notified by email
        </p>
        <Link
          href="/register"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl border-0 bg-[#00BC7D] px-8 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#00a36d]"
        >
          Register for free
        </Link>
      </div>
    </section>
    </>
  );
}
