import { z } from "zod";

export const changePasswordFields = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword && value.currentPassword === value.newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "New password must be different from current password",
      });
    }

    if (value.confirmPassword && value.newPassword !== value.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type ChangePasswordFields = z.infer<typeof changePasswordFields>;

const changePasswordKeys = [
  "currentPassword",
  "newPassword",
  "confirmPassword",
] as const satisfies readonly (keyof ChangePasswordFields)[];

export function changePasswordFieldErrors(error: z.ZodError<ChangePasswordFields>) {
  const messages = error.flatten().fieldErrors;
  const next: Partial<Record<keyof ChangePasswordFields, string>> = {};

  for (const field of changePasswordKeys) {
    const message = messages[field]?.[0];
    if (message) next[field] = message;
  }

  return next;
}

export function mapChangePasswordApiError(
  message: string,
): Partial<Record<keyof ChangePasswordFields, string>> | null {
  if (/incorrect|current password/i.test(message)) {
    return { currentPassword: message };
  }
  if (/match/i.test(message)) {
    return { confirmPassword: message };
  }
  if (/different password|same/i.test(message)) {
    return { newPassword: message };
  }
  return null;
}
