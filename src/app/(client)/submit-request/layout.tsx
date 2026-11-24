import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Request",
  description:
    "Submit your home-service project for free and receive offers from qualified professionals in your area.",
};

export default function SubmitRequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
