import Link from "next/link";

export default function ProviderFooter() {
  return (
    <footer className="bg-[#0F172A] text-zinc-400 text-xs py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/provider" className="inline-flex items-center gap-1 mb-3">
            <span className="text-white font-extrabold tracking-widest text-base">CONTR</span>
            <span className="text-[#00BC7D] font-extrabold tracking-widest text-base">FFERTA</span>
            <span className="text-white font-bold text-base">.IT</span>
          </Link>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            The B2B marketplace for qualified customer requests. Connect businesses with new customers.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Platform</h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/provider" className="hover:text-white">Home</Link></li>
            <li><Link href="/provider/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/provider/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/provider/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/provider/reviews" className="hover:text-white">Reviews</Link></li>
            <li><Link href="/provider/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Account</h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/login" className="hover:text-white">Log In</Link></li>
            <li><Link href="/register" className="hover:text-white">Sign Up</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Company Dashboard</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Contact Support</h4>
          <p className="text-[11px] text-zinc-400">info@controfferta.com</p>
          <p className="text-[11px] text-zinc-400 mt-1">support@controfferta.com</p>
          <p className="text-[11px] text-zinc-400 mt-1">Mon - Fri: 9:00 - 18:00</p>
        </div>
      </div>
    </footer>
  );
}
