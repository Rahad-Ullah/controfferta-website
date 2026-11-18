import { z } from "zod";

export const registerFields = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name."),
    lastName: z.string().trim().min(1, "Enter your last name."),
    company: z.string().trim().min(1, "Enter your company name."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email address.")
      .refine((value) => z.email().safeParse(value).success, "Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    termsAccepted: z.boolean().refine((value) => value, "Accept the Terms of Service and the Privacy Policy."),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword && value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export type RegisterFields = z.infer<typeof registerFields>;

export function registerFieldErrors(error: z.ZodError) {
  const messages = error.flatten().fieldErrors;
  const next: Record<string, string> = {};

  for (const [field, list] of Object.entries(messages)) {
    const message = list?.[0];
    if (message) next[field] = message;
  }

  return next;
}
