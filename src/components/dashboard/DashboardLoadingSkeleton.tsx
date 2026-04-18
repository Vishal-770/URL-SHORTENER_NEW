import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-3xl border bg-card p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-4 h-9 w-24" />
            <Skeleton className="mt-3 h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border bg-card p-6">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-full sm:w-40" />
        </div>
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-3xl border bg-card p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-full max-w-[420px]" />
                <Skeleton className="h-4 w-full max-w-[360px]" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
