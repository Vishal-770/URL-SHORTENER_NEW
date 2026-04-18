"use client";

import { DashboardLoadingSkeleton } from "@/components/dashboard/DashboardLoadingSkeleton";
import { GetAllUrl } from "@/services/service";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Link2, MousePointerClick, ScanLine, Activity } from "lucide-react";
import URLInput from "./URLInput";
import DashboardHeader from "./DashboardHeader";
import FallBackCard from "./FallBackCard";
import URLCard from "./URLCard";
import { Badge } from "@/components/ui/badge";

interface URL {
  _id: string;
  originalUrl: string;
  slug: string;
  qrCode: string;
  visitHistory?: { date: string }[];
  createdAt: string;
}

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Allurls"],
    queryFn: () => GetAllUrl(),
    enabled: !isPending && !!session?.user,
  });

  const totalLinks = data?.length ?? 0;
  const totalClicks =
    data?.reduce(
      (sum: number, url: URL) => sum + (url.visitHistory?.length ?? 0),
      0,
    ) ?? 0;
  const averageClicks = totalLinks ? Math.round(totalClicks / totalLinks) : 0;

  return (
    <div className="space-y-20 pb-24">
      <DashboardHeader />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-12 md:grid-cols-3 pt-4">
        {[
          {
            label: "Active Links",
            value: totalLinks,
            icon: Link2,
            detail: "Created links",
          },
          {
            label: "Total Traffic",
            value: totalClicks,
            icon: MousePointerClick,
            detail: "Total clicks on all links",
          },
          {
            label: "Click Rate",
            value: `${averageClicks} avg`,
            icon: ScanLine,
            detail: "Average clicks per link",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground opacity-60 [&>svg]:w-3.5 [&>svg]:h-3.5">
                <Icon />
                <p className="text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
              </div>
              <p className="text-3xl font-black tracking-tight text-foreground tabular-nums">{item.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">{item.detail}</p>
              <div className="h-0.5 w-6 bg-secondary/20" />
            </div>
          );
        })}
      </div>

      {/* Create New Link Section */}
      <section className="space-y-8 border-t border-border/50 pt-16">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
            <Activity className="h-3 w-3" />
            Create New Link
         </div>
         <div className="max-w-3xl">
            <URLInput />
         </div>
      </section>

      {/* Links List Section */}
      <section className="space-y-12 border-t border-border/50 pt-16">
        <div className="flex items-center justify-between px-1">
          <div className="space-y-1">
             <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
               Your Links
             </h2>
             <p className="text-[10px] font-medium text-muted-foreground uppercase opacity-70">
                Manage all your shortened URLs
             </p>
          </div>
          {data?.length ? (
            <Badge variant="outline" className="rounded-md border-border text-[9px] font-black uppercase tracking-widest opacity-40">
              {data.length} Total Links
            </Badge>
          ) : null}
        </div>

        {isLoading ? (
          <DashboardLoadingSkeleton />
        ) : isError ? (
          <div className="rounded-lg border border-destructive/20 p-12 text-center bg-destructive/5">
            <p className="text-destructive text-sm font-bold uppercase tracking-widest">
              Failed to load links. Please refresh the page.
            </p>
          </div>
        ) : data?.length > 0 ? (
          <div className="space-y-2">
             {data.map((url: URL) => (
                <URLCard key={url._id} url={url} />
             ))}
          </div>
        ) : (
          <FallBackCard />
        )}
      </section>
    </div>
  );
}
