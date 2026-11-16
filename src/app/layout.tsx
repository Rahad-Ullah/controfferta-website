import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SwrDefaults } from "@/components/swr-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://controfferta.it"),
  title: {
    default: "Controfferta | Find the right professional for your project",
    template: "%s | Controfferta",
  },
  description:
    "Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.",
  openGraph: {
    type: "website",
    url: "https://controfferta.it",
    siteName: "Controfferta",
    title: "Controfferta | Find the right professional for your project",
    description:
      "Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${inter.variable}`}
    >
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary`}>
        <SwrDefaults>{children}</SwrDefaults>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
