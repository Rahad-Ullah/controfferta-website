"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { toast } from "sonner";
import { nextFetch } from "@/lib/api/fetcher";
import { clearCurrentUser } from "@/hooks/use-current-user";
import {
  dashboardNavLinks,
  isDashboardNavActive,
} from "@/components/dashboard/layout/nav-links";

function BrandMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo/logo.png"
      alt="Controfferta.it"
      width={1290}
      height={112}
      priority
      className={className}
    />
  );
}

function NavItems({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {dashboardNavLinks.map((link) => {
        const Icon = link.icon;
        const active = isDashboardNavActive(pathname, link.href, link.match);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-[#00BC7D]/10 font-semibold text-[#00BC7D]"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon
                className={`size-4 shrink-0 ${active ? "text-[#00BC7D]" : "text-zinc-500"}`}
              />
              {link.label}
            </span>
            {link.badge ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                {link.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

type DashboardSidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export default function DashboardSidebar({
  mobileOpen,
  onMobileOpenChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const closeMobile = () => onMobileOpenChange(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const handleConfirmLogout = async () => {
    setLogoutModalOpen(false);
    try {
      await nextFetch({ url: "/auth/logout", method: "POST", payload: {} });
    } catch {
      // Still leave the dashboard if the API call fails.
    }
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore Next cookie clear failures.
    }
    await clearCurrentUser();
    toast.success("Signed out.");
    router.replace("/login");
  };

  return (
    <>
      <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-white/8 bg-[#0F172A] lg:flex">
        <div className="flex flex-col gap-6 px-5 pt-6 pb-2">
          <div>
            <Link href="/provider" className="inline-flex items-center">
              <BrandMark className="h-4 w-auto xl:h-5" />
            </Link>
          </div>
          <NavItems pathname={pathname} />
        </div>

        <div className="border-t border-white/10 p-5">
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="size-4" />
            Log Out
          </button>
        </div>
      </aside>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileOpen ? (
              <div
                key="dashboard-mobile-nav"
                className="fixed inset-0 z-50 lg:hidden"
              >
                <motion.button
                  type="button"
                  aria-label="Close navigation menu"
                  className="absolute inset-0 bg-black/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMobile}
                />
                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                  className="absolute top-0 left-0 flex h-full w-[min(18rem,85vw)] flex-col border-r border-white/10 bg-[#0F172A] shadow-2xl"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                >
                  <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                    <BrandMark className="h-4 w-auto" />
                    <button
                      type="button"
                      onClick={closeMobile}
                      className="cursor-pointer rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
                      aria-label="Close navigation menu"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 py-4">
                    <NavItems pathname={pathname} onNavigate={closeMobile} />
                  </div>
                  <div className="border-t border-white/10 p-4">
                    <button
                      type="button"
                      onClick={() => {
                        closeMobile();
                        setLogoutModalOpen(true);
                      }}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut className="size-4" />
                      Log Out
                    </button>
                  </div>
                </motion.aside>
              </div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )}

      {logoutModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setLogoutModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLogoutModalOpen(false)}
              className="absolute top-4 right-4 cursor-pointer p-1 text-slate-400 transition-colors hover:text-slate-700"
            >
              <X className="size-5" />
            </button>
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <LogOut className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Log out of your account?
            </h3>
            <p className="mt-1.5 mb-6 text-sm leading-relaxed text-slate-500">
              You will need to sign in again to access the dashboard.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                className="h-11 flex-1 cursor-pointer rounded-full bg-slate-100 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-red-500 text-sm font-bold text-white transition-colors hover:bg-red-600"
              >
                <LogOut className="size-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
