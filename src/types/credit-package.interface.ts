export type CreditPackageTag = "popular" | "recommended";
export type CreditPackageStatus = "active" | "inactive";

export interface CreditPackage {
  _id: string;
  name: string;
  description: string;
  creditsAmount: number;
  price: number;
  tag?: CreditPackageTag;
  stripeProductId?: string;
  stripePriceId?: string;
  status: CreditPackageStatus;
  purchaseCount?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreditPackagePagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CreditPurchaseCheckout {
  purchase?: { _id: string };
  transaction?: { _id: string; uid?: string };
  checkoutUrl: string;
}
