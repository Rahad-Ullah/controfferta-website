import type { CreditPackage } from "@/types/credit-package.interface";

export type CreditPaymentStatus = "unpaid" | "paid" | "refunded";

export interface CreditPurchaseTransaction {
  _id: string;
  uid?: string;
  amount?: number;
  currency?: string;
  status?: string;
  isPaid?: boolean;
  gatewayFee?: number;
  gatewayReferenceId?: string;
  paymentMethod?: string;
}

export interface CreditPurchase {
  _id: string;
  uid?: string;
  provider: string;
  package: CreditPackage | string;
  creditsAmount: number;
  pricing?: {
    subtotal: number;
    discount: number;
    total: number;
    currency: string;
  };
  paymentStatus: CreditPaymentStatus;
  transaction?: CreditPurchaseTransaction | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreditPurchasePagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
