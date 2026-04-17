"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, ArrowLeft, ShieldCheck, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function SignInActions() {
  const signInWithProvider = async (provider: "google" | "github") => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx: { error: { message: string } }) => {
          toast.error("Sign in failed", {
            description: ctx.error.message,
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      {/* ── Left Side: Visual ── */}
      <div className="relative hidden w-full lg:flex lg:w-1/2 bg-muted/20 items-center justify-center overflow-hidden border-r border-border/10">
        <Image
          src="/login_side_image.png"
          alt="Dashboard Abstract"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center absolute inset-0 mix-blend-lighten opacity-90"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
        
        {/* Floating Brand Label */}
        <div className="absolute top-12 left-12 z-10">
           <BrandLogo />
        </div>

        {/* Feature Highlights Overlay */}
        <div className="absolute bottom-12 inset-x-12 z-10 space-y-6">
           <div className="space-y-2">
             <h2 className="text-3xl font-black text-white tracking-tight">Enterprise Infrastructure.</h2>
             <p className="text-white/70 font-medium max-w-md leading-relaxed">
               Access the professional workspace. Deploy shortened links, analyze global traffic, and engineer high-resolution QR codes from a single matrix.
             </p>
           </div>
           
           <div className="flex items-center gap-6 pt-4 text-[10px] font-bold uppercase tracking-widest text-white/50">
             <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-secondary" /> Protected Auth</span>
             <span className="flex items-center gap-2"><Link2 className="h-4 w-4 text-emerald-500" /> Infinite scale</span>
           </div>
        </div>
      </div>

      {/* ── Right Side: Auth ── */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 lg:px-24 xl:px-32 relative">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="absolute top-8 left-8 lg:hidden">
           <BrandLogo />
        </div>

        {/* Back to Home Button */}
        <div className="absolute top-8 right-8">
           <Link href="/" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
             <ArrowLeft className="h-3.5 w-3.5" />
             Back to Home
           </Link>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-10">
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Sign In
            </h1>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Enter the secure perimeter to manage your links, track your audiences, and update your configuration.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="button"
              className="h-14 w-full rounded-lg bg-foreground text-background font-black text-[11px] uppercase tracking-widest hover:bg-foreground/90 transition-none"
              onClick={() => signInWithProvider("google")}
            >
              Continue with Google
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 w-full rounded-lg border-border/40 bg-card font-black text-[11px] uppercase tracking-widest text-foreground hover:bg-muted transition-none"
              onClick={() => signInWithProvider("github")}
            >
              <Github className="mr-3 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-xs font-semibold text-muted-foreground opacity-60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
