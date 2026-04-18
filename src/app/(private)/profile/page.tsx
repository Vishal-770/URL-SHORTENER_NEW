import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Bell,
  CreditCard,
  Mail,
  ShieldCheck,
  UserCircle2,
  Activity,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "LL";
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <div className="space-y-16 pb-24">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
           <UserCircle2 className="h-3 w-3" />
           Identity Infrastructure
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Account Profile
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
           Manage your workspace identity, synchronized preferences, and administrative access controls.
        </p>
      </div>

      <div className="space-y-20">
        {/* Identity Section */}
        <section className="space-y-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <Avatar className="h-24 w-24 rounded-lg border border-border/50">
              <AvatarFallback className="text-2xl font-black uppercase tracking-tighter">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">
                  {user.name || "Workspace Unit"}
                </h2>
                <Badge variant="outline" className="rounded-sm border-secondary/20 bg-secondary/5 text-[9px] font-black uppercase tracking-widest text-secondary px-2 py-0.5">
                  Authenticated
                </Badge>
              </div>
              <p className="max-w-md text-xs font-medium text-muted-foreground uppercase tracking-wide opacity-70">
                Primary identity unit for local and global link synchronization.
              </p>
            </div>
          </div>

          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Email Address",
                value: user.email || "Unknown",
                icon: Mail,
              },
              {
                label: "Identity Tag",
                value: user.name || "None Provided",
                icon: UserCircle2,
              },
              {
                label: "Network Status",
                value: "Synchronized",
                icon: ShieldCheck,
              },
              {
                label: "Workspace Tier",
                value: "Professional",
                icon: CreditCard,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground opacity-60 [&>svg]:w-3.5 [&>svg]:h-3.5">
                    <Icon />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-sm font-bold tracking-tight text-foreground truncate">{item.value}</p>
                  <div className="h-0.5 w-4 bg-border/30" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-12 border-t border-border/50 pt-16">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
             <Activity className="h-3 w-3" />
             Workspace Configurations
          </div>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/40 border border-border/10">
                    <Bell className="h-4 w-4 text-foreground/70" />
                 </div>
                 <h3 className="text-sm font-bold uppercase tracking-widest">Environment Notifications</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                 Critical system alerts and infrastructure updates are always enabled via your primary email channel.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/40 border border-border/10">
                    <ShieldCheck className="h-4 w-4 text-foreground/70" />
                 </div>
                 <h3 className="text-sm font-bold uppercase tracking-widest">Access Control</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                 Your authentication is managed through professional identity providers and synchronized across all redirection nodes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
