"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DEFAULT_COUNTRY_ISO,
  getCountryByIso,
  orderedCountryDialCodes,
  type CountryDialCode,
} from "@/lib/country-dial-codes";
import { cn } from "@/lib/utils";

type CountryDialCodePickerProps = {
  value: string;
  onChange: (iso: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
};

function matchesQuery(country: CountryDialCode, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const dial = country.dialCode.toLowerCase();
  return (
    country.name.toLowerCase().includes(q) ||
    country.iso.toLowerCase().includes(q) ||
    dial.includes(q) ||
    dial.replace("+", "").includes(q.replace("+", ""))
  );
}

export default function CountryDialCodePicker({
  value,
  onChange,
  disabled,
  invalid,
  className,
}: CountryDialCodePickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = getCountryByIso(value) ?? getCountryByIso(DEFAULT_COUNTRY_ISO);

  const filtered = useMemo(
    () => orderedCountryDialCodes.filter((country) => matchesQuery(country, search)),
    [search],
  );

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const id = window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <Popover
      modal={false}
      open={disabled ? false : open}
      onOpenChange={disabled ? undefined : setOpen}
    >
      <PopoverTrigger
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          "inline-flex h-11 w-[5.75rem] shrink-0 cursor-pointer items-center justify-between gap-1 rounded-xl border bg-slate-50 px-2.5 text-sm font-semibold text-slate-800 outline-none transition-colors select-none",
          "disabled:cursor-not-allowed disabled:opacity-60",
          invalid
            ? "border-red-500 focus-visible:border-red-500"
            : "border-slate-200 hover:border-slate-300 focus-visible:border-[#00BC7D]",
          className,
        )}
      >
        <span className="truncate tabular-nums">{selected?.dialCode}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-slate-400 transition-transform",
            open && "rotate-180 text-[#00BC7D]",
          )}
        />
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="w-[min(20rem,calc(100vw-2rem))] gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-800 shadow-xl ring-0"
      >
        <div className="border-b border-slate-100 p-2.5">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="size-3.5 shrink-0 text-slate-400" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <ul className="scrollbar-thin-light max-h-64 overflow-y-auto overscroll-contain p-1.5 pr-1">
          {filtered.map((country) => {
            const isSelected = country.iso === value;
            return (
              <li key={country.iso}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(country.iso);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                    isSelected
                      ? "bg-[#00BC7D]/10 text-[#00BC7D]"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {country.name}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-sm font-semibold tabular-nums",
                      isSelected ? "text-[#00BC7D]" : "text-slate-400",
                    )}
                  >
                    {country.dialCode}
                  </span>
                  {isSelected ? <Check className="size-4 shrink-0 text-[#00BC7D]" /> : null}
                </button>
              </li>
            );
          })}

          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-400">No countries found</li>
          ) : null}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
