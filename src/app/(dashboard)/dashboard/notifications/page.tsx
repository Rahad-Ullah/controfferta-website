"use client";

import React from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiKeys } from "@/lib/api/keys";
import { nextFetch } from "@/lib/api/fetcher";
import type {
  Notification,
  NotificationListResponse,
} from "@/types/notification.interface";

export default function NotificationsPage() {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR<NotificationListResponse>(apiKeys.notifications);

  const notifications: Notification[] = response?.data?.data ?? [];

  const { trigger: markAsRead, isMutating: markingAsRead } = useSWRMutation(
    apiKeys.notifications,
    (_url: string, { arg }: { arg: { id: string } }) =>
      nextFetch<{ data: Notification }>({
        url: `/notifications/read/${arg.id}`,
        method: "PATCH",
      }),
    { revalidate: true },
  );

  const { trigger: markAllAsRead, isMutating: markingAllAsRead } =
    useSWRMutation(
      apiKeys.notifications,
      (_url: string) =>
        nextFetch<{ data: Notification[] }>({
          url: "/notifications/read-all",
          method: "PATCH",
        }),
      { revalidate: true },
    );
  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead(null, { throwOnError: true });
      toast.success("All notifications marked as read");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to mark notifications as read.";
      toast.error(message);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead({ id }, { throwOnError: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to mark notification as read.";
      toast.error(message);
    }
  };

  const getCardStyle = (item: Notification, idx: number) => {
    if (!item.isRead) {
      if (idx === 0) {
        return "bg-[#E0F5EC]/70 border border-[#00BC7D]/40";
      }
      if (idx === 1) {
        return "bg-[#E5EEF8]/70 border border-blue-200/80";
      }
      return "bg-[#E0F5EC]/70 border border-[#00BC7D]/40";
    }
    return "bg-white border border-slate-200/80";
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Notifications
          </h1>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-full bg-[#00BC7D] px-3 py-1.5 text-xs font-semibold text-white shadow-md opacity-60 cursor-not-allowed"
          >
            <Bell className="w-3 h-3" />
            Mark all as read
          </button>
        </div>
        <div className="space-y-3.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-5 sm:p-6 shadow-xs bg-[#F1F5F9] border border-slate-200/80 animate-pulse"
            >
              <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-full bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Notifications
          </h1>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-xs sm:text-sm font-semibold text-[#00BC7D] hover:underline transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
        <div className="rounded-2xl p-6 bg-red-50 border border-red-100 text-xs text-red-700">
          Failed to load notifications. Please try again.
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Notifications
          </h1>
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={markingAllAsRead}
            className={`inline-flex items-center gap-2 rounded-full bg-[#00BC7D] px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#00d68f] hover:shadow-lg active:scale-95 ${
              markingAllAsRead
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <Bell
              className={`w-3 h-3 ${markingAllAsRead ? "animate-spin" : ""}`}
            />
            Mark all as read
          </button>
        </div>
        <div className="rounded-2xl p-10 text-center border border-slate-200/80 bg-white">
          <p className="text-xs sm:text-sm text-slate-500">
            No notifications yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Notifications
        </h1>
        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={markingAllAsRead}
          className={`inline-flex items-center gap-2 rounded-full bg-[#00BC7D] px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#00d68f] hover:shadow-lg active:scale-95 ${
            markingAllAsRead
              ? "opacity-70 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <Bell
            className={`w-3 h-3 ${markingAllAsRead ? "animate-spin" : ""}`}
          />
          {markingAllAsRead ? "Marking…" : "Mark all as read"}
        </button>
      </div>

      <div className="space-y-3.5">
        {notifications.map((item, idx) => (
          <div
            key={item._id}
            onClick={() => !item.isRead && handleMarkRead(item._id)}
            className={`rounded-2xl p-5 sm:p-6 shadow-xs relative transition-all cursor-pointer hover:shadow-sm ${getCardStyle(
              item,
              idx,
            )}`}
          >
            {!item.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#00BC7D] absolute top-6 right-6" />
            )}
            <div className="pr-8">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {item.message}
              </p>
              <p className="text-xs text-slate-400 mt-2.5">
                {item.timeAgo ?? new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
