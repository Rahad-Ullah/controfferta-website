"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  id?: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function PasswordField({
  id,
  label,
  value,
  error,
  disabled,
  required = true,
  autoComplete = "current-password",
  placeholder = "••••••••",
  onChange,
  className,
}: PasswordFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      <Label htmlFor={fieldId} className="mb-1.5 text-xs font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          type={visible ? "text" : "password"}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-11 rounded-xl border bg-slate-50 pr-11 pl-4 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-0",
            error
              ? "border-red-500 focus-visible:border-red-500"
              : "border-slate-200 focus-visible:border-[#00BC7D]",
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:bg-transparent hover:text-slate-600"
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
