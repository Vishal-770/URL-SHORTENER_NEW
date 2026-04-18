"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, ArrowUpRight, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ModeToggle } from "./ui/ModeToggle";
// import { Badge } from "./ui/badge"; // Removed as unused
import { toast } from "sonner";

export default function NavBar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navLinks = [
    { name: "Product", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo compact className="h-8" />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.path
                  ? "bg-secondary/10 text-secondary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {!session?.user ? (
            <Button size="sm" asChild className="rounded-md px-5 font-bold shadow-none">
              <Link href="/signin">
                Start Free
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden rounded-md sm:inline-flex"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md px-4 shadow-none"
                disabled={isSigningOut}
                onClick={async () => {
                  try {
                    setIsSigningOut(true);
                    await authClient.signOut();
                    window.location.href = "/";
                  } catch {
                    toast.error("Sign out failed");
                  } finally {
                    setIsSigningOut(false);
                  }
                }}
              >
                {isSigningOut ? "Wait..." : "Sign out"}
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="border-b border-border bg-background"
            >
              <SheetHeader className="text-left">
                <BrandLogo compact />
                <SheetTitle className="pt-4 text-lg">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "w-full rounded-md px-4 py-3 text-left text-sm font-medium transition-colors",
                      pathname === link.path
                        ? "bg-secondary/10 text-secondary"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pb-4">
                 <Button asChild className="w-full rounded-md font-bold shadow-none">
                    <Link href="/signin">Get Started</Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
