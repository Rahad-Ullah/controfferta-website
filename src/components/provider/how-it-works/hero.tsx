function ProcessArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="how-it-works-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g fill="url(#how-it-works-glass)" stroke="#dbeafe" strokeOpacity="0.35" strokeWidth="1.4">
        <g transform="translate(70 48) rotate(-8)">
          <rect width="168" height="112" rx="18" />
          <path
            d="M48 56h18l22-14v44L66 72H48a8 8 0 0 1-8-8v0a8 8 0 0 1 8-8zm48-6c8 6 8 22 0 28"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(250 78) rotate(6)">
          <rect width="132" height="96" rx="16" />
          <circle cx="60" cy="44" r="14" fill="none" stroke="#e0f2fe" strokeWidth="2" />
          <path d="M70 54l12 12" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(860 36) rotate(7)">
          <rect width="150" height="104" rx="16" />
          <path
            d="M42 62c8-16 22-16 30 0m36 0c8-16 22-16 30 0M57 58c6 10 18 10 24 0"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(1020 96) rotate(-6)">
          <rect width="140" height="100" rx="16" />
          <path
            d="M36 58c0-10 8-16 16-16 6 0 10 3 14 8 4-5 8-8 14-8 8 0 16 6 16 16 0 14-16 24-30 32-14-8-30-18-30-32z"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="2"
          />
        </g>
      </g>

      <path
        d="M40 360C150 316 210 404 320 368s170-78 270-28 150 78 250 28 180-92 280-36"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.4"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M40 360C150 316 210 404 320 368s170-78 270-28 150 78 250 28 180-92 280-36"
        fill="none"
        stroke="#e0f2fe"
        strokeOpacity="0.28"
        strokeWidth="2"
      />
      {[
        [40, 360],
        [210, 386],
        [390, 354],
        [590, 340],
        [790, 380],
        [990, 336],
        [1160, 324],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="16" fill="#0b1a2e" stroke="#7dd3fc" strokeOpacity="0.8" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="5" fill="#67e8f9" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export default function ProviderHowItWorksHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1524] py-20 text-white sm:py-28">
      <ProcessArt />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1524]/35 via-[#0B1524]/55 to-[#000]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00BC7D]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How It Works</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
          A simple and transparent process for acquiring qualified customers.
        </p>
      </div>
    </section>
  );
}
