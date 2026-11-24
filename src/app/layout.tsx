import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  keywords: [
    "home services",
    "service professionals",
    "project quotes",
    "home improvement",
    "Controfferta",
  ],
  authors: [{ name: "Controfferta" }],
  creator: "Controfferta",
  publisher: "Controfferta",
  openGraph: {
    type: "website",
    siteName: "Controfferta",
    title: "Controfferta | Find the right professional for your project",
    description:
      "Tell us what you need and connect with qualified service providers in your area. Fast, free and easy.",
    locale: "en_US",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 800,
        alt: "Professionals working on customer projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Controfferta | Find the right professional for your project",
    description:
      "Tell us what you need and connect with qualified service providers in your area.",
    images: ["/logo/logo.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://controfferta.it/#organization",
      name: "Controfferta",
      url: "https://controfferta.it",
      logo: "https://controfferta.it/logo/logo.png",
      description:
        "A marketplace connecting customers with qualified service professionals.",
    },
    {
      "@type": "WebSite",
      "@id": "https://controfferta.it/#website",
      url: "https://controfferta.it",
      name: "Controfferta",
      publisher: { "@id": "https://controfferta.it/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://controfferta.it/services?searchTerm={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
      <body
        className={`${inter.className} min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SwrDefaults>{children}</SwrDefaults>
        <Toaster richColors position="top-center" />
        <SpeedInsights />
      </body>
    </html>
  );
}
