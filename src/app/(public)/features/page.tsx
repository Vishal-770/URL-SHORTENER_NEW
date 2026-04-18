"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Globe2,
  QrCode,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const features = [
  {
    title: "Instant Link Generation",
    description: "Generate short links from your dashboard without extra steps or clutter. Built for speed.",
    icon: Sparkles,
  },
  {
    title: "Deep Device Analytics",
    description: "Understand clicks, browsers, devices, and operating systems from one continuous analytics flow.",
    icon: BarChart3,
  },
  {
    title: "QR Code Engineering",
    description: "Every link carries a QR-ready workflow. Design print-ready assets in 1024x1024 resolution.",
    icon: QrCode,
  },
  {
    title: "Workspace Organization",
    description: "Use a dedicated workspace layout so link creation, reviews, and monitoring are effortlessly handled.",
    icon: Workflow,
  },
  {
    title: "Global Edge Redirects",
    description: "Deliver high-speed redirects worldwide using edge networks to guarantee immediate resolution.",
    icon: Globe2,
  },
  {
    title: "Encrypted Auth Routes",
    description: "Enterprise-grade authentication keeps your internal operational area completely separate from public traffic.",
    icon: ShieldCheck,
  },
];

// -- Animation Variants --
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function FeaturesPage() {
  return (
    <main className="overflow-hidden pb-32">
      {/* ── Header Section ── */}
      <section className="relative pt-32 pb-24 page-shell border-b border-border/10">
        <motion.div 
          className="flex flex-col items-start space-y-8 max-w-4xl"
          initial="hidden"
          animate="show"
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP}>
            <Badge variant="outline" className="rounded-md px-4 py-1.5 font-bold bg-secondary/5 text-secondary border-secondary/20 shadow-none uppercase tracking-widest text-[10px]">
              <ScanSearch className="mr-2 h-3.5 w-3.5 inline" />
              Feature Overview
            </Badge>
          </motion.div>
          
          <motion.div variants={FADE_UP} className="space-y-6">
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl text-foreground !leading-[1.1]">
              Built for teams who <br className="hidden sm:block" /> value precision.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
              We focus on the essentials: lightning-fast link creation, incredibly deep analytics, and a professional UI that avoids generic marketing bloat.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 page-shell">
        <motion.div 
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                variants={FADE_UP}
                key={feature.title} 
                className="flex flex-col p-10 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="mb-6 h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 flex border border-secondary/20">
                  <Icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-4">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Technical Changes Breakdown ── */}
      <section className="py-24 bg-muted/20 border-y border-border/10">
         <div className="page-shell">
            <motion.div 
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.2 }}
               variants={STAGGER}
               className="grid gap-12 lg:grid-cols-[1fr_1.5fr]"
            >
               <motion.div variants={FADE_UP} className="space-y-6">
                 <h2 className="text-3xl font-black tracking-tight">The Architecture.</h2>
                 <p className="text-base leading-relaxed text-muted-foreground font-medium max-w-sm">
                   Our platform rigorously separates public marketing pages from the private dashboard matrix, ensuring security and speed where it matters most.
                 </p>
               </motion.div>
               
               <motion.div variants={STAGGER} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   "Isolated Landing Routes",
                   "Protected Dashboard Matrix",
                   "Client-Side State Fallbacks",
                   "Tokenized Design System",
                   "Hardware-Accelerated Charts",
                   "Canvas-Driven QR Renders"
                 ].map((item) => (
                   <motion.div key={item} variants={FADE_UP} className="rounded-xl border border-border/50 bg-background p-6 flex flex-col justify-center">
                     <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">{item}</span>
                   </motion.div>
                 ))}
               </motion.div>
            </motion.div>
            
            <Separator className="my-16" />
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">
              Strictly adheres to the internal CSS token system. No styling deviation.
            </p>
         </div>
      </section>
    </main>
  );
}
