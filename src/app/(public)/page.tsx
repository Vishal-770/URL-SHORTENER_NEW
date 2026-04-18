"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  QrCode,
  Link2,
  Activity,
  Smartphone,
  ShieldCheck,
  Zap,
  Check,
  Palette,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Link Shortening",
    description: "Lightning-fast URL redirection. Generate clean, branded links instantly for any campaign or operation.",
    icon: Link2,
    highlights: ["Custom slugs", "Instant sync", "High availability"]
  },
  {
    title: "Deep Analytics",
    description: "Track exactly who is clicking your links. Monitor device types, browsers, global locations, and filter bots.",
    icon: BarChart3,
    highlights: ["Live click graphs", "Bot detection", "Geographic data"]
  },
  {
    title: "QR Code Designer",
    description: "Build production-ready physical assets. Match your exact brand colors and add logos in 1024x1024 resolution.",
    icon: QrCode,
    highlights: ["1024x1024 high-res", "Custom logos", "Advanced typography"]
  },
];

const metrics = [
  { label: "Redirection Speed", value: "Sub-50ms" },
  { label: "Link Capacity", value: "Unlimited" },
  { label: "QR Quality", value: "1024px" },
];

const steps = [
  { step: "01", title: "Paste URL", desc: "Drop any long URL into the dashboard." },
  { step: "02", title: "Customize", desc: "Claim a custom slug and generate a branded QR code." },
  { step: "03", title: "Distribute", desc: "Share your link physically or digitally and track every scan." },
];

