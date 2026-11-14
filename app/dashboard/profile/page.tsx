"use client";

import React, { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Marco");
  const [lastName, setLastName] = useState("Ferretti");
  const [company, setCompany] = useState("Ferretti Serramenti Srl");
  const [email, setEmail] = useState("marco@ferretti.it");
  const [phone, setPhone] = useState("+39 333 123 4567");

  // Profile Form Errors
  const [profileErrors, setProfileErrors] = useState<{
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
  }>({});

  // Categories of interest
  const availableCategories = [
    "Windows & Doors",
    "Construction",
    "Renovation",
    "Air Conditioning",
    "Moving",
    "Solar Panels",
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Windows & Doors",
    "Construction",
  ]);

  // Security passwords
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Security Form Errors
  const [securityErrors, setSecurityErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Profile Save Handler with Validation
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: {
      firstName?: string;
      lastName?: string;
      company?: string;
      email?: string;
      phone?: string;
    } = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!company.trim()) {
      errors.company = "Company name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setProfileErrors({});
    toast.info("Placeholder. Profile changes are not saved.");
  };

  // Security / Password Update Handler with Validation
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: {
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setSecurityErrors(errors);
      return;
    }

    setSecurityErrors({});
    setNewPassword("");
    setConfirmPassword("");
    toast.info("Placeholder. Password changes are not saved.");
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-150">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Profile & Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* ========================================================================= */}
        {/* LEFT CARD: PERSONAL & COMPANY INFORMATION                                 */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleSaveProfile}
          noValidate
          className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4"
        >
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (profileErrors.firstName) {
                    setProfileErrors((prev) => ({ ...prev, firstName: undefined }));
                  }
                }}
                className={`w-full h-11 bg-slate-50 border rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${profileErrors.firstName
                    ? "border-red-500 focus:border-red-500 focus:bg-white"
                    : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                  }`}
              />
              {profileErrors.firstName && (
                <p className="text-xs text-red-500 mt-1">{profileErrors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (profileErrors.lastName) {
                    setProfileErrors((prev) => ({ ...prev, lastName: undefined }));
                  }
                }}
                className={`w-full h-11 bg-slate-50 border rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${profileErrors.lastName
                    ? "border-red-500 focus:border-red-500 focus:bg-white"
                    : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                  }`}
              />
              {profileErrors.lastName && (
                <p className="text-xs text-red-500 mt-1">{profileErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (profileErrors.company) {
                  setProfileErrors((prev) => ({ ...prev, company: undefined }));
                }
              }}
              className={`w-full h-11 bg-slate-50 border rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${profileErrors.company
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                }`}
            />
            {profileErrors.company && (
              <p className="text-xs text-red-500 mt-1">{profileErrors.company}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (profileErrors.email) {
                  setProfileErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              className={`w-full h-11 bg-slate-50 border rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${profileErrors.email
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                }`}
            />
            {profileErrors.email && (
              <p className="text-xs text-red-500 mt-1">{profileErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (profileErrors.phone) {
                  setProfileErrors((prev) => ({ ...prev, phone: undefined }));
                }
              }}
              className={`w-full h-11 bg-slate-50 border rounded-xl px-4 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${profileErrors.phone
                  ? "border-red-500 focus:border-red-500 focus:bg-white"
                  : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                }`}
            />
            {profileErrors.phone && (
              <p className="text-xs text-red-500 mt-1">{profileErrors.phone}</p>
            )}
          </div>

          {/* Categories of interest */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2.5">
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
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer select-none"
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${isChecked
                          ? "bg-[#00BC7D] border-[#00BC7D] text-white"
                          : "bg-white border-slate-300"
                        }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Section Dedicated Save Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* ========================================================================= */}
        {/* RIGHT CARD: SECURITY / PASSWORD UPDATE                                   */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleUpdatePassword}
          noValidate
          className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4"
        >
          <h2 className="text-base font-bold text-slate-900">Security</h2>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (securityErrors.newPassword) {
                    setSecurityErrors((prev) => ({ ...prev, newPassword: undefined }));
                  }
                }}
                placeholder="••••••••"
                className={`w-full h-11 bg-slate-50 border rounded-xl pl-4 pr-11 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${securityErrors.newPassword
                    ? "border-red-500 focus:border-red-500 focus:bg-white"
                    : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                tabIndex={-1}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {securityErrors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{securityErrors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (securityErrors.confirmPassword) {
                    setSecurityErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                placeholder="••••••••"
                className={`w-full h-11 bg-slate-50 border rounded-xl pl-4 pr-11 text-xs sm:text-sm text-slate-800 outline-none transition-colors ${securityErrors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:bg-white"
                    : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {securityErrors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{securityErrors.confirmPassword}</p>
            )}
          </div>

          {/* Right Section Dedicated Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#00BC7D] hover:bg-[#00d68f] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
