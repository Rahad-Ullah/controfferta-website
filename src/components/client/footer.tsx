import Image from "next/image";
import Link from "next/link";

export default function ClientFooter() {
  return (
    <footer id="footer" className="bg-[#080C12] text-white border-t border-white/10 pt-14 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <p className="text-xs text-zinc-400 leading-relaxed">
              The B2B marketplace for qualified lead generation. Connect businesses with real customers.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Account</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Sector Portals</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">FotovoltaicoPerTe.com</a></li>
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">RisparmioEnergeticoPerTe.com</a></li>
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">InfissiPerTe.com</a></li>
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">EdiliziaPerTe.com</a></li>
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">TraslocoPerTe.com</a></li>
              <li><a href="#" className="hover:text-[#00BC7D] transition-colors">PreventiviPerTe.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-zinc-500">
          &copy; 2026 CONTROFFERTA.IT - Tutti i diritti riservati
        </div>
      </div>
    </footer>
  );
}
