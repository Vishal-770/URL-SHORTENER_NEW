"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-4 group"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted/20 group-hover:bg-muted/40 transition-colors">
        <ArrowLeft className="h-3 w-3" />
      </div>
      Go Back
    </button>
  );
}
