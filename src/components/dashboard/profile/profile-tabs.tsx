"use client";

import { Lock, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "@/components/dashboard/profile/change-password-form";
import ProfileForm from "@/components/dashboard/profile/profile-form";
import { cn } from "@/lib/utils";

const tabTriggerClass = cn(
  "relative h-auto flex-none rounded-none border-0 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-500 shadow-none transition-none",
  "after:hidden! hover:text-slate-700",
  "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:h-0.5 before:bg-transparent before:content-['']",
  "data-active:bg-transparent data-active:text-[#00BC7D] data-active:shadow-none data-active:before:bg-[#00BC7D]",
);

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full gap-6">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-px bg-slate-200"
        />
        <TabsList
          variant="line"
          className="relative z-10 h-auto w-full justify-start gap-0 rounded-none border-0 bg-transparent p-0 group-data-horizontal/tabs:h-auto"
        >
          <TabsTrigger value="profile" className={tabTriggerClass}>
            <User className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className={tabTriggerClass}>
            <Lock className="size-4" />
            Password
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profile" className="mt-0 outline-none">
        <ProfileForm />
      </TabsContent>

      <TabsContent value="password" className="mt-0 outline-none">
        <ChangePasswordForm />
      </TabsContent>
    </Tabs>
  );
}
