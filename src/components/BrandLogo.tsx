import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
}

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="LinkLayer home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
        LL
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            LinkLayer
          </span>
          <span className="text-base font-semibold text-foreground">
            URL Infrastructure
          </span>
        </span>
      )}
    </Link>
  );
}
