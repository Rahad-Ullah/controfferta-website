export type LeadStatus = "pending" | "accepted" | "rejected" | "closed";

export interface LeadCategory {
  _id: string;
  name: string;
  creditCost: number;
  iconUrl?: string;
}

export interface LeadLocation {
  type: "Point";
  coordinates: [number, number];
}

export interface LeadBudgetRange {
  minimum: number;
  maximum: number;
}

export interface LeadClient {
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  address: string;
}

export interface Lead {
  _id: string;
  uid: string;
  category: LeadCategory;
  title: string;
  description: string;
  address: string;
  location: LeadLocation;
  budgetRange: LeadBudgetRange;
  timeline: string;
  client?: LeadClient;
  status: LeadStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeadCreate {
  category: string;
  title: string;
  description: string;
  address: string;
  budgetRange: LeadBudgetRange;
  timeline: string;
  client: LeadClient;
}

export interface LeadQuery {
  searchTerm?: string;
  category?: string;
  status?: LeadStatus;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface LeadPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
