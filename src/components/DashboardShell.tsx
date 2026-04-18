"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"; // Removed as unused
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { toast } from "sonner";

const navigationGroups = [
  {
    title: "Management",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/profile", label: "Account Settings", icon: UserCircle2 },
    ],
  },
];

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "LL";
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar/50 backdrop-blur-xl">
      {/* Branding */}
      <div className="px-7 py-10">
        <BrandLogo compact className="justify-start scale-110 origin-left" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-10 px-4">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-sidebar-foreground/30 antialiased">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard" || pathname.startsWith("/dashboard/analyze")
                    : pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200",
                      active
                        ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3.5">
                      <Icon className={cn("h-4.5 w-4.5 transition-colors", active ? "text-secondary-foreground" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground")} />
                      {item.label}
                    </span>
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-all", active ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0")} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const userLabel = useMemo(() => {
    return session?.user?.name || session?.user?.email || "User";
  }, [session?.user?.email, session?.user?.name]);

  const signOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Sign out failed");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 lg:block z-40 antialiased">
        <SidebarContent />
      </aside>

      {/* Mobile Shell */}
      <div className="flex min-h-screen flex-col lg:pl-72 focus-visible:outline-none">
        <header className="sticky top-0 z-30 h-20 border-b border-border/10 bg-background/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between gap-4 px-6 sm:px-10">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-muted/50 rounded-xl">
                    <Menu className="h-5 w-5 opacity-70" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 border-r-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              
              <div className="hidden sm:block">
                 <h1 className="text-xs font-black tracking-[0.2em] text-foreground/40 uppercase">Control Center</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 gap-3 rounded-xl px-2 hover:bg-muted/50 font-bold transition-all px-4"
                  >
                    <Avatar className="h-7 w-7 border border-border/20 shadow-sm">
                      <AvatarFallback className="text-[10px] font-black bg-secondary/10 text-secondary">
                        {getInitials(session?.user?.name, session?.user?.email)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm sm:inline-block max-w-40 truncate tabular-nums">
                       {userLabel}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border/10 p-2 shadow-2xl backdrop-blur-2xl">
                  <DropdownMenuLabel className="p-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Connected profile</p>
                    <p className="mt-1 text-sm font-black truncate text-foreground/90">
                      {session?.user?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/5" />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-3 px-4 focus:bg-secondary/10 focus:text-secondary mb-1">
                    <Link href="/profile" className="flex items-center gap-3">
                       <UserCircle2 className="h-4 w-4 opacity-70" />
                       <span className="font-bold text-sm">Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/5" />
                  <DropdownMenuItem onClick={signOut} disabled={isSigningOut} className="rounded-xl cursor-pointer py-3 px-4 text-destructive focus:bg-destructive/10 focus:text-destructive group transition-colors">
                    <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold text-sm">{isSigningOut ? "Terminating..." : "Terminate Session"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
