// app/loading-bar-provider.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // or your custom CSS
import "@/styles/nprogress.css";

export function LoadingBarProvider() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.4);

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Fallback timeout in case navigation is fast

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
