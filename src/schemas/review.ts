import { z } from "zod";

export const reviewFields = z
  .object({
    rating: z
      .number("Choose a rating.")
      .int("Choose a whole-number rating.")
      .min(1, "Choose a rating from 1 to 5.")
      .max(5, "Choose a rating from 1 to 5."),
    message: z.string().trim().min(1, "Tell us about your experience."),
  })
  .strict();

export function reviewFieldErrors(error: z.ZodError) {
  const messages = error.flatten().fieldErrors;
  const next: Record<string, string> = {};

  for (const field of Object.keys(reviewFields.shape)) {
    const message = messages[field as keyof typeof messages]?.[0];
    if (message) next[field] = message;
  }

  return next;
}
