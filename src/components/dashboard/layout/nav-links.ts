import {
  LayoutDashboard,
  Search,
  Unlock,
  Clock,
  ShoppingBag,
  Bell,
  User,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  match?: "exact";
};

export const dashboardNavLinks: DashboardNavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, match: "exact" },
  { label: "Leads", href: "/dashboard/leads", icon: Search, badge: "12" },
  { label: "Unlocked Leads", href: "/dashboard/unlock-lead", icon: Unlock },
  { label: "Credits", href: "/dashboard/credits", icon: Clock, match: "exact" },
  { label: "Buy Credits", href: "/dashboard/buy-credits", icon: ShoppingBag },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: "3" },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function isDashboardNavActive(pathname: string, href: string, match?: "exact") {
  if (match === "exact" || href === "/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

export function dashboardPageTitle(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.includes("unlock-lead")) return "Unlocked Leads";
  if (pathname.startsWith("/dashboard/leads")) return "Leads";
  if (pathname.includes("buy-credits")) return "Buy Credits";
  if (pathname.includes("credits")) return "Credits";
  if (pathname.includes("notifications")) return "Notifications";
  if (pathname.includes("profile")) return "Profile";
  return "Dashboard";
}
