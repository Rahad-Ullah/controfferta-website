"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import PasswordField from "@/components/shared/password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import { clearCurrentUser } from "@/hooks/use-current-user";
import {
  changePasswordFieldErrors,
  changePasswordFields,
  mapChangePasswordApiError,
  type ChangePasswordFields,
} from "@/schemas/change-password";

const emptyForm: ChangePasswordFields = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

async function signOutAfterPasswordChange() {
  // Prefer logout-all: change-password already revoked Redis sessions, so
  // /auth/logout throws "Session not found" and never reaches clearAuthCookies.
  try {
    await nextFetch({ url: "/auth/logout-all", method: "POST", payload: {} });
  } catch {
    // Cookies may still clear on a successful Set-Cookie; ignore API errors.
  }

  await clearCurrentUser();
}

export default function ChangePasswordForm() {
  const router = useRouter();
  const [form, setForm] = useState<ChangePasswordFields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ChangePasswordFields, string>>>({});

  const { trigger, isMutating } = useSWRMutation(
    "change-password",
    (_key: string, { arg }: { arg: ChangePasswordFields }) =>
      nextFetch<{ message?: string }>({
        url: "/auth/change-password",
        method: "POST",
        payload: arg,
      }),
  );

  const updateField = (field: keyof ChangePasswordFields, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = changePasswordFields.safeParse(form);
    if (!result.success) {
      setErrors(changePasswordFieldErrors(result.error));
      return;
    }

    setErrors({});

    try {
      const response = await trigger(result.data, { throwOnError: true });
      setForm(emptyForm);
      await signOutAfterPasswordChange();
      toast.success(response?.message || "Password updated. Please sign in again.");
      router.replace("/login");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Could not update password. Please try again.";
      const fieldErrors = mapChangePasswordApiError(message);
      if (fieldErrors) {
        setErrors(fieldErrors);
        return;
      }
      toast.error(message);
    }
  };

  return (
    <Card className="max-w-xl gap-0 rounded-2xl border border-slate-200/80 bg-white py-0 shadow-xs ring-0">
      <form onSubmit={handleSubmit} noValidate>
        <CardHeader className="space-y-4 px-6 pt-6 sm:px-7 sm:pt-7">
          <CardDescription className="text-sm text-slate-500">
            Change the password you use to sign in. This does not update your profile details.
          </CardDescription>

          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <p className="text-xs leading-relaxed text-slate-500">
              Use a strong password with at least 8 characters. For security, you will be signed out
              and need to sign in again with your new password.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pt-5 sm:px-7">
          <PasswordField
            label="Current Password"
            value={form.currentPassword}
            error={errors.currentPassword}
            disabled={isMutating}
            autoComplete="current-password"
            onChange={(value) => updateField("currentPassword", value)}
          />

          <PasswordField
            label="New Password"
            value={form.newPassword}
            error={errors.newPassword}
            disabled={isMutating}
            autoComplete="new-password"
            onChange={(value) => updateField("newPassword", value)}
          />

          <PasswordField
            label="Confirm New Password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            disabled={isMutating}
            autoComplete="new-password"
            onChange={(value) => updateField("confirmPassword", value)}
          />
        </CardContent>

        <CardFooter className="border-slate-100 bg-transparent px-6 py-4 sm:px-7">
          <Button
            type="submit"
            disabled={isMutating}
            className="h-11 cursor-pointer rounded-full bg-slate-900 px-8 text-sm font-bold text-white hover:bg-slate-800"
          >
            {isMutating ? (
              <>
                <Loader2 className="animate-spin" />
                Updating…
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
