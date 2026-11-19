"use client";

import CountryDialCodePicker from "@/components/shared/country-dial-code-picker";
import { cn } from "@/lib/utils";

type PhoneFieldProps = {
  countryIso: string;
  number: string;
  disabled?: boolean;
  invalid?: boolean;
  onCountryIsoChange: (iso: string) => void;
  onNumberChange: (number: string) => void;
  className?: string;
};

export default function PhoneField({
  countryIso,
  number,
  disabled,
  invalid,
  onCountryIsoChange,
  onNumberChange,
  className,
}: PhoneFieldProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CountryDialCodePicker
        value={countryIso}
        onChange={onCountryIsoChange}
        disabled={disabled}
        invalid={invalid}
      />

      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={number}
        disabled={disabled}
        aria-invalid={invalid}
        onChange={(e) => {
          const next = e.target.value.replace(/[^\d\s().-]/g, "");
          onNumberChange(next);
        }}
        placeholder="333 123 4567"
        className={cn(
          "h-11 min-w-0 flex-1 rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-colors disabled:opacity-60",
          invalid
            ? "border-red-500 focus:border-red-500 focus:bg-white"
            : "border-slate-200 focus:border-[#00BC7D] focus:bg-white",
        )}
      />
    </div>
  );
}
