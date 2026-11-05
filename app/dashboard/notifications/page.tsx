"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DemoNotification,
  getDemoNotifications,
} from "@/lib/demoAuth";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);

  useEffect(() => {
    setNotifications(getDemoNotifications());
  }, []);

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    try {
      localStorage.setItem("demo_company_notifs", JSON.stringify(updated));
    } catch {
      // ignore
    }
    toast.success("All notifications marked as read.");
    window.dispatchEvent(new Event("notifications_updated"));
  };

  const getCardStyle = (notif: DemoNotification, idx: number) => {
    // If not read:
    if (!notif.read) {
      if (idx === 0) {
        // First card: mint-green background with soft green border
        return "bg-[#E0F5EC]/70 border border-[#00BC7D]/40";
      }
      if (idx === 1) {
        // Second card: soft blue-slate background with blue border
        return "bg-[#E5EEF8]/70 border border-blue-200/80";
      }
      return "bg-[#E0F5EC]/70 border border-[#00BC7D]/40";
    }

    // If read: clean white card
    return "bg-white border border-slate-200/80";
  };

  return (
    <div className="space-y-5">
      {/* Header Row (Image 1) */}
      <div className="flex items-center justify-between pb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Notifications
        </h1>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="text-xs sm:text-sm font-semibold text-[#00BC7D] hover:underline transition-colors cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List (Image 1) */}
      <div className="space-y-3.5">
        {notifications.map((notif, idx) => (
          <div
            key={notif.id}
            className={`rounded-2xl p-5 sm:p-6 shadow-xs relative transition-all ${getCardStyle(
              notif,
              idx
            )}`}
          >
            {/* Unread Green Indicator Dot */}
            {!notif.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#00BC7D] absolute top-6 right-6" />
            )}

            <div className="pr-8">
              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {notif.title}
              </h3>

              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {notif.message}
              </p>

              {/* Timestamp */}
              <p className="text-xs text-slate-400 mt-2.5">
                {notif.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
