import type { LeadBudgetRange, LeadClient } from "@/types/lead.interface";

export function formatLeadBudget(range?: LeadBudgetRange | null) {
  if (!range) return "—";
  const min = Number.isFinite(range.minimum) ? range.minimum : null;
  const max = Number.isFinite(range.maximum) ? range.maximum : null;
  if (min !== null && max !== null) {
    return `€ ${min.toLocaleString("it-IT")}–${max.toLocaleString("it-IT")}`;
  }
  if (min !== null) return `From € ${min.toLocaleString("it-IT")}`;
  if (max !== null) return `Up to € ${max.toLocaleString("it-IT")}`;
  return "—";
}

export function formatLeadDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatLeadPhone(phone?: LeadClient["phone"] | null) {
  if (!phone?.number) return "—";
  const code = phone.countryCode?.trim() ?? "";
  return [code, phone.number.trim()].filter(Boolean).join(" ");
}
