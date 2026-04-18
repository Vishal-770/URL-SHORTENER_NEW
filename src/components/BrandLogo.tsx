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
      className={cn("inline-flex items-center gap-3 group/logo", className)}
      aria-label="LinkLayer home"
    >
      <div className="relative h-9 w-9">
        <Image 
          src="/logo.png" 
          alt="LinkLayer Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground group-hover/logo:text-primary transition-colors">
          LinkLayer
        </span>
        {!compact && (
          <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-0.5">
            Core Infrastructure
          </span>
        )}
      </div>
    </Link>
  );
}
