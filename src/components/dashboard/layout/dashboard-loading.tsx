import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div
      className="space-y-6 animate-in fade-in duration-200"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="space-y-2">
        <Skeleton className="h-9 w-72 rounded-lg bg-slate-200" />
        <Skeleton className="h-4 w-56 rounded-md bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          >
            <Skeleton className="h-9 w-20 rounded-lg bg-slate-200" />
            <Skeleton className="h-3.5 w-32 rounded-md bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Skeleton className="h-5 w-32 rounded-md bg-slate-200" />
            <Skeleton className="h-4 w-16 rounded-md bg-slate-200" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3.5">
                <Skeleton className="size-10 shrink-0 rounded-full bg-slate-200" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md bg-slate-200" />
                  <Skeleton className="h-3 w-1/2 rounded-md bg-slate-200" />
                </div>
                <Skeleton className="h-4 w-10 rounded-md bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-5 rounded-2xl border border-slate-800 bg-[#0B111D] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24 rounded-md bg-slate-700" />
              <Skeleton className="h-3 w-12 rounded-md bg-slate-700" />
            </div>
            <Skeleton className="h-10 w-24 rounded-lg bg-slate-700" />
            <Skeleton className="h-2 w-full rounded-full bg-slate-700" />
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <Skeleton className="h-4 w-36 rounded-md bg-slate-200" />
              <Skeleton className="h-3 w-14 rounded-md bg-slate-200" />
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-full bg-slate-200" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3 rounded-md bg-slate-200" />
                  <Skeleton className="h-3 w-1/2 rounded-md bg-slate-200" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
