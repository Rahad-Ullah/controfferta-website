import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how to submit a project request, compare offers, and connect with the right service professional through Controfferta.",
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
