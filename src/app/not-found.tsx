"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, Search, ArrowLeft, Activity, Link2, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute -z-10 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"
      />

      {/* ── Content ── */}
      <div className="w-full max-w-4xl text-center space-y-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <motion.div
            animate={{ 
              x: [0, -2, 2, -1, 1, 0],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(0.8)", "brightness(1.2)", "brightness(1)"]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            className="text-[120px] sm:text-[200px] font-black leading-none tracking-tighter text-foreground selection:bg-primary/30"
          >
            404
          </motion.div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-primary/50 whitespace-nowrap">
            <Activity className="h-3 w-3" /> System Error: Path Not Found
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter">
            We&apos;ve looked <span className="text-muted-foreground/30 italic">everywhere.</span>
          </h1>
          <p className="mx-auto max-w-lg text-muted-foreground font-medium text-lg leading-relaxed">
            The link you followed might be broken, or the page may have been moved to a new secure coordinate. Let&apos;s get you back to safety.
          </p>
        </motion.div>

        {/* ── Functional Bridges ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-6 sm:grid-cols-3 pt-12"
        >
          {[
            { 
              title: "Home Base", 
              desc: "Return to the main dashboard", 
              icon: Home, 
              href: "/" 
            },
            { 
              title: "My Workspace", 
              desc: "Manage your active links", 
              icon: LayoutDashboard, 
              href: "/dashboard" 
            },
            { 
              title: "Discover Features", 
              desc: "Explore link infrastructure", 
              icon: Search, 
              href: "/features" 
            }
          ].map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              className="group p-8 rounded-[32px] border border-border/40 bg-card hover:bg-muted/50 transition-all text-left space-y-4 shadow-xl shadow-black/5 active:scale-95"
            >
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <link.icon className="h-6 w-6 text-secondary group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">{link.title}</h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">{link.desc}</p>
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12 flex flex-col items-center gap-6"
        >
           <Button asChild variant="link" className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 hover:text-primary">
              <Link href="/signin">
                 <ArrowLeft className="mr-3 h-4 w-4" /> Secure Authentication
              </Link>
           </Button>
           
           <div className="h-px w-24 bg-border/20" />
           
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20">
              LinkLayer • 404 Rescue Protocol • 2026
           </p>
        </motion.div>
      </div>

      {/* Floating Abstract Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -50, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] opacity-20"
      >
        <Link2 className="h-24 w-24 text-primary blur-[2px]" strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ 
          y: [0, 60, 0],
          rotate: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] opacity-20"
      >
        <Ghost className="h-32 w-32 text-secondary blur-[1px]" strokeWidth={1} />
      </motion.div>
    </main>
  );
}
