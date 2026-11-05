"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerDemoCompany } from "@/lib/demoAuth";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

function RegisterContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Marco",
    lastName: "Ferretti",
    company: "Ferretti Serramenti Srl",
    email: "company@gmail.com",
    phone: "+39 333 123 4567",
    password: "",
    confirmPassword: "",
    termsAccepted: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (formData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+0-9\s-]{8,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (min 8 digits)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the Terms and Privacy Policy to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields properly.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Register demo company
      registerDemoCompany({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      setIsSubmitting(false);
      toast.success("Company registered successfully! Please log in.");
      router.push("/login");
    }, 600);
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-[#ECEFF2] text-slate-900 rounded-3xl p-7 sm:p-9 max-w-lg w-full shadow-2xl border border-slate-300/40">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900">
          Register your company
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                clearError("firstName");
              }}
              placeholder="Marco"
              className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
                errors.firstName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                clearError("lastName");
              }}
              placeholder="Ferretti"
              className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
                errors.lastName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
              clearError("company");
            }}
            placeholder="Ferretti Serramenti Srl"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.company
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.company && (
            <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.company}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              clearError("email");
            }}
            placeholder="company@gmail.com"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.email
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              clearError("phone");
            }}
            placeholder="+39 333 123 4567"
            className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
              errors.phone
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Row 2: Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                clearError("password");
              }}
              placeholder="Minimum 6 characters"
              className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
                errors.password
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                clearError("confirmPassword");
              }}
              placeholder="Minimum 6 characters"
              className={`w-full h-[46px] bg-[#E5E9EC] hover:bg-[#dfe4e8] border rounded-xl px-4 text-xs sm:text-sm text-slate-800 placeholder:text-zinc-400 outline-none transition-colors ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-slate-300/80 focus:border-[#00BC7D] focus:bg-white"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Redesigned Modern Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 text-xs text-zinc-600 cursor-pointer select-none group">
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => {
                  setFormData({ ...formData, termsAccepted: e.target.checked });
                  clearError("termsAccepted");
                }}
                className="sr-only peer"
              />
              <div
                className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                  formData.termsAccepted
                    ? "bg-[#00BC7D] border-[#00BC7D] shadow-sm shadow-[#00BC7D]/30"
                    : errors.termsAccepted
                    ? "bg-[#E5E9EC] border-red-400 group-hover:border-red-500"
                    : "bg-[#E5E9EC] border-slate-300/90 group-hover:border-[#00BC7D]"
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 text-white stroke-[3] transition-transform duration-200 ${
                    formData.termsAccepted ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </div>
            </div>
            <span className="leading-tight">
              I accept the{" "}
              <Link href="/terms" className="text-[#00BC7D] font-medium hover:underline">
                Terms of Service
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" className="text-[#00BC7D] font-medium hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {errors.termsAccepted}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[46px] bg-[#00BC7D] hover:bg-[#00d68f] text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </div>
      </form>

      {/* Footer link: Sign In */}
      <div className="mt-5 text-center text-xs text-zinc-500">
        Already registered?{" "}
        <Link
          href="/login"
          className="text-[#00BC7D] font-bold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-[#00BC7D]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
