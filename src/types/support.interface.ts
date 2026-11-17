export type SupportStatus = "open" | "in_progress" | "resolved" | "closed";

export type SupportPriority = "low" | "medium" | "high";

export interface Support {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: SupportStatus;
  priority: SupportPriority;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportCreate {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface SupportQuery {
  searchTerm?: string;
  status?: SupportStatus;
  priority?: SupportPriority;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface SupportPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
