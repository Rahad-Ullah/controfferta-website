"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useUpdateSearchParam } from "@/hooks/use-search-param";

export function BlogSearch({ searchTerm }: { searchTerm: string }) {
  const updateSearchParam = useUpdateSearchParam();
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (value.trim() === searchTerm) return;

    const timeout = window.setTimeout(() => {
      updateSearchParam({ searchTerm: value, limit: "" });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchTerm, updateSearchParam, value]);

  return (
    <form
      className="pt-5 max-w-xl mx-auto"
      onSubmit={(event) => {
        event.preventDefault();
        updateSearchParam({ searchTerm: value, limit: "" });
      }}
    >
      <div className="bg-white rounded-full p-1.5 sm:p-2 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 pl-3.5 flex-1">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search articles, guides, cost estimators..."
            className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-[#00BC7D] hover:bg-[#00d68f] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
