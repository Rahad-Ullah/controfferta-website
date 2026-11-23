"use server";

import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type {
  Notification,
  NotificationListResponse,
  NotificationPagination,
  MarkReadResponse,
} from "@/types/notification.interface";

/** Fetch the provider's notification list. Cached on the server. */
export async function getNotifications(): Promise<
  { notifications: Notification[]; pagination: NotificationPagination | null } | null
> {
  try {
    const body = await nextFetch<NotificationListResponse>({
      url: apiKeys.notifications,
      next: { revalidate: 60, tags: [apiKeys.notifications] },
    });
    const notifications = Array.isArray(body.data) ? body.data : [];
    return {
      notifications,
      pagination: body.pagination ?? null,
    };
  } catch {
    return null;
  }
}

/** Mark a single notification as read. */
export async function markNotificationAsRead(
  id: string
): Promise<Notification | null> {
  try {
    const body = await nextFetch<MarkReadResponse>({
      url: `/notifications/read/${id}`,
      method: "PATCH",
    });
    return body.data ?? null;
  } catch {
    return null;
  }
}

/** Mark all notifications as read. */
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    await nextFetch<MarkReadResponse>({
      url: "/notifications/read-all",
      method: "PATCH",
    });
    return true;
  } catch {
    return false;
  }
}