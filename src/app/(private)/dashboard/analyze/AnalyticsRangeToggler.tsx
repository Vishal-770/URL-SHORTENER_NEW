"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ranges = [
  { label: "7D", value: "7d" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
];

export default function AnalyticsRangeToggler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRange = searchParams.get("range") || "7d";

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("range", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/20 p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleRangeChange(range.value)}
          className={cn(
            "rounded px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all",
            currentRange === range.value
              ? "bg-secondary text-secondary-foreground shadow-sm shadow-secondary/20"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
