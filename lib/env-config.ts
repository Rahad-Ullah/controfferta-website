"use server";

export const envConfig = async () => {
  return {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_GOOGLE_PUBLIC_MAPS_API_KEY ||
      "",
  };
};
