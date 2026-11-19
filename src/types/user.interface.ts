export type UserRole = "client" | "provider" | "admin" | "super_admin";

export interface UserPhone {
  countryCode?: string;
  number?: string;
}

export interface UserProviderProfile {
  _id?: string;
  businessName?: string;
  businessType?: string;
  bio?: string;
  interestedCategories?: string[];
  creditBalance?: number;
}

export interface CurrentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  image?: string;
  phone?: UserPhone;
  isEmailVerified?: boolean;
  roleRef?: UserProviderProfile | string;
}

export interface CurrentUserResponse {
  success: boolean;
  message?: string;
  data: CurrentUser;
}
