"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUpdateSearchParam } from "@/hooks/use-search-param";

export default function ServiceSearch({ searchTerm }: { searchTerm: string }) {
  const updateSearchParam = useUpdateSearchParam();
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (value.trim() === searchTerm) return;

    const timeout = window.setTimeout(() => {
      updateSearchParam({ searchTerm: value, page: "" });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchTerm, updateSearchParam, value]);

  return (
    <form
      className="pt-4 max-w-md mx-auto"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-zinc-300" />
        <Input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search services..."
          className="h-9 rounded-xl border-white/15 bg-white/10 py-2 pr-4 pl-10 text-xs text-white shadow-none placeholder:text-zinc-400 backdrop-blur-sm focus-visible:border-[#00BC7D] focus-visible:ring-0 sm:text-sm md:text-sm dark:bg-white/10"
        />
      </div>
    </form>
  );
}
