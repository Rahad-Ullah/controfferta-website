import { z } from "zod";

export const contactFields = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name."),
    lastName: z.string().trim().min(1, "Enter your last name."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email address.")
      .refine((value) => z.email().safeParse(value).success, "Enter a valid email address."),
    subject: z.string().trim().min(1, "Enter a subject."),
    message: z.string().trim().min(1, "Tell us how we can help."),
  })
  .strict();

export function contactFieldErrors(error: z.ZodError) {
  const messages = error.flatten().fieldErrors;
  const next: Record<string, string> = {};

  for (const field of Object.keys(contactFields.shape)) {
    const message = messages[field as keyof typeof messages]?.[0];
    if (message) next[field] = message;
  }

  return next;
}
