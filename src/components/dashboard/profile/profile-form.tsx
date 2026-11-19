"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { UserProviderProfile } from "@/types/user.interface";

const availableCategories = [
  "Windows & Doors",
  "Construction",
  "Renovation",
  "Air Conditioning",
  "Moving",
  "Solar Panels",
];

function formatPhone(userPhone?: { countryCode?: string; number?: string }) {
  if (!userPhone) return "";
  const code = userPhone.countryCode?.trim() ?? "";
  const number = userPhone.number?.trim() ?? "";
  return [code, number].filter(Boolean).join(" ");
}

export default function ProfileForm() {
  const { user, isLoading } = useCurrentUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (!user) return;
    const provider =
      user.roleRef && typeof user.roleRef !== "string"
        ? (user.roleRef as UserProviderProfile)
        : null;

    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setCompany(provider?.businessName ?? "");
    setEmail(user.email ?? "");
    setPhone(formatPhone(user.phone));
  }, [user]);

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.firstName = "First name is required";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required";
    if (!company.trim()) nextErrors.company = "Company name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!emailRegex.test(email.trim())) nextErrors.email = "Please enter a valid email address";

    if (!phone.trim()) nextErrors.phone = "Phone number is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setErrors({});
    toast.info("Placeholder. Profile changes are not saved.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7"
    >
      <p className="text-sm text-slate-500">
        Your personal and company details shown on Controfferta.
      </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              disabled={isLoading}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearError("firstName");
              }}
              className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-colors disabled:opacity-60 ${
                errors.firstName
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.firstName ? (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              disabled={isLoading}
              onChange={(e) => {
                setLastName(e.target.value);
                clearError("lastName");
              }}
              className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-colors disabled:opacity-60 ${
                errors.lastName
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.lastName ? (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={company}
            disabled={isLoading}
            onChange={(e) => {
              setCompany(e.target.value);
              clearError("company");
            }}
            className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-colors disabled:opacity-60 ${
              errors.company
                ? "border-red-500 focus:border-red-500 focus:bg-white"
                : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.company ? <p className="mt-1 text-xs text-red-500">{errors.company}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-600 outline-none"
            />
            <p className="mt-1 text-xs text-slate-400">Email cannot be changed here.</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              disabled={isLoading}
              onChange={(e) => {
                setPhone(e.target.value);
                clearError("phone");
              }}
              className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-colors disabled:opacity-60 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone}</p> : null}
          </div>
        </div>

        <div>
          <label className="mb-2.5 block text-xs font-semibold text-slate-700">
            Categories of interest
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {availableCategories.map((cat) => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors select-none hover:bg-slate-100"
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded border transition-colors ${
                      isChecked
                        ? "border-[#00BC7D] bg-[#00BC7D] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked ? <Check className="size-3 stroke-[3]" /> : null}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

      <div className="border-t border-slate-100 pt-4">
        <button
          type="submit"
          className="h-11 cursor-pointer rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#00d68f]"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}
