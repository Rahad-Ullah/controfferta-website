import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/forgot-password",
        "/reset-password",
        "/verify-otp",
        "/password-changed",
        "/onboarding",
        "/payment/",
      ],
    },
    sitemap: "https://controfferta.it/sitemap.xml",
    host: "https://controfferta.it",
  };
}
