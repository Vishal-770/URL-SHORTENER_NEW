import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl transition-transform hover:scale-105 active:scale-95">
        <Image 
          src="/logo.png" 
          alt="LinkLayer Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
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
