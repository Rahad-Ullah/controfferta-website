import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden selection:bg-[#00BC7D]/30 selection:text-[#00BC7D]"
      style={{
        backgroundColor: "#061B1E",
        backgroundImage: `
          radial-gradient(ellipse 750px 420px at 50% 10%, rgba(0, 188, 125, 0.35) 0%, rgba(0, 114, 82, 0.20) 45%, transparent 75%),
          radial-gradient(circle 800px at 0% 75%, rgba(1, 31, 23, 0.95) 0%, rgba(4, 29, 26, 0.6) 45%, transparent 80%),
          radial-gradient(circle 800px at 100% 20%, rgba(13, 22, 37, 0.95) 0%, rgba(11, 23, 35, 0.6) 50%, transparent 80%),
          radial-gradient(circle 600px at 100% 90%, rgba(8, 25, 32, 0.95) 0%, transparent 75%),
          linear-gradient(135deg, #061B1E 0%, #051D1A 35%, #0A1821 65%, #0D1625 100%)
        `,
      }}
    >
      {/* Ambient Emerald Halo behind the Brand Logo */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#00BC7D]/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Brand Logo Centered Above the Card */}
      <div className="mb-6 sm:mb-8 text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-1 group transition-transform hover:scale-[1.02]">
          <span className="text-white font-extrabold tracking-widest text-xl sm:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            CONTR
          </span>
          <span className="inline-flex items-center text-[#00BC7D] px-0.5">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_12px_rgba(0,188,125,0.85)]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 5L3 12L8 19"
                stroke="#00BC7D"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 5L21 12L16 19"
                stroke="#00BC7D"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[#00BC7D] font-extrabold tracking-widest text-xl sm:text-2xl drop-shadow-[0_0_10px_rgba(0,188,125,0.4)]">
            FFERTA
          </span>
          <span className="text-white font-bold tracking-wider text-xl sm:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            .IT
          </span>
        </Link>
      </div>

      {/* Centered Floating Card */}
      <div className="w-full flex justify-center relative z-10">
        {children}
      </div>
    </div>
  );
}
