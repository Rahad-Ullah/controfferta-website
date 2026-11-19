import Image from "next/image";
import Link from "next/link";

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden px-4 py-10 text-white selection:bg-[#00BC7D]/30 selection:text-[#00BC7D] sm:px-6"
      style={{
        backgroundColor: "#061B1E",
        backgroundImage: `
          radial-gradient(ellipse 750px 420px at 50% 8%, rgba(0, 188, 125, 0.28) 0%, rgba(0, 114, 82, 0.16) 42%, transparent 72%),
          radial-gradient(circle 800px at 0% 80%, rgba(1, 31, 23, 0.95) 0%, transparent 70%),
          radial-gradient(circle 700px at 100% 20%, rgba(8, 28, 36, 0.9) 0%, transparent 68%),
          linear-gradient(180deg, #071F22 0%, #061B1E 40%, #051816 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#061B1E]" style={{ zIndex: -1 }} />
      <div className="pointer-events-none absolute top-[6%] left-1/2 h-[340px] w-[680px] -translate-x-1/2 rounded-full bg-[#00BC7D]/15 blur-[120px]" />

      <Link href="/dashboard" className="relative z-10 mb-8 inline-flex">
        <Image
          src="/logo/logo.png"
          alt="Controfferta.it"
          width={1290}
          height={112}
          priority
          className="h-7 w-auto sm:h-8"
        />
      </Link>

      <div className="relative z-10 flex w-full max-w-md justify-center">{children}</div>
    </div>
  );
}
