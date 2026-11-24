import Image from "next/image";
import Link from "next/link";

export default function ClientFooter() {
  return (
    <footer id="footer" className="bg-[#080C12] text-white border-t border-white/10 pt-14 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo/logo.png"
                alt="Controfferta.it"
                width={1290}
                height={112}
                className="h-5 w-auto"
              />
            </Link>
            <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
              The B2B marketplace for qualified lead generation. Connect businesses with real customers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:col-span-3">
            <div className="space-y-3">
              <h4 className="text-sm lg:text-base font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
              <ul className="space-y-2 text-sm lg:text-base text-zinc-400 break-words">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm lg:text-base font-bold uppercase tracking-wider text-zinc-200">Company</h4>
              <ul className="space-y-2 text-sm lg:text-base text-zinc-400 break-words">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm lg:text-base font-bold uppercase tracking-wider text-zinc-200">Quick Links</h4>
              <ul className="space-y-2 text-sm lg:text-base text-zinc-400 break-words">
                <li><Link href="/submit-request" className="hover:text-white transition-colors">Submit a Request</Link></li>
                <li><Link href="/provider" className="hover:text-white transition-colors">For Companies</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Company Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm lg:text-base text-zinc-500">
          &copy; 2026 Controfferta.it. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
