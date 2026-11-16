"use client";

import { SWRConfig } from "swr";
import { swrFetcher } from "@/lib/api/fetcher";

export function SwrDefaults({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: true,
        dedupingInterval: 5000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