// -- Animation Variants --
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  return (
    <main className="overflow-hidden pb-32">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 page-shell">
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div 
          className="flex flex-col items-center text-center space-y-10"
          initial="hidden"
          animate="show"
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP}>
            <Badge variant="outline" className="rounded-md px-4 py-1.5 font-bold bg-secondary/5 text-secondary border-secondary/20 shadow-none uppercase tracking-widest text-[10px]">
              <Zap className="mr-2 h-3.5 w-3.5 inline" />
              The Complete Link Toolkit
            </Badge>
          </motion.div>
          
          <motion.div variants={FADE_UP} className="space-y-6">
            <h1 className="max-w-5xl text-6xl font-black tracking-tight sm:text-8xl text-foreground !leading-[1.1]">
              Shorten, Track, <br className="hidden sm:block" /> and Brand Every Scan.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
               A professional workspace uniting lightning-fast URL shortening, detailed audience analytics, and a high-resolution QR design engine.
            </p>
          </motion.div>

          <motion.div variants={FADE_UP} className="flex flex-col gap-4 sm:flex-row pt-4">
            <Button asChild size="lg" className="h-14 rounded-md px-10 font-bold text-[13px] uppercase tracking-widest shadow-xl shadow-primary/20">
              <Link href="/signin">
                Start for Free
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div variants={FADE_UP} className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl pt-24 border-t border-border/10 mt-12">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center">
                  <p className="text-4xl font-black tabular-nums text-foreground">{metric.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {metric.label}
                  </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Workflow Steps ── */}
      <section className="py-24 lg:py-32 bg-muted/20 border-y border-border/10">
         <div className="page-shell">
            <div className="text-center space-y-4 mb-16">
               <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Three steps to deployment.</h2>
               <p className="text-muted-foreground font-medium">From raw link to tracked campaign in seconds.</p>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={STAGGER}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
            >
               {steps.map((s, i) => (
                  <motion.div key={i} variants={FADE_UP} className="relative bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center justify-between mb-8">
                        <div className="h-12 w-12 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-black tracking-widest shadow-inner">
                           {s.step}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <h3 className="text-2xl font-black tracking-tight">{s.title}</h3>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                           {s.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* ── Primary Features Grid ── */}
      <section className="pt-32 pb-16 page-shell" id="features">
        <motion.div 
          className="space-y-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP} className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Everything in one plain.</h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto">No scattered tools. Build your links, check your traffic, and design your physical assets all from a single synchronized dashboard.</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 pt-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  variants={FADE_UP}
                  key={item.title}
                  className="flex flex-col p-10 rounded-2xl bg-card border border-border/20 shadow-lg shadow-black/5"
                >
                   <div className="mb-6 h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 flex border border-secondary/20">
                      <Icon className="h-6 w-6 text-secondary" />
                   </div>
                   <h3 className="text-xl font-black mb-4">{item.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8 flex-1">
                     {item.description}
                   </p>
                   
                   <ul className="space-y-3 border-t border-border/10 pt-6">
                     {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground">
                           <Check className="h-4 w-4 text-emerald-500" />
                           {highlight}
                        </li>
                     ))}
                   </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── Detail Feature: QR Designer Spotlight ── */}
      <section className="py-16 page-shell">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="rounded-3xl border border-border/10 bg-muted/5 overflow-hidden shadow-2xl shadow-black/5"
        >
           <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-20 flex flex-col justify-center space-y-8 border-b lg:border-b-0 lg:border-r border-border/10 relative overflow-hidden">
                 {/* Decorative background logo */}
                 <QrCode className="absolute -right-20 -bottom-20 w-96 h-96 text-primary/5 -rotate-12" />
                 
                 <div className="relative z-10 space-y-8">
                    <Badge variant="outline" className="w-fit rounded-md bg-primary/10 text-primary border-primary/20 shadow-none uppercase tracking-widest text-[9px] font-black">
                       Engineered for Print
                    </Badge>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                       Professional <br/> QR Engine.
                    </h2>
                    <p className="text-muted-foreground font-medium leading-relaxed max-w-md">
                       Merge your database state directly into high-fidelity physical assets. Add center logos, change dot patterns, and download directly in ultra high-resolution formats.
                    </p>
                    <div className="grid grid-cols-2 gap-y-6 pt-4">
                       {[
                         { l: "Brand Colors", i: Palette },
                         { l: "Logo Inserts", i: ShieldCheck },
                         { l: "Typography", i: Activity },
                         { l: "1024x1024 Res", i: Layers }
                       ].map((Feature, i) => (
                         <div key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                            <div className="h-8 w-8 rounded-md bg-secondary/10 flex items-center justify-center border border-secondary/20">
                               <Feature.i className="h-4 w-4 text-secondary" />
                            </div>
                            {Feature.l}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="p-12 lg:p-20 flex items-center justify-center bg-card relative">
                 {/* Mock UI animated entrance */}
                 <motion.div 
                   initial={{ scale: 0.95, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.3, duration: 0.5 }}
                   className="w-full max-w-sm rounded-2xl border border-border/20 bg-background p-6 space-y-6 shadow-2xl relative z-10"
                 >
                    <div className="flex gap-2 border-b border-border/10 pb-4">
                       <span className="h-2 w-12 rounded-full bg-secondary/40" />
                       <span className="h-2 w-8 rounded-full bg-border" />
                       <span className="h-2 w-10 rounded-full bg-border" />
                    </div>
                    <div className="aspect-square bg-white rounded-xl border border-border/20 p-8 flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                       <QrCode className="h-32 w-32 text-foreground relative z-10" strokeWidth={1} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-black uppercase tracking-widest cursor-pointer hover:opacity-90">Download</div>
                       <div className="h-10 rounded-md border border-border/20 flex items-center justify-center text-[9px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:bg-muted">Save</div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* ── Detail Feature: Analytics Spotlight ── */}
      <section className="py-16 page-shell">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="rounded-3xl border border-border/10 bg-secondary text-secondary-foreground overflow-hidden shadow-2xl shadow-secondary/20"
        >
           <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-20 flex items-center justify-center bg-secondary/50 order-2 lg:order-1 relative overflow-hidden">
                 
                 {/* Decorative background paths */}
                 <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M0 100 C 30 50 70 50 100 100" stroke="white" strokeWidth="2" fill="none" />
                 </svg>

                 {/* Mock UI animated entrance */}
                 <motion.div 
                   initial={{ scale: 0.95, opacity: 0, x: -20 }}
                   whileInView={{ scale: 1, opacity: 1, x: 0 }}
                   transition={{ delay: 0.3, duration: 0.5 }}
                   className="w-full max-w-sm space-y-4 relative z-10"
                 >
                    <div className="h-48 w-full rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 flex items-end p-6 gap-3 backdrop-blur-sm">
                       {/* Animated Bars */}
                       {[40, 70, 50, 90, 60, 100].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                             className="w-full bg-primary/90 rounded-sm" 
                           />
                       ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-16 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 flex items-center px-4 gap-4 backdrop-blur-sm">
                          <Globe2 className="h-5 w-5 text-secondary-foreground/60" />
                          <div className="space-y-1.5 flex-1">
                             <div className="h-1.5 w-[60%] bg-secondary-foreground/30 rounded-full" />
                             <div className="h-2 w-[80%] bg-secondary-foreground/80 rounded-full" />
                          </div>
                       </div>
                       <div className="h-16 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 flex items-center px-4 gap-4 backdrop-blur-sm">
                          <Smartphone className="h-5 w-5 text-secondary-foreground/60" />
                          <div className="space-y-1.5 flex-1">
                             <div className="h-1.5 w-[40%] bg-secondary-foreground/30 rounded-full" />
                             <div className="h-2 w-[90%] bg-secondary-foreground/80 rounded-full" />
                          </div>
                       </div>
                    </div>
                 </motion.div>
              </div>

              <div className="p-12 lg:p-20 flex flex-col justify-center space-y-8 order-1 lg:order-2 relative z-10">
                 <Badge variant="outline" className="w-fit rounded-md bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20 shadow-none uppercase tracking-widest text-[9px] font-black">
                    Actionable Data
                 </Badge>
                 <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    Who, Where, <br/> and How.
                 </h2>
                 <p className="text-secondary-foreground/70 font-medium leading-relaxed max-w-md">
                    Stop flying blind. Every link you share acts as a sensor, recording exact interaction data. View detailed visit histories, separate human clicks from bot traffic, and understand exactly which devices your audience uses.
                 </p>
                 <div className="pt-4">
                    <Button asChild className="h-14 rounded-md px-10 bg-white text-secondary font-black text-[11px] uppercase tracking-widest hover:bg-white/90">
                       <Link href="/signin">Start Tracking</Link>
                    </Button>
                 </div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* ── Final CTA Section ── */}
      <section className="pt-24 pb-12 page-shell">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-card border border-border p-16 md:p-24 text-center space-y-10 max-w-5xl mx-auto border-t-[8px] border-t-primary shadow-xl shadow-black/5 relative overflow-hidden"
        >
           {/* Abstract grid background for CTA */}
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />

           <div className="relative z-10 space-y-6">
              <h2 className="text-5xl sm:text-6xl font-black tracking-tight">Deploy your links today.</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                 Join the platform built for teams who need their infrastructure to be fast, reliable, and beautifully designed.
              </p>
           </div>
           
           <div className="relative z-10 flex flex-col items-center gap-6 pt-4">
              <Button size="lg" asChild className="h-16 rounded-md px-14 font-black text-[13px] uppercase tracking-widest shadow-xl shadow-primary/20">
                 <Link href="/signin">Create Workspace Setup</Link>
              </Button>
              <div className="flex flex-wrap justify-center gap-8 items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                 <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Secure Auth</div>
                 <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Instant Provisioning</div>
                 <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> No credit card</div>
              </div>
           </div>
        </motion.div>
      </section>
    </main>
  );
}
