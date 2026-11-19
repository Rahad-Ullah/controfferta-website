"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";

type PasswordErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

function PasswordField({
  label,
  value,
  error,
  show,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
          className={`h-11 w-full rounded-xl border bg-slate-50 pr-11 pl-4 text-sm text-slate-800 outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-500 focus:bg-white"
              : "border-slate-200 focus:border-[#00BC7D] focus:bg-white"
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<PasswordErrors>({});

  const clearError = (field: keyof PasswordErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: PasswordErrors = {};
    if (!currentPassword) nextErrors.currentPassword = "Current password is required";

    if (!newPassword) nextErrors.newPassword = "New password is required";
    else if (newPassword.length < 8) nextErrors.newPassword = "Password must be at least 8 characters";

    if (!confirmPassword) nextErrors.confirmPassword = "Confirm password is required";
    else if (newPassword !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.info("Placeholder. Password changes are not saved.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7"
    >
      <p className="text-sm text-slate-500">
        Change the password you use to sign in. This does not update your profile details.
      </p>

      <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <Lock className="mt-0.5 size-4 shrink-0 text-slate-400" />
        <p className="text-xs leading-relaxed text-slate-500">
          Use at least 8 characters. After changing your password you will stay signed in on this
          device.
        </p>
      </div>

        <PasswordField
          label="Current Password"
          value={currentPassword}
          error={errors.currentPassword}
          show={showCurrent}
          onToggle={() => setShowCurrent((v) => !v)}
          onChange={(value) => {
            setCurrentPassword(value);
            clearError("currentPassword");
          }}
        />

        <PasswordField
          label="New Password"
          value={newPassword}
          error={errors.newPassword}
          show={showNew}
          onToggle={() => setShowNew((v) => !v)}
          onChange={(value) => {
            setNewPassword(value);
            clearError("newPassword");
          }}
        />

        <PasswordField
          label="Confirm New Password"
          value={confirmPassword}
          error={errors.confirmPassword}
          show={showConfirm}
          onToggle={() => setShowConfirm((v) => !v)}
          onChange={(value) => {
            setConfirmPassword(value);
            clearError("confirmPassword");
          }}
        />

      <div className="border-t border-slate-100 pt-4">
        <button
          type="submit"
          className="h-11 cursor-pointer rounded-full bg-slate-900 px-8 text-sm font-bold text-white transition-colors hover:bg-slate-800"
        >
          Update Password
        </button>
      </div>
    </form>
  );
}
