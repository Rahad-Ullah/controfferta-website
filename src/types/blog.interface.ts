export type BlogStatus = "pending" | "published" | "hidden";

export interface BlogCategory {
  _id: string;
  name: string;
  iconUrl: string;
}

export interface BlogAuthor {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Blog {
  _id: string;
  category: BlogCategory;
  title: string;
  description: string;
  bodyContent: string;
  imageUrl: string;
  author: BlogAuthor;
  status: BlogStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCreate {
  category: string;
  title: string;
  description: string;
  bodyContent: string;
  imageUrl?: string;
}

export interface BlogUpdate {
  category?: string;
  title?: string;
  description?: string;
  bodyContent?: string;
  imageUrl?: string;
}

export interface BlogStatusUpdate {
  status: BlogStatus;
}

export interface BlogQuery {
  searchTerm?: string;
  category?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface BlogAdminQuery extends BlogQuery {
  status?: BlogStatus;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
