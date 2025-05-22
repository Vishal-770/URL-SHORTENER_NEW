"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ModeToggle } from "./ui/ModeToggle";

export default function NavBar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Improved spacing */}
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="font-bold text-primary-foreground">LS</span>
          </div>
          <span className="text-lg font-bold tracking-tight">LinkShort</span>
        </Link>

        {/* Desktop Nav - Better spacing and hover effects */}
        <nav className="hidden items-center space-x-6 md:flex lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Controls - Better mobile spacing */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="default" 
                size="sm"
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                }
              }}
            />
          </SignedIn>

          {/* Mobile Menu - Improved styling */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="sm:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="text-left">
                <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="w-full rounded-md px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col space-y-3">
                <div className="px-4">
                  <ModeToggle />
                </div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="default" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}