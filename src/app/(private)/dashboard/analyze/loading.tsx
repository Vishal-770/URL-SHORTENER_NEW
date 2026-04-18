import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6 md:space-y-8 animate-pulse">
      {/* Pie Chart Skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-background p-4 shadow-sm space-y-3"
          >
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      {/* Line Chart Skeleton */}
      <div className="rounded-lg border bg-background p-4 shadow-sm overflow-x-auto">
        <Skeleton className="h-60 w-[600px]" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border bg-background p-4 shadow-sm overflow-x-auto">
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
