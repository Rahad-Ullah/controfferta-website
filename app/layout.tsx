import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Cloud Salon | Find & Book Top Beauty Professionals & Salons",
  description: "Discover trusted beauty professionals and salons, and book your next appointment with confidence.",
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
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
