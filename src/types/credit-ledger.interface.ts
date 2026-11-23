export type CreditLedgerType =
  | "purchase"
  | "welcome"
  | "unlock"
  | "refund"
  | "adjustment";

export type CreditLedgerReferenceType = "credit_purchase" | "lead_access";

export interface CreditLedgerReference {
  type: CreditLedgerReferenceType;
  id: string;
}

export interface CreditLedger {
  _id: string;
  uid: string;
  type: CreditLedgerType;
  amount: number;
  balanceAfter: number;
  reference?: CreditLedgerReference;
  note?: string;
  createdAt: string;
}

export interface CreditLedgerPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
