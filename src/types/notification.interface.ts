export type NotificationType = "lead" | "credit" | "system";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
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
  data: Notification[];
  pagination?: NotificationPagination;
}

export interface MarkReadResponse {
  success: boolean;
  message?: string;
  data: Notification;
}