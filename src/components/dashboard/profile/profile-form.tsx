"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { useCurrentUser } from "@/hooks/use-current-user";
import PhoneField from "@/components/shared/phone-field";
import { DEFAULT_COUNTRY_ISO, getCountryByIso } from "@/lib/country-dial-codes";
import type { Category, CategoryPagination } from "@/types/category.interface";
import type {
  CurrentUserResponse,
  UserPhone,
  UserProviderProfile,
} from "@/types/user.interface";

type ProfileUpdatePayload = {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: UserPhone;
  interestedCategories: string[];
};

const PHONE_MIN_DIGITS = 6;
const PHONE_MAX_DIGITS = 11;

function phoneNumberDigits(number: string) {
  return number.replace(/\D/g, "");
}

function validatePhoneNumber(number: string): string | undefined {
  const national = number.trim();
  if (!national) return "Phone number is required";
  if (!/^[\d\s().-]+$/.test(national)) return "Use digits only for the phone number";

  const length = phoneNumberDigits(national).length;
  if (length < PHONE_MIN_DIGITS || length > PHONE_MAX_DIGITS) {
    return `Enter ${PHONE_MIN_DIGITS} to ${PHONE_MAX_DIGITS} digits`;
  }
  return undefined;
}

function categoryIdsFromProvider(provider: UserProviderProfile | null): string[] {
  const raw = provider?.interestedCategories;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "_id" in item) {
        return String((item as { _id: string })._id);
      }
      return "";
    })
    .filter(Boolean);
}

export default function ProfileForm() {
  const { user, isLoading, refresh } = useCurrentUser();
  const { data: categoryList, isLoading: categoriesLoading } = useSWR<{
    data?: Category[];
    pagination?: CategoryPagination;
  }>(`${apiKeys.categories}?limit=50`);
  const categories = Array.isArray(categoryList?.data) ? categoryList.data : [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
  }>({});

  const { trigger, isMutating } = useSWRMutation(
    apiKeys.me,
    (url: string, { arg }: { arg: ProfileUpdatePayload }) =>
      nextFetch<CurrentUserResponse>({ url, method: "PATCH", payload: arg }),
    { revalidate: true },
  );

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
    // Controfferta phone country always defaults to Italy (+39).
    setCountryIso(DEFAULT_COUNTRY_ISO);
    setPhoneNumber(user.phone?.number?.trim() ?? "");
    setSelectedCategories(categoryIdsFromProvider(provider));
  }, [user]);

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.firstName = "First name is required";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required";
    if (!company.trim()) nextErrors.company = "Company name is required";

    const country = getCountryByIso(countryIso);
    if (!country) nextErrors.phone = "Choose a country code";
    else {
      const phoneError = validatePhoneNumber(phoneNumber);
      if (phoneError) nextErrors.phone = phoneError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setErrors({});

    const dialCode = getCountryByIso(countryIso)!.dialCode;
    const payload: ProfileUpdatePayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      businessName: company.trim(),
      phone: {
        countryCode: dialCode,
        number: phoneNumberDigits(phoneNumber),
      },
      interestedCategories: selectedCategories,
    };

    try {
      const response = await trigger(payload, { throwOnError: true });
      await refresh();
      toast.success(response?.message || "Profile updated successfully.");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Could not update profile. Please try again.";
      toast.error(message);
    }
  };

  const busy = isLoading || isMutating;

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
            disabled={busy}
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
            disabled={busy}
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
          disabled={busy}
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
          <PhoneField
            countryIso={countryIso}
            number={phoneNumber}
            disabled={busy}
            invalid={Boolean(errors.phone)}
            onCountryIsoChange={(iso) => {
              setCountryIso(iso);
              clearError("phone");
            }}
            onNumberChange={(value) => {
              setPhoneNumber(value);
              clearError("phone");
            }}
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          ) : (
            <p className="mt-1 text-xs text-slate-400">
              {PHONE_MIN_DIGITS}–{PHONE_MAX_DIGITS} digits, without the country code
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2.5 block text-xs font-semibold text-slate-700">
          Categories of interest
        </label>
        {categoriesLoading ? (
          <p className="text-xs text-slate-400">Loading categories…</p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-slate-400">No categories available.</p>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat._id);
              return (
                <button
                  key={cat._id}
                  type="button"
                  disabled={busy}
                  onClick={() => toggleCategory(cat._id)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors select-none hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00BC7D] px-8 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#00d68f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isMutating ? <Loader2 className="size-4 animate-spin" /> : null}
          {isMutating ? "Saving…" : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
