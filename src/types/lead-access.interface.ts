import type { Lead } from "@/types/lead.interface";

export type LeadAccessStatus = "unlocked" | "contacted" | "in_progress" | "completed";

export interface LeadAccess {
  _id: string;
  lead: Lead | string;
  provider: string;
  creditCost: number;
  status: LeadAccessStatus;
  unlockedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadAccessPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
