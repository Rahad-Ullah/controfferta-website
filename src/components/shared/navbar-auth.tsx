"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { nextFetch } from "@/lib/api/fetcher";
import { clearCurrentUser, useCurrentUser } from "@/hooks/use-current-user";
import type { CurrentUser } from "@/types/user.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function displayName(user: CurrentUser) {
  const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  return name || user.email;
}

function initials(user: CurrentUser) {
  const first = user.firstName?.trim()?.[0];
  const last = user.lastName?.trim()?.[0];
  if (first || last) return `${first ?? ""}${last ?? ""}`.toUpperCase();
  return user.email.slice(0, 1).toUpperCase();
}

type NavbarAuthProps = {
  /** Called when a mobile menu link is chosen so the drawer can close. */
  onNavigate?: () => void;
  /** Layout variant for desktop header vs mobile drawer. */
  variant?: "desktop" | "mobile";
};

export default function NavbarAuth({ onNavigate, variant = "desktop" }: NavbarAuthProps) {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  const handleLogout = async () => {
    onNavigate?.();
    try {
      await nextFetch({ url: "/auth/logout", method: "POST", payload: {} });
    } catch {
      // The local session is cleared even when the backend session is already expired.
    }
    await clearCurrentUser();
    toast.success("Signed out.");
    router.replace("/login");
  };

  if (isLoading) {
    if (variant === "mobile") {
      return <div className="h-10 animate-pulse rounded-xl bg-white/5" />;
    }
    return <div className="hidden h-9 w-28 animate-pulse rounded-full bg-white/5 xl:block" />;
  }

  if (!user) {
    if (variant === "mobile") {
      return (
        <div className="space-y-2">
          <Link
            href="/register"
            onClick={onNavigate}
            className="block rounded-xl bg-[#00BC7D] py-2.5 text-center text-sm font-semibold text-white"
          >
            Register
          </Link>
          <Link
            href="/login"
            onClick={onNavigate}
            className="block px-3 py-2 text-center text-sm text-zinc-300 hover:text-white"
          >
            Log In
          </Link>
        </div>
      );
    }

    return (
      <>
        <Link
          href="/login"
          className="hidden whitespace-nowrap px-2 py-1 text-sm text-zinc-400 transition-colors hover:text-white xl:inline-flex"
        >
          Log In
        </Link>
        <Link
          href="/register"
          className="hidden items-center whitespace-nowrap rounded-full border border-[#00BC7D] px-4 py-2.5 text-sm font-semibold text-[#00BC7D] shadow-[0_0_15px_rgba(0,188,125,0.15)] transition-all duration-300 hover:bg-[#00BC7D] hover:text-white hover:shadow-[0_0_20px_rgba(0,188,125,0.4)] sm:inline-flex sm:px-5"
        >
          Register
        </Link>
      </>
    );
  }

  const name = displayName(user);

  if (variant === "mobile") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#00BC7D]/20 text-sm font-semibold text-[#00BC7D]">
            {initials(user)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-zinc-400">{user.email}</p>
          </div>
        </div>
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
        <Link
          href="/dashboard/profile"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          <User className="size-4" />
          Profile
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex max-w-48 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pr-3 pl-1.5 text-left transition-colors hover:bg-white/10 xl:max-w-56"
        aria-label="Account menu"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00BC7D]/20 text-xs font-semibold text-[#00BC7D]">
          {initials(user)}
        </span>
        <span className="hidden min-w-0 truncate text-sm font-medium text-white sm:inline">
          {name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-48 border border-white/10 bg-[#0F172A] text-zinc-200 shadow-xl"
      >
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="truncate text-xs text-zinc-400">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          className="cursor-pointer focus:bg-white/10 focus:text-white"
          onClick={() => {
            onNavigate?.();
            router.push("/dashboard");
          }}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer focus:bg-white/10 focus:text-white"
          onClick={() => {
            onNavigate?.();
            router.push("/dashboard/profile");
          }}
        >
          <User className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
