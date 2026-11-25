export type NotificationType =
  | "account_updated"
  | "coupon_created"
  | "policy_updated"
  | "refund_failed"
  | "new_matching_lead"
  | "lead_status_changed"
  | "credit_purchase_success"
  | "credit_purchase_failed"
  | "credit_refunded"
  | "low_credit_balance";

export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  receiver: string;
  referenceId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  timeAgo?: string;
}

export interface NotificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface NotificationListResponse {
  success: boolean;
  message?: string;
  data: {
    data: Notification[];
    unreadCount: number;
  };
  pagination?: NotificationPagination;
}

export interface MarkReadResponse {
  success: boolean;
  message?: string;
  data: Notification;
}
