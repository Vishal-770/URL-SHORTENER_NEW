import { ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Badge } from "./ui/badge";
// import { Separator } from "./ui/separator"; // Removed as unused

export default function Footer() {
  const links = {
    Product: [
      { label: "Overview", href: "/" },
      { label: "Internal Features", href: "/features" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Workspace Dashboard", href: "/dashboard" },
      { label: "Account Access", href: "/signin" },
    ],
  };

  return (
    <footer className="border-t border-primary/5 bg-background/50 backdrop-blur-xl">
      <div className="page-shell py-20 pb-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="space-y-8">
            <BrandLogo />
            <p className="max-w-md text-base leading-relaxed text-muted-foreground/80">
              LinkLayer is an enterprise-grade URL infrastructure designed for teams who demand reliability, privacy-first analytics, and a seamless developer experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 bg-primary/5 text-primary border-primary/10">
                High Speed Redirects
              </Badge>
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 bg-primary/5 text-primary border-primary/10">
                Neural Analytics
              </Badge>
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 bg-primary/5 text-primary border-primary/10">
                Custom Branding
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-muted-foreground">
               <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
               <Github className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
               <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {Object.entries(links).map(([title, group]) => (
            <div key={title} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">
                {title}
              </h3>
              <div className="flex flex-col gap-4">
                {group.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-all hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-primary/5">
           <div className="flex flex-col gap-6 text-xs font-medium text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-8">
                 <p>© 2026 LinkLayer Infrastructure. All rights reserved.</p>
                 <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                 <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
              </div>
              <p className="flex items-center gap-2">
                 <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                 All systems operational
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
}
