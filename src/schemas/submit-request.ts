import { z } from "zod";

function parseBudget(value: string) {
  const normalized = value.replace(/[€\s]/g, "").replace(/,/g, "");
  if (!/^\d+(\.\d+)?$/.test(normalized)) return Number.NaN;
  return Number(normalized);
}

export const requestFields = z.object({
  category: z.string().trim().min(1, "Choose a service category."),
  serviceName: z.string().trim().min(1, "Tell us what service you need."),
  timeline: z.string().trim().min(1, "Choose when you need the service."),
  location: z.string().trim().min(1, "Tell us where the service is needed."),
  budgetMin: z.string().trim().min(1, "Enter a minimum budget."),
  budgetMax: z.string().trim().min(1, "Enter a maximum budget."),
  fullName: z.string().trim().min(1, "Enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .refine((value) => z.email().safeParse(value).success, "Enter a valid email address."),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .refine((value) => value.replace(/\D/g, "").length >= 6, "Enter a phone number we can reach you on."),
  agreedToTerms: z.boolean().refine((value) => value, "Please agree to the terms to continue."),
}).superRefine((value, ctx) => {
  if (!value.budgetMin.trim() || !value.budgetMax.trim()) return;

  const min = parseBudget(value.budgetMin);
  const max = parseBudget(value.budgetMax);

  if (Number.isNaN(min)) {
    ctx.addIssue({
      code: "custom",
      path: ["budgetMin"],
      message: "Use a number, like 5,000.",
      input: value.budgetMin,
    });
  }

  if (Number.isNaN(max)) {
    ctx.addIssue({
      code: "custom",
      path: ["budgetMax"],
      message: "Use a number, like 10,000.",
      input: value.budgetMax,
    });
  }

  if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
    ctx.addIssue({
      code: "custom",
      path: ["budgetMax"],
      message: "Maximum budget should be at least the minimum.",
      input: value.budgetMax,
    });
  }
});

export const stepFields = {
  1: ["category", "serviceName"],
  2: ["timeline", "location", "budgetMin", "budgetMax"],
  3: ["fullName", "email", "phoneNumber", "agreedToTerms"],
} as const;

export function fieldErrors(error: z.ZodError, fields: readonly string[]) {
  const messages = error.flatten().fieldErrors;
  const next: Record<string, string> = {};

  for (const field of fields) {
    const message = messages[field as keyof typeof messages]?.[0];
    if (message) next[field] = message;
  }

  return next;
}
