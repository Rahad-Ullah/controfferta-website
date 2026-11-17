export type PlatformReviewStatus = "pending" | "published" | "hidden";

export interface PlatformReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface PlatformReview {
  _id: string;
  user: PlatformReviewUser;
  rating: number;
  message: string;
  status: PlatformReviewStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformReviewQuery {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface PlatformReviewPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PlatformReviewList {
  totalReviews: number;
  averageRating: number;
  reviews: PlatformReview[];
}
