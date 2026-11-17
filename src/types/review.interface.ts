export type ReviewStatus = "pending" | "published" | "hidden";

export interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Review {
  _id: string;
  user: ReviewUser;
  rating: number;
  message: string;
  status: ReviewStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewCreate {
  rating: number;
  message: string;
}

export interface ReviewStatusUpdate {
  status: ReviewStatus;
}

export interface ReviewQuery {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface ReviewAdminQuery extends ReviewQuery {
  status?: ReviewStatus;
}

export interface ReviewPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
