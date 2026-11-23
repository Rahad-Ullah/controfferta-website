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

export interface LeadAccessQuery {
  status?: LeadAccessStatus;
  page?: string;
  limit?: string;
  sort?: string;
}

export const LEAD_ACCESS_STATUS_TRANSITIONS: Record<
  LeadAccessStatus,
  LeadAccessStatus[]
> = {
  unlocked: ["contacted"],
  contacted: ["in_progress"],
  in_progress: ["completed"],
  completed: [],
};

export const LEAD_ACCESS_STATUS_LABELS: Record<LeadAccessStatus, string> = {
  unlocked: "Unlocked",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
};
