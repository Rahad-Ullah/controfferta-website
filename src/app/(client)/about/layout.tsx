import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Controfferta",
  description:
    "Learn how Controfferta helps customers find reliable service professionals and companies grow through qualified project requests.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
