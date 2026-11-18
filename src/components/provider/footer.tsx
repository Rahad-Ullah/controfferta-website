import Image from "next/image";
import Link from "next/link";

export default function ProviderFooter() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#0F172A] pt-14 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/provider" className="inline-flex items-center">
              <Image src="/logo/logo.png" alt="Controfferta.it" width={1290} height={112} className="h-5 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 lg:text-base">
              The B2B marketplace for qualified customer requests. Connect businesses with new customers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:col-span-3">
            <div className="space-y-3">
              <h4 className="text-sm font-bold tracking-wider text-zinc-200 uppercase lg:text-base">Platform</h4>
              <ul className="space-y-2 text-sm break-words text-zinc-400 lg:text-base">
                <li><Link href="/provider" className="transition-colors hover:text-white">Home</Link></li>
                <li><Link href="/provider/about" className="transition-colors hover:text-white">About Us</Link></li>
                <li><Link href="/provider/services" className="transition-colors hover:text-white">Services</Link></li>
                <li><Link href="/provider/how-it-works" className="transition-colors hover:text-white">How It Works</Link></li>
                <li><Link href="/provider/reviews" className="transition-colors hover:text-white">Reviews</Link></li>
                <li><Link href="/provider/contact" className="transition-colors hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold tracking-wider text-zinc-200 uppercase lg:text-base">Account</h4>
              <ul className="space-y-2 text-sm break-words text-zinc-400 lg:text-base">
                <li><Link href="/login" className="transition-colors hover:text-white">Log In</Link></li>
                <li><Link href="/register" className="transition-colors hover:text-white">Sign Up</Link></li>
                <li><Link href="/dashboard" className="transition-colors hover:text-white">Company Dashboard</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-white">Terms</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold tracking-wider text-zinc-200 uppercase lg:text-base">Contact Support</h4>
              <ul className="space-y-2 text-sm break-words text-zinc-400 lg:text-base">
                <li>info@controfferta.com</li>
                <li>support@controfferta.com</li>
                <li>Mon - Fri: 9:00 - 18:00</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-zinc-500 lg:text-base">
          &copy; 2026 Controfferta.it. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
